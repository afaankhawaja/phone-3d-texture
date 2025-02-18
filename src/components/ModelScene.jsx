import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, useGLTF, useTexture } from "@react-three/drei";
import CloseIcon from '@mui/icons-material/Close';
import { FaSync, FaArrowsAlt, FaExpandArrowsAlt, FaRedo } from "react-icons/fa";

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
    camera.position.set(5, 5, 60);
    camera.lookAt(0, 0, 0);
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

      {/* Control Buttons - Responsive */}
      <div className="absolute max-md:bottom-5 left-5 md:top-5 md:left-5  flex flex-wrap gap-2 md:gap-3 p-2 bg-black bg-opacity-30 rounded-lg">
        <button
          className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-2 rounded-full shadow-md text-white transition ${
            showControls ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => setShowControls(!showControls)}
        >
          <FaArrowsAlt />
          {showControls ? "Disable" : "Enable"}
        </button>

        <button
          className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-2 rounded-full shadow-md text-white transition ${
            controlMode === "rotate" ? "bg-blue-700" : "bg-gray-700 hover:bg-gray-800"
          }`}
          onClick={() => setControlMode("rotate")}
          disabled={!showControls}
        >
          <FaRedo />
          Rotate
        </button>

        <button
          className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-2 rounded-full shadow-md text-white transition ${
            controlMode === "translate" ? "bg-green-700" : "bg-gray-700 hover:bg-gray-800"
          }`}
          onClick={() => setControlMode("translate")}
          disabled={!showControls}
        >
          <FaExpandArrowsAlt />
          Move
        </button>

        <button
          className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-2 rounded-full shadow-md text-white transition ${
            controlMode === "scale" ? "bg-yellow-700" : "bg-gray-700 hover:bg-gray-800"
          }`}
          onClick={() => setControlMode("scale")}
          disabled={!showControls}
        >
          <FaSync />
          Scale
        </button>

        <button
          className="px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-2 rounded-full shadow-md bg-purple-500 hover:bg-purple-600 text-white transition"
          onClick={() => setResetTrigger((prev) => prev + 1)}
        >
          <FaSync />
          Reset
        </button>
      </div>

      {/* 3D Model Canvas */}
      <div className="w-[90vw] h-[80vh] bg-transparent rounded-lg p-2">
        <Canvas camera={{ position: [0, 0, 60], fov: 75 }} className="w-full h-full">
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
