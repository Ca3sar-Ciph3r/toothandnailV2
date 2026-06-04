'use client';

import {
  useRef, useState, useEffect, useCallback,
  Component, type ReactNode,
} from 'react';
import * as THREE from 'three';
import { useBodyScene } from './useBodyScene';
import { useHotspots } from './useHotspots';
import { useCameraZoom } from './useCameraZoom';
import { useTattooDecal } from './useTattooDecal';
import { TattooSelectorUI } from './TattooSelectorUI';
import { BookingModal } from './BookingModal';
import type { SessionTattoo, SkinToneOption } from './tattooTypes';
import { BODY_MODELS } from './tattooTypes';
import type { TattooHotspot } from './hotspotData';
import { hotspots } from './hotspotData';
import type { PortfolioDesign } from './portfolioData';
import styles from './TattooSelector.module.css';

type ActiveTab = 'location' | 'upload' | 'model';

interface PlacedTattooInfo {
  id: string;
  sessionTattooId: string;
  hotspotId: string;
  scale: number;
  rotation: number;
  mirrorX: boolean;
  mirrorY: boolean;
}

// ── Error boundary ──────────────────────────────────────────────────────────
class TattooErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function NoWebGLFallback() {
  return (
    <div style={{ minHeight: '100dvh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '40px', fontFamily: "'DM Sans', sans-serif" }}>
      <p style={{ color: '#6b6560', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
        Your browser does not support WebGL — please try Chrome, Firefox, or Safari.
      </p>
      <a href="/#book" style={{ color: '#c9a96e', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid rgba(201,169,110,0.3)', padding: '14px 28px', textDecoration: 'none' }}>
        Book a Consultation →
      </a>
    </div>
  );
}

// ── Core component ──────────────────────────────────────────────────────────
function TattooSelectorCore() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const zoomFnRef       = useRef<((h: TattooHotspot) => void) | null>(null);
  const resetFnRef      = useRef<(() => void) | null>(null);
  const isDraggingDecalRef = useRef(false);
  const dragRaycaster   = useRef(new THREE.Raycaster());
  const activeDragIdRef = useRef<string | null>(null);
  const dragNormalRef   = useRef(new THREE.Vector3(0, 0, 1));

  const [selectedHotspot, setSelectedHotspot] = useState<TattooHotspot | null>(null);

  // ── Session tattoos (uploaded designs) ────────────────────────────────
  const [sessionTattoos,   setSessionTattoos]   = useState<SessionTattoo[]>([]);
  const [activeTattooId,   setActiveTattooId]   = useState<string | null>(null);

  // ── Placed tattoos (on the body) ───────────────────────────────────────
  const [placedTattoos,    setPlacedTattoos]    = useState<PlacedTattooInfo[]>([]);
  const [activePlacedId,   setActivePlacedId]   = useState<string | null>(null);

  // ── Other state ────────────────────────────────────────────────────────
  const [activeSkinToneId, setActiveSkinToneId] = useState('none');
  const [activeModelId,    setActiveModelId]    = useState('female-full');
  const [activeTab,        setActiveTab]        = useState<ActiveTab>('location');

  // ── Export / booking ───────────────────────────────────────────────────
  const [isBookingOpen,  setIsBookingOpen]  = useState(false);
  const [capturedImage,  setCapturedImage]  = useState<string | null>(null);
  const [placementNotes, setPlacementNotes] = useState('');

  // Refs to avoid stale closures in async/DOM callbacks
  const activeTattooIdRef  = useRef<string | null>(null);
  const sessionTattoosRef  = useRef<SessionTattoo[]>([]);
  const placedTattoosRef   = useRef<PlacedTattooInfo[]>([]);
  const activePlacedIdRef  = useRef<string | null>(null);
  const isMovingDecalRef   = useRef(false);

  useEffect(() => { activeTattooIdRef.current  = activeTattooId;  }, [activeTattooId]);
  useEffect(() => { sessionTattoosRef.current  = sessionTattoos;  }, [sessionTattoos]);
  useEffect(() => { placedTattoosRef.current   = placedTattoos;   }, [placedTattoos]);
  useEffect(() => { activePlacedIdRef.current  = activePlacedId;  }, [activePlacedId]);

  // ── Scene ──────────────────────────────────────────────────────────────
  const {
    refs: sceneRefs, isLoading, loadProgress,
    addFrameCallback, removeFrameCallback,
    loadModel, applyCameraConfig,
  } = useBodyScene(containerRef);

  // ── Hotspot interaction gate ───────────────────────────────────────────
  const handleHotspotClick = useCallback((hotspot: TattooHotspot) => {
    if (isMovingDecalRef.current) return;
    zoomFnRef.current?.(hotspot);
  }, []);

  const handleEmptyClick = useCallback(() => {
    if (isMovingDecalRef.current) return;
    resetFnRef.current?.();
  }, []);

  // ── Hotspots ───────────────────────────────────────────────────────────
  const { dotMeshesRef, ringMeshesRef, labelObjectsRef, updateHotspotVisibility } = useHotspots({
    sceneRefsRef: sceneRefs, containerRef,
    addFrameCallback, removeFrameCallback,
    onHotspotClick: handleHotspotClick,
    onEmptyClick:   handleEmptyClick,
  });

  // ── Camera zoom ────────────────────────────────────────────────────────
  const { zoomToHotspot, resetCamera, zoomToGroup } = useCameraZoom({ sceneRefsRef: sceneRefs, dotMeshesRef });
  useEffect(() => {
    zoomFnRef.current  = zoomToHotspot;
    resetFnRef.current = resetCamera;
  }, [zoomToHotspot, resetCamera]);

  // ── Tattoo decals ──────────────────────────────────────────────────────
  const {
    applyTattoo, removeTattoo, removeAllTattoos,
    repositionTattoo, resizeTattoo, rotateTattoo, mirrorTattoo,
    getTattooNormal, getAllTattooMeshes,
  } = useTattooDecal({ sceneRefsRef: sceneRefs });

  // Helper to place a new tattoo or replace one at the same hotspot
  const _placeAtHotspot = useCallback((hotspot: TattooHotspot, dataUrl: string, sessionTattooId: string) => {
    const existing = placedTattoosRef.current.find(p => p.hotspotId === hotspot.id);
    if (existing) {
      // Replace design at this hotspot, keeping id
      applyTattoo(hotspot, dataUrl, existing.id);
      setPlacedTattoos(prev =>
        prev.map(p => p.id === existing.id
          ? { ...p, sessionTattooId, scale: 1.0, rotation: 0 }
          : p
        )
      );
      setActivePlacedId(existing.id);
      activePlacedIdRef.current = existing.id;
    } else {
      // Add new placed tattoo
      const newId = `placed-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
      applyTattoo(hotspot, dataUrl, newId);
      setPlacedTattoos(prev => [...prev, { id: newId, sessionTattooId, hotspotId: hotspot.id, scale: 1.0, rotation: 0, mirrorX: false, mirrorY: false }]);
      setActivePlacedId(newId);
      activePlacedIdRef.current = newId;
    }
  }, [applyTattoo]);

  // Auto-apply active design when user navigates to a hotspot
  useEffect(() => {
    if (!selectedHotspot) return;
    const tattooId = activeTattooIdRef.current;
    if (!tattooId) return;
    const tattoo = sessionTattoosRef.current.find(t => t.id === tattooId);
    if (!tattoo) return;
    _placeAtHotspot(selectedHotspot, tattoo.dataUrl, tattooId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotspot]);

  // ── Multi-tattoo drag ──────────────────────────────────────────────────
  useEffect(() => {
    if (placedTattoos.length === 0) return;
    const canvas = sceneRefs.current.renderer?.domElement;
    if (!canvas) return;

    const onPointerDown = (e: PointerEvent) => {
      const allMeshes = getAllTattooMeshes();
      const { camera } = sceneRefs.current;
      if (!camera || allMeshes.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      dragRaycaster.current.setFromCamera(new THREE.Vector2(x, y), camera);
      for (const { id, mesh } of allMeshes) {
        const hits = dragRaycaster.current.intersectObject(mesh, false);
        if (hits.length > 0) {
          e.stopImmediatePropagation();
          isDraggingDecalRef.current = true;
          isMovingDecalRef.current   = true;
          activeDragIdRef.current    = id;
          // Seed the drag normal from the tattoo's current surface normal
          const n = getTattooNormal(id);
          if (n) dragNormalRef.current.copy(n);
          // Sync state so controls reflect this tattoo
          setActivePlacedId(id);
          activePlacedIdRef.current  = id;
          canvas.setPointerCapture(e.pointerId);
          const controls = sceneRefs.current.controls;
          if (controls) controls.enabled = false;
          break;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDraggingDecalRef.current) return;
      isDraggingDecalRef.current = false;
      isMovingDecalRef.current   = false;
      activeDragIdRef.current    = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      const controls = sceneRefs.current.controls;
      if (controls) controls.enabled = true;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingDecalRef.current) return;
      const dragId = activeDragIdRef.current;
      if (!dragId) return;
      const { camera, bodyMesh } = sceneRefs.current;
      if (!camera || !bodyMesh) return;
      const rect = canvas.getBoundingClientRect();
      const x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      dragRaycaster.current.setFromCamera(new THREE.Vector2(x, y), camera);
      const hits = dragRaycaster.current.intersectObject(bodyMesh, false);
      if (hits.length > 0) {
        // Pick the hit whose surface normal best matches the tattoo's current
        // normal — prevents jumping to the opposite leg / a nearby body part
        let bestHit = hits[0];
        let bestDot = -Infinity;
        for (const hit of hits) {
          if (!hit.face) continue;
          const hn = hit.face.normal.clone().transformDirection(bodyMesh.matrixWorld).normalize();
          const dot = hn.dot(dragNormalRef.current);
          if (dot > bestDot) { bestDot = dot; bestHit = hit; }
        }
        if (bestHit.face) {
          const n = bestHit.face.normal.clone().transformDirection(bodyMesh.matrixWorld).normalize();
          dragNormalRef.current.copy(n); // keep it current as we slide around
          repositionTattoo(dragId, bestHit.point, n);
        }
      }
    };

    canvas.addEventListener('pointerdown',   onPointerDown, { capture: true });
    canvas.addEventListener('pointerup',     onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointermove',   onPointerMove);
    return () => {
      canvas.removeEventListener('pointerdown',   onPointerDown, { capture: true });
      canvas.removeEventListener('pointerup',     onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointermove',   onPointerMove);
      isDraggingDecalRef.current = false;
      isMovingDecalRef.current   = false;
      const controls = sceneRefs.current.controls;
      if (controls) controls.enabled = true;
    };
  }, [placedTattoos.length, sceneRefs, getAllTattooMeshes, getTattooNormal, repositionTattoo]);

  // ── Model switch ───────────────────────────────────────────────────────
  const handleModelChange = useCallback((modelId: string) => {
    const modelDef = BODY_MODELS.find(m => m.id === modelId);
    if (!modelDef || modelDef.locked) return;

    // Clear all tattoos — they live on the old mesh
    removeAllTattoos();
    setPlacedTattoos([]);
    setActivePlacedId(null);
    activePlacedIdRef.current = null;
    setSelectedHotspot(null);

    setActiveModelId(modelId);

    // Load the new GLB and update camera once done
    loadModel(modelDef.config.modelPath, () => {
      applyCameraConfig({
        position:    modelDef.config.cameraPosition,
        lookAt:      modelDef.config.cameraLookAt,
        enableZoom:  modelDef.config.enableZoom,
        minDistance: modelDef.config.minDistance,
        maxDistance: modelDef.config.maxDistance,
        polarLimits: modelDef.config.polarLimits,
      });
    });

    // Show/hide hotspot dots for this model
    updateHotspotVisibility(modelId);
  }, [removeAllTattoos, loadModel, applyCameraConfig, updateHotspotVisibility]);

  // ── Skin tone ──────────────────────────────────────────────────────────
  const handleSkinTone = useCallback((tone: SkinToneOption) => {
    setActiveSkinToneId(tone.id);
    const mesh = sceneRefs.current.bodyMesh;
    if (mesh) {
      (mesh.material as THREE.MeshStandardMaterial).color.set(tone.color ?? '#c9b99a');
    }
  }, [sceneRefs]);

  // ── Gallery handlers ───────────────────────────────────────────────────
  const handleTattooUpload = useCallback((dataUrl: string) => {
    const id = `tattoo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const tattoo: SessionTattoo = { id, dataUrl };
    setSessionTattoos(prev => [...prev, tattoo]);
    setActiveTattooId(id);
    const hs = selectedHotspot;
    if (hs) _placeAtHotspot(hs, dataUrl, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotspot, _placeAtHotspot]);

  const handleSelectTattoo = useCallback((tattoo: SessionTattoo) => {
    setActiveTattooId(tattoo.id);
    const hs = selectedHotspot;
    if (hs) _placeAtHotspot(hs, tattoo.dataUrl, tattoo.id);
  }, [selectedHotspot, _placeAtHotspot]);

  const handleTattooRemove = useCallback(() => {
    const id = activePlacedIdRef.current;
    if (!id) return;
    removeTattoo(id);
    setPlacedTattoos(prev => {
      const next = prev.filter(p => p.id !== id);
      const newActive = next.length > 0 ? next[next.length - 1].id : null;
      setActivePlacedId(newActive);
      activePlacedIdRef.current = newActive;
      return next;
    });
  }, [removeTattoo]);

  const handleRemoveAll = useCallback(() => {
    removeAllTattoos();
    setPlacedTattoos([]);
    setActivePlacedId(null);
    activePlacedIdRef.current = null;
  }, [removeAllTattoos]);

  const handleTattooScale = useCallback((scale: number) => {
    const id = activePlacedIdRef.current;
    if (!id) return;
    resizeTattoo(id, scale);
    setPlacedTattoos(prev => prev.map(p => p.id === id ? { ...p, scale } : p));
  }, [resizeTattoo]);

  const handleTattooRotation = useCallback((deg: number) => {
    const id = activePlacedIdRef.current;
    if (!id) return;
    rotateTattoo(id, (deg * Math.PI) / 180);
    setPlacedTattoos(prev => prev.map(p => p.id === id ? { ...p, rotation: deg } : p));
  }, [rotateTattoo]);

  const handleMirrorX = useCallback((value: boolean) => {
    const id = activePlacedIdRef.current;
    if (!id) return;
    const entry = placedTattoosRef.current.find(p => p.id === id);
    if (!entry) return;
    mirrorTattoo(id, value, entry.mirrorY);
    setPlacedTattoos(prev => prev.map(p => p.id === id ? { ...p, mirrorX: value } : p));
  }, [mirrorTattoo]);

  const handleMirrorY = useCallback((value: boolean) => {
    const id = activePlacedIdRef.current;
    if (!id) return;
    const entry = placedTattoosRef.current.find(p => p.id === id);
    if (!entry) return;
    mirrorTattoo(id, entry.mirrorX, value);
    setPlacedTattoos(prev => prev.map(p => p.id === id ? { ...p, mirrorY: value } : p));
  }, [mirrorTattoo]);

  // ── Portfolio selection ────────────────────────────────────────────────
  const handlePortfolioSelect = useCallback((design: PortfolioDesign) => {
    const existing = sessionTattoosRef.current.find(t => t.id === design.id);
    if (existing) {
      setActiveTattooId(existing.id);
      if (selectedHotspot) _placeAtHotspot(selectedHotspot, existing.dataUrl, existing.id);
    } else {
      const tattoo: SessionTattoo = { id: design.id, dataUrl: design.dataUrl };
      setSessionTattoos(prev => [...prev, tattoo]);
      setActiveTattooId(design.id);
      if (selectedHotspot) _placeAtHotspot(selectedHotspot, design.dataUrl, design.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotspot, _placeAtHotspot]);

  // ── Capture / export ───────────────────────────────────────────────────
  const captureScene = useCallback((): string | null => {
    const { renderer, scene, camera } = sceneRefs.current;
    if (!renderer || !scene || !camera) return null;
    renderer.render(scene, camera);
    try { return renderer.domElement.toDataURL('image/png'); } catch { return null; }
  }, [sceneRefs]);

  const handleSavePlacement = useCallback(() => {
    const url = captureScene();
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `tooth-and-nail-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  }, [captureScene]);

  const handleOpenBooking = useCallback(() => {
    const url = captureScene();
    setCapturedImage(url);
    setIsBookingOpen(true);
  }, [captureScene]);

  // ── Custom events from camera hook ─────────────────────────────────────
  useEffect(() => {
    const onSelected = (e: Event) => {
      setSelectedHotspot((e as CustomEvent<TattooHotspot>).detail);
      setActiveTab('location');
    };
    const onCleared = () => setSelectedHotspot(null);
    window.addEventListener('hotspot:selected', onSelected);
    window.addEventListener('hotspot:cleared',  onCleared);
    return () => {
      window.removeEventListener('hotspot:selected', onSelected);
      window.removeEventListener('hotspot:cleared',  onCleared);
    };
  }, []);

  // ── Navigation hotspot: switch to detail model ─────────────────────────
  useEffect(() => {
    const onNavigate = (e: Event) => {
      handleModelChange((e as CustomEvent<string>).detail);
    };
    window.addEventListener('hotspot:navigate', onNavigate);
    return () => window.removeEventListener('hotspot:navigate', onNavigate);
  }, [handleModelChange]);

  // ── Loading overlay ────────────────────────────────────────────────────
  const [loadingHidden, setLoadingHidden] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setLoadingHidden(true), 700);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  // Derive values for active placed tattoo
  const activePlaced     = placedTattoos.find(p => p.id === activePlacedId) ?? null;
  const tattooScale      = activePlaced?.scale    ?? 1.0;
  const tattooRotation   = activePlaced?.rotation ?? 0;
  const tattooMirrorX    = activePlaced?.mirrorX  ?? false;
  const tattooMirrorY    = activePlaced?.mirrorY  ?? false;
  const hasTattoo        = activePlacedId !== null;
  const placedHotspotIds = placedTattoos.map(p => p.hotspotId);
  const placedSummary    = placedTattoos.map(p => ({
    hotspotLabel: hotspots.find(h => h.id === p.hotspotId)?.label ?? p.hotspotId,
  }));

  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.canvasContainer}
        tabIndex={0}
        role="application"
        aria-label="Interactive tattoo placement selector"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.7s ease' }}
      />

      {!loadingHidden && (
        <div className={`${styles.loadingOverlay} ${!isLoading ? styles.hidden : ''}`}>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarFill} style={{ width: `${loadProgress}%` }} />
          </div>
          <p className={styles.loadingText}>
            Loading your canvas
            <span className={styles.loadingDot}>.</span>
            <span className={styles.loadingDot}>.</span>
            <span className={styles.loadingDot}>.</span>
          </p>
        </div>
      )}

      <TattooSelectorUI
        selectedHotspot={selectedHotspot}
        onReset={resetCamera}
        onGroupSelect={zoomToGroup}
        onHotspotSelect={zoomToHotspot}
        hasTattoo={hasTattoo}
        tattooScale={tattooScale}
        tattooRotation={tattooRotation}
        onTattooScale={handleTattooScale}
        onTattooRotation={handleTattooRotation}
        tattooMirrorX={tattooMirrorX}
        tattooMirrorY={tattooMirrorY}
        onMirrorX={handleMirrorX}
        onMirrorY={handleMirrorY}
        onTattooRemove={handleTattooRemove}
        onRemoveAll={handleRemoveAll}
        activePlacedHotspotId={activePlaced?.hotspotId ?? null}
        placedHotspotIds={placedHotspotIds}
        sessionTattoos={sessionTattoos}
        activeTattooId={activeTattooId}
        onSelectTattoo={handleSelectTattoo}
        onPortfolioSelect={handlePortfolioSelect}
        onUpload={handleTattooUpload}
        activeSkinToneId={activeSkinToneId}
        onSkinToneChange={handleSkinTone}
        activeModelId={activeModelId}
        onModelChange={handleModelChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        placementNotes={placementNotes}
        onNotesChange={setPlacementNotes}
        onSavePlacement={handleSavePlacement}
        onSendToStudio={handleOpenBooking}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        capturedImage={capturedImage}
        placedSummary={placedSummary}
        notes={placementNotes}
        onNotesChange={setPlacementNotes}
      />
    </div>
  );
}

export default function TattooSelector() {
  return (
    <TattooErrorBoundary fallback={<NoWebGLFallback />}>
      <TattooSelectorCore />
    </TattooErrorBoundary>
  );
}
