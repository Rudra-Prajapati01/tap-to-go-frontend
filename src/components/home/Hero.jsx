import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HeroImage from "../../assets/jiotap-hero.png";

const Hero = () => {
  const navigate = useNavigate();

  // State to track mobile view properly on load and resize
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 992 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992); // 992px breakpoint is better for clean splitting
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#F5FAFF 0%,#FFFFFF 50%,#F6FFF1 100%)",
        padding: isMobile ? "100px 20px 50px" : "140px 6% 80px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Stack elements on mobile
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "40px" : "60px",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Background Effects */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-100px",
          width: isMobile ? "300px" : "500px",
          height: isMobile ? "300px" : "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,77,187,0.15) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-100px",
          width: isMobile ? "280px" : "450px",
          height: isMobile ? "280px" : "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,175,29,0.15) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* LEFT CONTENT PANEL */}
      <div
        style={{
          flex: "1",
          width: "100%",
          maxWidth: isMobile ? "100%" : "600px",
          zIndex: 2,
          textAlign: isMobile ? "center" : "left", // Center text on mobile
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 16px",
            borderRadius: "50px",
            background: "#EAF4FF",
            color: "#0B4DBB",
            fontWeight: "700",
            fontSize: isMobile ? "13px" : "15px",
            marginBottom: "20px",
            width: "fit-content",
          }}
        >
          🚀 Future Of Networking
        </div>

        <h1
          style={{
            fontSize: isMobile ? "38px" : "72px", // Scaled down beautifully for mobile screens
            fontWeight: "900",
            lineHeight: isMobile ? "1.15" : "1.05",
            color: "#1F2937",
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}
        >
          One Tap.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg,#0B4DBB,#2E7BFF,#4CAF1D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Endless Connections.
          </span>
        </h1>

        <p
          style={{
            fontSize: isMobile ? "15px" : "19px",
            color: "#666",
            lineHeight: isMobile ? "1.7" : "1.9",
            maxWidth: "540px",
            marginBottom: "35px",
          }}
        >
          Create your smart NFC business card and instantly share your contact
          details, social media profiles, website, portfolio, payment links and
          more with a single tap.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: isMobile ? "14px 28px" : "18px 34px",
              borderRadius: "16px",
              border: "none",
              background: "linear-gradient(135deg,#0B4DBB,#4CAF1D)",
              color: "#fff",
              fontWeight: "700",
              fontSize: isMobile ? "15px" : "16px",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(11,77,187,0.25)",
              flex: isMobile ? "1" : "initial", // Buttons take full width side-by-side if needed
              minWidth: "150px",
            }}
          >
            Get Started →
          </button>

          <button
            style={{
              padding: isMobile ? "14px 28px" : "18px 34px",
              borderRadius: "16px",
              border: "2px solid #0B4DBB",
              background: "#fff",
              color: "#0B4DBB",
              fontWeight: "700",
              fontSize: isMobile ? "15px" : "16px",
              cursor: "pointer",
              flex: isMobile ? "1" : "initial",
              minWidth: "150px",
            }}
          >
            Watch Demo
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE PANEL */}
      <div
        style={{
          flex: isMobile ? "initial" : "1.2",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          marginTop: isMobile ? "10px" : "0",
        }}
      >
        <img
          src={HeroImage}
          alt="JioTap Hero"
          style={{
            width: "100%",
            maxWidth: isMobile ? "420px" : "1000px", // Standardized to avoid layout clipping
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;