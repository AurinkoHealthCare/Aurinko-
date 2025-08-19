import React, { useEffect, useState } from "react";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

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

      {/* Language Selector + Search */}
      <div className="absolute top-3 right-4 md:top-4 md:right-10 z-50 flex items-center gap-2">
        <Link to="/search">
          <button className="bg-transparent border border-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm lg:text-lg">
            Search
          </button>
        </Link>
        <div className="relative inline-block language-selector">
          <button
            onClick={() => setLanguageOpen(!languageOpen)}
            className="bg-transparent border border-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm lg:text-lg"
          >
            {selectedLang}
          </button>
          {languageOpen && (
            <ul className="absolute bg-white text-black shadow-md mt-1 rounded-md w-32 sm:w-40">
              {Object.keys(langCodeMap).map((lang) => (
                <li
                  key={lang}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm sm:text-base"
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

      {/* Logo */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
        <img
          src="/Assets/AurinkoLogo.png"
          alt="Logo"
          className="w-14 sm:w-20 lg:w-28 h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-20 sm:pt-28 lg:pt-32 pb-16 gap-10">
        {/* Tagline */}
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
          {t("welcome")} <br /> {t("company")}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {t("previously")} : {t("oldName")}
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full max-w-6xl px-4">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="flip-card w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                <div className="flip-card-inner">
                  {/* Front */}
                  <div className="flip-card-front rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.frontImage}
                      alt={`${card.title} Front`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Back */}
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
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm md:text-base font-medium transition-all duration-300"
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
    </div>
  );
};

export default Home;
