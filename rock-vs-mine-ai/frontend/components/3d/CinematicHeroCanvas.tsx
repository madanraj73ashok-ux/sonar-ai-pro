"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function SonarRings() {
  const ringsRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={ringsRef} position={[0, -1, -5]}>
      {[3, 6, 9, 12, 15].map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2.2, 0, 0]}>
          <ringGeometry args={[radius - 0.04, radius, 128]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.22 - idx * 0.035} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Electric Blue Sweeper beam */}
      <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[15, 0.06]} />
        <meshBasicMaterial color="#60A5FA" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingSubmarine() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.4 - 0.5;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
      groupRef.current.rotation.z = Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={[2.8, -0.2, 0]} scale={[1.2, 1.2, 1.2]}>
        {/* Main Body Hull - NASA Deep Blue Metallic */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.7, 3.0, 32, 64]} />
          <MeshDistortMaterial color="#1e3a8a" roughness={0.15} metalness={0.95} factor={0.12} speed={2} />
        </mesh>

        {/* Conning Tower - Electric Blue Accent */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.35]} />
          <meshStandardMaterial color="#3B82F6" roughness={0.2} metalness={0.9} emissive="#2563EB" emissiveIntensity={0.4} />
        </mesh>

        {/* Hologram Pulse Ring */}
        <mesh position={[1.8, 0, 0]}>
          <torusGeometry args={[0.4, 0.02, 16, 32]} />
          <meshBasicMaterial color="#60A5FA" wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleOcean() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 700;

  const positions = useRef(new Float32Array(count * 3));
  for (let i = 0; i < count * 3; i += 3) {
    positions.current[i] = (Math.random() - 0.5) * 30;
    positions.current[i + 1] = (Math.random() - 0.5) * 20;
    positions.current[i + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#60A5FA" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

export default function CinematicHeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={55} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#3B82F6" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#8B5CF6" />
        <directionalLight position={[0, 10, 0]} intensity={1.2} color="#60A5FA" />
        <Stars radius={100} depth={50} count={2500} factor={3.5} saturation={0} fade speed={1} />
        <SonarRings />
        <FloatingSubmarine />
        <ParticleOcean />
      </Canvas>
    </div>
  );
}
