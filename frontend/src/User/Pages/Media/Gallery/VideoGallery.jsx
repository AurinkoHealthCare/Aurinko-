import React, { useEffect, useState } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/video/all");
      if (res.data?.success) setVideos(res.data.data);
      else toast.error("Failed to fetch videos ❌");
    } catch {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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

      {loading && <p className="text-gray-500 text-center">Loading videos...</p>}
      {!loading && videos.length === 0 && (
        <p className="text-gray-500 text-center">No videos uploaded.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {videos.map((video) => (
          <div
            key={video._id}
            className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <video className="w-full h-64" controls preload="none">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
