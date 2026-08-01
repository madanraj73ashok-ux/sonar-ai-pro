"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SonarRadar() {
  const radarRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (radarRef.current) {
      radarRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group ref={radarRef} position={[0, 0, -2]}>
      {/* Concentric Sonar Rings */}
      {[2, 3.5, 5, 6.5].map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.03, radius, 64]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.3 - idx * 0.05} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Rotating Radar Sweeper Line */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6.5, 0.05]} />
        <meshBasicMaterial color="#00FFC6" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function SubmarineHull() {
  const subRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (subRef.current) {
      subRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      subRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={subRef} position={[2, -0.5, 1]} scale={[0.8, 0.8, 0.8]}>
        {/* Sleek Submarine Main Body */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.8, 3.2, 16, 32]} />
          <MeshDistortMaterial color="#0b1e38" roughness={0.2} metalness={0.9} factor={0.15} speed={1.5} />
        </mesh>
        
        {/* Conning Tower / Sail */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.4]} />
          <meshStandardMaterial color="#00E5FF" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Sonar Beacon Hologram */}
        <mesh position={[1.8, 0, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color="#00FFC6" wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function OceanParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 300;

  const positions = useRef(new Float32Array(count * 3));
  for (let i = 0; i < count * 3; i += 3) {
    positions.current[i] = (Math.random() - 0.5) * 20;
    positions.current[i + 1] = (Math.random() - 0.5) * 20;
    positions.current[i + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00E5FF" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function SonarHeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00E5FF" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#7B61FF" />
        <SonarRadar />
        <SubmarineHull />
        <OceanParticles />
      </Canvas>
    </div>
  );
}
