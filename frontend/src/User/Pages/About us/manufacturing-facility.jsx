import React from "react";
import { useTranslation } from "react-i18next";

const ManufacturingFacility = () => {
  const { t } = useTranslation("manufacturing");

  const images = [
    "/Assets/Aboutus/Manufactring facilities/Automatic-Bottle-Filling-machine.jpg",
    "/Assets/Aboutus/Manufactring facilities/Machine2.jpg",
    "/Assets/Aboutus/Manufactring facilities/blender.jpg",
    "/Assets/Aboutus/Manufactring facilities/induction-machine.jpg",
    "/Assets/Aboutus/Manufactring facilities/Liquid-manufacturing-machine.jpg",
    "/Assets/Aboutus/Manufactring facilities/Pouch-fillling-machine.jpg",
  ];

  return (
    <div>
      <div className="relative">
        <img
          src="/Assets/Aboutus/banner/Manufactring-facility.jpg"
          alt={t("bannerAlt")}
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-1/2">
            <img
              src="/Assets/Aboutus/Manufactring facilities/Automatic-Bottle-Filling-machine.jpg"
              alt={t("mainImageAlt")}
              className="w-full h-auto rounded shadow"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-4xl font-bold mb-4">{t("title")}</h2>
            <div className="h-1 w-60 bg-gray-300 rounded"></div>
            <br />
            <br />
            <p className="text-gray-700 mb-4 text-lg">{t("para1")}</p>
            <p className="text-gray-700 mb-4 text-lg">{t("para2")}</p>
            <p className="text-gray-700 mb-4 text-lg">{t("para3")}</p>
            <p className="text-gray-700 text-lg">{t("para4")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`${t("imageAlt")} ${index + 1}`}
                className="w-full h-auto rounded shadow-inner border-2 border-gray-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManufacturingFacility;
