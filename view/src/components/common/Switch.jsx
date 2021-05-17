import React from "react";

export default function SwitchSlider({ isToggled, onToggle, className }) {
  return (
    <div className={className}>
      <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />

        <span className="slider"></span>
      </label>
    </div>
  );
}
