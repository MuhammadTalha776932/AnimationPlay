import * as React from "react"
import { MeshReflectorMaterial } from "@react-three/drei"
import { RootState, useFrame, useLoader } from "@react-three/fiber"
import { LinearEncoding, RepeatWrapping, Texture, TextureLoader } from "three"

export const Ground = () => {


    const [roughness, normal] = useLoader(TextureLoader, [
        '/textures/terrain-roughness.jpg',
        '/textures/terrain-normal.jpg',
    ])
    React.useEffect(() => {
        [normal, roughness].forEach((texture: Texture) => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.repeat.set(5, 5);
        });
        normal.encoding = LinearEncoding;
    }, [normal, roughness])


    // * Here we change the texture offset according to the clock by 0.128 factor each seconds
    useFrame((state: RootState, _delta: number) => {
        let t = -state.clock.getElapsedTime() * 0.128;
        (roughness as Texture).offset.set(0, t);
        (normal as Texture).offset.set(0, t);
    })

    return (
        <mesh
            // rotation-x={-Math.PI * 0.5} 
            rotation={[(-Math.PI * 0.5), 0, 0]}
            castShadow
            receiveShadow >
            <planeGeometry args={[300, 300]} />
            <MeshReflectorMaterial
                envMapIntensity={0}
                normalMap={normal}
                roughnessMap={roughness}
                dithering={true}
                color={[0.015, 0.015, 0.015]}
                roughness={0.7}
                blur={[1000, 400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.01}
                minDepthThreshold={0.9}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                reflectorOffset={0.2}
            />
        </mesh >
    )
}