import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function QuantumCloud() {
  const pointsRef = useRef()

  const { positions, colors, sizes, phases } = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    const color1 = new THREE.Color('#00f0ff') // Cyan
    const color2 = new THREE.Color('#b026ff') // Purple

    for (let i = 0; i < count; i++) {
      // Distribute in a huge volume
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80

      // Mix colors based on position
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b

      sizes[i] = Math.random() * 2.5
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, phases }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      // Slow constant rotation
      pointsRef.current.rotation.y = t * 0.05
      pointsRef.current.rotation.x = t * 0.02
      
      // Gentle breathing effect on particles
      const scale = 1 + Math.sin(t * 0.5) * 0.05
      pointsRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-phase" count={phases.length} array={phases} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    // Parallax scrolling / mouse reactivity
    // Calculate target position based on mouse (-1 to 1)
    const targetX = mouse.x * 5
    const targetY = mouse.y * 5
    
    // Check scroll depth to sink into the cloud as user scrolls down
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0
    
    const targetZ = 35 - (scrollPercent * 20) // Start at Z=35, move in closer as user scrolls
    
    // Smooth interpolation
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#05050a' }}>
      {/* Soft ambient gradient overlay */}
      <div style={{ 
        position: 'absolute', inset: 0, zIndex: 1, 
        background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,10,0.8) 100%)' 
      }} />
      
      <Canvas camera={{ position: [0, 0, 35], fov: 60 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <React.Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.5} />
          <QuantumCloud />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
