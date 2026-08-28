import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/assets/models/imposter.glb'

const COLORS = [
  { name: 'Lime', hex: '#c3ed1c' },
  { name: 'Sky', hex: '#86b5ef' },
  { name: 'Coral', hex: '#df3128' },
  { name: 'Charcoal', hex: '#2a2a2a' },
  { name: 'Sunshine', hex: '#f2c94c' },
]

const HATS = ['none', 'party', 'cap', 'beanie']

function Hat({ type, topY }) {
  if (type === 'party') {
    return (
      <mesh position={[0, topY + 0.13, 0]}>
        <coneGeometry args={[0.14, 0.26, 16]} />
        <meshStandardMaterial color="#df3128" />
      </mesh>
    )
  }

  if (type === 'cap') {
    return (
      <group position={[0, topY + 0.03, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 20]} />
          <meshStandardMaterial color="#0c2a52" />
        </mesh>
        <mesh position={[0, -0.03, 0.16]} rotation={[Math.PI / 2.4, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 20, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#0c2a52" />
        </mesh>
      </group>
    )
  }

  if (type === 'beanie') {
    return (
      <mesh position={[0, topY + 0.02, 0]}>
        <sphereGeometry args={[0.17, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color="#3c4a00" />
      </mesh>
    )
  }

  return null
}

function Character({ color, hat }) {
  const { scene } = useGLTF(MODEL_PATH)

  const bodyMaterial = useMemo(() => {
    let mat
    scene.traverse((child) => {
      if (child.isMesh && child.material?.name === 'Body') mat = child.material
    })
    return mat
  }, [scene])

  useEffect(() => {
    if (bodyMaterial) bodyMaterial.color.set(color)
  }, [bodyMaterial, color])

  const topY = useMemo(() => {
    scene.updateMatrixWorld(true)
    return new THREE.Box3().setFromObject(scene).max.y
  }, [scene])

  return (
    <group>
      <primitive object={scene} />
      <Hat type={hat} topY={topY} />
    </group>
  )
}

export default function ThreeShowcase() {
  const [color, setColor] = useState(COLORS[0].hex)
  const [hat, setHat] = useState('party')

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-[#eef3fb]">
        <Canvas camera={{ fov: 40 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 3, 2]} intensity={1.1} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.5}>
              <Center>
                <Character color={color} hat={hat} />
              </Center>
            </Bounds>
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={2.2} enablePan={false} />
        </Canvas>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c.hex}
            aria-label={c.name}
            className={`h-7 w-7 cursor-pointer rounded-full border-2 ${
              color === c.hex ? 'border-[#0c2a52]' : 'border-white'
            }`}
            style={{ backgroundColor: c.hex }}
            onClick={() => setColor(c.hex)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {HATS.map((h) => (
          <button
            key={h}
            className={`cursor-pointer rounded-full px-4 py-2 font-sans text-[13px] font-semibold capitalize ${
              hat === h ? 'bg-[#0c2a52] text-white' : 'bg-white text-[#0c2a52]'
            }`}
            onClick={() => setHat(h)}
          >
            {h}
          </button>
        ))}
      </div>

      <p className="font-sans text-[13px] text-[#0d0d0d]/70">Drag to orbit · scroll to zoom</p>
    </div>
  )
}

useGLTF.preload(MODEL_PATH)
