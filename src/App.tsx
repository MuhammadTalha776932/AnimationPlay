import * as React from 'react';

import { Canvas } from '@react-three/fiber';
import CanvasRoot from './components/R3F/index.canvas';






function App() {

  return (
    <React.Suspense fallback={null}>
      <Canvas style={{ width: "100%", height: "96vh" }}>
        <CanvasRoot />
      </Canvas>
    </React.Suspense>
  );
}

export default App;

