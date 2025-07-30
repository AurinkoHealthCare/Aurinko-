import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // 📸 Fetch all images
  const fetchImages = async () => {
    try {
      const res = await axios.get("/images/all");
      const validImages = Array.isArray(res.data.images) ? res.data.images : [];
      setImages(validImages);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImages([]);
    }
  };

  // 🔍 Track visitor and show geo toast
  const trackVisitor = async () => {
    try {
      const res = await axios.get("/visitors/track");
      const { country, region, city } = res.data;
      showWelcomeToast(country, region, city);
    } catch (err) {
      console.error("Visitor tracking failed:", err);
    }
  };

  // 🚀 First Load
  useEffect(() => {
    fetchImages();
    trackVisitor();
  }, []);

  // ⏱️ Auto Slide Interval
  useEffect(() => {
    if (images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  // ⬅️ Prev Slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ➡️ Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 🔃 Loading state
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
