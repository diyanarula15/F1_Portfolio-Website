import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Grid, useScroll, Stars } from '@react-three/drei';
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
      planeGeometry: any;
      meshBasicMaterial: any;
      capsuleGeometry: any;
      tubeGeometry: any;
    }
  }
}

// --- Assets ---

const bodyColor = "#1a0b2e"; // Darker violet/black
const accentColor = "#ff00cc"; 
const cabinColor = "#00d4ff";
const metalColor = "#222";

const Wheel = React.forwardRef<THREE.Group, any>((props, ref) => (
  <group ref={ref} {...props}>
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.35, 0.35, 0.4, 24]} />
      <meshStandardMaterial color="#050505" roughness={0.4} />
    </mesh>
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.2, 0.2, 0.41, 16]} />
      <meshStandardMaterial color={metalColor} metalness={0.8} />
    </mesh>
    {/* Neon Rim */}
    <mesh rotation={[0, 0, Math.PI / 2]} position={[0.21, 0, 0]}>
       <ringGeometry args={[0.2, 0.25, 24]} />
       <meshBasicMaterial color={props.isRear ? accentColor : cabinColor} />
    </mesh>
    <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.21, 0, 0]}>
       <ringGeometry args={[0.2, 0.25, 24]} />
       <meshBasicMaterial color={props.isRear ? accentColor : cabinColor} />
    </mesh>
  </group>
));

const CyberCar = () => {
  const wheelRef1 = useRef<THREE.Group>(null);
  const wheelRef2 = useRef<THREE.Group>(null);
  const wheelRef3 = useRef<THREE.Group>(null);
  const wheelRef4 = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const speed = delta * 20;
    if (wheelRef1.current) wheelRef1.current.rotation.x -= speed;
    if (wheelRef2.current) wheelRef2.current.rotation.x -= speed;
    if (wheelRef3.current) wheelRef3.current.rotation.x -= speed;
    if (wheelRef4.current) wheelRef4.current.rotation.x -= speed;
  });

  return (
    // Rotate 180 degrees so the model faces -Z (Three.js standard forward)
    // The original model has the nose at +Z, so we flip it around Y.
    <group rotation={[0, Math.PI, 0]} dispose={null} scale={0.6}>
       {/* --- Main Body --- */}
      {/* Central Chassis */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1, 0.4, 3.5]} />
        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Nose Cone */}
      <mesh position={[0, 0.2, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 1.5, 4]} />
        <meshStandardMaterial color={bodyColor} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Cockpit / Halo */}
      <mesh position={[0, 0.65, -0.2]}>
        <capsuleGeometry args={[0.35, 1.2, 4, 8]} />
        <meshPhysicalMaterial 
            color={cabinColor} 
            emissive={cabinColor}
            emissiveIntensity={0.2}
            transmission={0.4} 
            opacity={0.9} 
            metalness={0.9} 
            roughness={0.1} 
        />
      </mesh>
      
      {/* Sidepods */}
      <mesh position={[0.8, 0.3, 0.5]}>
         <boxGeometry args={[0.6, 0.4, 2]} />
         <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[-0.8, 0.3, 0.5]}>
         <boxGeometry args={[0.6, 0.4, 2]} />
         <meshStandardMaterial color={bodyColor} />
      </mesh>
      {/* Radiator Intakes (Glow) */}
      <mesh position={[0.8, 0.3, 1.51]} rotation={[0, 0, 0]}>
         <planeGeometry args={[0.4, 0.2]} />
         <meshBasicMaterial color={accentColor} />
      </mesh>
      <mesh position={[-0.8, 0.3, 1.51]} rotation={[0, 0, 0]}>
         <planeGeometry args={[0.4, 0.2]} />
         <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* --- Aerodynamics --- */}
      {/* Front Wing */}
      <group position={[0, 0.1, 3]}>
         <mesh>
            <boxGeometry args={[3, 0.05, 0.4]} />
            <meshStandardMaterial color={metalColor} metalness={0.8} />
         </mesh>
         {/* Wing Endplates */}
         <mesh position={[1.5, 0.2, 0]}>
            <boxGeometry args={[0.05, 0.4, 0.6]} />
            <meshStandardMaterial color={accentColor} />
         </mesh>
         <mesh position={[-1.5, 0.2, 0]}>
            <boxGeometry args={[0.05, 0.4, 0.6]} />
            <meshStandardMaterial color={accentColor} />
         </mesh>
      </group>

      {/* Rear Wing */}
      <group position={[0, 0.8, -1.8]}>
         <mesh>
            <boxGeometry args={[2.2, 0.05, 0.6]} />
            <meshStandardMaterial color={metalColor} metalness={0.8} />
         </mesh>
         <mesh position={[0, 0.3, 0]}>
             <boxGeometry args={[2.2, 0.05, 0.4]} />
             <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
         </mesh>
         {/* Supports */}
         <mesh position={[0.4, -0.4, 0]}>
            <boxGeometry args={[0.05, 0.8, 0.4]} />
            <meshStandardMaterial color="#111" />
         </mesh>
         <mesh position={[-0.4, -0.4, 0]}>
            <boxGeometry args={[0.05, 0.8, 0.4]} />
            <meshStandardMaterial color="#111" />
         </mesh>
         {/* Rear Endplates */}
         <mesh position={[1.15, 0, 0]}>
             <boxGeometry args={[0.05, 0.8, 0.8]} />
             <meshStandardMaterial color={bodyColor} />
         </mesh>
         <mesh position={[-1.15, 0, 0]}>
             <boxGeometry args={[0.05, 0.8, 0.8]} />
             <meshStandardMaterial color={bodyColor} />
         </mesh>
      </group>

      {/* Floor / Diffuser */}
      <mesh position={[0, 0.05, 0.5]}>
         <boxGeometry args={[2, 0.05, 4]} />
         <meshStandardMaterial color="#111" />
      </mesh>

      {/* Wheels */}
      <Wheel ref={wheelRef1} position={[1.1, 0.35, 1.8]} />
      <Wheel ref={wheelRef2} position={[-1.1, 0.35, 1.8]} />
      <Wheel ref={wheelRef3} position={[1.1, 0.35, -1.5]} isRear />
      <Wheel ref={wheelRef4} position={[-1.1, 0.35, -1.5]} isRear />

      {/* Engine/Exhaust Glow */}
      <pointLight position={[0, 0.5, -2]} color={accentColor} intensity={3} distance={4} />
      <mesh position={[0, 0.4, -1.8]} rotation={[Math.PI/2, 0, 0]}>
         <cylinderGeometry args={[0.1, 0.1, 0.2]} />
         <meshBasicMaterial color={accentColor} />
      </mesh>
    </group>
  );
};

