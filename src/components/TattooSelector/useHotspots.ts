import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import type { SceneRefs, FrameCallback } from './useBodyScene';
import type { TattooHotspot } from './hotspotData';

interface UseHotspotsProps {
  sceneRefsRef: React.RefObject<SceneRefs>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  addFrameCallback: (fn: FrameCallback) => void;
  removeFrameCallback: (fn: FrameCallback) => void;
  onHotspotClick: (hotspot: TattooHotspot) => void;
  onEmptyClick: () => void;
}

export function useHotspots(_props: UseHotspotsProps) {
  // Empty refs kept for type-compatibility with useCameraZoom and TattooSelector.
  // No dots, rings, or labels are added to the scene.
  // Deselection is handled exclusively by the "← All Locations" panel button.
  const dotMeshesRef    = useRef<Map<string, THREE.Mesh>>(new Map());
  const ringMeshesRef   = useRef<Map<string, THREE.Mesh>>(new Map());
  const labelObjectsRef = useRef<Map<string, { visible: boolean }>>(new Map());

  const updateHotspotVisibility = useCallback((_modelId: string) => {}, []);

  return { dotMeshesRef, ringMeshesRef, labelObjectsRef, updateHotspotVisibility };
}
