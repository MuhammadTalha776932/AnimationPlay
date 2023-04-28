import * as React from "react"
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Ground } from "./Ground.canvas";
import Car from "./Car.canvas";




const CanvasRoot = () => {
    return (
        <React.Fragment>
            <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
            <PerspectiveCamera castShadow fov={50} position={[3, 2, 5,]} makeDefault />
            {/* let color = new Color(0,0,0) */}
            <color args={[1, 1, 1]} attach={"background"} />

            {/* Car Model here */}
            <Car />
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
