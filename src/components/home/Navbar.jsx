import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    setIsMobile(
      window.innerWidth < 768
    );

    const handleResize = () => {

      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  return (

    <>
      <style>{`

        *{
          box-sizing:border-box;
        }

        .jio-navbar{
          transition:0.3s;
        }

        .nav-btn{
          transition:0.3s;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .nav-btn:hover{
          transform:translateY(-2px);
        }

        .nav-links span{
          transition:0.3s;
        }

        .nav-links span:hover{
          color:#6155A6 !important;
        }

        @media (max-width: 900px){

          .nav-links{
            display:none !important;
          }

        }

        @media (max-width: 768px){

          .jio-navbar{
            height:64px !important;
            padding:0 14px !important;
          }

          .logo-text{
            font-size:18px !important;
          }

          .nav-buttons{
            gap:8px !important;
          }

          .nav-btn{
            padding:10px 14px !important;
            font-size:12px !important;
            border-radius:12px !important;
          }

        }

        @media (max-width: 480px){

          .jio-navbar{
            padding:0 10px !important;
          }

          .logo-text{
            font-size:16px !important;
          }

          .nav-btn{
            padding:9px 12px !important;
            font-size:11px !important;
          }

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
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom:
            "1px solid rgba(97,85,166,0.08)",
          zIndex: 1000,
        }}
      >

        {/* LOGO */}

        <div
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            flexShrink: 0,
            minWidth: 0,
          }}
        >

          <h1
            className="logo-text"
            style={{
              fontSize:
                isMobile
                  ? "20px"
                  : "24px",

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

        {/* NAV LINKS */}

        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
          }}
        >

          {[
            "Products",
            "Features",
            "Teams & Business",
            "Company",
          ].map((item) => (

            <span
              key={item}
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#555",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>

          ))}

        </div>

        {/* BUTTONS */}

        <div
          className="nav-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flexShrink: 0,
          }}
        >

          {/* LOGIN */}

          <button
            className="nav-btn"
            onClick={() =>
              navigate("/login")
            }
            style={{
              padding: "12px 24px",
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

          {/* GET STARTED */}

          <button
            className="nav-btn"
            onClick={() =>
              navigate("/register")
            }
            style={{
              padding: "12px 24px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(135deg,#6155A6,#A685E2)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow:
                "0 10px 28px rgba(97,85,166,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            {isMobile
              ? "Start"
              : "Get Started →"}
          </button>

        </div>

      </nav>
    </>
  );
};

export default Navbar;