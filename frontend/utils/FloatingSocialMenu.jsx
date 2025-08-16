import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaUser,
  FaPaw,
  FaLeaf,
} from "react-icons/fa";
import { RiHomeSmile2Fill } from "react-icons/ri"; // Remix style home icon
import { FaPlus } from "react-icons/fa6"; // Naya plus icon

const FloatingSocialMenu = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const toggleMenu = () => setOpen(!open);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    const touch = e.touches[0];
    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging.current) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      });
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  // Links & colors easily change ho sake
  const icons = [
    { icon: <FaFacebookF />, link: "https://facebook.com", bg: "linear-gradient(135deg, #3b5998, #1877f2)" },
    { icon: <FaInstagram />, link: "https://instagram.com", bg: "linear-gradient(135deg, #f58529, #dd2a7b)" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com", bg: "linear-gradient(135deg, #0072b1, #005582)" },
    { icon: <FaUser />, link: "/human", bg: "#b30800" }, // Human - Red
    { icon: <FaPaw />, link: "/veterinary", bg: "#1f3ad1" }, // Veterinary - Blue
    { icon: <FaLeaf />, link: "/agriculture", bg: "#01421d" }, // Agriculture - Dark Green
    { icon: <RiHomeSmile2Fill />, link: "/", bg: "linear-gradient(135deg, #00c6ff, #0072ff)" }, // Home remix style
  ];

  const angleGap = (2 * Math.PI) / icons.length;
  const radius = 90;

  const menuStyle = {
    position: "fixed",
    zIndex: 9999,
    top: position.y,
    left: position.x,
    userSelect: "none",
    touchAction: "none",
    width: "60px",
    height: "60px",
  };

  const mainButtonStyle = {
    background: "#fcc300",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
    zIndex: 2,
    position: "relative",
    cursor: "pointer",
  };

  const iconStyle = (bg) => ({
    position: "absolute",
    width: "48px",
    height: "48px",
    background: bg,
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
    transition: "all 0.35s ease",
    zIndex: 1,
    transform: "scale(0)",
  });

  return (
    <div
      style={menuStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {icons.map((item, index) => {
        const angle = angleGap * index - Math.PI / 2;
        const x = open ? radius * Math.cos(angle) : 0;
        const y = open ? radius * Math.sin(angle) : 0;

        return (
          <a
            key={index}
            href={open ? item.link : "#"}
            target={item.link.startsWith("http") ? "_blank" : "_self"}
            rel="noreferrer"
            style={{
              ...iconStyle(item.bg),
              left: `calc(50% + ${x}px - 24px)`,
              top: `calc(50% + ${y}px - 24px)`,
              pointerEvents: open ? "auto" : "none",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {item.icon}
          </a>
        );
      })}

      <button style={mainButtonStyle} onClick={toggleMenu}>
        <FaPlus
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "0.3s",
          }}
        />
      </button>
    </div>
  );
};

export default FloatingSocialMenu;
