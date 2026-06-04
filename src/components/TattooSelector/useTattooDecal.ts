import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import type { SceneRefs } from './useBodyScene';
import type { TattooHotspot } from './hotspotData';

function getApproxNormal(hotspot: TattooHotspot): THREE.Vector3 {
  const { id, position } = hotspot;
  // Back-facing body hotspots
  if (position.z < -0.05)         return new THREE.Vector3(0, 0, -1);
  // Body-specific
  if (id === 'ribs')               return new THREE.Vector3(-0.9, 0, 0.44).normalize();
  if (id === 'neck')               return new THREE.Vector3(0, 0.18, 0.98).normalize();
  if (id === 'left-upper-arm')     return new THREE.Vector3(-0.5, 0, 0.87).normalize();
  if (id === 'right-upper-arm')    return new THREE.Vector3( 0.5, 0, 0.87).normalize();
  if (id === 'left-forearm')       return new THREE.Vector3(-0.5, 0, 0.87).normalize();
  if (id === 'right-forearm')      return new THREE.Vector3( 0.5, 0, 0.87).normalize();
  if (id === 'left-shoulder')      return new THREE.Vector3(-0.4, 0, 0.92).normalize();
  if (id === 'right-shoulder')     return new THREE.Vector3( 0.4, 0, 0.92).normalize();
  // Hand model hotspots
  if (id === 'hand-back')          return new THREE.Vector3(0, 0, -1);
  if (id === 'hand-palm')          return new THREE.Vector3(0, 0,  1);
  if (id === 'hand-wrist')         return new THREE.Vector3(0, 0,  1);
  if (id === 'hand-thumb')         return new THREE.Vector3(0.6, 0, 0.8).normalize();
  if (id === 'hand-index')         return new THREE.Vector3(0.2, 0, 0.98).normalize();
  if (id === 'hand-middle')        return new THREE.Vector3(0, 0,  1);
  if (id === 'hand-ring')          return new THREE.Vector3(-0.2, 0, 0.98).normalize();
  if (id === 'hand-pinky')         return new THREE.Vector3(-0.5, 0, 0.87).normalize();
  return new THREE.Vector3(0, 0, 1);
}

function getDecalOrientation(normal: THREE.Vector3, rollRad = 0): THREE.Euler {
  const up = Math.abs(normal.dot(new THREE.Vector3(0, 1, 0))) > 0.99
    ? new THREE.Vector3(0, 0, 1)
    : new THREE.Vector3(0, 1, 0);
  const right    = new THREE.Vector3().crossVectors(up, normal).normalize();
  const actualUp = new THREE.Vector3().crossVectors(normal, right).normalize();
  const m = new THREE.Matrix4().makeBasis(right, actualUp, normal);
  if (rollRad !== 0) {
    m.premultiply(new THREE.Matrix4().makeRotationAxis(normal.clone().normalize(), rollRad));
  }
  return new THREE.Euler().setFromRotationMatrix(m);
}

function findSurfacePoint(
  bodyMesh: THREE.Mesh,
  approxPos: THREE.Vector3,
  approxNormal: THREE.Vector3,
): { point: THREE.Vector3; normal: THREE.Vector3 } | null {
  bodyMesh.updateWorldMatrix(true, false);
  const raycaster = new THREE.Raycaster();
  const origin    = approxPos.clone().addScaledVector(approxNormal, 0.6);
  raycaster.set(origin, approxNormal.clone().negate());
  const hits = raycaster.intersectObject(bodyMesh, false);
  if (hits.length > 0 && hits[0].face) {
    return {
      point:  hits[0].point,
      normal: hits[0].face.normal.clone().transformDirection(bodyMesh.matrixWorld).normalize(),
    };
  }
  raycaster.set(
    new THREE.Vector3(approxPos.x, approxPos.y, approxPos.z + 0.6),
    new THREE.Vector3(0, 0, -1),
  );
  const hits2 = raycaster.intersectObject(bodyMesh, false);
  if (hits2.length > 0 && hits2[0].face) {
    return {
      point:  hits2[0].point,
      normal: hits2[0].face.normal.clone().transformDirection(bodyMesh.matrixWorld).normalize(),
    };
  }
  return null;
}

import { DECAL_SIZES } from './tattooConstants';

interface DecalState {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  hotspotId: string;
  scale: number;
  rotation: number;
  mirrorX: boolean;
  mirrorY: boolean;
}

interface PlacedEntry {
  mesh: THREE.Mesh;
  texture: THREE.Texture;
  state: DecalState;
}

interface UseTattooDecalProps {
  sceneRefsRef: React.RefObject<SceneRefs>;
}

