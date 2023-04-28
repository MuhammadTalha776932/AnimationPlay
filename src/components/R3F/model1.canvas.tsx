import * as THREE from 'three';
import * as React from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"
import { easing } from 'maath'

type GLTFResult = GLTF & {
    nodes: {
        [x: string]: any;
        Suzanne: THREE.Mesh
    }
    materials: {
        [x: string]: any;
        ['Material.001']: THREE.MeshStandardMaterial
    }
}


const ThreeDLogo = () => {
    const { nodes, materials } = useGLTF("/logo.glb") as unknown as GLTFResult;
    const groups = React.useRef<GroupProps>();
    useFrame((state, delta) => {
        const isBreakpoint: boolean = window.innerWidth <= 1300;
        const isMobile: boolean = window.innerWidth <= 600;

        // * set the initial position of the model
        let targetPosition: [x: number, y: number, z: number] = [-0.4, 0, 4]; // ? position:[x:number,y:number,z:number]


        if (isBreakpoint) targetPosition = [0, 0, 2];
        if (isMobile) targetPosition = [0, 0.2, 2.5];


        // * set model camera position
        easing.damp3(state.camera.position, targetPosition, 0.25, delta)
        // * set the model rotation smoothly
        const rotation = groups.current?.rotation as unknown as THREE.Euler
        easing.dampE(
            rotation || new THREE.Euler(), // use optional chaining to access rotation
            [state.pointer.y / 5, -state.pointer.x / 2, 0],
            0.25,
            delta,
        )
        // easing.dampE(
        //     groups.current.rotation,
        //     [state.pointer.y / 10, -state.pointer.x / 5, 0],
        //     0.25,
        //     delta,
        // )
    });
    return (
        <React.Fragment>
            <group dispose={null}>
                <group scale={0.0091}>
                    <mesh
                        geometry={nodes.FrontSide.geometry}
                        material={nodes.FrontSide.material}

                        position={[0, 0, 0]}
                        scale={[2, 2, 2]}
                    />
                </group>
            </group>
        </React.Fragment>
    )
}

useGLTF.preload("/logo.glb");

export default ThreeDLogo