import { useCallback, useRef } from 'react';
import gsap from 'gsap';
import {
  type TattooHotspot,
  INITIAL_CAMERA_POSITION,
  INITIAL_CAMERA_LOOK_AT,
} from './hotspotData';
import type { SceneRefs } from './useBodyScene';

interface UseCameraZoomProps {
  sceneRefsRef: React.MutableRefObject<SceneRefs>;
  dotMeshesRef?: unknown;
}

export function useCameraZoom({ sceneRefsRef }: UseCameraZoomProps) {
  const isZoomedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const zoomToHotspot = useCallback(
    (hotspot: TattooHotspot) => {
      const { camera, controls } = sceneRefsRef.current;
      if (!camera || !controls) return;

      isZoomedRef.current = true;
      controls.enabled = false;
      controls.autoRotate = false;

      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(
            new CustomEvent('hotspot:selected', { detail: hotspot })
          );
        },
      });

      tl.to(
        camera.position,
        {
          x: hotspot.cameraTarget.x,
          y: hotspot.cameraTarget.y,
          z: hotspot.cameraTarget.z,
          duration: 1.2,
          ease: 'power3.inOut',
        },
        0
      );

      tl.to(
        controls.target,
        {
          x: hotspot.cameraLookAt.x,
          y: hotspot.cameraLookAt.y,
          z: hotspot.cameraLookAt.z,
          duration: 1.2,
          ease: 'power3.inOut',
          onUpdate: () => controls.update(),
        },
        0
      );
    },
    [sceneRefsRef]
  );

  const resetCamera = useCallback(() => {
    const { camera, controls } = sceneRefsRef.current;
    if (!camera || !controls) return;

    const tl = gsap.timeline({
      onComplete: () => {
        isZoomedRef.current = false;
        controls.enabled = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          controls.autoRotate = true;
        }, 2000);
        window.dispatchEvent(new CustomEvent('hotspot:cleared'));
      },
    });

    tl.to(
      camera.position,
      {
        x: INITIAL_CAMERA_POSITION.x,
        y: INITIAL_CAMERA_POSITION.y,
        z: INITIAL_CAMERA_POSITION.z,
        duration: 1.0,
        ease: 'power2.inOut',
      },
      0
    );

    tl.to(
      controls.target,
      {
        x: INITIAL_CAMERA_LOOK_AT.x,
        y: INITIAL_CAMERA_LOOK_AT.y,
        z: INITIAL_CAMERA_LOOK_AT.z,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: () => controls.update(),
      },
      0
    );
  }, [sceneRefsRef]);

  const zoomToGroup = useCallback(
    (
      cameraPosition: { x: number; y: number; z: number },
      cameraLookAt: { x: number; y: number; z: number }
    ) => {
      const { camera, controls } = sceneRefsRef.current;
      if (!camera || !controls) return;

      controls.autoRotate = false;

      const tl = gsap.timeline();

      tl.to(
        camera.position,
        { x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z, duration: 1.0, ease: 'power2.inOut' },
        0
      );

      tl.to(
        controls.target,
        {
          x: cameraLookAt.x,
          y: cameraLookAt.y,
          z: cameraLookAt.z,
          duration: 1.0,
          ease: 'power2.inOut',
          onUpdate: () => controls.update(),
        },
        0
      );
    },
    [sceneRefsRef]
  );

  return { zoomToHotspot, resetCamera, zoomToGroup };
}
