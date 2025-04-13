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
    color?: string; // Optional color prop
}

function generateGeometry(nodes: number[], elements: number[]) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(nodes); // Convert nodes to Float32Array
    const indices = new Uint16Array(elements); // Convert elements to Uint16Array

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 values per vertex (x, y, z)
    geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 value per index
    geometry.computeVertexNormals(); // Compute normals for lighting

    return [geometry, vertices, indices];
}


function CustomObject({ nodes, elements, color }: CustomObjectProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { camera } = useThree();

    // Create the geometry
    const [geometry, vertices, indices] = generateGeometry(nodes, elements) as [THREE.BufferGeometry, Float32Array, Uint16Array];

    return (
        <mesh ref={meshRef} geometry={geometry} receiveShadow={true} castShadow={true}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[0, 0, 30]} angle={Math.PI / 4} penumbra={1} decay={0} intensity={1} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}

function InteractiveModel(props: { meshProps?: ThreeElements['mesh'], nodes: number[], originalNodes: number[], elements: number[], displacement: number[] }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { camera } = useThree();
    const [finishedAnimation, setFinishedAnimation] = useState(false);
    const [geometry, setGeometry] = useState(generateGeometry(props.originalNodes, props.elements)[0] as THREE.BufferGeometry);

    // Create the geometry
    // setGeometry(generateGeometry(props.originalNodes, props.elements)[0] as THREE.BufferGeometry);

    if (!geometry) {
        return null;
    }

    const positionAttribute = geometry.getAttribute('position');

    // positionAttribute.setUsage(THREE.DynamicDrawUsage);

    useFrame(() => {
        if (finishedAnimation)
            return;

        for (let i = 0; i < positionAttribute.count; i++) {
            const z = positionAttribute.getZ(i);

            // Apply some transformation to the vertices
            const d = props.displacement[i] * 0.01;
            if (d > 0) {
                // meshRef.current.geometry.attributes.position.setZ(i, Math.max(z + d * 0.01, props.nodes[i])); // Clamp to original node position
                // positionAttribute.setZ(i, Math.min(z + d * 0.01, props.nodes[i])); // Clamp to original node position
            } else {
                // meshRef.current.geometry.attributes.position.setZ(i, Math.min(z + d * 0.01, props.nodes[i])); // Clamp to original node position
                // positionAttribute.setZ(i, Math.max(z + d * 0.01, props.nodes[i])); // Clamp to original node position
            }

        }
        positionAttribute.needsUpdate = true; // Flag the attribute as needing an update
        if (positionAttribute.getZ(0) == props.nodes[0]) {
            setFinishedAnimation(true);
            setGeometry(generateGeometry(props.nodes, props.elements)[0] as THREE.BufferGeometry);
        }
    });

    useFrame(() => {
        // make camera spin around the object
        camera.position.x = center[0] + Math.sin(Date.now() * 0.0001) * sizes[0] * 1.5;
        camera.position.y = center[1] + Math.cos(Date.now() * 0.0001) * sizes[1] * 1.5;
        camera.position.z = center[2] + sizes[2] * 2;
        camera.lookAt(...center);
    })

    const maxDisplacement = Math.max(...props.displacement.map((d: number) => Math.abs(d)));
    const simColors = props.displacement.map((d: number) => {
        const color = Math.pow(1 - Math.abs(d) / maxDisplacement, 8);

        const green = Math.min(1, color * 2);
        const red = Math.min(1, Math.max(0, (1 - color) * 2));
        const blue = 0;
        return [red, green, blue];
    }).flat();
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(simColors), 3)); // 3 values per color (r, g, b)

    // Set the camera position if provided
    const center = [0, 1, 2].map((i) => props.nodes.reduce((acc, val, index) => (index % 3 === i ? acc + val : acc), 0) / (props.nodes.length / 3)) as [number, number, number];

    // get the min and max values of the nodes to get the size of the object
    const mins = [0, 1, 2].map((i) => Math.min(...props.nodes.filter((_, index) => index % 3 === i)));
    const maxes = [0, 1, 2].map((i) => Math.max(...props.nodes.filter((_, index) => index % 3 === i)));

    const sizes = maxes.map((max, index) => max - mins[index]);

    camera.up = new THREE.Vector3(0, 0, 1);
    camera.position.set(center[0] - sizes[0] * 1.5, center[1] - sizes[1] * 1.5, center[2] + sizes[2] * 2); // Adjust the Z position to move the camera back
    camera.lookAt(...center);

    return (
        <mesh ref={meshRef} {...props.meshProps} geometry={geometry} receiveShadow={true} castShadow={true}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[0, 0, 30]} angle={Math.PI / 4} penumbra={1} decay={0} intensity={1} />
            <meshStandardMaterial wireframe={true} vertexColors={true} />
            <OrbitControls enableZoom={true} enablePan={false} target={center} />
        </mesh>
    );
}

