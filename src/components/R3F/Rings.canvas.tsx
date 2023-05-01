
import { RootState, useFrame } from '@react-three/fiber';
import * as React from 'react'
import { BufferGeometry, Color, Material, Mesh, MeshStandardMaterial } from 'three';

const Rings = () => {
    const meshRef = React.useRef<Mesh<BufferGeometry, Material | Material[]>[]>([]);

    useFrame((state: RootState) => {

        let elapsed = state.clock.getElapsedTime();
        for (let index: number = 0; index < meshRef.current.length; index++) {
            let mesh = meshRef.current[index];

            // * let z = (index - 7) * 3.5;
            let z = (index - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;

            mesh.position.set(0, 0, -z); // * Here we set the position of each rings by z 

            let dist = Math.abs(z);

            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

            let colorScale = 1;

            if (dist > 2) colorScale = 1 - (Math.min(dist, 12) - 2) / 10

            colorScale = 0.5;

            if (index % 2 === 1) {
                (mesh.material as MeshStandardMaterial).emissive = new Color(6, 0.15, 0.7).multiplyScalar(0.5)
            } else {
                (mesh.material as MeshStandardMaterial).emissive = new Color(0.1, 0.7, 3).multiplyScalar(0.5)
            }


        }
    });
    return (
        <>
            {
                [...Array(14)].map((_, index: number) => (

                    <mesh
                        castShadow
                        receiveShadow
                        position={[0, 0, 0]}
                        key={index}
                        ref={(el) => {
                            if (el) {
                                meshRef.current[index] = el;
                            }
                        }}
                    >
                        <torusGeometry args={[3.35, 0.05, 16, 100]} attach={"geometry"} />
                        <meshStandardMaterial emissiveIntensity={0.5} emissive={[0.5, 0.5, 0.5]} color={[1, 1, 1]} />
                    </mesh>
                ))
            }
        </>
    )
}

export default Rings