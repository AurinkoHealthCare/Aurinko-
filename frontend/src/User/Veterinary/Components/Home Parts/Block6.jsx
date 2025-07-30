import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "../../Data/data";
import { Link } from "react-router-dom";

const Block6 = () => {
  const reloadPage = (e, url) => {
    e.preventDefault();
    window.location.href = url;
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-20 gap-16">

      {/* LEFT */}
      <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-green-700 uppercase">Get In Touch</h1>
        <div className="h-1 w-40 bg-gradient-to-r from-green-600 to-orange-500 rounded-full mx-auto lg:mx-0" />

        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Your health is our priority. We are dedicated to providing the best healthcare
          solutions to enhance your physical, mental, and social well-being.
        </p>

        <Link to="/contact-us" onClick={(e) => reloadPage(e, "/contact-us")}>
          <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-300 hover:scale-105">
            Enroll Now
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-orange-600">Review & Feedback</h1>
        <div className="h-1 w-48 bg-gradient-to-r from-orange-500 to-green-600 rounded-full mx-auto" />

        <Link
          to="https://www.google.com/maps/place/Aurinko+Healthcare+Private+Limited"
          target="_blank"
        >
          <button className="mt-2 px-6 py-3 bg-orange-600 text-white text-base font-medium rounded-full shadow-lg hover:bg-orange-700 transition duration-300 hover:scale-105">
            Go Review
          </button>
        </Link>

        <div className="flex items-center justify-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-80 h-96 bg-white/80 backdrop-blur-md border border-green-200 shadow-2xl rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-24 h-24 rounded-full border-4 border-orange-400 shadow-lg mb-4 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <p className="italic text-gray-800 text-base leading-relaxed text-center px-2">
                "{reviews[currentIndex].text}"
              </p>
              <h3 className="mt-4 text-lg font-semibold text-green-900">
                {reviews[currentIndex].name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Block6;
