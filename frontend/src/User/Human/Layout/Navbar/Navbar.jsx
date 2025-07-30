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
        <Link to="/human">
          <img
            src="/Assets/AurinkoLogo2.png"
            alt="Aurinko Logo"
            className="w-24 h-auto"
          />
        </Link>

        {/* Desktop Menu - only visible on large screens */}
        <ul className="hidden lg:flex space-x-6 font-medium">
          <li><Link to="/human" className="hover:text-red-600">Home</Link></li>

          <li className="group relative">
            <span className="hover:text-red-600 cursor-pointer">About Us</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/human/about" className="block px-4 py-1 hover:text-red-600">Overview</Link></li>
              <li><Link to="/human/vision" className="block px-4 py-1 hover:text-red-600">Vision & Mission</Link></li>
              <li><Link to="/human/manufacturing" className="block px-4 py-1 hover:text-red-600">Manufacturing Facility</Link></li>
              <li><Link to="/human/research" className="block px-4 py-1 hover:text-red-600">Research & Development</Link></li>
              <li><Link to="/human/export" className="block px-4 py-1 hover:text-red-600">Export</Link></li>
              <li><Link to="/human/certificates" className="block px-4 py-1 hover:text-red-600">Certificates</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-red-600 cursor-pointer">Nano-biotechnology</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-64 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/human/Nanophosphosomes" className="block px-4 py-1 hover:text-red-600">Nanophosphosomes®</Link></li>
              <li><Link to="/human/Neuna_mins" className="block px-4 py-1 hover:text-red-600">Neuna®mins</Link></li>
              <li><Link to="/human/Neuna_particles" className="block px-4 py-1 hover:text-red-600">Neuna®particles</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-red-600 cursor-pointer">Human</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-52 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/human/Health_supplements" className="block px-4 py-1 hover:text-red-600">Health Supplements</Link></li>
              <li><Link to="/human/Wellness" className="block px-4 py-1 hover:text-red-600">Wellness</Link></li>
              <li><Link to="/human/Personal_Care" className="block px-4 py-1 hover:text-red-600">Personal Care</Link></li>
              <li><Link to="/human/Yeppuen" className="block px-4 py-1 hover:text-red-600">Yeppuen</Link></li>
            </ul>
          </li>

          <li className="group relative">
            <span className="hover:text-red-600 cursor-pointer">Media</span>
            <ul className="absolute top-full left-0 bg-white/90 backdrop-blur-md w-40 shadow-lg p-2 rounded-md hidden group-hover:block">
              <li><Link to="/human/report" className="block px-4 py-1 hover:text-red-600">Reports</Link></li>
              <li><Link to="/human/gallery" className="block px-4 py-1 hover:text-red-600">Gallery</Link></li>
              <li><Link to="/human/brochures" className="block px-4 py-1 hover:text-red-600">Brochures</Link></li>
              <li><Link to="/human/blog" className="block px-4 py-1 hover:text-red-600">Blogs</Link></li>
              <li><Link to="/human/articles" className="block px-4 py-1 hover:text-red-600">Articles</Link></li>
            </ul>
          </li>

          <li><Link to="/human/ingredients" className="hover:text-red-600">Ingredients</Link></li>
          <li><Link to="/human/contact_us" className="hover:text-red-600">Contact Us</Link></li>
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
          <Link to="/human" className="block font-semibold">Home</Link>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("about")}>
              About Us
            </button>
            {openSection === "about" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/human/about">Overview</Link></li>
                <li><Link to="/human/vision">Vision & Mission</Link></li>
                <li><Link to="/human/manufacturing">Manufacturing Facility</Link></li>
                <li><Link to="/human/research">Research & Development</Link></li>
                <li><Link to="/human/export">Export</Link></li>
                <li><Link to="/human/certificates">Certificates</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("nano")}>
              Nano-biotechnology
            </button>
            {openSection === "nano" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/human/Nanophosphosomes">Nanophosphosomes®</Link></li>
                <li><Link to="/human/Neuna_mins">Neuna®mins</Link></li>
                <li><Link to="/human/Neuna_particles">Neuna®particles</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("human")}>
              Human
            </button>
            {openSection === "human" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/human/Health_supplements">Health Supplements</Link></li>
                <li><Link to="/human/Wellness">Wellness</Link></li>
                <li><Link to="/human/Personal_Care">Personal Care</Link></li>
                <li><Link to="/human/Yeppuen">Yeppuen</Link></li>
              </ul>
            )}
          </div>

          <div>
            <button className="font-semibold w-full text-left" onClick={() => toggleSection("media")}>
              Media
            </button>
            {openSection === "media" && (
              <ul className="pl-4 text-sm text-gray-700 space-y-1">
                <li><Link to="/human/report">Reports</Link></li>
                <li><Link to="/human/gallery">Gallery</Link></li>
                <li><Link to="/human/brochures">Brochures</Link></li>
                <li><Link to="/human/blog">Blogs</Link></li>
                <li><Link to="/human/articles">Articles</Link></li>
              </ul>
            )}
          </div>

          <Link to="/human/ingredients" className="block font-semibold">Ingredients</Link>
          <Link to="/human/contact_us" className="block font-semibold">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
