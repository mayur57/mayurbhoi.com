'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(200, 200, 250)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.minDistance = 200
    controls.maxDistance = 400
    controls.target.set(0, 0.5, 0)

    let model: THREE.Group | null = null

    // Loader manager for progress tracking
    const manager = new THREE.LoadingManager()
    manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      setProgress(Math.floor((itemsLoaded / itemsTotal) * 100))
    }
    manager.onLoad = () => {
      setProgress(100)
      setTimeout(() => setProgress(-1), 300)
    }

    // Load coke can model
    const loader = new GLTFLoader(manager)
    loader.load('/models/loml.glb', (gltf: any) => {
      model = gltf.scene
      if (model) scene.add(model)
    })

    const animate = () => {
      requestAnimationFrame(animate)
      if (model) model.rotation.y += 0.01
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='relative w-full h-full'>
      {progress >= 0 && (
        <div className='absolute inset-0 flex items-center justify-center bg-black text-white z-20'>
          {progress}%
        </div>
      )}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
