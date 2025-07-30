import React, { useState } from "react";
import { productTypes } from "../../Data/data.jsx";

const Block3 = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleOverlay = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-12 px-4 md:px-8 lg:px-16 xl:px-24 font-poppins">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-6 tracking-wide">
        PRODUCT TYPES
      </h1>
      <div
        className="h-1 w-64 rounded-full"
        style={{
          background: "linear-gradient(to right, #4ade80, #15803d)", // light green to deep green
        }}
      ></div>


      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productTypes.map((product, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg bg-white transition-transform duration-300 hover:scale-[1.02] flex flex-col"
          >
            <img
              src={product.image}
              alt={product.alt}
              className="w-full h-72 object-cover transition duration-300 ease-in-out"
            />

            {/* Know More / Back Button */}
            <button
              onClick={() => toggleOverlay(index)}
              className="mx-auto mt-4 mb-4 bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-700 z-10"
            >
              {activeIndex === index ? "Back" : "Know More"}
            </button>

            {/* Sliding Overlay */}
            <div
              className={`absolute bottom-0 left-0 w-full h-full rounded-t-2xl bg-gradient-to-t from-white via-white/50 to-white/50 backdrop-blur-lg shadow-inner transition-transform duration-500 ease-in-out ${activeIndex === index ? "translate-y-0" : "translate-y-full"
                }`}
            >
              <div className="p-5 h-72 overflow-y-auto no-scrollbar text-gray-800">
                <h2 className="text-xl font-bold mb-2 text-green-700">
                  {product.title}
                </h2>
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Block3;
