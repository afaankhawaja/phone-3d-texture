import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, useGLTF, useTexture } from "@react-three/drei";
import CloseIcon from '@mui/icons-material/Close';
import ControlButtons from "./ControlButtons";

function Model({ texturePath, controlMode, showControls }) {
  const { scene } = useGLTF("/iPhone16.glb");
  const clonedScene = scene.clone();
  const texture = useTexture(texturePath);

  clonedScene.traverse((child) => {
    if (child.isMesh && child.name === "Mesh001") {  
      child.material = child.material.clone();
      child.material.map = texture;
      child.material.roughness = 0.30;  
      child.material.metalness = 0.00;
      child.material.needsUpdate = true;
    }
  });

  return showControls ? (
    <TransformControls mode={controlMode}>
      <primitive object={clonedScene} />
    </TransformControls>
  ) : (
    <primitive object={clonedScene} />
  );
}

function ResetCamera({ resetTrigger }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 100);
  }, [camera, resetTrigger]); 

  return null;
}

export default function ModelScene({ texturePath, onClose }) {
  const [controlMode, setControlMode] = useState("rotate");
  const [showControls, setShowControls] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
      
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        onClick={onClose}
      >
        <CloseIcon className="text-red-500" />
      </button>

      {/* Control Buttons Component */}
      <ControlButtons 
        showControls={showControls} 
        setShowControls={setShowControls} 
        controlMode={controlMode} 
        setControlMode={setControlMode} 
        setResetTrigger={setResetTrigger} 
      />

      {/* 3D Model Canvas */}
      <div className="w-[90vw] max-lg:h-[60vh] lg:h-[80vh] bg-transparent rounded-lg p-2">
        <Canvas camera={{ position: [0, 0, 100] }} className="w-full h-full">
          <ResetCamera resetTrigger={resetTrigger} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Model texturePath={texturePath} controlMode={controlMode} showControls={showControls} />
          <OrbitControls minDistance={20} maxDistance={300} />
        </Canvas>
      </div>
    </div>
  );
}
