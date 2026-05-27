import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  const isMobile =
    window.innerWidth < 768;

  return (

    <section
      style={{
        minHeight: "100vh",

        width: "100%",

        background:
          "linear-gradient(135deg,#f8f4ff 0%,#fff 50%,#f2ebff 100%)",

        padding: isMobile
          ? "110px 20px 60px"
          : "120px 6% 80px",

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        gap: isMobile
          ? "40px"
          : "60px",

        flexWrap: "wrap",

        position: "relative",

        overflow: "hidden",
      }}
    >

      {/* BG BLOBS */}

      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "10%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(166,133,226,0.20) 0%,transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-50px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(255,171,225,0.20) 0%,transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* LEFT */}

      <div
        style={{
          flex: 1,

          minWidth: isMobile
            ? "100%"
            : "320px",

          position: "relative",

          zIndex: 10,
        }}
      >

        {/* BADGE */}

        <div
          style={{
            display: "inline-flex",

            alignItems: "center",

            gap: "10px",

            padding: "10px 18px",

            borderRadius: "50px",

            background:
              "rgba(97,85,166,0.08)",

            border:
              "1px solid rgba(97,85,166,0.18)",

            color: "#6155A6",

            fontSize: "14px",

            fontWeight: "700",

            marginBottom: "26px",
          }}
        >

          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#6155A6",
            }}
          />

          Future Of Networking

        </div>

        {/* HEADING */}

        <h1
          style={{
            fontSize: isMobile
              ? "46px"
              : "72px",

            lineHeight: "1.08",

            fontWeight: "900",

            color: "#1a1040",

            marginBottom: "24px",

            fontFamily: "sans-serif",
          }}
        >

          Digital
          <br />

          <span
            style={{
              background:
                "linear-gradient(135deg,#6155A6,#FFABE1,#A685E2)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",
            }}
          >
            Business Card
          </span>

        </h1>

        {/* DESC */}

        <p
          style={{
            fontSize: isMobile
              ? "15px"
              : "18px",

            color: "#666",

            lineHeight: "1.9",

            maxWidth: "580px",

            marginBottom: "38px",
          }}
        >
          Share your contact details instantly with NFC and QR technology.
          Modern networking made simple, beautiful, and powerful with Tap To Go.
        </p>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",

            gap: "18px",

            flexWrap: "wrap",
          }}
        >

          <button
            onClick={() =>
              navigate("/register")
            }
            style={{
              padding: isMobile
                ? "15px 24px"
                : "18px 38px",

              borderRadius: "18px",

              border: "none",

              background:
                "linear-gradient(135deg,#6155A6,#A685E2)",

              color: "#fff",

              fontSize: "16px",

              fontWeight: "700",

              cursor: "pointer",

              boxShadow:
                "0 14px 35px rgba(97,85,166,0.35)",

              transition: "0.3s",
            }}
          >
            Get Started →
          </button>

          <button
            style={{
              padding: isMobile
                ? "15px 24px"
                : "18px 38px",

              borderRadius: "18px",

              border:
                "2px solid #6155A6",

              background: "#fff",

              color: "#6155A6",

              fontSize: "16px",

              fontWeight: "700",

              cursor: "pointer",
            }}
          >
            Learn More
          </button>

        </div>

        {/* STATS */}

        <div
          style={{
            display: "flex",

            gap: isMobile
              ? "24px"
              : "50px",

            marginTop: "60px",

            flexWrap: "wrap",
          }}
        >

          {[
            ["10K+", "Users"],
            ["50K+", "QR Scans"],
            ["99%", "Satisfaction"],
          ].map(([num, text]) => (

            <div key={text}>

              <h2
                style={{
                  fontSize: isMobile
                    ? "28px"
                    : "40px",

                  fontWeight: "800",

                  color: "#6155A6",

                  marginBottom: "6px",
                }}
              >
                {num}
              </h2>

              <p
                style={{
                  color: "#777",

                  fontSize: "15px",
                }}
              >
                {text}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT */}

      <div
        style={{
          flex: 1,

          minWidth: isMobile
            ? "100%"
            : "320px",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          position: "relative",

          zIndex: 10,

          height: isMobile
            ? "520px"
            : "650px",
        }}
      >

        {/* MAIN PHONE */}

        <div
          style={{
            width: isMobile
              ? "280px"
              : "340px",

            height: isMobile
              ? "520px"
              : "640px",

            borderRadius: "42px",

            background:
              "rgba(255,255,255,0.82)",

            backdropFilter: "blur(18px)",

            border:
              "1px solid rgba(255,255,255,0.6)",

            boxShadow:
              "0 25px 80px rgba(97,85,166,0.25)",

            padding: "24px",

            position: "relative",
          }}
        >

          {/* TOP */}

          <div
            style={{
              width: "120px",

              height: "10px",

              borderRadius: "20px",

              background: "#ddd",

              margin: "0 auto 28px",
            }}
          />

          {/* PROFILE */}

          <div
            style={{
              textAlign: "center",
            }}
          >

            <div
              style={{
                width: isMobile
                  ? "90px"
                  : "110px",

                height: isMobile
                  ? "90px"
                  : "110px",

                borderRadius: "50%",

                background:
                  "linear-gradient(135deg,#6155A6,#FFABE1)",

                margin: "0 auto",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                color: "#fff",

                fontSize: isMobile
                  ? "32px"
                  : "42px",

                fontWeight: "800",

                boxShadow:
                  "0 14px 35px rgba(97,85,166,0.35)",
              }}
            >
              R
            </div>

            <h2
              style={{
                marginTop: "22px",

                fontSize: isMobile
                  ? "24px"
                  : "30px",

                color: "#1a1040",

                fontWeight: "800",
              }}
            >
              Rudra
            </h2>

            <p
              style={{
                color: "#777",

                marginTop: "8px",

                fontSize: "15px",
              }}
            >
              Full Stack Developer
            </p>

          </div>

          {/* QR */}

          <div
            style={{
              width: isMobile
                ? "160px"
                : "200px",

              height: isMobile
                ? "160px"
                : "200px",

              background: "#fff",

              borderRadius: "28px",

              margin:
                "40px auto 30px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              boxShadow:
                "0 12px 35px rgba(0,0,0,0.08)",
            }}
          >

            <div
              style={{
                width: isMobile
                  ? "120px"
                  : "150px",

                height: isMobile
                  ? "120px"
                  : "150px",

                background:
                  "repeating-linear-gradient(90deg,#6155A6 0 10px,#fff 10px 20px), repeating-linear-gradient(#6155A6 0 10px,#fff 10px 20px)",
              }}
            />

          </div>

          {/* SOCIAL */}

          <div
            style={{
              display: "flex",

              justifyContent: "center",

              gap: "14px",

              marginBottom: "34px",
            }}
          >

            {[
              "#0077B5",
              "#1877F2",
              "#E1306C",
              "#000",
            ].map((color, i) => (

              <div
                key={i}
                style={{
                  width: "42px",

                  height: "42px",

                  borderRadius: "12px",

                  background: color,
                }}
              />

            ))}

          </div>

          {/* BUTTON */}

          <button
            style={{
              width: "100%",

              height: isMobile
                ? "50px"
                : "58px",

              borderRadius: "18px",

              border: "none",

              background:
                "linear-gradient(135deg,#6155A6,#A685E2)",

              color: "#fff",

              fontSize: "18px",

              fontWeight: "700",

              cursor: "pointer",

              boxShadow:
                "0 10px 30px rgba(97,85,166,0.3)",
            }}
          >
            Share Profile
          </button>

        </div>

        {/* FLOAT CARD */}

        <div
          style={{
            display: isMobile
              ? "none"
              : "block",

            position: "absolute",

            left: "20px",

            top: "60px",

            width: "180px",

            background: "#fff",

            borderRadius: "22px",

            padding: "18px",

            boxShadow:
              "0 14px 40px rgba(97,85,166,0.15)",
          }}
        >

          <h3
            style={{
              color: "#6155A6",

              fontSize: "18px",

              fontWeight: "800",

              marginBottom: "10px",
            }}
          >
            QR Analytics
          </h3>

          <p
            style={{
              color: "#777",

              fontSize: "14px",
            }}
          >
            +2.5k profile scans
          </p>

        </div>

        {/* FLOAT SMALL */}

        <div
          style={{
            display: isMobile
              ? "none"
              : "block",

            position: "absolute",

            right: "0px",

            bottom: "70px",

            width: "170px",

            background: "#fff",

            borderRadius: "20px",

            padding: "18px",

            boxShadow:
              "0 14px 40px rgba(97,85,166,0.15)",
          }}
        >

          <h3
            style={{
              color: "#6155A6",

              fontSize: "17px",

              fontWeight: "800",

              marginBottom: "8px",
            }}
          >
            NFC Ready
          </h3>

          <p
            style={{
              color: "#777",

              fontSize: "13px",
            }}
          >
            Tap & Share Instantly
          </p>

        </div>

      </div>

    </section>
  );
};

export default Hero;