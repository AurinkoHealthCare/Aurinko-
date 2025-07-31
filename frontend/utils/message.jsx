import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaPlus,
} from "react-icons/fa";

const FloatingSocialMenu = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const dragRef = useRef(null);
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

  const icons = [
    {
      icon: <FaWhatsapp />,
      link: "https://wa.me/919999999999",
    },
    {
      icon: <FaPhone />,
      link: "tel:+919999999999",
    },
    {
      icon: <FaFacebookF />,
      link: "https://facebook.com",
    },
    {
      icon: <FaInstagram />,
      link: "https://instagram.com",
    },
  ];

  const angleGap = (2 * Math.PI) / icons.length;
  const radius = 70;

  const menuStyle = {
    position: "fixed",
    zIndex: 9999,
    top: position.y,
    left: position.x,
    userSelect: "none",
    touchAction: "none",
  };

  const mainButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
    zIndex: 2,
    position: "relative",
  };

  const iconStyle = {
    position: "absolute",
    width: "46px",
    height: "46px",
    backgroundColor: "#fff",
    color: "#007bff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    zIndex: 1,
  };

  return (
    <div
      ref={dragRef}
      style={menuStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Circular menu icons */}
      {icons.map((item, index) => {
        const angle = angleGap * index - Math.PI / 2;
        const x = open ? radius * Math.cos(angle) : 0;
        const y = open ? radius * Math.sin(angle) : 0;

        return (
          <a
            key={index}
            href={open ? item.link : "#"}
            target="_blank"
            rel="noreferrer"
            style={{
              ...iconStyle,
              left: `${30 + x}px`,
              top: `${30 + y}px`,
              pointerEvents: open ? "auto" : "none",
              opacity: open ? 1 : 0,
            }}
          >
            {item.icon}
          </a>
        );
      })}

      {/* Main toggle button */}
      <button style={mainButtonStyle} onClick={toggleMenu}>
        <FaPlus />
      </button>
    </div>
  );
};

export default FloatingSocialMenu;
