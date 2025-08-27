'use client';

import { useRef, ReactNode, useMemo, useEffect } from 'react';
import type { JSX } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
} from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { state } from '@/lib/store';
import * as THREE from 'three';

interface ShirtCanvasProps {
  position?: [number, number, number];
  fov?: number;
}

export const ShirtCanvas: React.FC<ShirtCanvasProps> = ({ position = [0, 0, 2.5], fov = 25 }) => {
  return (
    <Canvas
      shadows
      camera={{ position, fov }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ opacity: 0, animation: 'fade-in 1s ease 0.3s forwards' }}>
      <ambientLight intensity={0.5 * Math.PI} />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

function Backdrop() {
  const shadows = useRef<any>(null);

  useFrame((_, delta) => {
    if (shadows.current) {
      easing.dampC(
        (shadows.current.getMesh().material as THREE.MeshStandardMaterial).color,
        new THREE.Color('#ffffff'),
        0.1,
        0.25,
        delta
      );
    }
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55 * Math.PI}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25 * Math.PI}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

interface CameraRigProps {
  children: ReactNode;
}

function CameraRig({ children }: CameraRigProps): JSX.Element {
  const group = useRef<THREE.Group>(null!);
  const snap = useSnapshot(state);
  const { viewport } = useThree();

  // Store target rotation
  const targetRotation = useRef({ x: 0, y: 0 });

  // Setup global mouse listener once
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // normalize to [-1, 1]
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;

      // invert mapping so shirt tilts *towards* cursor
      const tiltStrength = 0.2;
      targetRotation.current = {
        x: -normY * tiltStrength,
        y: normX * tiltStrength,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Smooth camera movement (intro animation)
    easing.damp3(state.camera.position, [snap.intro ? -viewport.width / 4 : 0, 0, 2], 0.25, delta);

    // Apply shirt tilt towards cursor
    if (group.current) {
      easing.dampE(
        group.current.rotation,
        [targetRotation.current.x, targetRotation.current.y, 0],
        0.15,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
}

function Shirt(props: JSX.IntrinsicElements['mesh']) {
  const snap = useSnapshot(state);
  const texture = useTexture(`/${snap.decal}.png`);
  const { nodes, materials } = useGLTF('/models/shirt_baked_collapsed.glb') as any;

  // Smooth color transition
  useFrame((_, delta) => {
    easing.dampC(materials.lambert1.color as THREE.Color, snap.color, 0.25, delta);
  });

  // Scale decal according to aspect ratio
  const decalScale = useMemo<[number, number, number]>(() => {
    if (!texture.image) return [0.15, 0.15, 0.15];
    const width = texture.image.width;
    const height = texture.image.height;
    const aspect = width / height;

    return aspect > 1
      ? [0.13 * aspect, 0.15, 0.15] // wide image
      : [0.15, 0.15 / aspect, 0.15]; // tall image
  }, [texture]);

  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={decalScale} map={texture} />
    </mesh>
  );
}

// Preload assets
useGLTF.preload('/shirt_baked_collapsed.glb');
['/nike1.png', '/adidas1.png', '/pmndrs.png'].forEach(useTexture.preload);
