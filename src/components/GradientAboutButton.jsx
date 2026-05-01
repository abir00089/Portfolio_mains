import React from "react";

const GradientAboutButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-2 rounded-md font-semibold text-neutral-300 transition-all duration-300 hover:text-white bg-[#5a2e4a]/40 hover:bg-[#5a2e4a]/60 overflow-hidden group cursor-pointer border border-[#c44b7d]/30"
    >
      <span className="relative z-10 text-lg tracking-wide">About</span>
      {/* Gradient glow at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ea4884] via-[#ca2f8c] to-[#7a57db] group-hover:h-[4px] transition-all duration-300"></div>
    </button>
  );
};

export default GradientAboutButton;
