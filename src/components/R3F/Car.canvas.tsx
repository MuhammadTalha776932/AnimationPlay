import * as React from 'react'
import { ObjectMap, RootState, useFrame, useLoader } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Mesh, Object3D, } from 'three'
import { MeshReflectorMaterial } from '@react-three/drei/materials/MeshReflectorMaterial'

type gltfType = (GLTF | GLTF & ObjectMap)

const Car = () => {
    const gltf: gltfType = useLoader(
        GLTFLoader,
        'models/car/scene.gltf'
    );

    useFrame((state: RootState, _delta: number) => {
        let t = state.clock.getElapsedTime();

        let group = gltf.scene.children[0].children[0].children[0];

        group.children[0].rotation.x= t * 2
        group.children[2].rotation.x= t * 2
        group.children[4].rotation.x= t * 2
        group.children[6].rotation.x= t * 2
    })

    React.useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object: Object3D) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                (object.material as MeshReflectorMaterial).envMapIntensity = 20;
            }
        });
    }, [gltf])
    return <primitive object={gltf.scene} />
}

export default Car