import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type FrameCallback = (delta: number) => void;

export interface SceneRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  cssRenderer: CSS2DRenderer | null;
  controls: OrbitControls | null;
  bodyMesh: THREE.Mesh | null;
}

export interface CameraConfig {
  position: { x: number; y: number; z: number };
  lookAt:   { x: number; y: number; z: number };
  enableZoom: boolean;
  minDistance: number;
  maxDistance: number;
  polarLimits?: [number, number];
}

export interface BodySceneResult {
  refs: React.RefObject<SceneRefs>;
  isLoading: boolean;
  loadProgress: number;
  addFrameCallback: (fn: FrameCallback) => void;
  removeFrameCallback: (fn: FrameCallback) => void;
  loadModel: (path: string, onDone?: () => void) => void;
  applyCameraConfig: (config: CameraConfig) => void;
}

function disposeObject(obj: THREE.Object3D) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((m: THREE.Material) => m.dispose());
    } else {
      (mesh.material as THREE.Material)?.dispose();
    }
  });
}

export function useBodyScene(
  containerRef: React.RefObject<HTMLDivElement | null>
): BodySceneResult {
  const refs = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    cssRenderer: null,
    controls: null,
    bodyMesh: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameCallbacks = useRef<Set<FrameCallback>>(new Set());
  const rafIdRef = useRef<number>(0);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<THREE.Timer | null>(null);
  const currentModelRef = useRef<THREE.Object3D | null>(null);

  const addFrameCallback = useCallback((fn: FrameCallback) => {
    frameCallbacks.current.add(fn);
  }, []);

  const removeFrameCallback = useCallback((fn: FrameCallback) => {
    frameCallbacks.current.delete(fn);
  }, []);

  // ── Reusable model loader ─────────────────────────────────────────────────
  const loadModel = useCallback((path: string, onDone?: () => void) => {
    const { scene } = refs.current;
    if (!scene) return;

    setIsLoading(true);
    setLoadProgress(0);

    // Remove and dispose previous model
    if (currentModelRef.current) {
      scene.remove(currentModelRef.current);
      disposeObject(currentModelRef.current);
      currentModelRef.current = null;
      refs.current.bodyMesh = null;
    }

    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color('#c9b99a'),
              roughness: 0.78,
              metalness: 0.0,
            });
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (!refs.current.bodyMesh) refs.current.bodyMesh = mesh;
          }
        });
        // Detect Z-up models (Blender default export without Y-up correction):
        // if the Z extent is much larger than Y, the model is standing along Z.
        const rawBox  = new THREE.Box3().setFromObject(model);
        const rawSize = rawBox.getSize(new THREE.Vector3());
        if (rawSize.z / Math.max(rawSize.y, 0.001) > 2.0) {
          // Rotate so Z becomes world-Y (upright) and front (+Y in model) faces +Z camera.
          model.rotation.set(-Math.PI / 2, Math.PI, 0);
          model.updateWorldMatrix(true, true);
        }

        // Centre at origin; scale so total height = 2.0 units
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 2.0 / size.y;
        model.scale.setScalar(scale);
        model.position.sub(center.clone().multiplyScalar(scale));
        scene.add(model);
        currentModelRef.current = model;
        setLoadProgress(100);
        setIsLoading(false);
        onDone?.();
      },
      (event) => {
        if (event.total > 0) {
          setLoadProgress(Math.round((event.loaded / event.total) * 95));
        }
      },
      (err) => {
        console.error(`[TattooSelector] Failed to load ${path}:`, err);
        setLoadProgress(100);
        setIsLoading(false);
      }
    );
  }, []);

  // ── Camera / controls configurator ───────────────────────────────────────
  const applyCameraConfig = useCallback((config: CameraConfig) => {
    const { camera, controls } = refs.current;
    if (!camera || !controls) return;

    camera.position.set(config.position.x, config.position.y, config.position.z);
    controls.target.set(config.lookAt.x, config.lookAt.y, config.lookAt.z);
    controls.enableZoom = config.enableZoom;
    controls.minDistance = config.minDistance;
    controls.maxDistance = config.maxDistance;
    controls.minPolarAngle = config.polarLimits?.[0] ?? Math.PI * 0.25;
    controls.maxPolarAngle = config.polarLimits?.[1] ?? Math.PI * 0.75;
    controls.autoRotate = true;
    controls.update();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene ──
    const scene = new THREE.Scene();
    refs.current.scene = scene;

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 3.5);
    camera.lookAt(0, 0.0, 0);
    refs.current.camera = camera;

    // ── WebGL Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    refs.current.renderer = renderer;

    // ── CSS2D Renderer (for HTML hotspot labels) ──
    const cssRenderer = new CSS2DRenderer();
    cssRenderer.setSize(container.clientWidth, container.clientHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.left = '0';
    cssRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(cssRenderer.domElement);
    refs.current.cssRenderer = cssRenderer;

    // ── OrbitControls ──
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.target.set(0, 0.0, 0);
    controls.update();
    refs.current.controls = controls;

    // Pause auto-rotate on user interaction, resume after 4s
    const pauseAutoRotate = () => {
      controls.autoRotate = false;
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = setTimeout(() => {
        controls.autoRotate = true;
      }, 4000);
    };
    renderer.domElement.addEventListener('pointerdown', pauseAutoRotate);

    // ── Lighting ──
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.8);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc0d8ff, 0.8);
    rimLight.position.set(-2, 2, -3);
    scene.add(rimLight);

    const underLight = new THREE.PointLight(0xff6b35, 0.3);
    underLight.position.set(0, -1, 1);
    scene.add(underLight);

    // ── Floor shadow receiver ──
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.0;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Load initial body model ──
    const timer = new THREE.Timer();
    timer.connect(document);
    timerRef.current = timer;
    loadModel('/models/female_body_base.glb');

    // ── Animation loop ──
    const animate = (timestamp?: number) => {
      rafIdRef.current = requestAnimationFrame(animate);
      timer.update(timestamp);
      const delta = timer.getDelta();
      controls.update();
      frameCallbacks.current.forEach((fn) => fn(delta));
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };
    animate();

    // ── Responsive resize ──
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      cssRenderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', pauseAutoRotate);
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      cancelAnimationFrame(rafIdRef.current);
      timerRef.current?.dispose();
      timerRef.current = null;
      controls.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      if (container.contains(cssRenderer.domElement)) container.removeChild(cssRenderer.domElement);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => (m as THREE.Material).dispose());
          } else {
            (mesh.material as THREE.Material)?.dispose();
          }
        }
      });
      renderer.dispose();
      refs.current = { scene: null, camera: null, renderer: null, cssRenderer: null, controls: null, bodyMesh: null };
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { refs, isLoading, loadProgress, addFrameCallback, removeFrameCallback, loadModel, applyCameraConfig };
}
