import React from "react";

export default function Gallery({ onSelect }) {
  const textures = [
    { id: 1, img: "/texture1.jpg", texture: "/texture1.jpg" },
    { id: 2, img: "/texture2.jpg", texture: "/texture2.jpg" },
    { id: 3, img: "/texture3.jpg", texture: "/texture3.jpg" },
    { id: 4, img: "/texture4.jpg", texture: "/texture4.jpg" },
    { id: 5, img: "/texture5.jpg", texture: "/texture5.jpg" },
    { id: 6, img: "/texture6.jpg", texture: "/texture6.jpg" },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-5 my-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 hide-scrollbar">
      {textures.map(({ id, img, texture }) => (
        <div
          key={id}
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => onSelect(texture)}
        >
          <img
            className="h-[140px] w-[140px] md:h-[150px] md:w-[150px]  hover:scale-105 transition-all"
            src={img}
            alt={`Texture ${id}`}
            style={{
              borderRadius: "10px",
              boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
            }}
          />
          <p className="text-white font-medium mt-3 hover:font-bold">
            Texture {id}
          </p>
        </div>
      ))}
    </div>
  );
}
