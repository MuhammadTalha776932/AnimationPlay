import * as React from "react"
import { PerspectiveCamera, OrbitControls, CubeCamera, Environment } from "@react-three/drei";
import { Ground } from "./Ground.canvas";
import Car from "./Car.canvas";
import Rings from "./Rings.canvas";
import { Texture } from "three";





const CanvasRoot = () => {
    const renderScene = (texture: Texture) => {
        return (
            <>
                <Environment map={texture} />
                <Car />
            </>
        );
    };
    return (
        <React.Fragment>
            <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
            <PerspectiveCamera castShadow fov={50} position={[3, 2, 5,]} makeDefault />
            {/* let color = new Color(0,0,0) */}
            <color args={[0, 0, 0]} attach={"background"} />
            <CubeCamera
                resolution={256}
                frames={Infinity}
                children={((texture: Texture) => renderScene(texture)) as (React.ReactNode & ((tex: Texture) => React.ReactNode))}
            />
            {/* Rings Model here */}
            <Rings />
            {/* SpotLight to projection the light at specific location */}
            <spotLight
                color={[1, 0.25, 0.7]}
                intensity={1.5}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
            />
            <spotLight
                color={[0.14, 0.5, 1]}
                intensity={1.5}
                angle={0.6}
                penumbra={0.5}
                position={[5, 5, 0]}
                castShadow
            />
            <Ground />
        </React.Fragment>
    )
}

export default CanvasRoot;
