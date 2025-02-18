import React from "react";
import { FaSync, FaArrowsAlt, FaExpandArrowsAlt, FaRedo } from "react-icons/fa";

export default function ControlButtons({ showControls, setShowControls, controlMode, setControlMode, setResetTrigger }) {
  return (
    <div className="absolute max-md:bottom-5 left-5 md:top-5 md:left-5 flex flex-wrap gap-2 md:gap-3 p-2 bg-black bg-opacity-30 rounded-lg">
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
  );
}
