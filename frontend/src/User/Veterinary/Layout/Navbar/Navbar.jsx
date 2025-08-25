import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const { t } = useTranslation("navbar");
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
        {/* Logo */}
        <Link to="/veterinary" onClick={handleLinkClick}>
          <img
            src="/Assets/AurinkoLogo2.png"
            alt="Aurinko Logo"
            className="w-[4.1rem] h-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-800">
          <li>
            <Link
              to="/veterinary"
              className={`hover:text-blue-600 ${location.pathname === "/veterinary"
                  ? "text-blue-600 font-semibold"
                  : ""
                }`}
            >
              {t("home")}
            </Link>
          </li>

          {/* About Us */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-blue-600">{t("about_us")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white/90 backdrop-blur-md shadow-lg rounded-md p-2 min-w-[200px] text-gray-700">
              <li><Link to="/veterinary/about" className="block px-4 py-1 hover:text-blue-600">{t("overview")}</Link></li>
              <li><Link to="/veterinary/facultySection" className="block px-4 py-1 hover:text-blue-600">{t("FacultySection")}</Link></li>
              <li><Link to="/veterinary/vision" className="block px-4 py-1 hover:text-blue-600">{t("vision_mission")}</Link></li>
              <li><Link to="/veterinary/manufacturing" className="block px-4 py-1 hover:text-blue-600">{t("manufacturing")}</Link></li>
              <li><Link to="/veterinary/research" className="block px-4 py-1 hover:text-blue-600">{t("research")}</Link></li>
              <li><Link to="/veterinary/export" className="block px-4 py-1 hover:text-blue-600">{t("export")}</Link></li>
              <li><Link to="/veterinary/certificates" className="block px-4 py-1 hover:text-blue-600">{t("certificates")}</Link></li>
            </ul>
          </li>

          {/* Nano Biotech */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-blue-600">{t("nano_biotech")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white/90 backdrop-blur-md shadow-lg rounded-md p-2 min-w-[200px] text-gray-700">
              <li><Link to="/veterinary/Nanophosphosomes" className="block px-4 py-1 hover:text-blue-600">{t("nanophosphosomes")}</Link></li>
              <li><Link to="/veterinary/Neuna_mins" className="block px-4 py-1 hover:text-blue-600">{t("neuna_mins")}</Link></li>
              <li><Link to="/veterinary/Neuna_particles" className="block px-4 py-1 hover:text-blue-600">{t("neuna_particles")}</Link></li>
            </ul>
          </li>

          {/* Veterinary Products */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-blue-600">{t("veterinary")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white/90 backdrop-blur-md shadow-lg rounded-md p-2 min-w-[200px] text-gray-700">
              <li><Link to="/veterinary/livestock" className="block px-4 py-1 hover:text-blue-600">{t("livestock")}</Link></li>
              <li><Link to="/veterinary/poultry" className="block px-4 py-1 hover:text-blue-600">{t("poultry")}</Link></li>
              <li><Link to="/veterinary/Aqua" className="block px-4 py-1 hover:text-blue-600">{t("aqua")}</Link></li>
              <li><Link to="/veterinary/Swine" className="block px-4 py-1 hover:text-blue-600">{t("swine")}</Link></li>
              <li><Link to="/veterinary/Equine" className="block px-4 py-1 hover:text-blue-600">{t("equine")}</Link></li>
              <li><Link to="/veterinary/pet" className="block px-4 py-1 hover:text-blue-600">{t("pet")}</Link></li>
              <li><Link to="/veterinary/feed_grain" className="block px-4 py-1 hover:text-blue-600">{t("feed_grain")}</Link></li>
            </ul>
          </li>

          {/* Media */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-blue-600">{t("media")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white/90 backdrop-blur-md shadow-lg rounded-md p-2 min-w-[200px] text-gray-700">
              <li><Link to="/veterinary/report" className="block px-4 py-1 hover:text-blue-600">{t("reports")}</Link></li>
              <li><Link to="/veterinary/gallery" className="block px-4 py-1 hover:text-blue-600">{t("gallery")}</Link></li>
              <li><Link to="/veterinary/review" className="block px-4 py-1 hover:text-blue-600">{t("Review")}</Link></li>
              <li><Link to="/veterinary/brochures" className="block px-4 py-1 hover:text-blue-600">{t("brochures")}</Link></li>
              <li><Link to="/veterinary/blog" className="block px-4 py-1 hover:text-blue-600">{t("blogs")}</Link></li>
              <li><Link to="/veterinary/articles" className="block px-4 py-1 hover:text-blue-600">{t("articles")}</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/veterinary/ingredients" className="hover:text-blue-600">
              {t("ingredients")}
            </Link>
          </li>
          <li>
            <Link to="/veterinary/contact_us" className="hover:text-blue-600">
              {t("contact_us")}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <Link to="/veterinary" className="block font-semibold py-1" onClick={handleLinkClick}>{t("home")}</Link>

          {/* About Us Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("about")}>
            {t("about_us")}
          </button>
          {openSection === "about" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/about" onClick={handleLinkClick}>{t("overview")}</Link></li>
              <li><Link to="/veterinary/facultySection" onClick={handleLinkClick}>{t("Faculty Section")}</Link></li>
              <li><Link to="/veterinary/vision" onClick={handleLinkClick}>{t("vision_mission")}</Link></li>
              <li><Link to="/veterinary/manufacturing" onClick={handleLinkClick}>{t("manufacturing")}</Link></li>
              <li><Link to="/veterinary/research" onClick={handleLinkClick}>{t("research")}</Link></li>
              <li><Link to="/veterinary/export" onClick={handleLinkClick}>{t("export")}</Link></li>
              <li><Link to="/veterinary/certificates" onClick={handleLinkClick}>{t("certificates")}</Link></li>
            </ul>
          )}

          {/* Nano Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("nano")}>
            {t("nano_biotech")}
          </button>
          {openSection === "nano" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/Nanophosphosomes" onClick={handleLinkClick}>{t("nanophosphosomes")}</Link></li>
              <li><Link to="/veterinary/Neuna_mins" onClick={handleLinkClick}>{t("neuna_mins")}</Link></li>
              <li><Link to="/veterinary/Neuna_particles" onClick={handleLinkClick}>{t("neuna_particles")}</Link></li>
            </ul>
          )}

          {/* Veterinary Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("veterinary")}>
            {t("veterinary")}
          </button>
          {openSection === "veterinary" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/livestock" onClick={handleLinkClick}>{t("livestock")}</Link></li>
              <li><Link to="/veterinary/poultry" onClick={handleLinkClick}>{t("poultry")}</Link></li>
              <li><Link to="/veterinary/Aqua" onClick={handleLinkClick}>{t("aqua")}</Link></li>
              <li><Link to="/veterinary/Swine" onClick={handleLinkClick}>{t("swine")}</Link></li>
              <li><Link to="/veterinary/Equine" onClick={handleLinkClick}>{t("equine")}</Link></li>
              <li><Link to="/veterinary/pet" onClick={handleLinkClick}>{t("pet")}</Link></li>
              <li><Link to="/veterinary/feed_grain" onClick={handleLinkClick}>{t("feed_grain")}</Link></li>
            </ul>
          )}

          {/* Media Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("media")}>
            {t("media")}
          </button>
          {openSection === "media" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/veterinary/report" onClick={handleLinkClick}>{t("reports")}</Link></li>
              <li><Link to="/veterinary/gallery" onClick={handleLinkClick}>{t("gallery")}</Link></li>
              <li><Link to="/veterinary/review" onClick={handleLinkClick}>{t("Review")}</Link></li>
              <li><Link to="/veterinary/brochures" onClick={handleLinkClick}>{t("brochures")}</Link></li>
              <li><Link to="/veterinary/blog" onClick={handleLinkClick}>{t("blogs")}</Link></li>
              <li><Link to="/veterinary/articles" onClick={handleLinkClick}>{t("articles")}</Link></li>
            </ul>
          )}

          <Link to="/veterinary/ingredients" className="block font-semibold py-1" onClick={handleLinkClick}>{t("ingredients")}</Link>
          <Link to="/veterinary/contact_us" className="block font-semibold py-1" onClick={handleLinkClick}>{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
