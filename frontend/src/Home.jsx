import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import i18n from "./i18n";
import axios from "../api/axios";

// 🔹 Cards Data
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

// placeholder
const noImage =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" style="background:#f3f3f3"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="#999">No Image</text></svg>`
  );

const Home = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const [logos, setLogos] = useState([]);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState("Language");
  const [languageOpen, setLanguageOpen] = useState(false);

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
    const fetchLogos = async () => {
      try {
        const res = await axios.get("/logo/logos"); // backend se GET request
        setLogos(res.data);
      } catch (err) {
        console.error("Fetch logos failed:", err);
      }
    };
    fetchLogos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (logos.length > 0) {
        setCurrentLogoIndex((prev) => (prev + 1) % logos.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [logos]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".language-selector")) setLanguageOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const currentLang = i18n.language;
    setSelectedLang(langNameMap[currentLang] || "Language");
  }, [i18n.language]);

  return (
    <div className="bg-gray-900 relative overflow-hidden font-sans text-white min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="Background"
          className="w-full h-full object-cover filter blur-md brightness-50"
        />
      </div>

      {/* Top Right Section */}
      <div className="absolute top-3 right-4 md:top-4 md:right-10 z-50 flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <Link to="/search">
            <button className="bg-transparent border border-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm lg:text-lg">
              Search
            </button>
          </Link>
          <div className="relative inline-block language-selector z-50">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="bg-transparent border border-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-white hover:text-black transition-all duration-300 text-xs md:text-sm lg:text-lg"
            >
              {selectedLang}
            </button>
            {languageOpen && (
              <ul className="absolute bg-white text-black shadow-md mt-1 rounded-md w-16 md:w-22">
                {Object.keys(langCodeMap).map((lang) => (
                  <li
                    key={lang}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm sm:text-base"
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

        {/* Affiliated With */}
        <div className="flex items-center gap-3 mt-1">
          <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap">
            Affiliations
          </h3>
          <div className="w-20 h-12 sm:h-16 md:h-18 flex items-center justify-center overflow-hidden relative">
            <img
              key={logos[currentLogoIndex]?._id}
              src={logos[currentLogoIndex]?.url || noImage}
              alt={logos[currentLogoIndex]?.imageName || "Logo"}
              className="h-14 sm:h-16 md:h-16 object-contain transition-opacity duration-500 absolute"
              onError={(e) => (e.target.src = noImage)}
            />
          </div>
        </div>
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
        <img
          src="/Assets/AurinkoLogo.png"
          alt="Logo"
          className="w-14 sm:w-20 lg:w-28 h-auto"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-28 sm:pt-28 lg:pt-32 pb-16 gap-32">
        <div className="relative  gap-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {t("welcome")} <br /> {t("company")}
          </h1>
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl">
            ({t("previously")} {t("oldName")})
          </h2>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full max-w-6xl px-4">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <div className="flip-card w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
                <div className="flip-card-inner">
                  <div className="flip-card-front rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.frontImage}
                      alt={`${card.title} Front`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flip-card-back rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={card.backImage}
                      alt={`${card.title} Back`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
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
