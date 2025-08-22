import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "../Data/data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Block6 = () => {
  const { t } = useTranslation('home_parts');

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
    <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 pb-20 gap-16">

      {/* LEFT */}
      <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-blue-700 uppercase">
          {t("block6.getInTouch")}
        </h1>
        <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full mx-auto lg:mx-0" />

        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          {t("block6.healthMessage")}
        </p>

        <Link to="/veterinary/contact_us" onClick={(e) => reloadPage(e, "/veterinary/contact_us")}>
          <button className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-300 hover:scale-105">
            {t("block6.enrollNow")}
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">
          {t("block6.reviewFeedback")}
        </h1>
        <div className="h-1 w-48 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full mx-auto" />

        <Link
          to="https://www.google.com/maps/place/Aurinko+Healthcare+Private+Limited/@28.3483296,77.3439278,15z/data=!4m6!3m5!1s0x390cdb9766d62aab:0x499dcf82d3074077!8m2!3d28.3499707!4d77.3450554!16s%2Fg%2F11shjs9rvx?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
        >
          <button className="mt-2 px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-full shadow-lg hover:bg-blue-700 transition duration-300 hover:scale-105">
            {t("block6.goReview")}
          </button>
        </Link>

        <div className="flex items-center justify-center mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-80 h-96 bg-white/80 backdrop-blur-md border border-blue-300 shadow-2xl rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg mb-4 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <p className="italic text-gray-800 text-base leading-relaxed text-center px-2">
                "{t(`block6.reviews.${currentIndex}.text`)}"
              </p>
              <h3 className="mt-4 text-lg font-semibold text-blue-900">
               {t(`block6.reviews.${currentIndex}.name`)}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Block6;
