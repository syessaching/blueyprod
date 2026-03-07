import React from 'react';

function TangledTape({ progress }) {
  // As progress increases, tape gets pulled down and straightens
  const pullDown = progress * 1.5; // Moves downward
  const straighten = progress / 100; // 0 = tangled, 1 = straight
  
  return (
    <svg 
      className="tangled-tape-svg" 
      width="300" 
      height="150" 
      viewBox="0 0 300 150"
      style={{ 
        opacity: 1 - (progress / 100),
        transform: `translateX(-50%) translateY(${pullDown}px)`
      }}
    >
      {/* Single tape line that straightens */}
      <path 
        d={`M 100,150 
            Q ${120 - straighten * 20},${100 - straighten * 50} 
              ${150},${80 - straighten * 30}
            Q ${180 + straighten * 20},${60 - straighten * 40}
              200,150`}
        stroke="#654321" 
        strokeWidth="10" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default TangledTape;