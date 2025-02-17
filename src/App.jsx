import React, { useState } from "react";
import Gallery from "./components/Gallery";
import ModelScene from "./components/ModelScene";

export default function App() {
  const [selectedTexture, setSelectedTexture] = useState(null);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "black", marginBottom: "20px" }}>Select a Model Texture</h1>
      <Gallery onSelect={(texture) => setSelectedTexture(texture)} />

      {/* Display the model scene if a texture is selected */}
      {selectedTexture && <ModelScene texturePath={selectedTexture} onClose={() => setSelectedTexture(null)} />}
    </div>
  );
}
