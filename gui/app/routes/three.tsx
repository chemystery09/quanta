import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Canvas, useFrame } from '@react-three/fiber'
import './css/three.css'

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
      </mesh>
    )
}

interface CustomObjectProps {
    nodes: number[]; 
    elements: number[]; 
  }
  
  function CustomObject({ nodes, elements }: CustomObjectProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
  
    // Create the geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(nodes); // Convert nodes to Float32Array
    const indices = new Uint16Array(elements); // Convert elements to Uint16Array
  
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 values per vertex (x, y, z)
    geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 value per index
    geometry.computeVertexNormals(); // Compute normals for lighting
  
    // Rotate the object in the animation loop
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    });
  
    return (
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial color="orange" wireframe={false} />
      </mesh>
    );
  }
  
export default function Three(props: ThreeElements['mesh']) {
    const nodes = [
        0, 1, 0, // Top vertex
        -1, -1, 1, // Front-left
        1, -1, 1, // Front-right
        1, -1, -1, // Back-right
        -1, -1, -1, // Back-left
      ];
    
      const elements = [
        0, 1, 2, // Front face
        0, 2, 3, // Right face
        0, 3, 4, // Back face
        0, 4, 1, // Left face
        1, 4, 3, // Bottom face (optional, for a closed shape)
        1, 3, 2, // Bottom face (optional, for a closed shape)
      ];
return (

    <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <CustomObject nodes={nodes} elements={elements} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
    </Canvas>
)
}

