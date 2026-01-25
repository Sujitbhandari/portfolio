'use client';

import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ScrollControls, useScroll, Cloud, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    // Scroll runs from 0 to 1
    const t = scroll.offset;

    // Camera Position Interpolation
    // Start: Base of mountain, looking up
    // End: Summit, looking down

    const startPos = new THREE.Vector3(0, 10, 50);
    const endPos = new THREE.Vector3(0, 280, 20);

    // Bezier-like curve or simple lerp
    camera.position.lerpVectors(startPos, endPos, t);

    // LookAt Interpolation
    const startTarget = new THREE.Vector3(0, 200, 0); // Looking up at peak
    const endTarget = new THREE.Vector3(0, 250, -100); // Looking down/out from peak

    const currentTarget = new THREE.Vector3().lerpVectors(startTarget, endTarget, t);
    camera.lookAt(currentTarget);
  });

  return null;
}

function Terrain() {
  const mesh = useRef<THREE.Mesh>(null);

  // High resolution plane
  // args: width, height, widthSegments, heightSegments
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1000, 1000, 256, 256);
    const noise2D = createNoise2D();

    const posAttribute = geo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttribute.count; i++) {
      vertex.fromBufferAttribute(posAttribute, i);

      // Heavy displacement for peaks
      // Multiple octaves of noise
      const scale1 = 0.005;
      const scale2 = 0.02;

      let h = noise2D(vertex.x * scale1, vertex.y * scale1) * 150; // Main shape
      h += noise2D(vertex.x * scale2, vertex.y * scale2) * 20;   // Detail

      // Creating a central peak
      const dist = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y);
      const peakFactor = Math.exp(-dist * 0.005) * 300; // Gauss-like bump for Everest

      vertex.z = Math.max(0, h + peakFactor - 50); // Uplift

      posAttribute.setZ(i, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={mesh} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <meshStandardMaterial
        color="#e0e0e0"
        roughness={0.6}
        metalness={0.1}
        flatShading={false}
      />
    </mesh>
  );
}

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0">
      <Canvas shadows camera={{ position: [0, 10, 50], fov: 45 }}>
        <fog attach="fog" args={['#d0d0d0', 10, 600]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[100, 100, 50]} intensity={1.5} castShadow />

        <Environment preset="sunset" />

        <ScrollControls pages={6} damping={0.3}>
          {children}
          <CameraRig />
        </ScrollControls>

        <Terrain />
        <Cloud opacity={0.5} speed={0.4} bounds={[100, 20, 100]} segments={20} position={[0, 200, -100]} />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      </Canvas>
    </div>
  );
}
