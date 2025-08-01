import React from "react";
import { useTranslation } from "react-i18next";

const VisionMission = () => {
  const { t } = useTranslation("visionmission");

  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/Aboutus/banner/vission and mission.webp"
          alt="Vision and Mission"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Vision */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left max-w-4xl w-full mb-12">
          <img
            src="/Assets/Aboutus/vision and mission/Vision.png"
            alt="Vision"
            className="w-48 h-48 object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{t("vision.title")}</h1>
            <p className="text-lg text-gray-600 mt-3">{t("vision.description")}</p>
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col md:flex-row-reverse items-center text-center md:text-left max-w-4xl w-full mb-12">
          <img
            src="/Assets/Aboutus/vision and mission/Mission.png"
            alt="Mission"
            className="w-48 h-48 object-cover mb-4 md:mb-0 md:ml-6"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{t("mission.title")}</h1>
            <p className="text-lg text-gray-600 mt-3">{t("mission.description")}</p>
          </div>
        </div>

        {/* Values */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left max-w-4xl w-full">
          <img
            src="/Assets/Aboutus/vision and mission/Values.png"
            alt="Values"
            className="w-48 h-48 object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{t("values.title")}</h1>
            <ul className="text-lg text-gray-600 mt-3 space-y-2">
              {t("values.items", { returnObjects: true }).map((val, index) => (
                <li key={index}>🔹 {val}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
