import * as React from "react"
import Car from "./Car.canvas";
import Rings from "./Rings.canvas";
import Boxes from "./Boxes.canvas";
import { PerspectiveCamera, OrbitControls, CubeCamera, Environment } from "@react-three/drei";
import { Ground } from "./Ground.canvas";
import { Texture } from "three";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing"
import { BlendFunction, BloomEffect } from "postprocessing";
import FloatingGrid from "./FloatingGrid.canvas";



type CubeCameraChildrenType = React.ReactNode & ((tex: Texture) => React.ReactNode);

interface BloomProps extends BloomEffect {
    blendFunction: BlendFunction;
    intensity: number;
    width: number;
    height: number;
    kernelSize: number;
    luminanceThreshold: number;
    luminanceSmoothing: number;
}


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
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
            />
            <PerspectiveCamera
                castShadow
                fov={50}
                position={[3, 2, 5,]}
                makeDefault
            />
            {/* let color = new Color(0,0,0) */}
            <color args={[0, 0, 0]} attach={"background"} />
            <CubeCamera
                resolution={256}
                frames={Infinity}
                children={((texture: Texture) => renderScene(texture)) as CubeCameraChildrenType}
            />

            {/* Rings Model here */}
            <Rings />

            {/* Boxes Model here */}
            <Boxes />

            {/* Floating Grid Texture here */}
            <FloatingGrid/>

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

            {/* Ground or Floor */}
            <Ground />

            {/* Added the Bloom Effects */}
            <EffectComposer>
                {/* <DepthOfField
                    focusDistance={0.0035}
                    focalLength={0.01}
                    bokehScale={3}
                    height={480}
                /> */}
                <Bloom
                    {...{
                        blendFunction: BlendFunction.ADD,
                        intensity: 1.3,
                        width: 300,
                        height: 300,
                        kernelSize: 5,
                        luminanceThreshold: 0.15,
                        luminanceSmoothing: 0.025
                    } as BloomProps}
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={[0.0005, 0.0012] as unknown as THREE.Vector2}
                    radialModulation={true}
                    modulationOffset={0} />
            </EffectComposer>
        </React.Fragment>
    )
}

export default CanvasRoot;
