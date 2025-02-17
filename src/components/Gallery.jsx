import React from "react";

export default function Gallery({ onSelect }) {
  const textures = [
    { id: 1, img: "/texture1.jpg", texture: "/texture1.jpg" },
    { id: 2, img: "/texture2.jpg", texture: "/texture2.jpg" },
    { id: 3, img: "/texture3.jpg", texture: "/texture3.jpg" },
    { id: 4, img: "/texture4.jpg", texture: "/texture4.jpg" },
    { id: 5, img: "/texture5.jpg", texture: "/texture5.jpg" },
    { id: 6, img: "/texture6.jpg", texture: "/texture6.jpg" }
  ];

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}>
      {textures.map(({ id, img, texture }) => (
        <div key={id} style={{ cursor: "pointer", textAlign: "center" }} onClick={() => onSelect(texture)}>
          <img src={img} alt={`Texture ${id}`} style={{ width: "150px", height: "150px", borderRadius: "10px", boxShadow: "0 5px 10px rgba(0,0,0,0.3)" }} />
          <p style={{ color: "white", marginTop: "10px"}}  >Texture {id}</p>
        </div>
      ))}
    </div>
  );
}
