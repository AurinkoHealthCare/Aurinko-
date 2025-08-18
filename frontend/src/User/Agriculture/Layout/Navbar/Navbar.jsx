import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";

const AgricultureNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { t } = useTranslation('navbar');
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setOpenSection(null);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/agriculture" onClick={handleLinkClick}>
          <img src="/Assets/AurinkoLogo2.png" alt="Aurinko Logo" className="w-[4.1rem] h-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-800">
          <li>
            <Link
              to="/agriculture"
              className={`hover:text-green-600 ${location.pathname === "/agriculture" ? "text-green-600" : ""}`}
            >
              {t("home")}
            </Link>
          </li>

          {/* About Us */}
          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("about_us")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[180px] text-gray-700">
              <li><Link to="/agriculture/about" className="block px-4 py-1 hover:text-green-600">{t("overview")}</Link></li>
              <li><Link to="/agriculture/vision" className="block px-4 py-1 hover:text-green-600">{t("vision_mission")}</Link></li>
              <li><Link to="/agriculture/manufacturing" className="block px-4 py-1 hover:text-green-600">{t("manufacturing")}</Link></li>
              <li><Link to="/agriculture/research" className="block px-4 py-1 hover:text-green-600">{t("research")}</Link></li>
              <li><Link to="/agriculture/export" className="block px-4 py-1 hover:text-green-600">{t("export")}</Link></li>
              <li><Link to="/agriculture/certificates" className="block px-4 py-1 hover:text-green-600">{t("certificates")}</Link></li>
            </ul>
          </li>

          {/* Nano Biotech */}
          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("nano_biotech")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[180px] text-gray-700">
              <li><Link to="/agriculture/Nanophosphosomes" className="block px-4 py-1 hover:text-green-600">{t("nanophosphosomes")}</Link></li>
              <li><Link to="/agriculture/Neuna_particles" className="block px-4 py-1 hover:text-green-600">{t("neuna_particles")}</Link></li>
            </ul>
          </li>

          {/* Agriculture Products */}
          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("agriculture")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/NanoFertilizers" className="block px-4 py-1 hover:text-green-600">{t("nano_fertilizers")}</Link></li>
              <li><Link to="/agriculture/SoilMinerals" className="block px-4 py-1 hover:text-green-600">{t("soil_minerals")}</Link></li>
            </ul>
          </li>

          {/* Media */}
          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("media")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[180px] text-gray-700">
              <li><Link to="/agriculture/report" className="block px-4 py-1 hover:text-green-600">{t("reports")}</Link></li>
              <li><Link to="/agriculture/gallery" className="block px-4 py-1 hover:text-green-600">{t("gallery")}</Link></li>
              <li><Link to="/agriculture/brochures" className="block px-4 py-1 hover:text-green-600">{t("brochures")}</Link></li>
              <li><Link to="/agriculture/blog" className="block px-4 py-1 hover:text-green-600">{t("blogs")}</Link></li>
              <li><Link to="/agriculture/articles" className="block px-4 py-1 hover:text-green-600">{t("articles")}</Link></li>
            </ul>
          </li>

          <li><Link to="/agriculture/ingredients" className="hover:text-green-600">{t("ingredients")}</Link></li>
          <li><Link to="/agriculture/contact_us" className="hover:text-green-600">{t("contact_us")}</Link></li>
        </ul>


        {/* Right: Search + Mobile Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/agriculture" className="block font-semibold py-1" onClick={handleLinkClick}>{t("home")}</Link>

          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("about")}>{t("about_us")}</button>
          {openSection === "about" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/agriculture/about" onClick={handleLinkClick}>{t("overview")}</Link></li>
              <li><Link to="/agriculture/vision" onClick={handleLinkClick}>{t("vision_mission")}</Link></li>
              <li><Link to="/agriculture/manufacturing" onClick={handleLinkClick}>{t("manufacturing")}</Link></li>
              <li><Link to="/agriculture/research" onClick={handleLinkClick}>{t("research")}</Link></li>
              <li><Link to="/agriculture/export" onClick={handleLinkClick}>{t("export")}</Link></li>
              <li><Link to="/agriculture/certificates" onClick={handleLinkClick}>{t("certificates")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("nano")}>{t("nano_biotech")}</button>
          {openSection === "nano" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/agriculture/Nanophosphosomes" onClick={handleLinkClick}>{t("nanophosphosomes")}</Link></li>
              <li><Link to="/agriculture/Neuna_particles" onClick={handleLinkClick}>{t("neuna_particles")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("agriculture")}>{t("agriculture")}</button>
          {openSection === "agriculture" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/agriculture/NanoFertilizers" onClick={handleLinkClick}>{t("nano_fertilizers")}</Link></li>
              <li><Link to="/agriculture/SoilMinerals" onClick={handleLinkClick}>{t("soil_minerals")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("media")}>{t("media")}</button>
          {openSection === "media" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/agriculture/report" onClick={handleLinkClick}>{t("reports")}</Link></li>
              <li><Link to="/agriculture/gallery" onClick={handleLinkClick}>{t("gallery")}</Link></li>
              <li><Link to="/agriculture/brochures" onClick={handleLinkClick}>{t("brochures")}</Link></li>
              <li><Link to="/agriculture/blog" onClick={handleLinkClick}>{t("blogs")}</Link></li>
              <li><Link to="/agriculture/articles" onClick={handleLinkClick}>{t("articles")}</Link></li>
            </ul>
          )}

          <Link to="/agriculture/ingredients" className="block font-semibold" onClick={handleLinkClick}>{t("ingredients")}</Link>
          <Link to="/agriculture/contact_us" className="block font-semibold" onClick={handleLinkClick}>{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default AgricultureNavbar;
