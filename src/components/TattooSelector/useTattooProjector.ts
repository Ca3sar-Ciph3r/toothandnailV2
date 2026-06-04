import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import type { SceneRefs } from './useBodyScene';

// ---------------------------------------------------------------------------
// Per-pixel tattoo projection injected into the body mesh's fragment shader.
// Supports up to MAX_SLOTS simultaneous tattoos.
// Using per-fragment projection (instead of DecalGeometry UVs) means the
// texture coordinates are correct regardless of surface curvature.
// ---------------------------------------------------------------------------

const MAX_SLOTS = 6;

// Generate per-slot GLSL uniform declarations.
function buildFragDecls(n: number): string {
  let s = 'varying vec3 vTattooWorldPos;\n';
  for (let i = 0; i < n; i++) {
    s += `uniform bool      u_ta${i};\n`;
    s += `uniform vec3      u_tc${i};\n`; // center
    s += `uniform vec3      u_tn${i};\n`; // normal
    s += `uniform vec3      u_tr${i};\n`; // right  (sign carries mirror)
    s += `uniform vec3      u_tu${i};\n`; // up     (sign carries mirror)
    s += `uniform float     u_tw${i};\n`; // half-width  (negative = mirrored)
    s += `uniform float     u_th${i};\n`; // half-height (negative = mirrored)
    s += `uniform float     u_to${i};\n`; // opacity
    s += `uniform sampler2D u_tt${i};\n`; // texture
  }
  return s;
}

// Generate per-slot GLSL projection + composite code (unrolled to avoid
// dynamic sampler indexing which is restricted in GLSL 1.00).
function buildFragBody(n: number): string {
  let s = '';
  for (let i = 0; i < n; i++) {
    s += `
if (u_ta${i}) {
  vec3  _d${i}  = vTattooWorldPos - u_tc${i};
  float _px${i} = dot(_d${i}, u_tr${i}) / u_tw${i} + 0.5;
  float _py${i} = dot(_d${i}, u_tu${i}) / u_th${i} + 0.5;
  float _pz${i} = dot(_d${i}, u_tn${i});
  if (_px${i} >= 0.0 && _px${i} <= 1.0 &&
      _py${i} >= 0.0 && _py${i} <= 1.0 &&
      _pz${i} > -0.08) {
    // Soft fade at UV edges so the boundary blends naturally.
    float _ef${i} = clamp(min(min(_px${i}, 1.0 - _px${i}),
                              min(_py${i}, 1.0 - _py${i})) * 10.0, 0.0, 1.0);
    vec4  _col${i} = texture2D(u_tt${i}, vec2(_px${i}, _py${i}));
    // sRGB → linear (gl_FragColor is linear at this injection point, pre-tonemapping)
    _col${i}.rgb = pow(max(_col${i}.rgb, vec3(0.0)), vec3(2.2));
    float _a${i}   = _col${i}.a * u_to${i} * _ef${i};
    gl_FragColor.rgb = mix(gl_FragColor.rgb, _col${i}.rgb, _a${i});
  }
}`;
  }
  return s;
}

// ---------------------------------------------------------------------------

export interface TattooProjectorAPI {
  ensureShader: () => void;
  setTattoo: (
    id: string,
    texture: THREE.Texture,
    center: THREE.Vector3,
    normal: THREE.Vector3,
    right: THREE.Vector3,
    up: THREE.Vector3,
    w: number, h: number,
    mirrorX: boolean, mirrorY: boolean,
    opacity?: number,
  ) => void;
  clearTattoo: (id: string) => void;
  clearAll: () => void;
  reset: () => void;
}

