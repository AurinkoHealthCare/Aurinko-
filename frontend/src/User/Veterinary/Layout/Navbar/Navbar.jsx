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
        <Link to="/Veterinary">
          <img
            src="/Assets/AurinkoLogo2.png"
            alt="Aurinko Logo"
            className="w-24 h-auto"
          />
        </Link>

        {/* Desktop Menu - only visible on large screens */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link to="/veterinary" className="hover:text-blue-600">Home</Link></li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">About Us</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/about" className="block px-4 py-1 hover:text-blue-600">Overview</Link></li>
              <li><Link to="/veterinary/vision" className="block px-4 py-1 hover:text-blue-600">Vision & Mission</Link></li>
              <li><Link to="/veterinary/manufacturing" className="block px-4 py-1 hover:text-blue-600">Manufacturing Facility</Link></li>
              <li><Link to="/veterinary/research" className="block px-4 py-1 hover:text-blue-600">Research & Development</Link></li>
              <li><Link to="/veterinary/export" className="block px-4 py-1 hover:text-blue-600">Export</Link></li>
              <li><Link to="/veterinary/certificates" className="block px-4 py-1 hover:text-blue-600">Certificates</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">Nano-biotechnology</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/Nanophosphosomes" className="block px-4 py-1 hover:text-blue-600">Nanophosphosomes®</Link></li>
              <li><Link to="/veterinary/Neuna_mins" className="block px-4 py-1 hover:text-blue-600">Neuna®mins</Link></li>
              <li><Link to="/veterinary/Neuna_particles" className="block px-4 py-1 hover:text-blue-600">Neuna®particles</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">Veterinary</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/livestock" className="block px-4 py-1 hover:text-blue-600">Livestock</Link></li>
              <li><Link to="/veterinary/poultry" className="block px-4 py-1 hover:text-blue-600">Poultry</Link></li>
              <li><Link to="/veterinary/Aqua" className="block px-4 py-1 hover:text-blue-600">Aqua</Link></li>
              <li><Link to="/veterinary/Swine" className="block px-4 py-1 hover:text-blue-600">Swine</Link></li>
              <li><Link to="/veterinary/Equine" className="block px-4 py-1 hover:text-blue-600">Equine</Link></li>
              <li><Link to="/veterinary/pet" className="block px-4 py-1 hover:text-blue-600">Pet</Link></li>
              <li><Link to="/veterinary/feed_grain" className="block px-4 py-1 hover:text-blue-600">Feed & Grain</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-blue-600 cursor-pointer">Media</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/veterinary/report" className="block px-4 py-1 hover:text-blue-600">Reports</Link></li>
              <li><Link to="/veterinary/gallery" className="block px-4 py-1 hover:text-blue-600">Gallery</Link></li>
              <li><Link to="/veterinary/brochures" className="block px-4 py-1 hover:text-blue-600">Brochures</Link></li>
              <li><Link to="/veterinary/blog" className="block px-4 py-1 hover:text-blue-600">Blogs</Link></li>
              <li><Link to="/veterinary/articles" className="block px-4 py-1 hover:text-blue-600">Articles</Link></li>
            </ul>
          </li>

          <li><Link to="/veterinary/ingredients" className="hover:text-blue-600">Ingredients</Link></li>
          <li><Link to="/veterinary/contact_us" className="hover:text-blue-600">Contact Us</Link></li>
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
          <Link to="/veterinary/" className="block font-semibold">Home</Link>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>
              About Us
            </button>
            {openSection === "about" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/veterinary/about">Overview</Link></li>
                <li><Link to="/veterinary/vision">Vision & Mission</Link></li>
                <li><Link to="/veterinary/manufacturing">Manufacturing Facility</Link></li>
                <li><Link to="/veterinary/research">Research & Development</Link></li>
                <li><Link to="/veterinary/export">Export</Link></li>
                <li><Link to="/veterinary/certificates">Certificates</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>
              Nano-biotechnology
            </button>
            {openSection === "nano" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/veterinary/Nanophosphosomes">Nanophosphosomes®</Link></li>
                <li><Link to="/veterinary/Neuna_mins">Neuna®mins</Link></li>
                <li><Link to="/veterinary/Neuna_particles">Neuna®particles</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("Veterinary")}>
              Veterinary
            </button>
            {openSection === "Veterinary" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/veterinary/livestock">Livestock</Link></li>
                <li><Link to="/veterinary/poultry">Poultry</Link></li>
                <li><Link to="/veterinary/Aqua">Aqua</Link></li>
                <li><Link to="/veterinary/Swine">Swine</Link></li>
                <li><Link to="/veterinary/Equine">Equine</Link></li>
                <li><Link to="/veterinary/pet">Pet</Link></li>
                <li><Link to="/veterinary/feed_grain">Feed & Grain</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>
              Media
            </button>
            {openSection === "media" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/veterinary/report">Reports</Link></li>
                <li><Link to="/veterinary/gallery">Gallery</Link></li>
                <li><Link to="/veterinary/brochures">Brochures</Link></li>
                <li><Link to="/veterinary/blog">Blogs</Link></li>
                <li><Link to="/veterinary/articles">Articles</Link></li>
              </ul>
            )}
          </div>

          <Link to="/veterinary/ingredients" className="block font-semibold">Ingredients</Link>
          <Link to="/veterinary/contact_us" className="block font-semibold">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
