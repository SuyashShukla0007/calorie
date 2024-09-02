import React from 'react';
import './LoadingDots.css'; // Import the CSS file for the wave animation

const LoadingDots: React.FC = () => {
  return (
    <div className="flex w-[76vw]  justify-center top-0 left-[0vw] absolute lg:w-[76vw] m-0 p-0 items-center h-screen bg-black">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full dot"></div>
        <div className="w-4 h-4 bg-white rounded-full dot"></div>
        <div className="w-4 h-4 bg-white rounded-full dot"></div>
      </div>
    </div>
  );
};

export default LoadingDots;
