import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";
import Search from "../search/search";

const Navbar = () => {
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
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center w-full justify-between">
          {/* Logo */}
          <Link to="/human" onClick={handleLinkClick}>
            <img src="/Assets/AurinkoLogo2.png" alt="Aurinko Logo" className="w-28 h-auto" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 font-medium items-center flex-grow justify-center">
            <li>
              <Link
                to="/human"
                className={`hover:text-red-600 ${location.pathname === "/human" ? "text-red-600" : ""}`}
              >
                {t("home")}
              </Link>
            </li>

            {/* About Us */}
            <li className="group relative">
              <span className="hover:text-red-600 cursor-pointer">{t("about_us")}</span>
              <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
                <li><Link to="/human/about" className="block px-4 py-1 hover:text-red-600">{t("overview")}</Link></li>
                <li><Link to="/human/vision" className="block px-4 py-1 hover:text-red-600">{t("vision_mission")}</Link></li>
                <li><Link to="/human/manufacturing" className="block px-4 py-1 hover:text-red-600">{t("manufacturing")}</Link></li>
                <li><Link to="/human/research" className="block px-4 py-1 hover:text-red-600">{t("research")}</Link></li>
                <li><Link to="/human/export" className="block px-4 py-1 hover:text-red-600">{t("export")}</Link></li>
                <li><Link to="/human/certificates" className="block px-4 py-1 hover:text-red-600">{t("certificates")}</Link></li>
              </ul>
            </li>

            {/* Nano Biotech */}
            <li className="group relative">
              <span className="hover:text-red-600 cursor-pointer">{t("nano_biotech")}</span>
              <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
                <li><Link to="/human/Nanophosphosomes" className="block px-4 py-1 hover:text-red-600">{t("nanophosphosomes")}</Link></li>
                <li><Link to="/human/Neuna_particles" className="block px-4 py-1 hover:text-red-600">{t("neuna_particles")}</Link></li>
              </ul>
            </li>

            {/* Human Products */}
            <li className="group relative">
              <span className="hover:text-red-600 cursor-pointer">{t("human")}</span>
              <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
                <li><Link to="/human/Health_supplements" className="block px-4 py-1 hover:text-red-600">{t("health_supplements")}</Link></li>
                <li><Link to="/human/Wellness" className="block px-4 py-1 hover:text-red-600">{t("wellness")}</Link></li>
                <li><Link to="/human/Personal_Care" className="block px-4 py-1 hover:text-red-600">{t("personal_care")}</Link></li>
                <li><Link to="/human/Yeppuen" className="block px-4 py-1 hover:text-red-600">{t("yeppuen")}</Link></li>
              </ul>
            </li>

            {/* Media */}
            <li className="group relative">
              <span className="hover:text-red-600 cursor-pointer">{t("media")}</span>
              <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
                <li><Link to="/human/report" className="block px-4 py-1 hover:text-red-600">{t("reports")}</Link></li>
                <li><Link to="/human/gallery" className="block px-4 py-1 hover:text-red-600">{t("gallery")}</Link></li>
                <li><Link to="/human/brochures" className="block px-4 py-1 hover:text-red-600">{t("brochures")}</Link></li>
                <li><Link to="/human/blog" className="block px-4 py-1 hover:text-red-600">{t("blogs")}</Link></li>
                <li><Link to="/human/articles" className="block px-4 py-1 hover:text-red-600">{t("articles")}</Link></li>
              </ul>
            </li>

            <li><Link to="/human/ingredients" className="hover:text-red-600">{t("ingredients")}</Link></li>
            <li><Link to="/human/contact_us" className="hover:text-red-600">{t("contact_us")}</Link></li>
          </ul>

          {/* Right: Search + Mobile Button */}
          <div className="flex items-center gap-2">
            <Search />
            <div className="lg:hidden">
              <button onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/human" className="block font-semibold" onClick={handleLinkClick}>{t("home")}</Link>

          <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>{t("about_us")}</button>
          {openSection === "about" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/about" onClick={handleLinkClick}>{t("overview")}</Link></li>
              <li><Link to="/human/vision" onClick={handleLinkClick}>{t("vision_mission")}</Link></li>
              <li><Link to="/human/manufacturing" onClick={handleLinkClick}>{t("manufacturing")}</Link></li>
              <li><Link to="/human/research" onClick={handleLinkClick}>{t("research")}</Link></li>
              <li><Link to="/human/export" onClick={handleLinkClick}>{t("export")}</Link></li>
              <li><Link to="/human/certificates" onClick={handleLinkClick}>{t("certificates")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>{t("nano_biotech")}</button>
          {openSection === "nano" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/Nanophosphosomes" onClick={handleLinkClick}>{t("nanophosphosomes")}</Link></li>
              <li><Link to="/human/Neuna_particles" onClick={handleLinkClick}>{t("neuna_particles")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left" onClick={() => toggleSection("human")}>{t("human")}</button>
          {openSection === "human" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/Health_supplements" onClick={handleLinkClick}>{t("health_supplements")}</Link></li>
              <li><Link to="/human/Wellness" onClick={handleLinkClick}>{t("wellness")}</Link></li>
              <li><Link to="/human/Personal_Care" onClick={handleLinkClick}>{t("personal_care")}</Link></li>
              <li><Link to="/human/Yeppuen" onClick={handleLinkClick}>{t("yeppuen")}</Link></li>
            </ul>
          )}

          <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>{t("media")}</button>
          {openSection === "media" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/report" onClick={handleLinkClick}>{t("reports")}</Link></li>
              <li><Link to="/human/gallery" onClick={handleLinkClick}>{t("gallery")}</Link></li>
              <li><Link to="/human/brochures" onClick={handleLinkClick}>{t("brochures")}</Link></li>
              <li><Link to="/human/blog" onClick={handleLinkClick}>{t("blogs")}</Link></li>
              <li><Link to="/human/articles" onClick={handleLinkClick}>{t("articles")}</Link></li>
            </ul>
          )}

          <Link to="/human/ingredients" className="block font-semibold" onClick={handleLinkClick}>{t("ingredients")}</Link>
          <Link to="/human/contact_us" className="block font-semibold" onClick={handleLinkClick}>{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
