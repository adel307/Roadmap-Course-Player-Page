'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, useTexture, Environment } from '@react-three/drei';
import { useMemo, useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';

// ===== Types =====

interface LaptopProps {
  screenImage?: string;
}

interface KeyboardKeyProps {
  position: [number, number, number];
}

interface LoaderProps {
  message?: string;
}

interface LaptopBaseProps {
  hovered: boolean;
}

interface LaptopScreenProps {
  screenRef: React.RefObject<THREE.Group | null>;
  screenImage: string;
}

// ===== Child components =====

function KeyboardKey({ position }: KeyboardKeyProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.16, 0.008, 0.18]} />
      <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

function Keyboard() {
  const rows = 5;
  const cols = 12;

  return (
    <>
      {Array.from({ length: rows }).map((_, i) =>
        Array.from({ length: cols }).map((_, j) => (
          <KeyboardKey
            key={`${i}-${j}`}
            position={[-1.15 + j * 0.21, 0.095, -0.65 + i * 0.25]}
          />
        ))
      )}
    </>
  );
}

function LaptopBase({ hovered }: LaptopBaseProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* Main chassis */}
      <RoundedBox args={[3, 0.15, 2]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#e8eefc' : '#d4dae6'}
          metalness={0.85}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Keyboard */}
      <mesh position={[0, 0.085, -0.15]}>
        <boxGeometry args={[2.6, 0.01, 1.3]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
      </mesh>

      <Keyboard />

      {/* Trackpad */}
      <mesh position={[0, 0.088, 0.65]}>
        <boxGeometry args={[0.9, 0.005, 0.55]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

function LaptopScreen({ screenRef, screenImage }: LaptopScreenProps) {
  const loadedTexture = useTexture(screenImage);
  const texture = useMemo(() => {
    const screenTexture = loadedTexture.clone();
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    return screenTexture;
  }, [loadedTexture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group position={[0, 0.075, -1]} ref={screenRef}>
      {/* Rear panel */}
      <RoundedBox
        args={[3, 2, 0.1]}
        radius={0.06}
        smoothness={4}
        position={[0, 1, 0]}
      >
        <meshStandardMaterial
          color="#c8ced9"
          metalness={0.85}
          roughness={0.25}
        />
      </RoundedBox>

      {/* Screen bezel */}
      <mesh position={[0, 1, 0.051]}>
        <planeGeometry args={[2.85, 1.9]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Screen image */}
      <mesh position={[0, 1, 0.052]}>
        <planeGeometry args={[2.7, 1.75]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Camera */}
      <mesh position={[0, 1.94, 0.052]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

// ===== Main laptop component =====

function Laptop({ screenImage = 'https://res.cloudinary.com/dlndowzi/image/upload/v1792356697/PNG.jpg' }: LaptopProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(true);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(t * 0.8) * 0.1;
      floatRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      floatRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.pointer.x * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -state.pointer.y * 0.1,
        0.05
      );
    }

    // Animate the screen opening and closing.
    if (screenRef.current) {
      const targetRotation = opened ? 0 : Math.PI / 2;
      screenRef.current.rotation.x = THREE.MathUtils.lerp(
        screenRef.current.rotation.x,
        targetRotation,
        0.08
      );
    }
  });

  return (
    <group ref={floatRef} scale={1.05}>
    {/* Slightly lower the laptop in its frame. */}
    <group position={[0, -0.15, 0]}>
        <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setOpened((prev) => !prev)}
        >
        <LaptopBase hovered={hovered} />
        <LaptopScreen screenRef={screenRef} screenImage={screenImage} />
        </group>
    </group>
    </group>
  );
}

// ===== Loading indicator =====

function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <Text position={[0, 0, 0]} fontSize={0.4} color="#64748b">
      {message}
    </Text>
  );
}

// ===== Main scene =====

export default function LaptopApp() {
  return (
    <div className="h-full w-full" style={{ aspectRatio: '1 / 1' }}>
      <Canvas
        camera={{ position: [0, 1.0, 5.8], fov: 38 }}
                onCreated={({ camera }) => {
            camera.lookAt(0, 0.1, 0);
        }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Soft studio lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[5, 6, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#93c5fd" />
        <pointLight position={[3, 2, 3]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-3, 1, 2]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[2, 0, -3]} intensity={0.4} color="#34d399" />

        <Suspense fallback={<Loader />}>
          <Laptop />
        </Suspense>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}