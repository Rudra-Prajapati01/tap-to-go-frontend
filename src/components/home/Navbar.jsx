import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile Menu Toggle State

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Screen badi hote hi mobile menu auto close ho jaye
      if (window.innerWidth >= 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Body scroll lock jab mobile menu open ho
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  const handleNavLinkClick = (item) => {
    setMenuOpen(false); // Link click hote hi menu close karo
    if (item === "Features") navigate("/features"); 
    else if (item === "Products") navigate("/products");
    else if (item === "About Us") navigate("/about"); 
    else if (item === "Teams & Business") navigate("/teams-business");
    else if (item === "Contact Us") navigate("/contact");
  };

  const menuItems = ["Products", "Features", "Teams & Business", "About Us", "Contact Us"];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .jio-navbar { transition: all 0.3s ease; }
        .nav-btn { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; align-items: center; justify-content: center; }
        .nav-btn:hover { transform: translateY(-2px); }
        .nav-links span { transition: 0.3s; position: relative; }
        .nav-links span::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -4px; left: 0; background-color: #6155A6; transition: 0.3s; }
        .nav-links span:hover::after { width: 100%; }
        .nav-links span:hover { color: #6155A6 !important; }
        
        /* Hamburger Icon Animation */
        .hamburger-icon { display: none; flex-direction: column; gap: 6px; cursor: pointer; padding: 8px; z-index: 1001; }
        .hamburger-line { width: 24px; height: 2px; background-color: #3E3276; transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hamburger-icon.open .line1 { transform: rotate(45deg) translate(5px, 6px); }
        .hamburger-icon.open .line2 { opacity: 0; transform: translateX(-10px); }
        .hamburger-icon.open .line3 { transform: rotate(-45deg) translate(6px, -7px); }

        /* Mobile Drawer Base Layout */
        .mobile-drawer {
          position: fixed; top: 0; right: -100%; width: 100%; height: 100vh;
          background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 32px; transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1); z-index: 999;
        }
        .mobile-drawer.open { right: 0; }
        .mobile-drawer-link { fontSize: 20px; fontWeight: 600; color: #475569; cursor: pointer; transition: 0.2s; }
        .mobile-drawer-link:hover { color: #6155A6; transform: scale(1.05); }

        @media (max-width: 992px){
          .nav-links { display: none !important; }
          .hamburger-icon { display: flex !important; }
          .nav-buttons-desktop { display: none !important; }
        }
        @media (max-width: 768px){
          .jio-navbar { height: 64px !important; padding: 0 20px !important; }
          .logo-text { font-size: 18px !important; }
          .mobile-drawer { width: 100% !important; }
        }
        @media (max-width: 480px){
          .jio-navbar { padding: 0 16px !important; }
          .logo-text { font-size: 17px !important; }
        }
      `}</style>

      <nav
        className="jio-navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "74px",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(97,85,166,0.08)",
          zIndex: 1000,
        }}
      >
        {/* LOGO AREA */}
        <div
          onClick={() => { setMenuOpen(false); navigate("/"); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            flexShrink: 0,
            flex: "1 0 0%",
          }}
        >
          <h1
            className="logo-text"
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "800",
              color: "#3E3276",
              fontFamily: "sans-serif",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Jio Tap
          </h1>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            flexShrink: 0,
          }}
        >
          {menuItems.map((item) => (
            <span
              key={item}
              onClick={() => handleNavLinkClick(item)}
              style={{
                fontSize: "14px",
                fontWeight: "650",
                color: "#475569",
                cursor: "pointer",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em"
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* ACTIONS / CONTROLS SYSTEM */}
        <div
          className="nav-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "14px",
            flexShrink: 0,
            flex: "1 0 0%", 
          }}
        >
          {/* Desktop Right Buttons Row */}
          <div className="nav-buttons-desktop" style={{ display: "flex", gap: "14px" }}>
            <button
              className="nav-btn"
              onClick={() => navigate("/login")}
              style={{
                padding: "11px 22px",
                borderRadius: "14px",
                border: "2px solid #6155A6",
                background: "#fff",
                color: "#6155A6",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Login
            </button>
            <button
              className="nav-btn"
              onClick={() => navigate("/register")}
              style={{
                padding: "12px 24px",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg,#6155A6,#A685E2)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 28px rgba(97,85,166,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              Get Started →
            </button>
          </div>

          {/* Responsive Hamburger Toggle Action Button */}
          <div 
            className={`hamburger-icon ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="hamburger-line line1"></div>
            <div className="hamburger-line line2"></div>
            <div className="hamburger-line line3"></div>
          </div>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN SIDEBAR SCREEN DRAWER OVERLAY */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
          {menuItems.map((item) => (
            <span
              key={item}
              className="mobile-drawer-link"
              onClick={() => handleNavLinkClick(item)}
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Mobile Action Controls inside Drawer */}
        <div style={{ display: "flex", flexDirection: "column", width: "80%", gap: "12px", marginTop: "16px" }}>
          <button
            className="nav-btn"
            onClick={() => { setMenuOpen(false); navigate("/login"); }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "2px solid #6155A6",
              background: "#fff",
              color: "#6155A6",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            className="nav-btn"
            onClick={() => { setMenuOpen(false); navigate("/register"); }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg,#6155A6,#A685E2)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(97,85,166,0.25)",
            }}
          >
            Get Started →
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;