import * as React from 'react'
import { RootState, useFrame, useLoader } from "@react-three/fiber";
import { RepeatWrapping, Texture, TextureLoader } from 'three'

const FloatingGrid = () => {
    const diffuse: Texture = useLoader(TextureLoader, "/textures/grid-texture.png");

    React.useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 100; // original 4
        diffuse.repeat.set(30, 30);
        diffuse.offset.set(0, 0)
    }, [diffuse])

    useFrame((state: RootState, _delta: number) => {
        let t = state.clock.getElapsedTime() * 0.68;

        diffuse.offset.set(0, -t);
    })

    return (
        <>
            <mesh
                rotation-x={-Math.PI * 0.5}
                position={[0, 0.425, 0]}
            >
                <planeGeometry args={[35, 35]} />
                <meshBasicMaterial
                    color={[1, 1, 1]}
                    opacity={0.15}
                    map={diffuse}
                    alphaMap={diffuse}
                    transparent={true}
                />

            </mesh>
        </>
    )
}

export default FloatingGrid