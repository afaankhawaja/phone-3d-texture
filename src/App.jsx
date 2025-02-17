import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

function ModelWithTexture() {
  // Load the model
  const modal = useGLTF("/iPhone16.glb");

  // Load the texture
  const texture = useTexture("/default-texture.jpg");

  return (
    <primitive
      object={modal.scene}
    >
      {/* Apply the texture to all children materials */}
      {modal.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
        }
      })}
    </primitive>
  );
}

function App() {
  return (
    <Canvas
      camera={{ position: [20,170, 100], fov: 60 }}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 15]} intensity={1} />
      <ModelWithTexture />
      <OrbitControls />
    </Canvas>
  );
}

export default App;