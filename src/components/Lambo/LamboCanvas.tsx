'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, OrbitControls } from '@react-three/drei';
import { Lamborghini } from './Lamborghini';
import { Effects } from './Effects';
import { useEffect, useRef, useState } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { GooeyMarquee } from '../shadcn/GooeyMarquee';
import { AnimatedText } from '../shadcn/AnimatedUnderline';

export default function LamboCanvas() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [rotateDir, setRotateDir] = useState(1);

  const lastX = useRef<number | null>(null);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const domElement = controls.domElement;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setStart({ x: touch.clientX, y: touch.clientY });
      controls.enabled = true; // enable by default
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!start) return;
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;

      // if vertical swipe is stronger → let page scroll
      if (Math.abs(dy) > Math.abs(dx)) {
        controls.enabled = false; // OrbitControls OFF → page scrolls
      } else {
        controls.enabled = true; // OrbitControls ON → rotate
      }
    };

    const handleTouchEnd = () => {
      controls.enabled = true; // reset for next gesture
      setStart(null);
    };

    if (domElement) {
      domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      domElement.addEventListener('touchmove', handleTouchMove, { passive: true });
      domElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (domElement) {
        domElement.removeEventListener('touchstart', handleTouchStart);
        domElement.removeEventListener('touchmove', handleTouchMove);
        domElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [start]);

  function handleMouseMove(e: Event) {
    const mouseEvent = e as MouseEvent;
    if (lastX.current !== null) {
      const deltaX = mouseEvent.clientX - lastX.current;
      if (deltaX > 0) {
        setRotateDir(1); // right drag → rotate right
      } else if (deltaX < 0) {
        setRotateDir(-1); // left drag → rotate left
      }
    }
    lastX.current = mouseEvent.clientX;
  }

  return (
    <div className='relative w-screen h-screen'>
      <Canvas
        className='w-full h-full'
        gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 25 }}>
        <color attach='background' args={['#15151a']} />
        <Lamborghini rotation={[0, Math.PI / 5, 0]} scale={0.015} />
        <hemisphereLight intensity={0.5} />
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, -1.16, 0]}
          scale={15}
          blur={0.5}
          opacity={1}
          far={20}
        />
        <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 4, 1]} />
          <meshStandardMaterial color='white' roughness={0.75} />
        </mesh>
        <mesh scale={4} position={[-3, -1.161, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
          <ringGeometry args={[0.9, 1, 3, 1]} />
          <meshStandardMaterial color='white' roughness={0.75} />
        </mesh>
        {/* We're building a cube-mapped environment declaratively.
          Anything you put in here will be filmed (once) by a cubemap-camera
          and applied to the scenes environment, and optionally background. */}
        <Environment resolution={512}>
          {/* Ceiling */}
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -9]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, -3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 0]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 3]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 6]}
            scale={[10, 1, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-x={Math.PI / 2}
            position={[0, 4, 9]}
            scale={[10, 1, 1]}
          />
          {/* Sides */}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-50, 2, 0]}
            scale={[100, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[50, 2, 0]}
            scale={[100, 2, 1]}
          />
          {/* Key */}
          <Lightformer
            form='ring'
            color='red'
            intensity={10}
            scale={2}
            position={[10, 5, 10]}
            onUpdate={(self) => self.lookAt(0, 0, 0)}
          />
        </Environment>
        <Effects />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={rotateDir * 0.9} // very slow
          onStart={(event) => {
            if (controlsRef.current) {
              controlsRef.current.autoRotate = false;
            }

            // start tracking mouse
            const domElement = controlsRef.current?.domElement || window;
            domElement.addEventListener('mousemove', handleMouseMove);
          }}
          onEnd={() => {
            // stop tracking mouse
            const domElement = controlsRef.current?.domElement || window;
            domElement.removeEventListener('mousemove', handleMouseMove);

            if (controlsRef.current) {
              controlsRef.current.autoRotate = true;
            }
          }}
          touches={{
            ONE: THREE.TOUCH.ROTATE, // horizontal swipe rotates
            TWO: THREE.TOUCH.PAN, // disable pinch zoom/pan (set to PAN, or remove to disable)
          }}
        />
      </Canvas>
      <div className='absolute inset-x-0 z-10 top-30 right-1/3'>
        {/* <GooeyMarquee text='Drive the Dream ' /> */}
        <AnimatedText
          text='Drive the Dream'
          textClassName='font-bold'
          underlinePath='M 0,10 Q 75,0 150,10 Q 225,20 300,10'
          underlineHoverPath='M 0,10 Q 75,20 150,10 Q 225,0 300,10'
          underlineDuration={1.5}
        />
      </div>
    </div>
  );
}
