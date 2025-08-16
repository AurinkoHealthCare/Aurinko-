import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../../api/axios";

const ManufacturingFacility = () => {
  const { t } = useTranslation("manufacturing");

    const [headerImage, setHeaderImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch image named "Manufactring facility"
  const fetchHeaderImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];

      // ✅ find the image where name is "Manufactring facility"
      const selected = arr.find(
        img => img.imageName?.toLowerCase() === "manufactring facility"
      );

      setHeaderImage(selected || null);
    } catch (err) {
      console.error("Failed to fetch image ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);

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
        {loading ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Loading header image...</p>
          </div>
        ) : headerImage ? (
          <>
            <img
              src={headerImage.url}
              alt={headerImage.imageName}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl relative text-center mb-6">
                {headerImage.imageName}
              </h1>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No "Manufactring facility" image found</p>
          </div>
        )}
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
