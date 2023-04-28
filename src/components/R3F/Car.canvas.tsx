import * as React from 'react'
import { ObjectMap, useLoader } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Mesh, Object3D, } from 'three'
import { MeshReflectorMaterial } from '@react-three/drei/materials/MeshReflectorMaterial'

type gltfType = (GLTF | GLTF & ObjectMap) 

const Car = () => {
    const gltf: gltfType = useLoader(
        GLTFLoader,
        'models/car/scene.gltf'
    );

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
    return <primitive object={gltf.scene}/>
}

export default Car