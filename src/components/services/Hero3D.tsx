import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sphere, Icosahedron, Torus } from "@react-three/drei";
import * as THREE from "three";

function RotatingGroup() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      {/* Main glass sphere */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[1.4, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0d7a5f"
            roughness={0.05}
            metalness={0.4}
            distort={0.35}
            speed={1.5}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      {/* Orbiting icosahedron */}
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={2}>
        <Icosahedron args={[0.55, 0]} position={[2.6, 1.1, -0.6]}>
          <meshPhysicalMaterial
            color="#1e3a5f"
            roughness={0.1}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.9}
          />
        </Icosahedron>
      </Float>

      {/* Torus */}
      <Float speed={0.9} rotationIntensity={0.8} floatIntensity={1.5}>
        <Torus args={[0.6, 0.18, 32, 100]} position={[-2.4, -0.8, -0.3]} rotation={[0.6, 0.2, 0]}>
          <meshPhysicalMaterial
            color="#c9a84c"
            roughness={0.2}
            metalness={0.9}
            clearcoat={0.8}
          />
        </Torus>
      </Float>

      {/* Small accent sphere */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={2.5}>
        <Sphere args={[0.3, 32, 32]} position={[1.8, -1.4, 0.8]}>
          <meshPhysicalMaterial
            color="#5cbdb9"
            roughness={0.1}
            metalness={0.5}
            transmission={0.6}
            thickness={0.5}
          />
        </Sphere>
      </Float>
    </group>
  );
}

const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#c9a84c" />
      <pointLight position={[3, -2, 4]} intensity={0.6} color="#5cbdb9" />
      <Suspense fallback={null}>
        <RotatingGroup />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Hero3D;
