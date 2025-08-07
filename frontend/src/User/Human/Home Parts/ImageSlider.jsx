import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "../../../../api/axios";
import i18n from "../../../i18n";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // 📸 Fetch first 5 images by lang
  const fetchImages = async (lang) => {
    try {
      const res = await axios.get(`/sliderimage/home/${lang}`);
      const validImages = Array.isArray(res.data.images) ? res.data.images : [];
      setImages(validImages.slice(0, 5)); 
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImages([]);
    }
  };

  // 🚀 Run on language change
  useEffect(() => {
    const lang = i18n.language || "en";
    fetchImages(lang);
    setCurrentIndex(0);

    // listener so slider auto-updates on lang change
    const onLangChanged = (lng) => {
      fetchImages(lng);
      setCurrentIndex(0);
    };

    i18n.on("languageChanged", onLangChanged);

    return () => {
      i18n.off("languageChanged", onLangChanged);
    };
  }, []);

  // ⏱️ Auto Slide
  useEffect(() => {
    if (images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  // ⬅️ Prev Slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ➡️ Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center text-gray-500">
        Loading slider...
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full transition-transform duration-500 ease-in-out object-cover"
          loading="eager"
        />
      </div>

      {/* Left Button */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-800 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-900/50 text-white p-2 rounded-full hover:bg-gray-800 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
