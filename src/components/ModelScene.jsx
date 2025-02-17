import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import CloseIcon from '@mui/icons-material/Close';

function Model({ texturePath }) {
  // Load model
  const { scene } = useGLTF("/iPhone16.glb");

  // Clone the scene to avoid texture overriding
  const clonedScene = scene.clone();

  const texture = useTexture(texturePath);

  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.map = texture;
      child.material.needsUpdate = true;
    }
  });

  return <primitive object={clonedScene} />;
}

export default function ModelScene({ texturePath, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
       className="absolute top-5 right-5 p-[10px] cursor-pointer bg-white"
        onClick={onClose} 
      >
       <div className="flex hover:scale-125"><CloseIcon /></div> 
      

      </div>
      <Canvas
        camera={{ position: [5, 5, 10], fov: 50 }}
        style={{ width: "80vw", height: "80vh" }}
      >
        {/* Scene-specific lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        <Model texturePath={texturePath} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}
