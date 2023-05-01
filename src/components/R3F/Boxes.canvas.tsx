
import { RootState, useFrame } from '@react-three/fiber';
import * as React from 'react'
import { BufferGeometry, Color, Material, Mesh, Vector3 } from 'three'

interface IBox {
    color: Color | [r: number, g: number, b: number],
}

const riseToPower: number = 2.0;
const changeScaleByFactors: number = 0.5;
const addScaleOffset: number = 0.05

const Box = ({ color }: IBox): JSX.Element => {

    const getInitialPosition = () => {
        let vectorThree = new Vector3((Math.random() * 2 - 1) * 2.0, (Math.random() * 2.5) + 0.9, (Math.random() * 2 - 1) * 15);
        if (vectorThree.x < 0) vectorThree.x -= 1.75;
        if (vectorThree.x > 0) vectorThree.x += 1.75;
        return vectorThree;
    }
    const resetPosition = () => {
        let vectorThree = new Vector3((Math.random() * 2 - 1) * 2.0, (Math.random() * 2.5) + 0.9, (Math.random() * 2 + 10));
        if (vectorThree.x < 0) vectorThree.x -= 1.75;
        if (vectorThree.x > 0) vectorThree.x += 1.75;
        setBoxPosition(vectorThree);
    }


    const box = React.useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
    const [scale] = React.useState<number>(() => Math.pow(Math.random(), riseToPower) * changeScaleByFactors + addScaleOffset);
    const time = React.useRef(0)

    // rotation & speed of boxes

    const [xRotationSpeed] = React.useState(() => Math.random());
    const [yRotationSpeed] = React.useState(() => Math.random());

    // position of boxes 
    const [boxPosition, setBoxPosition] = React.useState<Vector3>(getInitialPosition());

    // useFrame 

    useFrame((_: RootState, delta: number) => {
        time.current += delta * 1.2;

        let newZ = boxPosition.z - (time.current);

        if (newZ < -10) {
            resetPosition();
            time.current = 0;
        }
        box.current?.position.set(boxPosition.x, boxPosition.y, newZ);
        if (box.current) box.current.rotation.x += delta * xRotationSpeed;
        if (box.current) box.current.rotation.y += delta * yRotationSpeed;
    })


    return (
        <>
            <mesh ref={box} scale={scale} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} envMapIntensity={0.15} emissive={color} emissiveIntensity={1.1} />
            </mesh>
        </>
    )
}


// Create the 100 clones of box

export const Boxes = () => {
    return (
        <>
            {
                [...Array(30)].fill(0).map((_, index: number) => (<Box key={index} color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />))
            }
        </>
    )
}

export default Boxes

