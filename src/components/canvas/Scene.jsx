'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import AnatomyModel from './AnatomyModel';
import CameraController from './CameraController';

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#020202]">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        
        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.1} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={3} 
          color="#ffffff" 
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={2} 
          color="#2255ff" /* Premium cool blue fill */
        />
        <spotLight 
          position={[0, 10, -10]} 
          intensity={10} 
          color="#ff0033" /* Aggressive red rim light for brutalist vibe */
          angle={0.6} 
          penumbra={1} 
        />
        
        <Environment preset="studio" />

        <CameraController />
        
        <group position={[0, -1, 0]}>
          <AnatomyModel />
          {/* Ground shadow for realism */}
          <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.8} far={10} color="#000000" />
        </group>

        {/* High-end Post Processing */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
