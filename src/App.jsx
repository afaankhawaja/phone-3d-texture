import React, { useState, useRef } from "react";
import Gallery from "./components/Gallery";
import ModelScene from "./components/ModelScene";
import { FaPlus } from "react-icons/fa";

import "./index.css";

export default function App() {
  const [selectedTexture, setSelectedTexture] = useState(null);

  const fileInputRef = useRef(null);

  // Handle texture upload
  const handleTextureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const textureURL = URL.createObjectURL(file);
      setSelectedTexture(textureURL);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="hide-scrollbar flex flex-col min-h-screen py-10 items-center justify-center">
      <h1 className="text-3xl font-bold mb-5 max-md:text-center max-md:px-5">
        Select a Texture for Model
      </h1>

      <Gallery onSelect={(texture) => setSelectedTexture(texture)} />

      <div className="mt-2">
        <div
          onClick={handleUploadClick}
          className="cursor-pointer border-[1px] border-black font-medium hover:font-semibold  bg-slate-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition flex justify-center content-center items-center gap-x-3"
        >
          <p className="flex text-xl">Upload Texture </p><FaPlus />
        </div>
        <div className="text-center text-xs font-medium mt-2">jpg, jpeg, png etc.</div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleTextureUpload}
        />
      </div>

      {selectedTexture && (
        <ModelScene
          texturePath={selectedTexture}
          onClose={() => setSelectedTexture(null)}
        />
      )}
    </div>
  );
}