// --- Track Logic ---

export const BackgroundScene = () => {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  
  // Create a wider, more dynamic asymmetric path
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),          // Hero (Start)
      new THREE.Vector3(-4, -5, -4),       // About (Wide Left)
      new THREE.Vector3(3, -11, -8),       // Stats (Wide Right)
      new THREE.Vector3(-2, -16, -2),      // Projects (Mid Left)
      new THREE.Vector3(4, -22, -6),       // Trophies (Deep Right)
      new THREE.Vector3(-3, -27, -3),      // Pit Stop (Left)
      new THREE.Vector3(0, -32, 0),        // Contact (Center End)
    ], false, 'catmullrom', 0.5);
  }, []);

  const carRef = useRef<THREE.Group>(null);
  const trackRadius = 0.15;

  useFrame((state, delta) => {
    // Current scroll progress (0 to 1)
    const t = scroll.offset * 0.99; // Avoid exactly 1.0 to prevent lookAt errors
    
    // 1. Calculate Car Position
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const lookAtPoint = curve.getPointAt(Math.min(t + 0.01, 1));
    
    if (carRef.current) {
      // Place car on the track
      // The track is a tube with radius `trackRadius`.
      // We want the bottom of the car wheels (Y=0 in local space) to touch the top of the tube.
      carRef.current.position.copy(point).add(new THREE.Vector3(0, trackRadius, 0));
      
      // Orient car to face forward along the track
      // `lookAt` rotates the object so its -Z axis points to the target.
      // Since we rotated our CyberCar mesh 180 degrees (Y flip) in the component, its visual front is now -Z.
      // This means standard `lookAt` works perfectly.
      carRef.current.lookAt(lookAtPoint);
      
      // 2. Physics-based Banking (Roll)
      // We calculate the change in direction (curvature) to determine centrifugal force direction.
      const nextTangent = curve.getTangentAt(Math.min(t + 0.05, 1)).normalize();
      
      // The "Right" vector of the car in World Space (assuming Up is roughly Y)
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();
      
      // Curvature vector roughly points to the center of the turn
      const curvature = new THREE.Vector3().subVectors(nextTangent, tangent);
      
      // Project curvature onto the Right vector to see how hard we are turning Left or Right
      // Dot product: Positive = Turning Right, Negative = Turning Left
      const turnSeverity = curvature.dot(right);
      
      // Bank Angle: Bank INTO the turn.
      // If turning Right (+), we want to roll Right (negative Z rotation in local space usually, or positive depending on axes).
      // Experimentally, negative coefficient feels correct for "leaning in"
      const maxBankAngle = 0.8; // Radians
      const bankFactor = 12; // Sensitivity
      const targetBank = -turnSeverity * bankFactor;
      
      // Clamp banking
      const clampedBank = Math.max(-maxBankAngle, Math.min(maxBankAngle, targetBank));
      
      // Apply Roll to the Local Z axis
      // Note: We've already applied lookAt, so Z is our forward axis.
      carRef.current.rotateZ(clampedBank);
    }

    // 3. Cinematic Camera Follow
    // Determine ideal camera position: Behind and Above the car
    // "Behind" is opposite to the tangent.
    const cameraOffsetDistance = 6;
    const cameraHeight = 3;
    
    // Calculate target camera position based on car position and velocity (tangent)
    const idealCameraPos = point.clone()
      .sub(tangent.clone().multiplyScalar(cameraOffsetDistance))
      .add(new THREE.Vector3(0, cameraHeight, 0));
      
    // Smoothly interpolate current camera position to ideal position (Lag effect)
    // Lower factor = more weight/lag, Higher factor = stiffer follow
    state.camera.position.lerp(idealCameraPos, 0.08);
    
    // Camera Look Target
    // Look slightly ahead of the car to anticipate the track
    const lookAheadDist = 8;
    const cameraLookTarget = point.clone().add(tangent.clone().multiplyScalar(lookAheadDist));
    
    state.camera.lookAt(cameraLookTarget);
  });

  return (
    <>
      <color attach="background" args={['#0f0c29']} />
      
      {/* Dynamic Lights - Reduced Intensity to prevent washing out */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff00cc" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />

      <Environment preset="night" />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* The Neon Track Line */}
      <mesh>
        <tubeGeometry args={[curve, 400, trackRadius, 8, false]} />
        <meshStandardMaterial 
            color="#ff00cc" 
            emissive="#ff00cc" 
            emissiveIntensity={1} /* Reduced emissive intensity */
            roughness={0.4}
            metalness={0.8}
            toneMapped={false}
        />
      </mesh>
      
      {/* Secondary Track Rails for Detail (Cyan) */}
      <mesh position={[0, -0.2, 0]}>
         <tubeGeometry args={[curve, 400, 0.05, 8, false]} />
         <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>

      {/* The Car Group */}
      <group ref={carRef}>
         <CyberCar />
         {/* Headlights */}
         <spotLight position={[0, 0.5, 2.5]} angle={0.5} penumbra={0.5} intensity={5} color="#00d4ff" distance={20} target-position={[0, 0, 15]} />
      </group>

      {/* Volumetric Grids - REDUCED VISIBILITY FOR READABILITY */}
      <Grid 
        position={[0, -5, 0]} 
        args={[30, 30]} 
        cellColor="#1a1a2e" 
        sectionColor="#2d1b4e" 
        fadeDistance={25} 
        fadeStrength={1.5}
      />
      
      {/* Fog to hide the start/end and blend */}
      <fog attach="fog" args={['#0f0c29', 2, 40]} />
    </>
  );
};