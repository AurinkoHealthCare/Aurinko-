import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { t } = useTranslation('navbar');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/agriculture">
          <img
            src="/Assets/AurinkoLogo2.png"
            alt="Aurinko Logo"
            className="w-28 h-auto"
          />
        </Link>

        {/* Desktop Menu - only visible on large screens */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link to="/agriculture" className="hover:text-green-600">{t("home")}</Link></li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("about_us")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/about" className="block px-4 py-1 hover:text-green-600">{t("overview")}</Link></li>
              <li><Link to="/agriculture/vision" className="block px-4 py-1 hover:text-green-600">{t("vision_mission")}</Link></li>
              <li><Link to="/agriculture/manufacturing" className="block px-4 py-1 hover:text-green-600">{t("manufacturing")}</Link></li>
              <li><Link to="/agriculture/research" className="block px-4 py-1 hover:text-green-600">{t("research")}</Link></li>
              <li><Link to="/agriculture/export" className="block px-4 py-1 hover:text-green-600">{t("export")}</Link></li>
              <li><Link to="/agriculture/certificates" className="block px-4 py-1 hover:text-green-600">{t("certificates")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("nano_biotech")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/Nanophosphosomes" className="block px-4 py-1 hover:text-green-600">{t("nanophosphosomes")}</Link></li>
              <li><Link to="/agriculture/Neuna_particles" className="block px-4 py-1 hover:text-green-600">{t("neuna_particles")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("agriculture")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/NanoFertilizers" className="block px-4 py-1 hover:text-green-600">{t("nano_fertilizers")}</Link></li>
              <li><Link to="/agriculture/SoilMinerals" className="block px-4 py-1 hover:text-green-600">{t("soil_minerals")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">{t("media")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
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

        {/* Mobile Menu Toggle - visible below lg */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - visible below lg */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <div>
            <Link to="/agriculture/" className="block font-semibold">{t("home")}</Link>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>
              {t("about_us")}
            </button>
            {openSection === "about" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/about">{t("overview")}</Link></li>
                <li><Link to="/agriculture/vision">{t("vision_mission")}</Link></li>
                <li><Link to="/agriculture/manufacturing">{t("manufacturing")}</Link></li>
                <li><Link to="/agriculture/research">{t("research")}</Link></li>
                <li><Link to="/agriculture/export">{t("export")}</Link></li>
                <li><Link to="/agriculture/certificates">{t("certificates")}</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>
              {t("nano_biotech")}
            </button>
            {openSection === "nano" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/Nanophosphosomes">{t("nanophosphosomes")}</Link></li>
                <li><Link to="/agriculture/Neuna_mins">{t("neuna_mins")}</Link></li>
                <li><Link to="/agriculture/Neuna_particles">{t("neuna_particles")}</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("Agriculture")}>
              Agriculture
            </button>
            {openSection === "Agriculture" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/NanoFertilizers">{t("nano_fertilizers")}</Link></li>
                <li><Link to="/agriculture/SoilMinerals">{t("soil_minerals")}</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>
              {t("media")}
            </button>
            {openSection === "media" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/report">{t("reports")}</Link></li>
                <li><Link to="/agriculture/gallery">{t("gallery")}</Link></li>
                <li><Link to="/agriculture/brochures">{t("brochures")}</Link></li>
                <li><Link to="/agriculture/blog">{t("blogs")}</Link></li>
                <li><Link to="/agriculture/articles">{t("articles")}</Link></li>
              </ul>
            )}
          </div>

          <Link to="/agriculture/ingredients" className="block font-semibold">{t("ingredients")}</Link>
          <Link to="/agriculture/contact_us" className="block font-semibold">{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
