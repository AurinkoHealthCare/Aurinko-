import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Gallery = () => {
  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-16"
    >
      <motion.h1
        className="text-5xl font-extrabold e relative z-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📷 Explore Our Stunning Gallery 🎬
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 relative z-10 text-center max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Dive into a world of breathtaking photos and immersive videos.
        Click below to explore our collections!
      </motion.p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-black/20 backdrop-blur-md border border-white/10"
        >
          <Link to="/photos" className="block" onClick={(e) => reloadPage(e, "/photos")}>
            <img
              src="Assets/Media/Photos/17.jpeg"
              alt="Photos"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6 text-center ">
              <h2 className="text-2xl font-bold">📸 View Photos</h2>
              <p className="text-gray-700 mt-2">Explore our beautiful moments.</p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-black/20 backdrop-blur-md border border-white/10"
        >
          <Link to="/videos" className="block" onClick={(e) => reloadPage(e, "/videos")}>
            <img
              src="Assets/Media/Photos/25.jpeg"
              alt="Videos"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6 text-center ">
              <h2 className="text-2xl font-bold">🎥 Watch Videos</h2>
              <p className="text-gray-700 mt-2">Experience moments in motion.</p>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Gallery;