export function useTattooProjector(
  sceneRefsRef: React.RefObject<SceneRefs>,
): TattooProjectorAPI {
  // uniform objects — kept alive so mutations after compile work
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null);
  // slotId → slot index (0 .. MAX_SLOTS-1)
  const slotMapRef  = useRef<Map<string, number>>(new Map());
  const isSetUpRef  = useRef(false);

  const _buildUniforms = (): Record<string, THREE.IUniform> => {
    const u: Record<string, THREE.IUniform> = {};
    for (let i = 0; i < MAX_SLOTS; i++) {
      u[`u_ta${i}`] = { value: false };
      u[`u_tc${i}`] = { value: new THREE.Vector3() };
      u[`u_tn${i}`] = { value: new THREE.Vector3(0, 0, 1) };
      u[`u_tr${i}`] = { value: new THREE.Vector3(1, 0, 0) };
      u[`u_tu${i}`] = { value: new THREE.Vector3(0, 1, 0) };
      u[`u_tw${i}`] = { value: 0.2 };
      u[`u_th${i}`] = { value: 0.2 };
      u[`u_to${i}`] = { value: 0.9 };
      u[`u_tt${i}`] = { value: null };
    }
    return u;
  };

  const ensureShader = useCallback(() => {
    if (isSetUpRef.current) return;
    const mesh = sceneRefsRef.current.bodyMesh;
    if (!mesh) return;
    const mat = mesh.material as THREE.MeshStandardMaterial;
    if (!mat || !(mat instanceof THREE.MeshStandardMaterial)) return;

    const u = _buildUniforms();
    uniformsRef.current = u;

    const fragDecls = buildFragDecls(MAX_SLOTS);
    const fragBody  = buildFragBody(MAX_SLOTS);

    mat.onBeforeCompile = (shader) => {
      // Merge our uniforms into the program's uniform map.
      Object.assign(shader.uniforms, u);

      // ── Vertex shader: pass world position to fragment shader ──────────
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        'varying vec3 vTattooWorldPos;\nvoid main() {',
      );
      // #include <fog_vertex> is always the last chunk — safe anchor
      shader.vertexShader = shader.vertexShader.replace(
        '#include <fog_vertex>',
        `vTattooWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;\n#include <fog_vertex>`,
      );

      // ── Fragment shader: declare uniforms and inject projection ────────
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `${fragDecls}\nvoid main() {`,
      );
      // Inject after the base colour is written but before tone mapping
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <tonemapping_fragment>',
        `${fragBody}\n#include <tonemapping_fragment>`,
      );
    };

    mat.customProgramCacheKey = () => 'tattoo-projector-v3';
    mat.needsUpdate = true;
    isSetUpRef.current = true;
  }, [sceneRefsRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const _allocSlot = (id: string): number => {
    if (slotMapRef.current.has(id)) return slotMapRef.current.get(id)!;
    const used = new Set(slotMapRef.current.values());
    for (let i = 0; i < MAX_SLOTS; i++) {
      if (!used.has(i)) { slotMapRef.current.set(id, i); return i; }
    }
    // All slots full — evict the oldest entry
    const [evictId, evictIdx] = slotMapRef.current.entries().next().value as [string, number];
    slotMapRef.current.delete(evictId);
    slotMapRef.current.set(id, evictIdx);
    return evictIdx;
  };

  const setTattoo = useCallback((
    id: string,
    texture: THREE.Texture,
    center: THREE.Vector3,
    normal: THREE.Vector3,
    right: THREE.Vector3,
    up: THREE.Vector3,
    w: number, h: number,
    mirrorX: boolean, mirrorY: boolean,
    opacity = 0.9,
  ) => {
    ensureShader();
    const u = uniformsRef.current;
    if (!u) return;
    const i = _allocSlot(id);
    u[`u_ta${i}`].value = true;
    u[`u_tc${i}`].value = center.clone();
    u[`u_tn${i}`].value = normal.clone();
    // Passing negative width/height flips the projected UV — implements mirror
    u[`u_tr${i}`].value = right.clone();
    u[`u_tu${i}`].value = up.clone();
    u[`u_tw${i}`].value = mirrorX ? -w : w;
    u[`u_th${i}`].value = mirrorY ? -h : h;
    u[`u_to${i}`].value = opacity;
    u[`u_tt${i}`].value = texture;
  }, [ensureShader]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearTattoo = useCallback((id: string) => {
    const u = uniformsRef.current;
    const i = slotMapRef.current.get(id);
    if (u !== null && i !== undefined) {
      u[`u_ta${i}`].value = false;
      u[`u_tt${i}`].value = null;
    }
    slotMapRef.current.delete(id);
  }, []);

  const clearAll = useCallback(() => {
    const u = uniformsRef.current;
    if (u) {
      for (let i = 0; i < MAX_SLOTS; i++) {
        u[`u_ta${i}`].value = false;
        u[`u_tt${i}`].value = null;
      }
    }
    slotMapRef.current.clear();
  }, []);

  // Call this when the body mesh is swapped (model change) so the new mesh
  // gets the shader on the next ensureShader() call.
  const reset = useCallback(() => {
    clearAll();
    isSetUpRef.current = false;
    uniformsRef.current = null;
  }, [clearAll]);

  return { ensureShader, setTattoo, clearTattoo, clearAll, reset };
}
