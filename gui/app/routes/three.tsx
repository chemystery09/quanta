import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { use, useRef, useState } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import './css/three.css'
import { OrbitControls } from '@react-three/drei'
import { useEffect } from 'react'


// function Box(props: ThreeElements['mesh']) {
//     const meshRef = useRef<THREE.Mesh>(null!)
//     const [hovered, setHover] = useState(false)
//     const [active, setActive] = useState(false)
//     // useFrame((state, delta) => (meshRef.current.rotation.x += delta))
//     return (
//       <mesh
//         {...props}
//         ref={meshRef}
//         scale={active ? 1.5 : 1}
//         onClick={(event) => setActive(!active)}
//         onPointerOver={(event) => setHover(true)}
//         onPointerOut={(event) => setHover(false)}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
//       </mesh>
//     )
// }

interface CustomObjectProps {
    nodes: number[];
    elements: number[]; 
    position: [number, number, number]; // Optional position prop
    cameraPosition?: [number, number, number]; // Optional camera position prop
  }
  
  function CustomObject({ nodes, elements, position, cameraPosition }: CustomObjectProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { camera } = useThree();
  
    // Create the geometry
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(nodes); // Convert nodes to Float32Array
    const indices = new Uint16Array(elements); // Convert elements to Uint16Array
  
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 values per vertex (x, y, z)
    geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 value per index
    geometry.computeVertexNormals(); // Compute normals for lighting
  
    // Rotate the object in the animation loop
    // useFrame(() => {
    //   if (meshRef.current) {
    //     meshRef.current.rotation.y += 0.01;
    //   }
    // });

    // Set the camera position if provided
    const centerX = nodes.reduce((acc, val, index) => (index % 3 === 0 ? acc + val : acc), 0) / (nodes.length / 3);
    const centerY = nodes.reduce((acc, val, index) => (index % 3 === 1 ? acc + val : acc), 0) / (nodes.length / 3);
    const centerZ = nodes.reduce((acc, val, index) => (index % 3 === 2 ? acc + val : acc), 0) / (nodes.length / 3);

    // get the min and max values of the nodes to get the size of the object
    const minX = Math.min(...nodes.filter((_, index) => index % 3 === 0));
    const minY = Math.min(...nodes.filter((_, index) => index % 3 === 1));
    const minZ = Math.min(...nodes.filter((_, index) => index % 3 === 2));
    const maxX = Math.max(...nodes.filter((_, index) => index % 3 === 0));
    const maxY = Math.max(...nodes.filter((_, index) => index % 3 === 1));
    const maxZ = Math.max(...nodes.filter((_, index) => index % 3 === 2));

    const sizeX = maxX - minX;
    const sizeY = maxY - minY;
    const sizeZ = maxZ - minZ;
  
    camera.position.set(centerX - sizeX * 2, centerY, centerZ + sizeZ * 2); // Adjust the Z position to move the camera back
    // camera.lookAt(centerX, centerY, centerZ); // Look at the center of the object
  
    return (
        <mesh ref={meshRef} geometry={geometry} frustumCulled={false} receiveShadow={true} castShadow={true} position={position}>
        <ambientLight intensity={Math.PI / 2} />
        {/* <spotLight position={[10, 10, 10]} angle={Math.PI/4} penumbra={1} decay={0} intensity={Math.PI} /> */}
        <meshStandardMaterial color="orange" wireframe={false} />
        <OrbitControls enableZoom={false} enablePan={false} />
        </mesh>
    );
  }
  
export default function Three(props: ThreeElements['mesh']) {
    const [data, setData] = useState({ nodes: [], elements: [] });

    useEffect(() => {
        (async () => {
        const response = await fetch('/api/v1/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "n": 32, "material_id": "mp-66", "fixed_nodes": [1023], "forces": [[0, 5000000000000]]
            }),
        })

        setData(await response.json())
    
        })();

    },[])

    console.log(data)

    
    if (!data || !data.nodes || !data.elements) {
        return <div>Loading...</div>;
    }

    const nodes = data.nodes.flat()
    const elements = data.elements.flat()

    // average node values to get the center of the object
    const centerX = nodes.reduce((acc, val, index) => (index % 3 === 0 ? acc + val : acc), 0) / (nodes.length / 3);
    const centerY = nodes.reduce((acc, val, index) => (index % 3 === 1 ? acc + val : acc), 0) / (nodes.length / 3);
    const centerZ = nodes.reduce((acc, val, index) => (index % 3 === 2 ? acc + val : acc), 0) / (nodes.length / 3);

    // get the min and max values of the nodes to get the size of the object
    const minX = Math.min(...nodes.filter((_, index) => index % 3 === 0));
    const minY = Math.min(...nodes.filter((_, index) => index % 3 === 1));
    const minZ = Math.min(...nodes.filter((_, index) => index % 3 === 2));
    const maxX = Math.max(...nodes.filter((_, index) => index % 3 === 0));
    const maxY = Math.max(...nodes.filter((_, index) => index % 3 === 1));
    const maxZ = Math.max(...nodes.filter((_, index) => index % 3 === 2));

    const sizeX = maxX - minX;
    const sizeY = maxY - minY;
    const sizeZ = maxZ - minZ;

    // get camera position based on the size of the object
    const fov = 2 * Math.atan((sizeY / 2) / (sizeY / Math.sqrt(2))) * (180 / Math.PI);
    const cameraPosition = [centerX, centerY, centerZ + sizeZ * 2.5]; // Adjust the Z position to move the camera back
    const rotation = [Math.PI / 2, 0, 0]

    // get the camera position based on the size of the object
''
    return (
        <div className="h-screen w-screen">
            <Canvas shadows={true}>
                {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
                <CustomObject nodes={nodes} elements={elements} position = {[0, -10, 0]} />
                {/* {/* <Box position={[-1.2, 0, 0]} /> */}
                {/* <Box position={[2.4, 0, 0]} /> */}
            </Canvas>
         </div>
    )
}

