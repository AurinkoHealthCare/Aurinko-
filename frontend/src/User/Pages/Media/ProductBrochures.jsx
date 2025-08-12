import React, { useState, useEffect } from "react";
import { FaTimes, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "../../../../api/axios";

const ProductBrochures = ({ category }) => {
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [category]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/brochures/all");
      const allImages = Array.isArray(res.data) ? res.data : res.data.data || [];

      // Filter images by category (case-insensitive)
      const filtered = allImages.filter(
        (img) =>
          img.category &&
          img.category.toLowerCase() === category.toLowerCase()
      );

      setItems(filtered);
    } catch (err) {
      console.error("Error fetching brochures:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => {
    setSelectedIndex(null);
    setZoom(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const downloadImage = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name || "brochure.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading brochures...</div>;
  }

  if (items.length === 0) {
    return <div className="text-center py-10">No brochures found for "{category}"</div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center mx-auto p-6">
      {/* Heading */}
      <div className="w-full max-w-7xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          {category.charAt(0).toUpperCase() + category.slice(1)} Brochures
        </h1>
        <div className="h-1 w-32 bg-orange-500 mx-auto mt-4"></div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {items.map((item, index) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-lg p-4 bg-white flex flex-col items-center cursor-pointer hover:shadow-xl transition"
            onClick={() => openImage(index)}
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <p className="font-medium text-gray-700">{item.name || "No Name"}</p>
          </div>
        ))}
      </div>

      {/* Full-Screen View */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="relative flex items-center justify-center w-full max-w-4xl max-h-[80vh]">
            <img
              src={items[selectedIndex].url}
              alt={items[selectedIndex].name}
              className={`max-w-full max-h-[75vh] transition-transform duration-300 ${
                zoom ? "scale-125" : "scale-100"
              }`}
              onClick={() => setZoom(!zoom)}
            />

            {/* Prev Button */}
            <button
              className="absolute top-1/2 left-4 text-white text-3xl transform -translate-y-1/2"
              onClick={prevImage}
            >
              <FaChevronLeft />
            </button>

            {/* Next Button */}
            <button
              className="absolute top-1/2 right-4 text-white text-3xl transform -translate-y-1/2"
              onClick={nextImage}
            >
              <FaChevronRight />
            </button>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex space-x-4 text-gray-300 text-2xl">
              <button
                onClick={() =>
                  downloadImage(items[selectedIndex].url, items[selectedIndex].name)
                }
              >
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