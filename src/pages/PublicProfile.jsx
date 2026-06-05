import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicProducts from "./PublicProducts";

const PublicProfile = () => {
  const { uniqueId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [uniqueId]);

  const fetchUser = async () => {

    try {

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/users/${uniqueId}`
        );

      setUser(res.data);


      /* TRACK NFC TAP */

      try {

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/analytics/nfc-tap`,
          {
            userId: res.data._id,
          }
        );

      } catch (error) {

        console.log(error);
      }
      /* TRACK PROFILE VIEW */

      try {

        const alreadyViewed =

          sessionStorage.getItem(

            `profile_view_${res.data._id}`
          );

        if (!alreadyViewed) {

          await axios.post(

            `${import.meta.env.VITE_API_URL}/api/analytics/profile-view`,
            {
              userId: res.data._id,
            }
          );

          sessionStorage.setItem(

            `profile_view_${res.data._id}`,

            "true"
          );
        }

      } catch (error) {

        console.log(error);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF,#B8D4FF)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#0B4DBB",
        fontSize: 15,
        fontWeight: 700,
      }}>
        <div style={{
          width: 40, height: 40,
          border: "3px solid #e9d5ff",
          borderTopColor: "#0B4DBB",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        Loading profile…
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 800,
        background: "linear-gradient(135deg,#FFE6E6,#FFCBE8,#D4B8FF)",
        color: "#0B4DBB", fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        User not found 🔍
      </div>
    );
  }

  // ─── THEME ENGINE (100% original — untouched) ─────────────────────────────
  const theme = user?.theme || {};
  const isCenter = theme.cardView === "center";
  const isPortrait = theme.cardView === "portrait";
  const isLeftLayout = !isCenter && !isPortrait;

  const fontFamily = theme.fontFamily || "'Plus Jakarta Sans', sans-serif";
  const bgColor = theme.backgroundColor || "#0f172a";
  const textColor = theme.textColor || "#1e1b4b";
  const buttonColor = theme.buttonColor || "linear-gradient(135deg,#0B4DBB,#4CAF1D,#ec4899)";
  const buttonTextColor = theme.buttonTextColor || "#fff";
  const isSolidButton = buttonColor && !buttonColor.includes("gradient");
  const buttonStyle = { background: buttonColor, color: buttonTextColor };

  const coverBg = user.coverImage
    ? `url(${user.coverImage}) center/cover no-repeat`
    : user.coverTheme || "linear-gradient(135deg,#1e1b4b 0%,#312e81 30%,#4c1d95 60%,#0B4DBB 100%)";

  const avatarSize = isPortrait ? 110 : isCenter ? 96 : 90;

  const socials = [

    {
      key: "instagram",
      label: "Instagram",
      bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      icon: "📸"
    },

    {
      key: "linkedin",
      label: "LinkedIn",
      bg: "#0A66C2",
      icon: "💼"
    },

    {
      key: "github",
      label: "GitHub",
      bg: "#18181b",
      icon: "🐙"
    },

    {
      key: "twitter",
      label: "Twitter / X",
      bg: "#000",
      icon: "𝕏"
    },

    {
      key: "youtube",
      label: "YouTube",
      bg: "#FF0000",
      icon: "▶️"
    },

    {
      key: "facebook",
      label: "Facebook",
      bg: "#1877F2",
      icon: "📘"
    },

    {
      key: "whatsapp",
      label: "WhatsApp",
      bg: "#25D366",
      icon: "💬"
    },
  ];

  const pillStyle = {
    background: bgColor !== "rgba(255,255,255,0.82)"
      ? `${bgColor}99`
      : "linear-gradient(135deg,rgba(237,233,254,0.7),rgba(252,231,243,0.5))",
    border: `1.5px solid ${buttonColor && !buttonColor.includes("gradient") ? buttonColor + "30" : "rgba(196,168,255,0.35)"}`,
  };
  const pillTextStyle = { color: theme.textColor || "#4c1d95" };
  const nameStyle = { fontFamily: fontFamily, color: textColor };
  const jobColor = isSolidButton ? buttonColor : "#0B4DBB";

  // ─── NEW: accent color derived from theme ─────────────────────────────────
  const accentColor = isSolidButton ? buttonColor : "#0B4DBB";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }

        /* ── PAGE ── */
