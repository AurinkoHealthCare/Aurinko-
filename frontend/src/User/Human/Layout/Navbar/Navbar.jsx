import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from "react-icons/fa";

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
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/human" onClick={handleLinkClick}>
          <img src="/Assets/AurinkoLogo2.png" alt="Aurinko Logo" className="w-[4.1rem] h-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 font-medium text-gray-800">
          <li>
            <Link
              to="/human"
              className={`hover:text-[#b30800] ${location.pathname === "/human" ? "text-[#b30800] font-semibold" : ""}`}
            >
              {t("home")}
            </Link>
          </li>

          {/* About Us */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-[#b30800]">{t("about_us")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[180px] text-gray-700">
              <li><Link to="/human/about" className="block px-4 py-1 hover:text-[#b30800]">{t("overview")}</Link></li>
              <li><Link to="/human/vision" className="block px-4 py-1 hover:text-[#b30800]">{t("vision_mission")}</Link></li>
              <li><Link to="/human/manufacturing" className="block px-4 py-1 hover:text-[#b30800]">{t("manufacturing")}</Link></li>
              <li><Link to="/human/research" className="block px-4 py-1 hover:text-[#b30800]">{t("research")}</Link></li>
              <li><Link to="/human/export" className="block px-4 py-1 hover:text-[#b30800]">{t("export")}</Link></li>
              <li><Link to="/human/certificates" className="block px-4 py-1 hover:text-[#b30800]">{t("certificates")}</Link></li>
            </ul>
          </li>

          {/* Nano Biotech */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-[#b30800]">{t("nano_biotech")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[160px] text-gray-700">
              <li><Link to="/human/Nanophosphosomes" className="block px-4 py-1 hover:text-[#b30800]">{t("nanophosphosomes")}</Link></li>
              <li><Link to="/human/Neuna_particles" className="block px-4 py-1 hover:text-[#b30800]">{t("neuna_particles")}</Link></li>
            </ul>
          </li>

          {/* Human Products */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-[#b30800]">{t("human")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[180px] text-gray-700">
              <li><Link to="/human/Health_supplements" className="block px-4 py-1 hover:text-[#b30800]">{t("health_supplements")}</Link></li>
              <li><Link to="/human/Wellness" className="block px-4 py-1 hover:text-[#b30800]">{t("wellness")}</Link></li>
              <li><Link to="/human/Personal_Care" className="block px-4 py-1 hover:text-[#b30800]">{t("personal_care")}</Link></li>
              <li><Link to="/human/Yeppuen" className="block px-4 py-1 hover:text-[#b30800]">{t("yeppuen")}</Link></li>
            </ul>
          </li>

          {/* Media */}
          <li className="group relative">
            <span className="cursor-pointer hover:text-[#b30800]">{t("media")}</span>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 min-w-[160px] text-gray-700">
              <li><Link to="/human/report" className="block px-4 py-1 hover:text-[#b30800]">{t("reports")}</Link></li>
              <li><Link to="/human/gallery" className="block px-4 py-1 hover:text-[#b30800]">{t("gallery")}</Link></li>
              <li><Link to="/human/review" className="block px-4 py-1 hover:text-[#b30800]">{t("Review")}</Link></li>
              <li><Link to="/human/brochures" className="block px-4 py-1 hover:text-[#b30800]">{t("brochures")}</Link></li>
              <li><Link to="/human/blog" className="block px-4 py-1 hover:text-[#b30800]">{t("blogs")}</Link></li>
              <li><Link to="/human/articles" className="block px-4 py-1 hover:text-[#b30800]">{t("articles")}</Link></li>
            </ul>
          </li>

          <li><Link to="/human/ingredients" className="hover:text-[#b30800]">{t("ingredients")}</Link></li>
          <li><Link to="/human/contact_us" className="hover:text-[#b30800]">{t("contact_us")}</Link></li>
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
          <Link to="/human" className="block font-semibold py-1" onClick={handleLinkClick}>{t("home")}</Link>

          {/** About Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("about")}>{t("about_us")}</button>
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

          {/** Nano Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("nano")}>{t("nano_biotech")}</button>
          {openSection === "nano" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/Nanophosphosomes" onClick={handleLinkClick}>{t("nanophosphosomes")}</Link></li>
              <li><Link to="/human/Neuna_particles" onClick={handleLinkClick}>{t("neuna_particles")}</Link></li>
            </ul>
          )}

          {/** Human Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("human")}>{t("human")}</button>
          {openSection === "human" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/Health_supplements" onClick={handleLinkClick}>{t("health_supplements")}</Link></li>
              <li><Link to="/human/Wellness" onClick={handleLinkClick}>{t("wellness")}</Link></li>
              <li><Link to="/human/Personal_Care" onClick={handleLinkClick}>{t("personal_care")}</Link></li>
              <li><Link to="/human/Yeppuen" onClick={handleLinkClick}>{t("yeppuen")}</Link></li>
              <li><Link to="/human/ayush" onClick={handleLinkClick}>{t("yeppuen")}</Link></li>
              <li><Link to="/human/Foods_and_Spices" onClick={handleLinkClick}>{t("F")}</Link></li>
            </ul>
          )}

          {/** Media Section */}
          <button className="font-semibold w-full text-left py-1" onClick={() => toggleSection("media")}>{t("media")}</button>
          {openSection === "media" && (
            <ul className="pl-4 text-sm text-gray-700 space-y-1">
              <li><Link to="/human/report" onClick={handleLinkClick}>{t("reports")}</Link></li>
              <li><Link to="/human/gallery" onClick={handleLinkClick}>{t("gallery")}</Link></li>
              <li><Link to="/human/review" onClick={handleLinkClick}>{t("Review")}</Link></li>
              <li><Link to="/human/brochures" onClick={handleLinkClick}>{t("brochures")}</Link></li>
              <li><Link to="/human/blog" onClick={handleLinkClick}>{t("blogs")}</Link></li>
              <li><Link to="/human/articles" onClick={handleLinkClick}>{t("articles")}</Link></li>
            </ul>
          )}

          <Link to="/human/ingredients" className="block font-semibold py-1" onClick={handleLinkClick}>{t("ingredients")}</Link>
          <Link to="/human/contact_us" className="block font-semibold py-1" onClick={handleLinkClick}>{t("contact_us")}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
 