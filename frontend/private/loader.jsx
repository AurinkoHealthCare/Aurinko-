import React from "react";

const HorizontalBounceLoader = () => {
  return (
    <div className="icon-wrapper" style={styles.wrapper}>
      {/* Human Icon - Red Glow */}
      <div
        className="icon-circle"
        style={{ ...styles.iconCircle, ...glowStyles.red, animationDelay: "0s" }}
      >
        <span className="icon" style={styles.icon}>👨‍⚕️</span>
      </div>

      {/* Animal Icon - Blue Glow */}
      <div
        className="icon-circle"
        style={{ ...styles.iconCircle, ...glowStyles.blue, animationDelay: "0.2s" }}
      >
        <span className="icon" style={styles.icon}>🐾</span>
      </div>

      {/* Agriculture Icon - Green Glow */}
      <div
        className="icon-circle"
        style={{ ...styles.iconCircle, ...glowStyles.green, animationDelay: "0.4s" }}
      >
        <span className="icon" style={styles.icon}>🌿</span>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes bounceUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-30px);
            }
          }

          @media (max-width: 768px) {
            .icon-wrapper {
              gap: 30px !important;
            }
            .icon-circle {
              width: 60px !important;
              height: 60px !important;
            }
            .icon {
              font-size: 30px !important;
            }
          }

          @media (max-width: 480px) {
            .icon-wrapper {
              gap: 20px !important;
            }
            .icon-circle {
              width: 50px !important;
              height: 50px !important;
            }
            .icon {
              font-size: 24px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
  },
  iconCircle: {
    width: "80px",
    height: "80px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "bounceUpDown 1.5s infinite ease-in-out",
    transition: "box-shadow 0.3s ease-in-out",
  },
  icon: {
    fontSize: "50px",
  },
};

const glowStyles = {
  red: {
    boxShadow: `
      0 0 30px rgba(255, 0, 0, 0.6),
      0 0 60px rgba(255, 0, 0, 0.3),
      inset 0 0 15px rgba(255, 0, 0, 0.4)
    `,
  },
  blue: {
    boxShadow: `
      0 0 30px rgba(0, 0, 255, 0.6),
      0 0 60px rgba(0, 0, 255, 0.3),
      inset 0 0 15px rgba(0, 0, 255, 0.4)
    `,
  },
  green: {
    boxShadow: `
      0 0 30px rgba(0, 255, 0, 0.6),
      0 0 60px rgba(0, 255, 0, 0.3),
      inset 0 0 15px rgba(0, 255, 0, 0.4)
    `,
  },
};

export default HorizontalBounceLoader;
