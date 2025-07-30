import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

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
            className="w-24 h-auto"
          />
        </Link>

        {/* Desktop Menu - only visible on large screens */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link to="/agriculture" className="hover:text-green-600">Home</Link></li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">About Us</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/about" className="block px-4 py-1 hover:text-green-600">Overview</Link></li>
              <li><Link to="/agriculture/vision" className="block px-4 py-1 hover:text-green-600">Vision & Mission</Link></li>
              <li><Link to="/agriculture/manufacturing" className="block px-4 py-1 hover:text-green-600">Manufacturing Facility</Link></li>
              <li><Link to="/agriculture/research" className="block px-4 py-1 hover:text-green-600">Research & Development</Link></li>
              <li><Link to="/agriculture/export" className="block px-4 py-1 hover:text-green-600">Export</Link></li>
              <li><Link to="/agriculture/certificates" className="block px-4 py-1 hover:text-green-600">Certificates</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">Nano-biotechnology</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/Nanophosphosomes" className="block px-4 py-1 hover:text-green-600">Nanophosphosomes®</Link></li>
              <li><Link to="/agriculture/Neuna_mins" className="block px-4 py-1 hover:text-green-600">Neuna®mins</Link></li>
              <li><Link to="/agriculture/Neuna_particles" className="block px-4 py-1 hover:text-green-600">Neuna®particles</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">Agriculture</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/NanoFertilizers" className="block px-4 py-1 hover:text-green-600">Nano Fertilizers</Link></li>
              <li><Link to="/agriculture/SoilMinerals" className="block px-4 py-1 hover:text-green-600">Soil Minerals</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-green-600 cursor-pointer">Media</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/agriculture/report" className="block px-4 py-1 hover:text-green-600">Reports</Link></li>
              <li><Link to="/agriculture/gallery" className="block px-4 py-1 hover:text-green-600">Gallery</Link></li>
              <li><Link to="/agriculture/brochures" className="block px-4 py-1 hover:text-green-600">Brochures</Link></li>
              <li><Link to="/agriculture/blog" className="block px-4 py-1 hover:text-green-600">Blogs</Link></li>
              <li><Link to="/agriculture/articles" className="block px-4 py-1 hover:text-green-600">Articles</Link></li>
            </ul>
          </li>

          <li><Link to="/agriculture/ingredients" className="hover:text-green-600">Ingredients</Link></li>
          <li><Link to="/agriculture/contact_us" className="hover:text-green-600">Contact Us</Link></li>
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
          <Link to="/agriculture/" className="block font-semibold">Home</Link>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>
              About Us
            </button>
            {openSection === "about" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/about">Overview</Link></li>
                <li><Link to="/agriculture/vision">Vision & Mission</Link></li>
                <li><Link to="/agriculture/manufacturing">Manufacturing Facility</Link></li>
                <li><Link to="/agriculture/research">Research & Development</Link></li>
                <li><Link to="/agriculture/export">Export</Link></li>
                <li><Link to="/agriculture/certificates">Certificates</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>
              Nano-biotechnology
            </button>
            {openSection === "nano" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/Nanophosphosomes">Nanophosphosomes®</Link></li>
                <li><Link to="/agriculture/Neuna_mins">Neuna®mins</Link></li>
                <li><Link to="/agriculture/Neuna_particles">Neuna®particles</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("Agriculture")}>
              Agriculture
            </button>
            {openSection === "Agriculture" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/NanoFertilizers">Nano Fertilizers</Link></li>
                <li><Link to="/agriculture/SoilMinerals">Soil Minerals</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>
              Media
            </button>
            {openSection === "media" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/agriculture/report">Reports</Link></li>
                <li><Link to="/agriculture/gallery">Gallery</Link></li>
                <li><Link to="/agriculture/brochures">Brochures</Link></li>
                <li><Link to="/agriculture/blog">Blogs</Link></li>
                <li><Link to="/agriculture/articles">Articles</Link></li>
              </ul>
            )}
          </div>

          <Link to="/agriculture/ingredients" className="block font-semibold">Ingredients</Link>
          <Link to="/agriculture/contact_us" className="block font-semibold">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
