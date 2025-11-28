'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 1]} />
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const particles = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (particles.current) {
      particles.current.rotation.x = clock.getElapsedTime() * 0.1
      particles.current.rotation.y = clock.getElapsedTime() * 0.15
    }
  })

  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.6} />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <AnimatedSphere />
        <FloatingParticles />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

