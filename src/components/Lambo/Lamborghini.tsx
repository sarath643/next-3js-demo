'use client';

import * as THREE from 'three';
import { useMemo } from 'react';
import { applyProps, ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

type LamborghiniProps = {
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  [key: string]: any;
};

export function Lamborghini(props: LamborghiniProps) {
  const { scene, nodes, materials } = useGLTF('/models/lambo.glb');

  useMemo(() => {
    // Fix meshes and materials
    Object.values(nodes).forEach((node) => {
      if ((node as THREE.Mesh).isMesh) {
        if (node.name.startsWith('glass')) {
          (node as THREE.Mesh).geometry.computeVertexNormals();
        }
        if (node.name === 'silver_001_BreakDiscs_0') {
          (node as THREE.Mesh).material = applyProps(materials.BreakDiscs.clone(), {
            color: '#ddd',
          });
        }
      }
    });

    // Windows scale
    nodes['glass_003'].scale.setScalar(2.7);

    // Material adjustments
    applyProps(materials.FrameBlack, {
      metalness: 0.75,
      roughness: 0,
      color: 'black',
    });
    applyProps(materials.Chrome, {
      metalness: 1,
      roughness: 0,
      color: '#333',
    });
    applyProps(materials.BreakDiscs, {
      metalness: 0.2,
      roughness: 0.2,
      color: '#555',
    });
    applyProps(materials.TiresGum, {
      metalness: 0,
      roughness: 0.4,
      color: '#181818',
    });
    applyProps(materials.GreyElements, { metalness: 0, color: '#292929' });

    // LED light emission
    applyProps(materials.emitbrake, {
      emissiveIntensity: 3,
      toneMapped: false,
    });
    applyProps(materials.LightsFrontLed, {
      emissiveIntensity: 3,
      toneMapped: false,
    });

    // Car paint (yellow → black)
    (nodes.yellow_WhiteCar_0 as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
      roughness: 0.3,
      metalness: 0.05,
      color: '#111',
      envMapIntensity: 0.75,
      clearcoatRoughness: 0,
      clearcoat: 1,
    });
  }, [nodes, materials]);

  // Remove 'object' from props to avoid duplicate property
  const { object, ...restProps } = props;
  return <primitive object={scene} {...restProps} />;
}

// Preload model (recommended by drei)
useGLTF.preload('/lambo.glb');
