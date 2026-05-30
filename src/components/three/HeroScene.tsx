import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls, Icosahedron, Torus, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const NeonCore = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <Icosahedron ref={ref} args={[1.4, 4]} position={[0, 0, 0]}>
        {/* @ts-ignore */}
        <MeshDistortMaterial
          color="#00ffff"
          emissive="#ff00ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          distort={0.45}
          speed={2}
          wireframe={false}
        />
      </Icosahedron>
      <Icosahedron args={[1.55, 1]}>
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.25} />
      </Icosahedron>
    </Float>
  );
};

const OrbitRings = () => {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (g.current) g.current.rotation.z = s.clock.elapsedTime * 0.1;
  });
  return (
    <group ref={g}>
      {[2.4, 3.0, 3.6].map((r, i) => (
        <Torus key={i} args={[r, 0.012, 16, 128]} rotation={[Math.PI / 2.2 + i * 0.3, i * 0.4, 0]}>
          <meshBasicMaterial color={i % 2 ? '#ff00ff' : '#00ffff'} transparent opacity={0.55} />
        </Torus>
      ))}
    </group>
  );
};

const FloatingShards = () => {
  const positions = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        p: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
        ] as [number, number, number],
        s: 0.08 + Math.random() * 0.18,
        c: Math.random() > 0.5 ? '#00ffff' : '#ff3df0',
      })),
    []
  );
  return (
    <>
      {positions.map((o, i) => (
        <Float key={i} speed={1 + Math.random() * 2} floatIntensity={2} rotationIntensity={2}>
          <mesh position={o.p}>
            <octahedronGeometry args={[o.s, 0]} />
            <meshBasicMaterial color={o.c} wireframe />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
        <pointLight position={[-5, -3, -2]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 4, -4]} intensity={1.2} color="#3a86ff" />

        <NeonCore />
        <OrbitRings />
        <FloatingShards />

        <Sparkles count={80} scale={10} size={2} speed={0.4} color="#00ffff" />
        <Stars radius={40} depth={60} count={1500} factor={3} fade speed={1} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
