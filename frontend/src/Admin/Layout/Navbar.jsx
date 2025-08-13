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
      {/* Mobile Toggle */}
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

        {/* Nav Items */}
        <div className="space-y-2 text-sm">
          <NavLink to="/dashboard/" label="Home" />

          <Dropdown
            label="Media"
            isOpen={openDropdown === "media"}
            onToggle={() => toggleDropdown("media")}
            links={[
              { to: "/dashboard/banner", label: "Banner" },
              { to: "/dashboard/productimage", label: "Global Page Card" },
              { to: "/dashboard/productlogo", label: "Multiple Product" },
              { to: "/dashboard/report_view", label: "Report View" },
              { to: "/dashboard/Gallery_view", label: "Gallery View" },
              { to: "/dashboard/Brochure_view", label: "Brochure View" },
            ]}
          />

          <Dropdown
            label="Pages"
            isOpen={openDropdown === "pages"}
            onToggle={() => toggleDropdown("pages")}
            nested={[
              {
                label: "Home",
                items: [
                  { to: "/dashboard/imageSlider", label: "Image Slider" },
                  { to: "/dashboard/product_cart", label: "Product Cart" },
                  { to: "/dashboard/product_list", label: "Product List" },
                ],
              },
              {
                label: "Media",
                items: [
                  { to: "/dashboard/Reports", label: "Reports" },
                  { to: "/dashboard/Gallery", label: "Gallery" },
                  { to: "/dashboard/Brochures", label: "Brochures" },
                  { to: "/dashboard/Blogs", label: "Blogs" },
                  { to: "/dashboard/page_banner", label: "Pages Banner" },
                  { to: "/dashboard/Videos", label: "Videos" },
                ],
              },
              {
                label: "Contact Us",
                items: [{ to: "/dashboard/contact", label: "Contact Us" }],
              },
            ]}
            nestedDropdown={nestedDropdown}
            onNestedToggle={toggleNestedDropdown}
          />

          <NavLink to="/dashboard/feedback" label="Feedback" />

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

// ========== Reusable Components ==========

const NavLink = ({ to, label }) => (
  <Link to={to}>
    <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition">
      {label}
    </button>
  </Link>
);

const Dropdown = ({ label, isOpen, onToggle, links, nested, nestedDropdown, onNestedToggle }) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center px-4 py-2 rounded hover:bg-gray-700 transition"
    >
      {label} <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>

    {/* Flat Dropdown */}
    {isOpen && links && (
      <div className="ml-4 mt-1 space-y-1">
        {links.map((link, idx) => (
          <NavLink key={idx} to={link.to} label={link.label} />
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
              {group.label} <ChevronDown className={`w-4 h-4 transition-transform ${nestedDropdown?.[label] === group.label ? "rotate-180" : ""}`} />
            </button>
            {nestedDropdown?.[label] === group.label && (
              <div className="ml-4 mt-1 space-y-1">
                {group.items.map((item, i) => (
                  <NavLink key={i} to={item.to} label={item.label} />
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
