import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const isMobile =
    window.innerWidth < 768;

  return (

    <nav
      style={{
        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: isMobile
          ? "68px"
          : "74px",

        padding: isMobile
          ? "0 20px"
          : "0 6%",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        background:
          "rgba(255,255,255,0.88)",

        backdropFilter:
          "blur(18px)",

        borderBottom:
          "1px solid rgba(97,85,166,0.08)",

        zIndex: 999,

        boxSizing: "border-box",
      }}
    >

      {/* LOGO */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: isMobile
            ? "10px"
            : "12px",

          cursor: "pointer",

          flexShrink: 0,
        }}
      >

        <div
          style={{
            width: isMobile
              ? "38px"
              : "42px",

            height: isMobile
              ? "38px"
              : "42px",

            borderRadius: "14px",

            background:
              "linear-gradient(135deg,#6155A6,#A685E2)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "#fff",

            fontWeight: "800",

            fontSize: isMobile
              ? "18px"
              : "20px",

            boxShadow:
              "0 8px 25px rgba(97,85,166,0.35)",
          }}
        >
          J
        </div>

        <h1
          style={{
            fontSize: isMobile
              ? "18px"
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

      {!isMobile && (

        <div
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

                transition: "0.3s",
              }}

              onMouseEnter={(e) => {

                e.target.style.color =
                  "#6155A6";
              }}

              onMouseLeave={(e) => {

                e.target.style.color =
                  "#555";
              }}
            >
              {item}
            </span>

          ))}

        </div>
      )}

      {/* BUTTONS */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: isMobile
            ? "10px"
            : "14px",

          flexShrink: 0,
        }}
      >

        {/* LOGIN */}

        <button
          onClick={() =>
            navigate("/login")
          }

          style={{
            padding: isMobile
              ? "10px 16px"
              : "12px 24px",

            borderRadius: "14px",

            border:
              "2px solid #6155A6",

            background: "#fff",

            color: "#6155A6",

            fontSize: isMobile
              ? "13px"
              : "14px",

            fontWeight: "700",

            cursor: "pointer",

            transition: "0.3s",

            whiteSpace: "nowrap",
          }}

          onMouseEnter={(e) => {

            e.target.style.background =
              "#6155A6";

            e.target.style.color =
              "#fff";
          }}

          onMouseLeave={(e) => {

            e.target.style.background =
              "#fff";

            e.target.style.color =
              "#6155A6";
          }}
        >
          Login
        </button>

        {/* GET STARTED */}

        <button
          onClick={() =>
            navigate("/register")
          }

          style={{
            padding: isMobile
              ? "10px 16px"
              : "12px 24px",

            borderRadius: "14px",

            border: "none",

            background:
              "linear-gradient(135deg,#6155A6,#A685E2)",

            color: "#fff",

            fontSize: isMobile
              ? "13px"
              : "14px",

            fontWeight: "700",

            cursor: "pointer",

            boxShadow:
              "0 10px 28px rgba(97,85,166,0.35)",

            transition: "0.3s",

            whiteSpace: "nowrap",
          }}

          onMouseEnter={(e) => {

            e.target.style.transform =
              "translateY(-2px)";
          }}

          onMouseLeave={(e) => {

            e.target.style.transform =
              "translateY(0px)";
          }}
        >
          {isMobile
            ? "Start"
            : "Get Started →"}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;