export default function Three(props: ThreeElements['mesh']) {
    const data = useRef({ nodes: [], elements: [], original_nodes: [], displacement: [] });
    const materialId = useRef('mp-66');
    const fixedNodes = useRef([31, 1023]);
    const forces = useRef([[0, 5000000000000]]);
    const n = useRef(32);
    const [loading, setLoading] = useState(true);
    const [uploadSelected, setUploadSelected] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{ name: string, path: string } | null>(null);

    const resimulate = async () => {
        const body = uploadSelected ? {
            "file_path": uploadedFile?.path,
            "material_id": materialId.current,
            "fixed_nodes": fixedNodes.current,
            "forces": forces.current
        } : {
            "n": n.current,
            "material_id": materialId.current,
            "fixed_nodes": fixedNodes.current,
            "forces": forces.current
        };

        const response = await fetch('/api/v1/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        data.current = await response.json();
        setLoading(false);
    }

    const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/v1/upload', {
                method: 'POST',
                body: formData,
            });

            setUploadedFile({
                name: file.name,
                path: (await response.json()).file_path
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            return;
        }
    }

    useEffect(() => {
        resimulate();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex items-center justify-center text-xl">Loading...</div>;
    }

    const nodes = data.current.nodes.flat()
    const elements = data.current.elements.flat()

    const maxDisplacement = Math.max(...data.current.displacement.map((d: number) => Math.abs(d)));

    const disabledSubmit = uploadSelected && (uploadedFile?.path == undefined);

    return (
        <div className="w-full h-full relative">
            <Canvas shadows={true} camera={{ up: new THREE.Vector3(0, 0, 1) }}>
                <CustomObject nodes={data.current.original_nodes.flat()} elements={elements} color="blue" />
                <InteractiveModel nodes={nodes} elements={elements} displacement={data.current.displacement} originalNodes={data.current.original_nodes.flat()} />
            </Canvas>

            <div className="absolute top-0 left-0 flex flex-col items-start justify-start p-4">
                <h1 className="text-2xl font-bold">Finite Element Analysis</h1>
                <p className="text-lg">Max Displacement: {maxDisplacement.toFixed(2)}</p>
                <p className="text-lg">Min Displacement: {Math.min(...data.current.displacement).toFixed(2)}</p>
                <p className="text-lg">Max Displacement: {Math.max(...data.current.displacement).toFixed(2)}</p>
                <p className="text-lg">Average Displacement: {(data.current.displacement.reduce((a: number, b: number) => a + b, 0) / data.current.displacement.length).toFixed(2)}</p>
                <p className="text-lg">Nodes: {nodes.length / 3}</p>
                <p className="text-lg">Elements: {elements.length / 3}</p>

                <br />

                <div>
                    <label htmlFor="select-upload" className="text-lg">Upload OBJ?</label>
                    <input type="checkbox" checked={uploadSelected} onChange={(e) => setUploadSelected(e.target.checked)} className="border border-gray-300 rounded p-2 ml-2" id="select-upload" accept='.obj' />
                </div>

                {uploadSelected ? (
                    <div className="mt-2">
                        <input type="file" className="bg-teal-500 hidden" id="upload-button" onChange={(event) => uploadHandler(event)} />
                        <label htmlFor="upload-button" className="uploadB bg-teal-100 rounded-md px-10 py-2">Upload{uploadedFile ? `ed ${uploadedFile.name}` : ''}</label>
                    </div>
                ) : (
                    <input type="number" defaultValue={n.current} onChange={(e) => n.current = parseInt(e.target.value)} className="border border-gray-300 rounded p-2" />
                )}

                <br />

                <input type="text" defaultValue={materialId.current} onChange={(e) => materialId.current = e.target.value} className="border border-gray-300 rounded p-2" />
                <input type="text" defaultValue={fixedNodes.current.join(',')} onChange={(e) => fixedNodes.current = e.target.value.split(',').map((n: string) => parseInt(n))} className="border border-gray-300 rounded p-2" />
                <input type="text" defaultValue={forces.current.map(f => f.join(':')).join(',')} onChange={(e) => forces.current = e.target.value.split(',').map((n: string) => n.split(':').map(x => parseFloat(x)))} className="border border-gray-300 rounded p-2" />
                <br />
                <button className={`bg-teal-500 text-white px-4 py-2 rounded ${disabledSubmit}`} onClick={() => { setLoading(true); resimulate(); }} disabled={disabledSubmit}>Resimulate</button>
            </div>
        </div>
    )
}

