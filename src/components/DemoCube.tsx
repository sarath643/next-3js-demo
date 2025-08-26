'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function SpinningCube() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}

export default function DemoCube() {
  return (
    <div className='w-full h-[400px] bg-black rounded-lg shadow-lg'>
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
        <SpinningCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