export function useTattooDecal({ sceneRefsRef }: UseTattooDecalProps) {
  const placedRef = useRef<Map<string, PlacedEntry>>(new Map());

  const _buildMesh = useCallback((id: string, texture: THREE.Texture, state: DecalState) => {
    const { scene, bodyMesh } = sceneRefsRef.current;
    if (!scene) return;

    // Remove existing mesh for this id (keep texture — caller manages it)
    const existing = placedRef.current.get(id);
    if (existing) {
      scene.remove(existing.mesh);
      existing.mesh.geometry.dispose();
      (existing.mesh.material as THREE.MeshStandardMaterial).dispose();
    }

    if (bodyMesh) bodyMesh.updateWorldMatrix(true, false);

    const baseSize = (DECAL_SIZES[state.hotspotId] ?? 0.20) * state.scale;
    const img    = texture.image as HTMLImageElement;
    const aspect = img?.width && img?.height ? img.width / img.height : 1;
    const w = aspect >= 1 ? baseSize : baseSize * aspect;
    const h = aspect >= 1 ? baseSize / aspect : baseSize;

    // Apply mirror via texture repeat/offset
    texture.repeat.set(state.mirrorX ? -1 : 1, state.mirrorY ? -1 : 1);
    texture.offset.set(state.mirrorX ?  1 : 0, state.mirrorY ?  1 : 0);
    texture.needsUpdate = true;

    const mat = new THREE.MeshStandardMaterial({
      map: texture, transparent: true, alphaTest: 0.02, opacity: 0.9,
      depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
    });

    let mesh: THREE.Mesh;
    if (bodyMesh) {
      const decalPos = state.position.clone().addScaledVector(state.normal, -0.008);
      let geo: THREE.BufferGeometry | null = null;
      try {
        geo = new DecalGeometry(
          bodyMesh, decalPos,
          getDecalOrientation(state.normal, state.rotation),
          new THREE.Vector3(w, h, 0.22),
        );
        if (geo.attributes.position && geo.attributes.position.count > 0) {
          geo = _filterDecalByNormal(geo, state.normal, 90, decalPos, Math.max(w, h) * 0.82);
        }
        if (!geo.attributes.position || geo.attributes.position.count === 0) { geo.dispose(); geo = null; }
      } catch { geo = null; }
      mesh = geo ? new THREE.Mesh(geo, mat) : _buildFallbackMesh(mat, state, w, h);
    } else {
      mesh = _buildFallbackMesh(mat, state, w, h);
    }
    mesh.renderOrder = 1;
    scene.add(mesh);
    placedRef.current.set(id, { mesh, texture, state });
  }, [sceneRefsRef]); // eslint-disable-line react-hooks/exhaustive-deps

  const applyTattoo = useCallback((hotspot: TattooHotspot, imageDataUrl: string, placedId: string) => {
    // Dispose old texture for this id (we're replacing with a new load)
    const existing = placedRef.current.get(placedId);
    if (existing) existing.texture.dispose();

    const loader = new THREE.TextureLoader();
    loader.load(imageDataUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const approxPos    = new THREE.Vector3(hotspot.position.x, hotspot.position.y, hotspot.position.z);
      const approxNormal = getApproxNormal(hotspot);
      const { bodyMesh } = sceneRefsRef.current;
      const surface = bodyMesh ? findSurfacePoint(bodyMesh, approxPos, approxNormal) : null;
      const state: DecalState = {
        position:  surface ? surface.point  : approxPos,
        normal:    surface ? surface.normal : approxNormal,
        hotspotId: hotspot.id,
        scale:     1.0,
        rotation:  0,
        mirrorX:   false,
        mirrorY:   false,
      };
      _buildMesh(placedId, texture, state);
    });
  }, [sceneRefsRef, _buildMesh]);

  const repositionTattoo = useCallback((id: string, point: THREE.Vector3, normal: THREE.Vector3) => {
    const entry = placedRef.current.get(id);
    if (!entry) return;
    _buildMesh(id, entry.texture, { ...entry.state, position: point.clone(), normal: normal.clone() });
  }, [_buildMesh]);

  const resizeTattoo = useCallback((id: string, scale: number) => {
    const entry = placedRef.current.get(id);
    if (!entry) return;
    _buildMesh(id, entry.texture, { ...entry.state, scale });
  }, [_buildMesh]);

  const rotateTattoo = useCallback((id: string, rotation: number) => {
    const entry = placedRef.current.get(id);
    if (!entry) return;
    _buildMesh(id, entry.texture, { ...entry.state, rotation });
  }, [_buildMesh]);

  const removeTattoo = useCallback((id: string) => {
    const { scene } = sceneRefsRef.current;
    const entry = placedRef.current.get(id);
    if (!entry) return;
    if (scene) scene.remove(entry.mesh);
    entry.mesh.geometry.dispose();
    (entry.mesh.material as THREE.MeshStandardMaterial).dispose();
    entry.texture.dispose();
    placedRef.current.delete(id);
  }, [sceneRefsRef]);

  const removeAllTattoos = useCallback(() => {
    const { scene } = sceneRefsRef.current;
    placedRef.current.forEach((entry) => {
      if (scene) scene.remove(entry.mesh);
      entry.mesh.geometry.dispose();
      (entry.mesh.material as THREE.MeshStandardMaterial).dispose();
      entry.texture.dispose();
    });
    placedRef.current.clear();
  }, [sceneRefsRef]);

  const getTattooMesh = useCallback((id: string) =>
    placedRef.current.get(id)?.mesh ?? null,
    []
  );

  const getTattooNormal = useCallback((id: string) => {
    const entry = placedRef.current.get(id);
    return entry ? entry.state.normal.clone() : null;
  }, []);

  const getAllTattooMeshes = useCallback(() =>
    [...placedRef.current.entries()].map(([id, entry]) => ({ id, mesh: entry.mesh })),
    []
  );

  const mirrorTattoo = useCallback((id: string, mirrorX: boolean, mirrorY: boolean) => {
    const entry = placedRef.current.get(id);
    if (!entry) return;
    _buildMesh(id, entry.texture, { ...entry.state, mirrorX, mirrorY });
  }, [_buildMesh]);

  return {
    applyTattoo,
    removeTattoo,
    removeAllTattoos,
    repositionTattoo,
    resizeTattoo,
    rotateTattoo,
    mirrorTattoo,
    getTattooMesh,
    getTattooNormal,
    getAllTattooMeshes,
  };
}

