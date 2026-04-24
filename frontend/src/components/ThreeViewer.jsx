import React, { useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, useGLTF, useAnimations, Environment, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Loader component to show progress
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div className="w-12 h-12 border-4 border-amber-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-mono font-bold text-lg">{progress.toFixed(0)}% loaded</p>
        <p className="text-gray-400 text-xs mt-2">Preparing 3D environment...</p>
      </div>
    </Html>
  );
}

// Model component
function Model({ url }) {
  // useGLTF automatically handles draco compression using a Google CDN decoder
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Play the first animation if available
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0 && actions[actionNames[0]]) {
      actions[actionNames[0]]?.play();
    }
  }, [actions]);

  // Position and scale based on user's vanilla code
  return <primitive object={scene} position={[1, 1, 0]} scale={0.01} />;
}

// Preload the model to avoid pop-in
useGLTF.preload('https://threejs.org/examples/models/gltf/LittlestTokyo.glb');

const ThreeViewer = () => {
  return (
    <div className="w-full h-full bg-[#e2e0e0] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [5, 2, 8], fov: 40 }}
        gl={{ toneMapping: THREE.ACESFilmicToneMapping, antialias: true }}
      >
        <Suspense fallback={<Loader />}>
          {/* Environment and Sky matching vanilla code */}
          <Sky 
            distance={10000} 
            turbidity={0} 
            rayleigh={3} 
            mieDirectionalG={0.7} 
            sunPosition={[-0.8, 0.19, 0.56]} 
          />
          
          {/* We use an Environment map for nice PBR reflections. Preset 'city' is a good proxy if PMREM from Sky is tricky. */}
          <Environment preset="city" />

          {/* Additional lighting just in case to match realistic tones */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[-0.8, 0.19, 0.56]} intensity={1.5} castShadow />

          {/* Model */}
          <Model url="https://threejs.org/examples/models/gltf/LittlestTokyo.glb" />

          {/* Controls */}
          <OrbitControls 
            enableDamping 
            target={[0, 0.7, 0]} 
            makeDefault
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeViewer;
