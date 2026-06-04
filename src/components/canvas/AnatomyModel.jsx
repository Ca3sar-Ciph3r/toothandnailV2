'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function AnatomyModel() {
  const groupRef = useRef();
  const [hoveredPart, setHoveredPart] = useState(null);

  // Load the downloaded realistic human base mesh
  // Note: Depending on the mesh's origin scale, the scale={...} prop below may need adjustment.
  const { scene } = useGLTF('/models/human_base.glb');

  useCursor(hoveredPart !== null);

  // Apply premium Obsidian Resin materials to the loaded model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: '#0a0a0a',
            roughness: 0.15,
            metalness: 0.9,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            emissive: '#000000',
            emissiveIntensity: 0
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Smooth rotation and Dynamic Hover Emission
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    
    // Animate the "Pain Index" emissive glow on the specifically hovered sub-mesh
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Glow only the intersected body part
          if (hoveredPart === child.name || (hoveredPart && child.name.includes(hoveredPart))) {
            child.material.emissive.lerp(new THREE.Color('#ff0022'), 0.1);
            child.material.emissiveIntensity = THREE.MathUtils.lerp(child.material.emissiveIntensity, 2.5, 0.1);
          } else {
            child.material.emissive.lerp(new THREE.Color('#000000'), 0.1);
            child.material.emissiveIntensity = THREE.MathUtils.lerp(child.material.emissiveIntensity, 0, 0.1);
          }
        }
      });
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    // e.object is the specific sub-mesh (e.g., 'LeftArm', 'Chest') of the realistic GLTF
    setHoveredPart(e.object.name || 'Body');
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredPart(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    // Clean up the name for the UI (e.g. "Mesh_01" -> "Zone Mesh_01")
    const partName = e.object.name ? e.object.name.replace(/_/g, ' ') : 'Body Zone';
    console.log(`Selected anatomical zone: ${partName}`);
    
    // Dispatch global event for the funnel to slide open
    window.dispatchEvent(new CustomEvent('OPEN_FUNNEL', { detail: { zone: partName } }));
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={2.5}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <primitive 
          object={scene} 
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        />
      </Float>
    </group>
  );
}

// Preload the model so it doesn't block the initial render unnecessarily
useGLTF.preload('/models/human_base.glb');
