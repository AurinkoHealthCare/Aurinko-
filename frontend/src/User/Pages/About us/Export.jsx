import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../../api/axios"; // ✅ added axios import

const Export = () => {
  const { t } = useTranslation("export");
  const [tooltip, setTooltip] = useState({ visible: false, text: "", top: "0%", left: "0%" });

  // ✅ new states
  const [headerImage, setHeaderImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const locations = [
    { name: t("locations.India"), top: "45%", left: "63%" },
    { name: t("locations.Zimbabwe"), top: "66%", left: "50.5%" },
    { name: t("locations.Egypt"), top: "45%", left: "50.5%" },
    { name: t("locations.SouthKorea"), top: "37%", left: "75%" },
    { name: t("locations.Bangladesh"), top: "45%", left: "66.2%" },
    { name: t("locations.Nepal"), top: "43%", left: "64.5%" },
    { name: t("locations.SriLanka"), top: "53.5%", left: "64.6%" },
  ];

  const handleMouseEnter = (name, top, left) => {
    setTooltip({ visible: true, text: name, top, left });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false });
  };

  // ✅ fetch image named "export"
  const fetchHeaderImage = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const selected = arr.find(
        img => img.imageName?.toLowerCase() === "export"
      );
      setHeaderImage(selected || null);
    } catch (err) {
      console.error("Failed to fetch export image ❌", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);

  return (
    <div className="font-sans">
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {headerImage.imageName}
              </h1>
            </div>
          </>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No 'export' image found</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{t("subtitle")}</h2>
          <div className="w-12 h-1 bg-green-500 mb-6"></div>
          <p className="mb-6">{t("para1")}</p>
          <p className="mb-6">{t("para2")}</p>
          <p className="mb-6">
            <strong>{t("emailTo")}</strong>{" "}
            <a href="mailto:exim@aurinkohealthcare.com" className="text-blue-600 hover:underline">
              exim@aurinkohealthcare.com,
            </a>{" "}
            <a href="mailto:info@aurinkohealthcare.com" className="text-blue-600 hover:underline">
              info@aurinkohealthcare.com
            </a>
          </p>
        </div>
        <div className="w-full md:w-1/2 relative">
          <img
            src="/Assets/Aboutus/world-map.png"
            alt="World Map"
            className="w-full rounded-lg shadow-md"
          />
          {locations.map((loc, index) => (
            <div
              key={index}
              className="absolute text-red-500 text-2xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-125"
              style={{ top: loc.top, left: loc.left }}
              onMouseEnter={() => handleMouseEnter(loc.name, loc.top, loc.left)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-map-marker-alt text-xs lg:text-lg"></i>
            </div>
          ))}
          {tooltip.visible && (
            <div
              className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-md transition-opacity duration-200"
              style={{
                top: `calc(${tooltip.top} - 25px)`,
                left: tooltip.left,
                transform: "translate(-50%, -100%)",
                whiteSpace: "nowrap",
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Export;
