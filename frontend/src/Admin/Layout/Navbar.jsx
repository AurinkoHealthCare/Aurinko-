import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [nestedDropdown, setNestedDropdown] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);
  const toggleNestedDropdown = (parent, child) =>
    setNestedDropdown((prev) => ({
      ...prev,
      [parent]: prev[parent] === child ? null : child,
    }));

  // Mobile/tablet: auto-hide sidebar on link click
  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", { withCredentials: true });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-full fixed top-0 left-0 z-40">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-white bg-gray-800 md:hidden fixed top-4 left-4 z-50 rounded shadow"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out shadow-lg pt-16 px-2 pb-4
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        {/* Branding */}
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-xl font-bold">Aurinko One Health</h1>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 text-sm">
          <NavLink to="/dashboard/" label="Home" onClick={handleLinkClick} />

          <Dropdown
            label="Update & Replace"
            isOpen={openDropdown === "Update & Replace"}
            onToggle={() => toggleDropdown("Update & Replace")}
            links={[
              { to: "/dashboard/banner", label: "Banner" },
              { to: "/dashboard/global_providers", label: "Global Providers" },
              { to: "/dashboard/pages_banner", label: "Pages Banner" },
              { to: "/dashboard/product_details", label: "Product details" },
              { to: "/dashboard/reports_articles", label: "Reports & Articles" },
              { to: "/dashboard/gallery_view", label: "Gallery_view" },
              { to: "/dashboard/brochure_view", label: "Brochure_view" },
              { to: "/dashboard/Blogs_view", label: "Blogs_view" },
              { to: "/dashboard/video_view", label: "Video_view" },
            ]}
            onLinkClick={handleLinkClick}
          />

          <Dropdown
            label="Input forms"
            isOpen={openDropdown === "Input forms"}
            onToggle={() => toggleDropdown("Input forms")}
            nested={[
              {
                label: "Home",
                items: [
                  { to: "/dashboard/image_slider", label: "Image Sliders Form" },
                  { to: "/dashboard/product_cart", label: "Global Provider Form" },
                  { to: "/dashboard/page_banner", label: "Pages Banner Form" },
                  { to: "/dashboard/product_detail", label: "Product detail" }
                ],
              },
              {
                label: "Media",
                items: [
                  { to: "/dashboard/Reports", label: "Reports & Articles Form" },
                  { to: "/dashboard/Gallery", label: "Gallery Form" },
                  { to: "/dashboard/Brochures", label: "Brochures Form" },
                  { to: "/dashboard/Blogs", label: "Blogs Form" },
                  { to: "/dashboard/Videos", label: "Videos Form" },
                ],
              }
            ]}
            nestedDropdown={nestedDropdown}
            onNestedToggle={toggleNestedDropdown}
            onLinkClick={handleLinkClick}
          />

          <NavLink to="/dashboard/feedback" label="Feedback" onClick={handleLinkClick} />

          <button
            onClick={handleLogout}
            className="w-full text-left text-red-400 hover:text-red-300 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

// NavLink component
const NavLink = ({ to, label, onClick }) => (
  <Link to={to}>
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition"
    >
      {label}
    </button>
  </Link>
);

// Dropdown component
const Dropdown = ({
  label,
  isOpen,
  onToggle,
  links,
  nested,
  nestedDropdown,
  onNestedToggle,
  onLinkClick,
}) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-700 transition"
    >
      {label}{" "}
      <ChevronDown
        className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""
          }`}
      />
    </button>

    {/* Flat Dropdown */}
    {isOpen && links && (
      <div className="ml-4 mt-1 space-y-1">
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            label={link.label}
            onClick={onLinkClick}
          />
        ))}
      </div>
    )}

    {/* Nested Dropdown */}
    {isOpen && nested && (
      <div className="ml-4 mt-1 space-y-2">
        {nested.map((group, idx) => (
          <div key={idx}>
            <button
              onClick={() => onNestedToggle(label, group.label)}
              className="flex justify-between items-center w-full px-2 py-1 hover:bg-gray-700 rounded"
            >
              {group.label}{" "}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${nestedDropdown?.[label] === group.label ? "rotate-180" : ""
                  }`}
              />
            </button>
            {nestedDropdown?.[label] === group.label && (
              <div className="ml-4 mt-1 space-y-1">
                {group.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    label={item.label}
                    onClick={onLinkClick}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Navbar;