.pp-page {
  min-height: 100vh;
  background: ${theme.backgroundColor || "#f0f2f8"};
  font-family: ${fontFamily};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 0 60px;
  transition: background 0.3s ease;
}

        /* ── CARD ── */
        .pp-card {
        width: 100%;
        max-width: ${isPortrait ? "520px" : "860px"};

        background: ${theme.backgroundColor || "#ffffff"};

        color: ${theme.textColor || "#1e293b"};

        border-radius: 0 0 32px 32px;

        box-shadow: 0 8px 48px rgba(0,0,0,0.10),
                    0 2px 8px rgba(0,0,0,0.06);

        overflow: hidden;

        transition: background 0.3s ease,
                    color 0.3s ease;
      }

        /* ══════════════════════════════════════════
           HERO / COVER — reference image exact
        ══════════════════════════════════════════ */
        .pp-cover {
          width: 100%;
          height: ${isPortrait ? "260px" : "300px"};
          position: relative;
          overflow: hidden;
        }
        .pp-cover-bg {
          position: absolute;
          inset: 0;
          background: ${coverBg};
          background-size: cover;
          background-position: center;
        }
        /* dark overlay exactly like reference */
        .pp-cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(0,0,0,0.25) 0%,
            rgba(15,10,40,0.68) 100%
          );
        }
        /* purple glow blob at bottom-left like reference */
        .pp-cover-glow {
          position: absolute;
          bottom: -30px;
          left: -20px;
          width: 260px;
          height: 180px;
          background: radial-gradient(ellipse, rgba(11,77,187,0.55) 0%, transparent 70%);
          filter: blur(28px);
          pointer-events: none;
        }

        /* tagline pill — top-left */
        .pp-tagline-pill {
          position: absolute;
          top: 22px;
          left: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
          z-index: 3;
          font-family: ${fontFamily};
        }
        .pp-tagline-code {
          background: rgba(11,77,187,0.6);
          border-radius: 100px;
          padding: 2px 9px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        /* availability badge — top-right */
        .pp-avail-badge {
          position: absolute;
          top: 22px;
          right: 24px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          z-index: 3;
          font-family: ${fontFamily};
        }
        .pp-avail-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px #22c55e;
          animation: pp-pulse 2s infinite;
        }
        @keyframes pp-pulse {
          0%,100% { opacity:1; } 50% { opacity:0.45; }
        }

        /* hero title — bottom-left */
        .pp-hero-title {
          position: absolute;
          bottom: 28px;
          left: 24px;
          z-index: 3;
          color: #fff;
        }
        .pp-hero-title h2 {
          font-size: clamp(30px, 5.5vw, 52px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -1.5px;
          text-shadow: 0 2px 16px rgba(0,0,0,0.35);
          font-family: ${fontFamily};
        }
        .pp-hero-title h2 .accent {
          color: ${isSolidButton ? buttonColor : "#a78bfa"};
          display: block;
        }
        .pp-hero-skills {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }
        .pp-hero-skill-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 17px;
        }

        /* Let's Connect floating button — bottom-right over cover */
        .pp-connect-float {
          position: absolute;
          bottom: 24px;
          right: 24px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          font-family: ${fontFamily};
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        }
        .pp-connect-float:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.32);
        }

        /* logo badge */
        .pp-logo {
          position: absolute;
          top: 18px;
          right: 24px;
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(255,255,255,0.9);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .pp-logo img { width:100%; height:100%; object-fit:contain; }

        /* ══════════════════════════════════════════
           CONTENT AREA
        ══════════════════════════════════════════ */
        .pp-content {
          padding: ${isPortrait ? "0 28px 32px" : "0 28px 28px"};
        }

        /* ── TOP ROW (avatar + connect for non-portrait) ── */
        .pp-top-row {
          display: flex;
          justify-content: ${isCenter || isPortrait ? "center" : "space-between"};
          align-items: flex-end;
          margin-top: ${isPortrait ? "-55px" : "-50px"};
          margin-bottom: ${isPortrait ? "20px" : "20px"};
          position: relative;
          z-index: 5;
        }
        .pp-top-row-portrait {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -55px;
          margin-bottom: 20px;
          gap: 16px;
          position: relative;
          z-index: 5;
        }

        /* avatar */
        .pp-avatar-wrap {
          position: relative;
          display: inline-block;
          padding: 3px;
          border-radius: ${isPortrait ? "50%" : "50%"};
          background: linear-gradient(135deg,#c084fc,#f472b6,#fb923c);
          box-shadow: 0 6px 24px rgba(11,77,187,0.32);
        }
        .pp-avatar {
          width: ${isPortrait ? "108px" : isCenter ? "100px" : "100px"};
          height: ${isPortrait ? "108px" : isCenter ? "100px" : "100px"};
          border-radius: 50%;
          object-fit: cover;
          background: #fff;
          border: 3px solid #fff;
          display: block;
        }
        .pp-avatar-placeholder {
          width: ${isPortrait ? "108px" : "100px"};
          height: ${isPortrait ? "108px" : "100px"};
          border-radius: 50%;
          background: linear-gradient(135deg,#c084fc,#f472b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isPortrait ? "40px" : "36px"};
          font-weight: 900;
          color: #fff;
          border: 3px solid #fff;
        }
        /* green online dot */
        .pp-online-dot {
          position: absolute;
          bottom: 6px; right: 6px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #22c55e;
          border: 3px solid #fff;
          box-shadow: 0 0 8px rgba(34,197,94,0.7);
        }

        /* connect button (portrait / center mode only) */
        .pp-connect {
          padding: 12px 26px;
          border-radius: 14px;
          font-size: 13.5px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          font-family: ${fontFamily};
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .pp-connect:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.22); }

        /* ── SPLIT GRID ── */
        .pp-split {
          display: grid;
          grid-template-columns: ${isCenter || isPortrait ? "1fr" : "1fr 300px"};
          gap: 28px;
          align-items: start;
          ${isCenter || isPortrait ? "text-align: center;" : ""}
        }

        /* ── NAME / ROLE ── */
        .pp-name {
          font-size: ${isPortrait ? "30px" : "28px"};
          font-weight: 900;
          color: ${textColor};
          line-height: 1.1;
          margin-bottom: 4px;
          font-family: ${fontFamily};
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        .pp-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: ${isSolidButton ? buttonColor : "linear-gradient(135deg,#6366f1,#4CAF1D)"};
          flex-shrink: 0;
        }
        .pp-job {
          font-size: 13.5px;
          font-weight: 700;
          color: ${jobColor};
          margin-bottom: 10px;
        }
        .pp-pills-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        .pp-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }
        .pp-work-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        .pp-bio {
          font-size: 13.5px;
          color: ${theme.textColor ? theme.textColor + "cc" : "#475569"};
          line-height: 1.75;
          margin-bottom: 18px;
        }

        /* ── SOCIALS ── */
        .pp-socials-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 10px;
          margin-top: 18px;
        }
        .pp-socials {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        .pp-social {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 18px;
          border-radius: 13px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          color: #fff;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .pp-social:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.22); }

        /* ══════════════════════════════════════════
           CONTACT CARD (right column) — reference exact
        ══════════════════════════════════════════ */
        .pp-section-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 12px;
          ${isCenter || isPortrait ? "text-align: center;" : ""}
        }
        .pp-contact-card {

          background:
            ${theme.backgroundColor || "#ffffff"};

          border: 1.5px solid rgba(255,255,255,0.08);

          border-radius: 22px;

          padding: 20px;

          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .pp-contact-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .pp-contact-card-header-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: ${isSolidButton ? buttonColor : "linear-gradient(135deg,#6366f1,#4CAF1D)"};
          display: flex; align-items: center; justify-content: center;
        }
        .pp-contact-card-header h3 {
          font-size: 15px;
          font-weight: 800;
          color: ${theme.textColor || "#0f172a"};
          font-family: ${fontFamily};
        }
        .pp-contacts {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* each contact chip — redesigned like reference */
        .pp-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          border-radius: 14px;
          position: relative;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          background:
                    ${theme.backgroundColor === "#ffffff"
          ? "#f8fafc"
          : "rgba(255,255,255,0.05)"};
          border: 1px solid #f1f5f9;
        }
        .pp-chip:hover { background: #f1f5f9; transform: translateX(2px); }
        .pp-chip-icon {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 11px;
          flex-shrink: 0;
          font-size: 17px;
        }
        .pp-chip-icon.phone-icon { background: #eff6ff; }
        .pp-chip-icon.email-icon { background: #f0fdf4; }
        .pp-chip-icon.addr-icon  { background: #fdf4ff; }
        .pp-chip-body {
          flex: 1;
          min-width: 0;
        }
        .pp-chip-sublabel {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #94a3b8;
          margin-bottom: 2px;
        }
        .pp-chip-text {
          font-size: 13px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
          color: #1e293b;
        }
        .pp-chip-copy {
          position: absolute;
          right: 12px;
          font-size: 10px;
          font-weight: 800;
          color: #22c55e;
          white-space: nowrap;
        }

        .pp-website {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 14px;
          text-decoration: none;
          margin-top: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: ${fontFamily};
          box-shadow: 0 4px 16px rgba(99,102,241,0.22);
        }
        .pp-website:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.32); }

        /* ══════════════════════════════════════════
           STATS BAR — reference exact
        ══════════════════════════════════════════ */
        .pp-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
          margin: 8px 0 0;
        }
        .pp-stat {
          padding: 24px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-align: center;
          border-right: 1px solid #f1f5f9;
        }
        .pp-stat:last-child { border-right: none; }
        .pp-stat-value {
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
          font-family: ${fontFamily};
        }
        .pp-stat-label {
          font-size: 11.5px;
          font-weight: 500;
          color: #94a3b8;
          line-height: 1.3;
        }

        /* ══════════════════════════════════════════
           PRODUCTS SECTION HEADER
        ══════════════════════════════════════════ */
        .pp-products-wrap {
          padding: 28px 28px 36px;
        }
        .pp-products-heading-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .pp-products-heading {
          font-size: 18px;
          font-weight: 900;
          color: ${theme.textColor || "#0f172a"};
          font-family: ${fontFamily};
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .pp-products-heading-underline {
          display: block;
          width: 36px;
          height: 3px;
          border-radius: 2px;
          background: ${isSolidButton ? buttonColor : "linear-gradient(135deg,#6366f1,#ec4899)"};
        }

        /* ══════════════════════════════════════════
           LEAD MODAL — original logic, better style
        ══════════════════════════════════════════ */
        .lead-modal {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }
        .lead-box {
          width: 100%;
          max-width: 440px;
          background: white;
          border-radius: 28px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.25);
        }
        .lead-box h2 {
          font-size: 22px;
          font-weight: 900;
          color: #1e1b4b;
          margin-bottom: 4px;
          font-family: ${fontFamily};
        }
        .lead-box input,
        .lead-box textarea {
          width: 100%;
          padding: 13px 16px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          outline: none;
          font-size: 14px;
          font-family: ${fontFamily};
          transition: border-color 0.2s;
          color: #1e293b;
        }
        .lead-box input:focus,
        .lead-box textarea:focus {
          border-color: ${isSolidButton ? buttonColor : "#4CAF1D"};
        }
        .lead-box textarea { min-height: 100px; resize: none; }
        .lead-submit-btn {
          padding: 14px;
          border: none;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          font-family: ${fontFamily};
          transition: opacity 0.2s, transform 0.2s;
        }
        .lead-submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 700px) {
          .pp-page { padding: 0 0 40px; }
          .pp-card { border-radius: 0 0 24px 24px; }
          .pp-cover { height: ${isPortrait ? "220px" : "240px"}; }
          .pp-hero-title h2 { font-size: 28px; }
          .pp-hero-title { bottom: 72px; }
          .pp-connect-float { bottom: 16px; right: 16px; padding: 11px 18px; font-size: 13px; }
          .pp-content { padding: 0 18px 24px; }
          .pp-split { grid-template-columns: 1fr; gap: 20px; }
          .pp-name { font-size: 24px; }
          .pp-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .pp-stat { border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
          .pp-stat:nth-child(2) { border-right: none; }
          .pp-products-wrap { padding: 20px 16px 32px; }
          .pp-top-row { margin-top: -46px; }
        }
        @media (max-width: 480px) {
          .pp-tagline-pill { display: none; }
          .pp-hero-skills { display: none; }
        }
      `}</style>

      <div className="pp-page">
        <div className="pp-card">

          {/* ══ COVER / HERO ══ */}
          <div className="pp-cover">
            <div className="pp-cover-bg" />
            <div className="pp-cover-overlay" />
            <div className="pp-cover-glow" />

            {/* tagline pill — only if bio exists, no logo conflict */}
            {user.bio && !user.logoImage && (
              <div className="pp-tagline-pill">
                {user.bio.split(" ").slice(0, 5).join(" ")}
                <span className="pp-tagline-code">&lt;/&gt;</span>
              </div>
            )}

            {/* availability badge */}
            {!user.logoImage && (
              <div className="pp-avail-badge">
                <div className="pp-avail-dot" />
                Available for work
              </div>
            )}

            {/* logo badge */}
            {user.logoImage && (
              <div className="pp-logo">
                <img src={user.logoImage} alt="logo" />
              </div>
            )}

            {/* Floating Let's Connect button */}
            <button
              className="pp-connect-float"
              style={buttonStyle}
              onClick={() => setShowLeadForm(true)}
            >
              ✈ Let's Connect
            </button>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="pp-content">

            {/* ── TOP ROW: avatar + connect ── */}
            {isPortrait ? (
              <div className="pp-top-row-portrait">
                <div className="pp-avatar-wrap">
                  {user.profileImage
                    ? <img src={user.profileImage} alt={user.name} className="pp-avatar" />
                    : <div className="pp-avatar-placeholder">{user.name?.[0]?.toUpperCase() || "?"}</div>
                  }
                  <div className="pp-online-dot" />
                </div>
                <button className="pp-connect" style={buttonStyle} onClick={() => setShowLeadForm(true)}>
                  + Connect
                </button>
              </div>
            ) : (
              <div className="pp-top-row">
                <div className="pp-avatar-wrap">
                  {user.profileImage
                    ? <img src={user.profileImage} alt={user.name} className="pp-avatar" />
                    : <div className="pp-avatar-placeholder">{user.name?.[0]?.toUpperCase() || "?"}</div>
                  }
                  <div className="pp-online-dot" />
                </div>
                {/* center layout: show connect here too */}
                {isCenter && (
                  <button className="pp-connect" style={buttonStyle} onClick={() => setShowLeadForm(true)}>
                    + Connect
                  </button>
                )}
              </div>
            )}

            {/* ── SPLIT: info left + contact card right ── */}
            <div className="pp-split">

              {/* LEFT / FULL — info column */}
              <div>
                {/* Name + verified badge */}
                <h1 className="pp-name" style={nameStyle}>
                  {user.name}
                  <span className="pp-verified">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <polyline points="20 6 9 17 4 12" strokeWidth="3" stroke="white"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </h1>

                {(user.jobTitle || user.companyName) && (
                  <p className="pp-job">
                    {user.jobTitle}{user.companyName ? ` · ${user.companyName}` : ""}
                  </p>
                )}

                {/* Location + Open to Work pills */}
                <div className="pp-pills-row">
                  {(user.city || user.state || user.country) && (
                    <span className="pp-location-pill">
                      📍 {[user.city, user.state, user.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  <span className="pp-work-pill">🔄 Open to Work</span>
                </div>

                {user.bio && <p className="pp-bio">{user.bio}</p>}

                {/* Socials */}
                {socials.some((s) => user[s.key]) && (
                  <>

                    <p className="pp-socials-title">
                      Connect with me
                    </p>

                    <div className="pp-socials">

                      {socials.map(
                        ({ key, label, bg, icon }) =>

                          user[key] ? (

                            <a
                              key={key}

                              href={
                                key === "whatsapp"
                                  ? `https://wa.me/${user[key].replace(/\s+/g, "")}`
                                  : user[key]
                              }

                              target="_blank"

                              rel="noreferrer"

                              className="pp-social"

                              style={{
                                background: bg
                              }}

                              onClick={async () => {

                                try {

                                  console.log(
                                    "SOCIAL CLICK"
                                  );

                                  const res =
                                    await axios.post(

                                      `${import.meta.env.VITE_API_URL}/api/analytics/link-click`,
                                      {
                                        userId: user._id,
                                        platform: key,
                                      }
                                    );

                                  console.log(
                                    "SUCCESS:",
                                    res.data
                                  );

                                } catch (error) {

                                  console.log(
                                    "ERROR:",
                                    error.response?.data ||
                                    error.message
                                  );
                                }
                              }}
                            >
                              <span>{icon}</span>

                              {label.split(" ")[0]}
                            </a>

                          ) : null
                      )}

                    </div>

                  </>
                )}

                {/* Contact block for center/portrait layout */}
                {(isCenter || isPortrait) && (
                  <div style={{ marginTop: 24 }}>
                    <ContactBlock
                      user={user}
                      copied={copied}
                      handleCopy={handleCopy}
                      pillStyle={pillStyle}
                      pillTextStyle={pillTextStyle}
                      buttonStyle={buttonStyle}
                      isCenter={true}
                    />
                  </div>
                )}
              </div>

              {/* RIGHT — contact card (left layout only) */}
              {isLeftLayout && (
                <ContactBlock
                  user={user}
                  copied={copied}
                  handleCopy={handleCopy}
                  pillStyle={pillStyle}
                  pillTextStyle={pillTextStyle}
                  buttonStyle={buttonStyle}
                  isCenter={false}
                />
              )}
            </div>
          </div>


          {/* ══ PRODUCTS ══ */}
          <div className="pp-products-wrap">
            <PublicProducts
              userId={user._id}
              theme={theme.buttonColor}
            />
          </div>

        </div>

        {/* ══ LEAD FORM MODAL ══ */}
        {/* ════════════════════════════════════════
    LEAD FORM MODAL
════════════════════════════════════════ */}
        {showLeadForm && (
          <div
            className="lead-modal"
            onClick={() => setShowLeadForm(false)}
          >

            <div
              className="lead-box"
              onClick={(e) => e.stopPropagation()}
            >

              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <h2>
                  Connect with {user.name}
                </h2>

                <button
                  onClick={() => setShowLeadForm(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#64748b",
                    fontWeight: "700",
                  }}
                >
                  ×
                </button>
              </div>

              {/* NAME */}
              {(user?.leadCapture?.fields?.name ?? true) && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadForm.name}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      name: e.target.value,
                    })
                  }
                />
              )}

              {/* EMAIL */}
              {(user?.leadCapture?.fields?.email ?? true) && (
                <input
                  type="email"
                  placeholder="Your Email"
                  value={leadForm.email}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      email: e.target.value,
                    })
                  }
                />
              )}

              {/* PHONE */}
              {(user?.leadCapture?.fields?.phone ?? true) && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      phone: e.target.value,
                    })
                  }
                />
              )}

              {/* COMPANY */}
              {(user?.leadCapture?.fields?.company ?? true) && (
                <input
                  type="text"
                  placeholder="Company Name"
                  value={leadForm.company}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      company: e.target.value,
                    })
                  }
                />
              )}

              {/* MESSAGE */}
              {(user?.leadCapture?.fields?.message ?? true) && (
                <textarea
                  placeholder="Message"
                  value={leadForm.message}
                  onChange={(e) =>
                    setLeadForm({
                      ...leadForm,
                      message: e.target.value,
                    })
                  }
                />
              )}
              {/* SUBMIT */}
              <button
                className="lead-submit-btn"
                style={buttonStyle}
                onClick={async () => {

                  try {

                    await axios.post(
                      `${import.meta.env.VITE_API_URL}/api/leads`,
                      {
                        owner: user._id,

                        name: leadForm.name,

                        email: leadForm.email,

                        phone: leadForm.phone,

                        company: leadForm.company,

                        message: leadForm.message,
                      }
                    );

                    alert("Lead Submitted 🚀");

                    setShowLeadForm(false);

                    setLeadForm({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      message: "",
                    });

                  } catch (error) {

                    console.log(error);

                    alert("Something went wrong");
                  }
                }}
              >
                Submit
              </button>

            </div>
          </div>
        )}      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════
   CONTACT BLOCK — shared between left-layout & center/portrait
