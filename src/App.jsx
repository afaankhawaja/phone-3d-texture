import React, { useState } from "react";
import Gallery from "./components/Gallery";
import ModelScene from "./components/ModelScene";
import "./index.css";
export default function App() {
  const [selectedTexture, setSelectedTexture] = useState(null);

  return (
    <div className="hide-scrollbar">
      <div className="flex flex-col min-h-fit py-10 h-[100vh] items-center justify-center overflow-scroll hide-scrollbar">
        <h1 className="max-md:text-center max-md:px-5 font-bold text-3xl mb-5">
          Select a Model Texture
        </h1>
        <Gallery onSelect={(texture) => setSelectedTexture(texture)} />

        {/* Display the model scene if a texture is selected */}
        {selectedTexture && (
          <ModelScene
            texturePath={selectedTexture}
            onClose={() => setSelectedTexture(null)}
          />
        )}
      </div>
    </div>
  );
}
