'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

interface SkillNode {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other'
  x: number
  y: number
  z: number
  connections: string[]
}

const skills: SkillNode[] = [
  { id: 'react', name: 'React', category: 'frontend', x: 0, y: 0, z: 0, connections: ['nextjs', 'typescript'] },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', x: 2, y: 1, z: 0, connections: ['react', 'nodejs'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', x: -2, y: 1, z: 0, connections: ['react', 'nodejs'] },
  { id: 'nodejs', name: 'Node.js', category: 'backend', x: 0, y: -2, z: 1, connections: ['express', 'mongodb'] },
  { id: 'express', name: 'Express', category: 'backend', x: 2, y: -2, z: 1, connections: ['nodejs', 'mongodb'] },
  { id: 'python', name: 'Python', category: 'backend', x: -2, y: -2, z: 1, connections: ['fastapi', 'postgresql'] },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', x: -3, y: -3, z: 1, connections: ['python'] },
  { id: 'mongodb', name: 'MongoDB', category: 'database', x: 1, y: -3, z: 0, connections: ['nodejs', 'express'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', x: -1, y: -3, z: 0, connections: ['python'] },
  { id: 'docker', name: 'Docker', category: 'devops', x: 0, y: 2, z: -1, connections: ['aws', 'kubernetes'] },
  { id: 'aws', name: 'AWS', category: 'devops', x: 2, y: 2, z: -1, connections: ['docker'] },
  { id: 'kubernetes', name: 'K8s', category: 'devops', x: -2, y: 2, z: -1, connections: ['docker'] },
]

const categoryColors: Record<string, string> = {
  frontend: '#3b82f6',
  backend: '#10b981',
  database: '#f59e0b',
  devops: '#8b5cf6',
  other: '#ef4444',
}

function SkillNode3D({ skill }: { skill: SkillNode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = categoryColors[skill.category] || categoryColors.other

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group position={[skill.x, skill.y, skill.z]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  )
}

function ConnectionLine({ from, to }: { from: SkillNode; to: SkillNode }) {
  const points = useMemo(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(from.x, from.y, from.z),
      new THREE.Vector3(to.x, to.y, to.z),
    ]),
    [from, to]
  )

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.getPoints(50).length}
          array={new Float32Array(points.getPoints(50).flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#60a5fa" opacity={0.3} transparent />
    </line>
  )
}

export default function SkillNetwork() {
  const connections = useMemo(() => {
    const conns: Array<[SkillNode, SkillNode]> = []
    skills.forEach(skill => {
      skill.connections.forEach(connId => {
        const target = skills.find(s => s.id === connId)
        if (target && !conns.some(([a, b]) => 
          (a.id === skill.id && b.id === target.id) || 
          (a.id === target.id && b.id === skill.id)
        )) {
          conns.push([skill, target])
        }
      })
    })
    return conns
  }, [])

  return (
    <div className="w-full h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {connections.map(([from, to], idx) => (
          <ConnectionLine key={idx} from={from} to={to} />
        ))}
        {skills.map(skill => (
          <SkillNode3D key={skill.id} skill={skill} />
        ))}
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      <div className="absolute bottom-4 left-4 glass p-4 rounded-lg">
        <h3 className="text-sm font-bold mb-2">Skill Categories</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-xs capitalize">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

