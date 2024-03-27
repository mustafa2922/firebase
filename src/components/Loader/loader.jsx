import React from "react";
import "./loader.css"; // Styles for loader

const CircularLoader = () => {
  return (
    <div className="fullscreen-container">
      <div className={`loader visible`}>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default CircularLoader;
