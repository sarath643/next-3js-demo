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
  const [isMobile, setIsMobile] = useState(false);

  const lastX = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Handle canvas touch events for mobile - allow page scroll vs 3D interaction
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    const handleCanvasTouch = (e: TouchEvent) => {
      // Allow OrbitControls for any touch interaction on the canvas
      // The key is to not prevent default, so page scroll can still work
      // when the touch goes beyond canvas boundaries or is a quick swipe
    };

    // Set pointer-events style based on device
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.touchAction = 'pan-y'; // Allow vertical panning (scroll) while enabling other gestures
    }

    return () => {
      if (canvas) {
        canvas.style.touchAction = '';
      }
    };
  }, [isMobile]);

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
          autoRotateSpeed={rotateDir * 0.9}
          enabled={true}
          onStart={() => {
            if (controlsRef.current) controlsRef.current.autoRotate = false;
            const domElement = controlsRef.current?.domElement || window;
            domElement.addEventListener('mousemove', handleMouseMove);
          }}
          onEnd={() => {
            const domElement = controlsRef.current?.domElement || window;
            domElement.removeEventListener('mousemove', handleMouseMove);
            if (controlsRef.current) controlsRef.current.autoRotate = true;
          }}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
        />
      </Canvas>

      {/* Transparent scroll overlay areas for mobile */}
      {isMobile && (
        <>
          {/* Left scroll area */}
          <div
            className='absolute top-0 left-0 z-20 w-1/4 h-full bg-transparent'
            style={{
              touchAction: 'pan-y',
              pointerEvents: 'auto',
            }}
          />
          {/* Right scroll area */}
          <div
            className='absolute top-0 right-0 z-20 w-1/4 h-full bg-transparent'
            style={{
              touchAction: 'pan-y',
              pointerEvents: 'auto',
            }}
          />
        </>
      )}

      <div className='absolute inset-x-0 z-10 top-30 right-1/3'>
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
