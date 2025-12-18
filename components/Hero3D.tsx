import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, MeshDistortMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX.IntrinsicElements to include Three.js elements used in this file
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      cylinderGeometry: any;
      ringGeometry: any;
      pointLight: any;
      ambientLight: any;
      spotLight: any;
      color: any;
      fog: any;
    }
  }
}

// Low-poly abstract cyber car component
const CyberCar = () => {
  const group = useRef<THREE.Group>(null);
  
  // Rotate the car slightly based on time
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      group.current.rotation.y = Math.sin(t / 4) * 0.1;
      group.current.position.y = Math.sin(t / 1.5) * 0.05;
    }
  });

  const bodyColor = "#2a0a38"; // Deep violet
  const accentColor = "#ff00cc"; // Neon pink
  const glassColor = "#00d4ff"; // Cyan

  return (
    <group ref={group} rotation={[0, -Math.PI / 6, 0]}>
      {/* Main Chassis */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.8, 0.3, 4.5]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Side Pods */}
      <mesh position={[1.1, 0.3, 0.5]}>
        <boxGeometry args={[0.5, 0.3, 2.5]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.1, 0.3, 0.5]}>
        <boxGeometry args={[0.5, 0.3, 2.5]} />
        <meshStandardMaterial color={bodyColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit / Glass */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[0.8, 0.3, 1.2]} />
        <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.6} 
            opacity={0.8} 
            metalness={0.9} 
            roughness={0} 
            transparent 
        />
      </mesh>

      {/* Rear Wing */}
      <mesh position={[0, 0.8, 2]}>
        <boxGeometry args={[2.2, 0.05, 0.6]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.8, 0.5, 2]}>
        <boxGeometry args={[0.1, 0.6, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-0.8, 0.5, 2]}>
        <boxGeometry args={[0.1, 0.6, 0.4]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Front Wing */}
      <mesh position={[0, 0.15, -2.1]}>
        <boxGeometry args={[2.2, 0.05, 0.6]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>

      {/* Wheels (Abstract Cylinders) */}
      <Wheel position={[1.1, 0.25, 1.5]} />
      <Wheel position={[-1.1, 0.25, 1.5]} />
      <Wheel position={[1.1, 0.25, -1.5]} />
      <Wheel position={[-1.1, 0.25, -1.5]} />
      
      {/* Engine Glow */}
      <pointLight position={[0, 0.5, 2.2]} color={accentColor} intensity={2} distance={5} />
    </group>
  );
};

const Wheel = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if(mesh.current) {
       mesh.current.rotation.x += delta * 5; // Spin wheels
    }
  });

  return (
    <mesh ref={mesh} position={position} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
      <meshStandardMaterial color="#111" roughness={0.8} />
      <mesh position={[0, 0.21, 0]}>
         <ringGeometry args={[0.2, 0.3, 32]} />
         <meshStandardMaterial color="#bdc3c7" side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 6]} fov={50} />
        <color attach="background" args={['#0f0c29']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ff00cc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4ff" />

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Floating Car */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CyberCar />
        </Float>

        {/* Moving Grid Floor */}
        <Grid 
            position={[0, -0.5, 0]} 
            args={[20, 20]} 
            cellColor="#302b63" 
            sectionColor="#ff00cc" 
            fadeDistance={15} 
            fadeStrength={1}
        />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0f0c29', 5, 20]} />
      </Canvas>
      {/* Overlay Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};