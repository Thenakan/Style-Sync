// components/VideoBanner.tsx
import React from "react";


const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] flex justify-center items-center bg-black overflow-hidden">
      <video
        className="w-full h-full object-cover rounded-lg shadow-lg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://res.cloudinary.com/dcuarscor/video/upload/v1738834189/Style_Sync_2_zscxfz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center bg-black bg-opacity-30">
        <h1 className="text-4xl font-bold">Welcome to StyleSync</h1>
        <p className="text-lg mt-2">Discover Your Perfect Look</p>
      </div> */}
    </div>
  );
};

export default VideoBanner;
