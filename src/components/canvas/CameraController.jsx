'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial camera: wide shot, looking at center of body
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // ── Section 1: Hero ──
    // Camera starts zoomed out, showing the full silhouette
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
    tl1.to(camera.position, { z: 7, y: 1, x: 0, duration: 1 });

    // ── Section 2: Ethos ──
    // Camera pans right to give space for the text content on the left
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '#ethos',
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
    tl2.to(camera.position, { x: 3, y: 0.5, z: 6, duration: 1 });

    // ── Section 3: Anatomy Matrix ──
    // Camera zooms into a cinematic close-up on the torso
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '#matrix',
        start: 'top 80%',
        end: 'center center',
        scrub: 1.5,
      }
    });
    tl3.to(camera.position, { x: -1, y: 1, z: 4, duration: 1 });

    // ── Section 4: Artist Roster ──
    // Camera pulls back and shifts low, model fades into shadow
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: '#roster',
        start: 'top 80%',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
    tl4.to(camera.position, { x: 2, y: -1, z: 10, duration: 1 });

    // ── Section 5: Footer ──
    // Camera drifts far away, model becomes a distant silhouette
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });
    tl5.to(camera.position, { x: 0, y: 3, z: 14, duration: 1 });

    return () => {
      tl1.kill();
      tl2.kill();
      tl3.kill();
      tl4.kill();
      tl5.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera]);

  return null;
}
