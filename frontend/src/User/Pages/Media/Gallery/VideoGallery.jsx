import React from "react";
import { motion } from "framer-motion";

const videos = [
  "/Assets/Media/Gallery/Video/Video Auricam.mp4",
  "/Assets/Media/Gallery/Video/Video AuriJoint.mp4",
  "/Assets/Media/Gallery/Video/Video AuriSom.mp4",
];

const VideoGallery = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b px-6 py-16">
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎬 Explore Videos Categories
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {videos.map((video, index) => (
          <div key={index} className="rounded-lg shadow-md overflow-hidden">
            <video
              className="w-full h-64"
              controls
              preload="none"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
