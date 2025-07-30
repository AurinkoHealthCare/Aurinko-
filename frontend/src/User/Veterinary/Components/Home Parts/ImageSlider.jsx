import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider() {
  const images = [
    { url: "/Assets/banner/Nanophosphosom.webp" },
    { url: "/Assets/banner/Neuna particle.webp" },
    { url: "/Assets/banner/Nunamin.webp" },
    { url: "/Assets/banner/Reintoni.webp" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full transition-transform duration-500 ease-in-out"
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
