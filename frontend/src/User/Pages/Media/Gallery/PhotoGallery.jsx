import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../../../api/axios";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PhotoGallery = () => {
  const { t } = useTranslation("gallery");
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/gallery/all");
      setImages(data.data);

      // extract unique categories
      const uniqueCats = [...new Set(data.data.map((img) => img.category))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  // ✅ filter images based on selected category
  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-gray-100 px-6 py-16">
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📸 {t("Photo_Gallery")}
      </motion.h1>

      {/* Category Filter */}
      <div className="mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">{t("All_Categories")}</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-gray-500">No images available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredImages.map((photo, index) => (
            <motion.div
              key={photo._id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={photo.url}
                alt="gallery"
                className="w-full h-60 object-contain"
              />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-5 text-white text-3xl"
                onClick={() => setSelectedIndex(null)}
              >
                <FaTimes />
              </button>

              <button
                className="absolute left-5 text-white text-4xl"
                onClick={prevImage}
              >
                <FaChevronLeft />
              </button>

              <motion.img
                key={filteredImages[selectedIndex]._id}
                src={filteredImages[selectedIndex].url}
                alt="Selected"
                className="max-w-[90%] max-h-[90%] object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              <button
                className="absolute right-5 text-white text-4xl"
                onClick={nextImage}
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
