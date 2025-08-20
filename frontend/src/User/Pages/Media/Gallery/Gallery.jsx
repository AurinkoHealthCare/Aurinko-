import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../../../../api/axios";
import { useTranslation } from 'react-i18next';

const Gallery = ({ category }) => {
  const { t } = useTranslation("gallery");

  const [images, setImages] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  // Fetch images based on category
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(`/gallery/all?category=${category}`);
      setImages(data.data);
      if (data.data.length > 0) {
        const initialIndex = Math.floor(Math.random() * data.data.length);
        setRandomImage(data.data[initialIndex]);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category]);

  // Change random image every 10 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
      }, 10000); // 10 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">
      <motion.h1
        className="text-5xl font-extrabold relative z-10 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📷 {t("heading1")} 🎬
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 relative z-10 text-center max-w-2xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {t("heading2")}
      </motion.p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Dynamic Photo Preview */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-black/20 backdrop-blur-md border border-white/10"
        >
          <Link
            to={`/${category}/photo_gallery`}
            className="block"
            onClick={(e) => reloadPage(e, `/${category}/photo_gallery`)}
          >
            <img
              src={randomImage ? randomImage.url : "Assets/Media/Photos/17.jpeg"}
              alt={`${category} Photos`}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold">📸 {t("View_Photos")}</h2>
              <p className="text-gray-700 mt-2">{t("Photos_Description")}</p>
            </div>
          </Link>
        </motion.div>

        {/* Static Video Card */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-black/20 backdrop-blur-md border border-white/10"
        >
          <Link
            to={`/${category}/videos`}
            className="block"
            onClick={(e) => reloadPage(e, `/${category}/videos`)}
          >
            <img
              src={randomImage ? randomImage.url : "Assets/Media/Photos/17.jpeg"}
              alt={`${category} Videos`}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold">🎥 {t("View_Videos")}</h2>
              <p className="text-gray-700 mt-2">{t("Videos_Description")}</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
