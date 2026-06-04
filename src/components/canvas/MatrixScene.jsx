'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import AnatomyModel from './AnatomyModel';

export default function MatrixScene() {
  return (
    <Canvas
      shadows
      /* Camera positioned for an upper-body close-up view */
      camera={{ position: [0, 1.5, 4.5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Studio lighting — same character as the original global scene */}
      <ambientLight intensity={0.08} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={3}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={2}
        color="#2255ff"
      />
      <spotLight
        position={[0, 10, -10]}
        intensity={10}
        color="#ff0033"
        angle={0.6}
        penumbra={1}
      />

      <Environment preset="studio" />

      {/* Model group — offset down so upper-body fills the frame */}
      <group position={[0, -1, 0]}>
        <AnatomyModel />
        <ContactShadows
          resolution={512}
          scale={5}
          blur={2}
          opacity={0.5}
          far={8}
          color="#000000"
        />
      </group>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.5} />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.15} darkness={1.4} />
      </EffectComposer>
    </Canvas>
  );
}
