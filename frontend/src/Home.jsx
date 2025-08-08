import React, { useEffect, useState } from "react";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    title: "Human",
    frontImage: "/Assets/Human.jpg",
    backImage: "/Assets/Humanflip.webp",
    route: "/human",
    color: "#FF4D4D",
  },
  {
    title: "Veterinary",
    frontImage: "/Assets/Veterinary.webp",
    backImage: "/Assets/Veterinaryflip.webp",
    route: "/veterinary",
    color: "#4DA6FF",
  },
  {
    title: "Agriculture",
    frontImage: "/Assets/Agriculture.webp",
    backImage: "/Assets/Agricultureflip.webp",
    route: "/agriculture",
    color: "#4DFF88",
  },
];

const Home = () => {
  const { t } = useTranslation("home");
  const [selectedLang, setSelectedLang] = useState("Language");

  const langCodeMap = {
    English: "en",
    Arabic: "ar",
    French: "fr",
    Korean: "ko",
    Spanish: "es",
  };

  const langNameMap = {
    en: "English",
    ar: "Arabic",
    fr: "French",
    ko: "Korean",
    es: "Spanish",
  };

  const handleLangChange = (lang) => {
    i18n.changeLanguage(langCodeMap[lang]);
    setSelectedLang(lang);
  };

  useEffect(() => {
    const currentLang = i18n.language;
    setSelectedLang(langNameMap[currentLang] || "Language");
  }, [i18n.language]);

  const navigate = useNavigate();
  const [languageOpen, setLanguageOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".language-selector")) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 relative overflow-hidden font-sans text-white min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="Background"
          className="w-full h-full object-cover filter blur-md brightness-50"
        />
      </div>

      {/* Language Selector */}
      <div className="absolute top-4 right-10 z-50">
        <div className="relative inline-block language-selector">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="bg-transparent border border-white px-3 py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300"
          >
            {selectedLang}
          </button>
          {languageOpen && (
            <ul className="absolute bg-white text-black shadow-md mt-1 rounded-md">
              {Object.keys(langCodeMap).map((lang) => (
                <li
                  key={lang}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    handleLangChange(lang);
                    setLanguageOpen(false);
                  }}
                >
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Logo Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="/Assets/AurinkoLogo.png"
          alt="Logo"
          className="w-24 md:w-32 lg:w-40 h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-24 gap-12">
        {/* Tagline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10 text-white">
          {t("welcome")} <br /> {t("company")}
        </h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 m-4">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="flip-card w-64 h-64 sm:w-72 sm:h-72">
                <div className="flip-card-inner">
                  {/* Front with Image */}
                  <div className="flip-card-front rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.frontImage}
                      alt={`${card.title} Front`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Back with Image */}
                  <div className="flip-card-back rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.backImage}
                      alt={`${card.title} Back`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Know More Button */}
              <button
                className="px-4 py-2 rounded-full border border-white text-white transition-all duration-300 hover:text-black font-medium"
                style={{ borderColor: card.color }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = card.color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
                onClick={() => navigate(card.route)}
              >
                {t("knowMore")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Tagline */}
      <div className="absolute bottom-4 right-4 z-10 text-right text-xs sm:text-sm md:text-base">
        <h2 className="font-semibold">{t("previously")}</h2>
        <h3 className="italic">{t("oldName")}</h3>
      </div>
    </div>
  );
};

export default Home;