══════════════════════════════════════════════════════════ */
const ContactBlock = ({ user, copied, handleCopy, buttonStyle, isCenter }) => (
  <div>
    {!isCenter && (
      <div className="pp-contact-card-header">
        <div className="pp-contact-card-header-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>Contact Info</h3>
      </div>
    )}
    {isCenter && <p className="pp-section-label">Contact</p>}
    <div className="pp-contacts">
      {user.phone && (
        <div className="pp-chip" onClick={() => handleCopy(user.phone, "phone")}>
          <span className="pp-chip-icon phone-icon">📞</span>
          <div className="pp-chip-body">
            <div className="pp-chip-sublabel">Phone</div>
            <div className="pp-chip-text">{user.phone}</div>
          </div>
          {copied === "phone" && <span className="pp-chip-copy">COPIED ✓</span>}
        </div>
      )}
      {user.email && (
        <div className="pp-chip" onClick={() => handleCopy(user.email, "email")}>
          <span className="pp-chip-icon email-icon">✉️</span>
          <div className="pp-chip-body">
            <div className="pp-chip-sublabel">Email</div>
            <div className="pp-chip-text">{user.email}</div>
          </div>
          {copied === "email" && <span className="pp-chip-copy">COPIED ✓</span>}
        </div>
      )}
      {(user.streetAddress || user.city || user.state || user.country) && (
        <div className="pp-chip" style={{ cursor: "default" }}>
          <span className="pp-chip-icon addr-icon">📍</span>
          <div className="pp-chip-body">
            <div className="pp-chip-sublabel">Address</div>
            <div className="pp-chip-text"
              style={{ whiteSpace: "normal", lineHeight: "1.45", wordBreak: "break-word" }}>
              {[user.streetAddress, user.city, user.state, user.country, user.postcode].filter(Boolean).join(", ")}
            </div>
          </div>
        </div>
      )}
    </div>

    {user.website && (

      <a
        href={

          user.website.startsWith("http://") ||

            user.website.startsWith("https://")

            ? user.website

            : `https://${user.website}`
        }

        target="_blank"

        rel="noreferrer"

        className="pp-website"

        onClick={async () => {

          try {

            await axios.post(

              `${import.meta.env.VITE_API_URL}/api/analytics/link-click`,
              {
                userId: user._id,
                platform: "website",
              }
            );

          } catch (error) {

            console.log(error);
          }
        }}

        style={{

          display: "flex",

          alignItems: "center",

          gap: "12px",

          width: "100%",

          padding: "18px 20px",

          borderRadius: "18px",

          background: "#ffffff",

          border: "1px solid #e5e7eb",

          textDecoration: "none",

          color: "#111827",

          fontWeight: "700",

          fontSize: "18px",

          wordBreak: "break-word",

          boxShadow:
            "0 8px 24px rgba(15,23,42,0.06)",

          transition: "0.3s",
        }}
      >

        <span
          style={{
            fontSize: "22px",
          }}
        >
          🌐
        </span>

        <span
          style={{
            flex: 1,
          }}
        >
          Visit My Website
        </span>

        <span>
          →
        </span>

      </a>
    )}
  </div>
);

export default PublicProfile;