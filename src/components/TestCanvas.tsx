'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useRef, useState, useEffect } from 'react';
import { easing } from 'maath';

function ResponsiveCube() {
  const meshRef = useRef<Mesh>(null!);
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // normalize to [-1, 1]
      const normX = (e.clientX / innerWidth) * 2 - 1; // -1 left → +1 right
      const normY = (e.clientY / innerHeight) * 2 - 1; // -1 top → +1 bottom

      // invert mapping so cube tilts *towards* cursor
      const tiltStrength = 0.3;
      setTargetRotation({
        x: -normY * tiltStrength, // cursor top → cube tilts top
        y: -normX * tiltStrength, // cursor left → cube tilts left
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // apply easing
  useFrame((_, delta) => {
    if (meshRef.current) {
      easing.damp(meshRef.current.rotation, 'x', targetRotation.x, 0.15, delta);
      easing.damp(meshRef.current.rotation, 'y', targetRotation.y, 0.15, delta);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color='#695aa6' />
    </mesh>
  );
}

export default function FullScreenCube() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', background: '#111' }}
      camera={{ position: [0, 0, 6], fov: 50 }} // face flat to screen
    >
      {/* lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <ResponsiveCube />
    </Canvas>
  );
}