function _filterDecalByNormal(
  geo: THREE.BufferGeometry,
  targetNormal: THREE.Vector3,
  maxAngleDeg: number,
  center?: THREE.Vector3,
  maxDist?: number,
): THREE.BufferGeometry {
  const cosThreshold = Math.cos((maxAngleDeg * Math.PI) / 180);
  const pos  = geo.attributes.position as THREE.BufferAttribute;
  const norm = geo.attributes.normal   as THREE.BufferAttribute | undefined;
  const uv   = geo.attributes.uv       as THREE.BufferAttribute | undefined;

  const outPos:  number[] = [];
  const outNorm: number[] = [];
  const outUv:   number[] = [];
  const faceN    = new THREE.Vector3();
  const centroid = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 3) {
    if (norm) {
      faceN.set(
        (norm.getX(i) + norm.getX(i + 1) + norm.getX(i + 2)) / 3,
        (norm.getY(i) + norm.getY(i + 1) + norm.getY(i + 2)) / 3,
        (norm.getZ(i) + norm.getZ(i + 1) + norm.getZ(i + 2)) / 3,
      ).normalize();
    } else {
      const ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);
      const bx = pos.getX(i+1), by = pos.getY(i+1), bz = pos.getZ(i+1);
      const cx = pos.getX(i+2), cy = pos.getY(i+2), cz = pos.getZ(i+2);
      faceN.set(
        (ay - cy) * (bz - cz) - (az - cz) * (by - cy),
        (az - cz) * (bx - cx) - (ax - cx) * (bz - cz),
        (ax - cx) * (by - cy) - (ay - cy) * (bx - cx),
      ).normalize();
    }
    if (faceN.dot(targetNormal) < cosThreshold) continue;
    // Drop triangles whose centroid is too far from the decal centre in world space.
    if (center !== undefined && maxDist !== undefined) {
      centroid.set(
        (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3,
        (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3,
        (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3,
      );
      if (centroid.distanceTo(center) > maxDist) continue;
    }
    for (let j = i; j < i + 3; j++) {
      outPos.push(pos.getX(j), pos.getY(j), pos.getZ(j));
      if (norm) outNorm.push(norm.getX(j), norm.getY(j), norm.getZ(j));
      if (uv)   outUv.push(uv.getX(j), uv.getY(j));
    }
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(outPos, 3));
  if (norm) out.setAttribute('normal', new THREE.Float32BufferAttribute(outNorm, 3));
  if (uv)   out.setAttribute('uv',     new THREE.Float32BufferAttribute(outUv, 2));
  geo.dispose();
  return out;
}

function _buildFallbackMesh(mat: THREE.MeshStandardMaterial, state: DecalState, w: number, h: number): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  mesh.position.copy(state.position).addScaledVector(state.normal, 0.025);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), state.normal);
  return mesh;
}
