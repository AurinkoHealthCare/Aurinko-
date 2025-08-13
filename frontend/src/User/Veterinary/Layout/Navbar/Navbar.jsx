import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";
import Search from "../search/search";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { t } = useTranslation('navbar');

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
        {/* Logo */}
        <Link to="/Veterinary" onClick={handleLinkClick}>
          <img src="/Assets/AurinkoLogo2.png" alt="Aurinko Logo" className="w-28 h-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 font-medium items-center flex-grow justify-center">
          <li><Link to="/veterinary" className="hover:text-blue-600">{t("home")}</Link></li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">{t("about_us")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/about" className="block px-4 py-1 hover:text-blue-600">{t("overview")}</Link></li>
              <li><Link to="/veterinary/vision" className="block px-4 py-1 hover:text-blue-600">{t("vision_mission")}</Link></li>
              <li><Link to="/veterinary/manufacturing" className="block px-4 py-1 hover:text-blue-600">{t("manufacturing")}</Link></li>
              <li><Link to="/veterinary/research" className="block px-4 py-1 hover:text-blue-600">{t("research")}</Link></li>
              <li><Link to="/veterinary/export" className="block px-4 py-1 hover:text-blue-600">{t("export")}</Link></li>
              <li><Link to="/veterinary/certificates" className="block px-4 py-1 hover:text-blue-600">{t("certificates")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">{t("nano_biotech")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/Nanophosphosomes" className="block px-4 py-1 hover:text-blue-600">{t("nanophosphosomes")}</Link></li>
              <li><Link to="/veterinary/Neuna_mins" className="block px-4 py-1 hover:text-blue-600">{t("neuna_mins")}</Link></li>
              <li><Link to="/veterinary/Neuna_particles" className="block px-4 py-1 hover:text-blue-600">{t("neuna_particles")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">{t("veterinary")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/livestock" className="block px-4 py-1 hover:text-blue-600">{t("livestock")}</Link></li>
              <li><Link to="/veterinary/poultry" className="block px-4 py-1 hover:text-blue-600">{t("poultry")}</Link></li>
              <li><Link to="/veterinary/Aqua" className="block px-4 py-1 hover:text-blue-600">{t("aqua")}</Link></li>
              <li><Link to="/veterinary/Swine" className="block px-4 py-1 hover:text-blue-600">{t("swine")}</Link></li>
              <li><Link to="/veterinary/Equine" className="block px-4 py-1 hover:text-blue-600">{t("equine")}</Link></li>
              <li><Link to="/veterinary/pet" className="block px-4 py-1 hover:text-blue-600">{t("pet")}</Link></li>
              <li><Link to="/veterinary/feed_grain" className="block px-4 py-1 hover:text-blue-600">{t("feed_grain")}</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">{t("media")}</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/report" className="block px-4 py-1 hover:text-blue-600">{t("reports")}</Link></li>
              <li><Link to="/veterinary/gallery" className="block px-4 py-1 hover:text-blue-600">{t("gallery")}</Link></li>
              <li><Link to="/veterinary/brochures" className="block px-4 py-1 hover:text-blue-600">{t("brochures")}</Link></li>
              <li><Link to="/veterinary/blog" className="block px-4 py-1 hover:text-blue-600">{t("blogs")}</Link></li>
              <li><Link to="/veterinary/articles" className="block px-4 py-1 hover:text-blue-600">{t("articles")}</Link></li>
            </ul>
          </li>

          <li><Link to="/veterinary/ingredients" className="hover:text-blue-600">{t("ingredients")}</Link></li>
          <li><Link to="/veterinary/contact_us" className="hover:text-blue-600">{t("contact_us")}</Link></li>
        </ul>

        {/* Right side: Search + Mobile Toggle */}
        
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/veterinary" className="block font-semibold" onClick={handleLinkClick}>{t("home")}</Link>

          {/* About Us Section */}
          <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>
            {t("about_us")}
          </button>
          {openSection === "about" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/about" onClick={handleLinkClick}>{t("overview")}</Link></li>
              <li><Link to="/veterinary/vision" onClick={handleLinkClick}>{t("vision_mission")}</Link></li>
              <li><Link to="/veterinary/manufacturing" onClick={handleLinkClick}>{t("manufacturing")}</Link></li>
              <li><Link to="/veterinary/research" onClick={handleLinkClick}>{t("research")}</Link></li>
              <li><Link to="/veterinary/export" onClick={handleLinkClick}>{t("export")}</Link></li>
              <li><Link to="/veterinary/certificates" onClick={handleLinkClick}>{t("certificates")}</Link></li>
            </ul>
          )}

          {/* Nano Biotech Section */}
          <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>{t("nano_biotech")}</button>
          {openSection === "nano" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/Nanophosphosomes" onClick={handleLinkClick}>{t("nanophosphosomes")}</Link></li>
              <li><Link to="/veterinary/Neuna_mins" onClick={handleLinkClick}>{t("neuna_mins")}</Link></li>
              <li><Link to="/veterinary/Neuna_particles" onClick={handleLinkClick}>{t("neuna_particles")}</Link></li>
            </ul>
          )}

          {/* Veterinary Section */}
          <button className="font-semibold w-full text-left" onClick={() => toggleSection("veterinary")}>{t("veterinary")}</button>
          {openSection === "veterinary" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/livestock">{t("livestock")}</Link></li>
              <li><Link to="/veterinary/poultry">{t("poultry")}</Link></li>
              <li><Link to="/veterinary/Aqua">{t("aqua")}</Link></li>
              <li><Link to="/veterinary/Swine">{t("swine")}</Link></li>
              <li><Link to="/veterinary/Equine">{t("equine")}</Link></li>
              <li><Link to="/veterinary/pet">{t("pet")}</Link></li>
              <li><Link to="/veterinary/feed_grain">{t("feed_grain")}</Link></li>
            </ul>
          )}

          {/* Media Section */}
          <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>{t("media")}</button>
          {openSection === "media" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/report">{t("reports")}</Link></li>
              <li><Link to="/veterinary/gallery">{t("gallery")}</Link></li>
              <li><Link to="/veterinary/brochures">{t("brochures")}</Link></li>
              <li><Link to="/veterinary/blog">{t("blogs")}</Link></li>
              <li><Link to="/veterinary/articles">{t("articles")}</Link></li>
            </ul>
          )}

          <Link to="/veterinary/ingredients" className="block font-semibold">{t("ingredients")}</Link>
          <Link to="/veterinary/contact_us" className="block font-semibold">{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
