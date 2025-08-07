import React, { useState, useEffect } from "react";
import { FaTimes, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import items from "../../Data/productbrochure";

const ProductBrochures = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoom, setZoom] = useState(false);

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
    setZoom(false);
  };

  const handleKeyDown = (event) => {
    if (selectedIndex !== null) {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const prevImage = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `image_${selectedIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center mx-auto p-6">
      <div className="w-full max-w-7xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">Product Brochures</h1>
        <div className="h-1 w-32 bg-orange-500 mx-auto mt-4"></div>
      </div>

      {/* <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => openImage(index)}
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="p-4 text-center">
                  <p className="text-gray-700 font-semibold">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="relative flex items-center justify-center w-full max-w-4xl max-h-[80vh]">
            <img
              src={items[selectedIndex].img}
              alt="Full View"
              className={`max-w-full max-h-[75vh] transition-transform duration-300 ${zoom ? "scale-125" : "scale-100"}`}
              onClick={() => setZoom(!zoom)}
            />

            <button
              className="absolute top-15 left-4 text-white text-3xl"
              onClick={prevImage}
            >
              <FaChevronLeft />
            </button>

            <button
              className="absolute top-15 right-4 text-white text-3xl"
              onClick={nextImage}
            >
              <FaChevronRight />
            </button>

            <div className="absolute top-4 right-4 flex space-x-4 text-gray-300 text-2xl">
              <button onClick={() => downloadImage(items[selectedIndex].img)}>
                <FaDownload />
              </button>
              <button onClick={closeImage}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBrochures;
