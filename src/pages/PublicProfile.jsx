import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicProducts from "./PublicProducts";

import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Copy,
  CheckCheck,
  Globe,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaGoogle,
  FaApple,
  FaPinterest,
  FaDiscord,
  FaReddit,
  FaTelegram,
  FaSpotify,
  FaTwitch,
  FaFacebookMessenger,
} from "react-icons/fa";

import {
  FaXTwitter,
  FaThreads,
} from "react-icons/fa6";

import {
  SiSnapchat,
  SiTiktok,
  SiTumblr,
  SiVk,
  SiFigma,
  SiDribbble,
  SiSignal,
} from "react-icons/si";


const SOCIAL_META = {
  facebook: { Icon: FaFacebook, color: "#1877F2" },
  twitter: { Icon: FaXTwitter, color: "#111111" },
  instagram: { Icon: FaInstagram, color: "#E1306C" },
  linkedin: { Icon: FaLinkedin, color: "#0A66C2" },
  google: { Icon: FaGoogle, color: "#4285F4" },
  youtube: { Icon: FaYoutube, color: "#FF0000" },
  apple: { Icon: FaApple, color: "#111111" },
  snapchat: { Icon: SiSnapchat, color: "#FFFC00" },
  pinterest: { Icon: FaPinterest, color: "#E60023" },
  github: { Icon: FaGithub, color: "#24292E" },
  threads: { Icon: FaThreads, color: "#111111" },
  figma: { Icon: SiFigma, color: "#F24E1E" },
  dribbble: { Icon: SiDribbble, color: "#EA4C89" },
  reddit: { Icon: FaReddit, color: "#FF4500" },
  discord: { Icon: FaDiscord, color: "#5865F2" },
  tiktok: { Icon: SiTiktok, color: "#111111" },
  tumblr: { Icon: SiTumblr, color: "#001935" },
  telegram: { Icon: FaTelegram, color: "#229ED9" },
  signal: { Icon: SiSignal, color: "#3A76F0" },
  vk: { Icon: SiVk, color: "#2787F5" },
  spotify: { Icon: FaSpotify, color: "#1DB954" },
  twitch: { Icon: FaTwitch, color: "#9146FF" },
  messenger: { Icon: FaFacebookMessenger, color: "#0084FF" },
};


const PublicProfile = () => {
  const { uniqueId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [leadForm, setLeadForm] = useState({
    name: "", email: "", phone: "", company: "", message: "",
  });
  const [copied, setCopied] = useState(null);
  const [leadLoading, setLeadLoading] = useState(false);

  useEffect(() => { fetchUser(); }, [uniqueId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${uniqueId}`
      );
      setUser(res.data);

      /* TRACK NFC TAP */
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/analytics/nfc-tap`,
          { userId: res.data._id }
        );
      } catch (error) { console.log(error); }

      /* TRACK PROFILE VIEW */
      try {
        const alreadyViewed = sessionStorage.getItem(`profile_view_${res.data._id}`);
        if (!alreadyViewed) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/analytics/profile-view`,
            { userId: res.data._id }
          );
          sessionStorage.setItem(`profile_view_${res.data._id}`, "true");
        }
      } catch (error) { console.log(error); }

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
    } catch (error) { console.log(error); }
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

  // ─── THEME ENGINE ──────────────────────────────────────────────────────────
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

  const accentColor = isSolidButton ? buttonColor : "#0B4DBB";
  const isDarkBg = bgColor && (bgColor.includes("#0") || bgColor.includes("#1") || bgColor.includes("#2") || bgColor === "#0f172a");
  const cardBorderColor = isDarkBg ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const mutedText = theme.textColor ? theme.textColor + "80" : "#94a3b8";
  const subtleBg = isDarkBg ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const subtleBorder = isDarkBg ? "rgba(255,255,255,0.08)" : "#eef2f7";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }

        /* ─── PAGE ─── */
        .pp-page {
          min-height: 100vh;
          background: ${theme.backgroundColor || "#f4f6fb"};
          font-family: ${fontFamily};
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 0 0 100px;
        }

        /* ─── CARD ─── */
        .pp-card {
          width: 100%;
          max-width: ${isPortrait ? "520px" : "880px"};
          background: ${theme.backgroundColor || "#ffffff"};
          color: ${theme.textColor || "#0f172a"};
          border-radius: 0 0 48px 48px;
          box-shadow:
            0 1px 0 0 ${cardBorderColor},
            0 24px 64px rgba(0,0,0,0.09),
            0 8px 24px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        /* ─── COVER ─── */
        .pp-cover {
          width: 100%;
          height: ${isPortrait ? "320px" : "360px"};
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
        .pp-cover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            175deg,
            rgba(0,0,0,0.08) 0%,
            rgba(0,0,0,0.05) 35%,
            rgba(0,0,0,0.65) 80%,
            rgba(0,0,0,0.82) 100%
          );
        }
        .pp-cover-grain {
          position: absolute; 
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
        }
        .pp-cover-glow {
          position: absolute;
          bottom: -60px; left: -60px;
          width: 400px; height: 300px;
          background: radial-gradient(ellipse, ${isSolidButton ? buttonColor + "70" : "rgba(99,102,241,0.45)"} 0%, transparent 65%);
          filter: blur(50px);
          pointer-events: none;
        }

        /* glass pill — top left */
        .pp-tagline-pill {
          position: absolute;
          top: 26px; left: 26px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(255,255,255,0.11);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          z-index: 4;
          letter-spacing: 0.15px;
          font-family: ${fontFamily};
        }
        .pp-tagline-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: ${isSolidButton ? buttonColor : "#a78bfa"};
          box-shadow: 0 0 8px ${isSolidButton ? buttonColor : "#a78bfa"};
          flex-shrink: 0;
        }

        /* availability badge — top right */
        .pp-avail-badge {
          position: absolute;
          top: 26px; right: 26px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.11);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 11.5px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          z-index: 4;
          font-family: ${fontFamily};
        }
        .pp-avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.28);
          animation: pp-breathe 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pp-breathe {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.28); }
          50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }

        /* logo badge */
        .pp-logo {
          position: absolute;
          top: 22px; right: 26px;
          width: 56px; height: 56px;
          border-radius: 18px;
          background: rgba(255,255,255,0.94);
          padding: 9px;
          display: flex; align-items: center; justify-content: center;
          z-index: 5;
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
        }
        .pp-logo img { width:100%; height:100%; object-fit:contain; }

        /* ─── HERO BOTTOM ─── */
        .pp-hero-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 32px 32px;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          z-index: 100;
        }
        .pp-hero-title h2 {
          font-size: clamp(30px, 4.5vw, 52px);
          font-weight: 900;
          line-height: 1.03;
          letter-spacing: -2px;
          color: #ffffff;
          font-family: ${fontFamily};
          text-shadow: 0 2px 24px rgba(0,0,0,0.35);
        }
        .pp-hero-sub {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.1px;
          font-family: ${fontFamily};
        }

        /* ─── BUTTONS ─── */
        .pp-connect-float {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 20px;
          font-size: 13.5px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          font-family: ${fontFamily};
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.1px;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.28s ease,
            opacity 0.18s;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        }
        .pp-connect-float::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
          border-radius: inherit;
          pointer-events: none;
        }
        .pp-connect-float:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 18px 48px rgba(0,0,0,0.32);
        }
        .pp-connect-float:hover::after { background: rgba(255,255,255,0.1); }
        .pp-connect-float:active {
          transform: scale(0.97);
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }

        .pp-connect {
          padding: 13px 28px;
          border-radius: 16px;
          font-size: 13.5px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          font-family: ${fontFamily};
          letter-spacing: 0.1px;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.28s ease;
          box-shadow: 0 4px 18px rgba(0,0,0,0.14);
        }
        .pp-connect::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
          border-radius: inherit;
          pointer-events: none;
        }
        .pp-connect:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 32px rgba(0,0,0,0.2);
        }
        .pp-connect:hover::after { background: rgba(255,255,255,0.1); }
        .pp-connect:active { transform: scale(0.97); }

        /* ─── CONTENT AREA ─── */
        .pp-content {
          padding: ${isPortrait ? "0 32px 36px" : "0 36px 32px"};
        }

        /* ─── AVATAR ROW ─── */
        .pp-top-row {
          display: flex;
          justify-content: ${isCenter || isPortrait ? "center" : "space-between"};
          align-items: flex-end;
          margin-top: ${isPortrait ? "-68px" : "-62px"};
          margin-bottom: 28px;
          position: relative;
          z-index: 6;
        }
        .pp-top-row-portrait {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -68px;
          margin-bottom: 28px;
          gap: 18px;
          position: relative;
          z-index: 6;
        }

        .pp-avatar-wrap {
          position: relative;
          display: inline-block;
          padding: 4px;
          border-radius: 50%;
          background: ${buttonColor};
          box-shadow: 0 0 0 4px ${theme.backgroundColor || "#ffffff"}, 0 12px 40px rgba(0,0,0,0.22);
        }
        .pp-avatar {
          width: 120px; height: 120px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          background: ${theme.backgroundColor || "#fff"};
        }
        .pp-avatar-placeholder {
          width: 120px; height: 120px;
          border-radius: 50%;
          background: ${buttonColor};
          display: flex; align-items: center; justify-content: center;
          font-size: 44px;
          font-weight: 900;
          color: ${buttonTextColor};
        }
        .pp-online-dot {
          position: absolute;
          bottom: 9px; right: 9px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #22c55e;
          border: 3px solid ${theme.backgroundColor || "#ffffff"};
          box-shadow: 0 0 12px rgba(34,197,94,0.6);
        }

        /* ─── SPLIT GRID ─── */
        .pp-split {
          display: grid;
          grid-template-columns: ${isCenter || isPortrait ? "1fr" : "1fr 320px"};
          gap: 36px;
          align-items: start;
          ${isCenter || isPortrait ? "text-align: center;" : ""}
        }

        /* ─── NAME / ROLE ─── */
        .pp-name {
          font-size: ${isPortrait ? "28px" : "24px"};
          font-weight: 900;
          color: ${textColor};
          line-height: 1.1;
          margin-bottom: 6px;
          font-family: ${fontFamily};
          letter-spacing: -0.6px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        
        .meta-verified {
            width: 24px;
            height: 24px;

            background: #1DA1F2;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            clip-path: polygon(
              50% 0%,
              61% 8%,
              75% 5%,
              83% 17%,
              95% 25%,
              92% 39%,
              100% 50%,
              92% 61%,
              95% 75%,
              83% 83%,
              75% 95%,
              61% 92%,
              50% 100%,
              39% 92%,
              25% 95%,
              17% 83%,
              5% 75%,
              8% 61%,
              0% 50%,
              8% 39%,
              5% 25%,
              17% 17%,
              25% 5%,
              39% 8%
            );

            box-shadow:
              0 2px 8px rgba(29,161,242,.35);
          }

          .meta-verified svg {
            width: 12px;
            height: 12px;
          }


        .pp-job {
          font-size: 13px;
          font-weight: 500;
          color: ${mutedText};
          margin-bottom: 18px;
          letter-spacing: 0.1px;
        }
        .pp-pills-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 22px;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        .pp-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 600;
          background: ${subtleBg};
          color: ${mutedText};
          border: 1px solid ${subtleBorder};
        }
        .pp-work-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          border-radius: 100px;
          font-size: 11.5px;
          font-weight: 600;
          background: rgba(34,197,94,0.07);
          color: #16a34a;
          border: 1px solid rgba(34,197,94,0.18);
        }
        .pp-bio {
          font-size: 14px;
          font-weight: 400;
          color: ${mutedText};
          line-height: 1.85;
          margin-bottom: 28px;
          max-width: 520px;
        }

        /* ─── DIVIDER ─── */
        .pp-divider {
          height: 1px;
          background: ${subtleBorder};
          margin: 28px 0;
        }

        /* ─── SOCIALS ─── */
        .pp-socials-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${mutedText};
          margin-bottom: 16px;
          ${isCenter || isPortrait ? "text-align: center;" : ""}
        }
        .pp-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }

        /* ── Premium social icon buttons ── */
        .pp-social-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          text-decoration: none;
          background: #ffffff;
          border: 1.5px solid rgba(0,0,0,0.07);
          box-shadow:
            0 2px 8px rgba(0,0,0,0.08),
            0 1px 2px rgba(0,0,0,0.04);
          transition:
            transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.28s ease,
            border-color 0.2s ease,
            background 0.2s ease;
          flex-shrink: 0;
          overflow: hidden;
        }
        .pp-social-btn svg {
          width: 22px;
          height: 22px;
          position: relative;
          z-index: 1;
        }
        .pp-social-btn:hover {
          transform: translateY(-5px) scale(1.1);
        }
        .pp-social-btn:active {
          transform: translateY(-2px) scale(1.02);
        }

        @media (max-width: 480px) {
          .pp-social-btn { width: 46px; height: 46px; }
          .pp-social-btn svg { width: 20px; height: 20px; }
        }

        /* ─── CONTACT SECTION ─── */
        .pp-section-header {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${mutedText};
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          ${isCenter || isPortrait ? "justify-content: center;" : ""}
        }
        .pp-section-line {
          flex: 1;
          height: 1px;
          background: ${subtleBorder};
          max-width: 60px;
          ${isCenter || isPortrait ? "display: none;" : "display: block;"}
        }

        .pp-contact-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pp-contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: ${subtleBg};
          border: 1px solid ${subtleBorder};
          transition: border-color 0.2s, transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s;
        }
        .pp-contact-item:hover {
          border-color: ${isSolidButton ? buttonColor + "40" : "rgba(99,102,241,0.3)"};
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
        }
        .pp-contact-item.no-pointer { cursor: default; }
        .pp-contact-item.no-pointer:hover {
          transform: none;
          box-shadow: none;
        }
        .pp-contact-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pp-contact-icon-wrap.phone { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .pp-contact-icon-wrap.email { background: rgba(34,197,94,0.1);  color: #16a34a; }
        .pp-contact-icon-wrap.addr  { background: rgba(168,85,247,0.1); color: #9333ea; }
        .pp-contact-body { flex: 1; min-width: 0; }
        .pp-contact-sublabel {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: ${mutedText};
          margin-bottom: 3px;
        }
        .pp-contact-value {
          font-size: 13.5px;
          font-weight: 600;
          color: ${textColor};
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pp-contact-value.wrap { white-space: normal; line-height: 1.5; }
        .pp-copy-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 800;
          color: #22c55e;
          background: rgba(34,197,94,0.1);
          padding: 4px 10px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pp-copy-hint {
          font-size: 11px;
          color: ${mutedText};
          flex-shrink: 0;
        }

        .pp-contact-card-shell {
          background: ${subtleBg};
          border: 1px solid ${subtleBorder};
          border-radius: 28px;
          padding: 24px;
        }
        .pp-contact-card-title {
          font-size: 13px;
          font-weight: 800;
          color: ${textColor};
          margin-bottom: 16px;
          letter-spacing: -0.2px;
          font-family: ${fontFamily};
        }

        /* ─── WEBSITE CTA ─── */
        .pp-website-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: 100%;
          padding: 18px 22px;
          border-radius: 22px;
          text-decoration: none;
          margin-top: 12px;
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
          font-family: ${fontFamily};
          border: none;
          cursor: pointer;
        }
        .pp-website-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.22);
        }
        .pp-website-cta:active { transform: translateY(0) scale(0.98); }
        .pp-website-left { display: flex; align-items: center; gap: 14px; }
        .pp-website-icon {
          width: 42px; height: 42px;
          border-radius: 14px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pp-website-texts { display: flex; flex-direction: column; gap: 1px; }
        .pp-website-eyebrow {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          opacity: 0.7;
        }
        .pp-website-main {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .pp-website-arrow {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ─── PRODUCTS WRAP ─── */
        .pp-products-wrap {
          padding: 0 36px 48px;
          margin-top: 8px;
          border-top: 1px solid ${subtleBorder};
          padding-top: 36px;
        }
        .pp-products-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${mutedText};
          margin-bottom: 20px;
        }

        /* ─── LEAD MODAL ─── */
        .lead-modal {
          position: fixed;
          inset: 0;
          background: rgba(2,6,20,0.6);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: pp-fade 0.22s ease;
        }
        @keyframes pp-fade { from { opacity: 0; } to { opacity: 1; } }

        .lead-box {
          width: 100%;
          max-width: 460px;
          background: ${theme.backgroundColor || "#ffffff"};
          border-radius: 32px;
          padding: 36px 32px 32px;
          display: flex;
          flex-direction: column;
          gap: 11px;
          box-shadow:
            0 0 0 1px ${cardBorderColor},
            0 24px 80px rgba(0,0,0,0.28),
            0 8px 32px rgba(0,0,0,0.14);
          animation: pp-rise 0.32s cubic-bezier(0.34,1.56,0.64,1);
          position: relative;
          overflow: hidden;
        }

        /* youtube video */


        .video-thumb-wrapper {
          position: relative;
        }

        .video-play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(255, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          opacity: 0;
          transition: all .25s ease;
          pointer-events: none;
        }

        .pp-video-card:hover .video-play-overlay {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .pp-video-card:hover .pp-video-thumb {
          transform: scale(1.05);
        }

        .pp-video-thumb {
          transition: transform .3s ease;
        }

        .pp-video-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
          gap:20px;
          margin-top:24px;
        }

        .pp-video-card{
          background:#fff;
          border-radius:20px;
          overflow:hidden;
          border:1px solid rgba(0,0,0,.06);
          cursor:pointer;
          transition:.25s;
        }

        .pp-video-card:hover{
          transform:translateY(-6px);
          box-shadow:0 20px 40px rgba(0,0,0,.12);
        }

        .pp-video-thumb{
          width:100%;
          aspect-ratio:16/9;
          object-fit:contain;
          background:#000;
        }

        .pp-video-body{
          padding:14px;
        }

        .pp-video-title{
          font-size:14px;
          font-weight:700;
        }

        .pp-video-modal{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.85);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:99999;
          padding:20px;
        }

        .pp-video-frame{
          width:min(100%,1000px);
          aspect-ratio:16/9;
          border-radius:20px;
          overflow:hidden;
        }


        /* subtle shimmer line at top */
        .lead-box::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.55) 40%,
            rgba(255,255,255,0.55) 60%,
            transparent 100%
          );
          pointer-events: none;
        }
        @keyframes pp-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        .lead-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }
        .lead-title {
          font-size: 24px;
          font-weight: 900;
          color: ${textColor};
          font-family: ${fontFamily};
          letter-spacing: -0.8px;
          line-height: 1.1;
        }
        .lead-sub {
          font-size: 13px;
          font-weight: 400;
          color: ${mutedText};
          margin-top: 5px;
          line-height: 1.5;
        }
        .lead-close-btn {
          width: 36px; height: 36px;
          border-radius: 11px;
          background: ${subtleBg};
          border: 1px solid ${subtleBorder};
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          color: ${mutedText};
          flex-shrink: 0;
          margin-left: 16px;
          transition: background 0.15s, transform 0.15s, color 0.15s;
          font-family: ${fontFamily};
        }
        .lead-close-btn:hover {
          background: ${isDarkBg ? "rgba(255,255,255,0.12)" : "#f1f5f9"};
          color: ${textColor};
          transform: scale(1.08);
        }
        .lead-close-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .lead-box input,
        .lead-box textarea {
          width: 100%;
          padding: 14px 18px;
          border-radius: 16px;
          border: 1.5px solid ${subtleBorder};
          outline: none;
          font-size: 14px;
          font-family: ${fontFamily};
          color: ${textColor};
          background: ${subtleBg};
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .lead-box input::placeholder,
        .lead-box textarea::placeholder {
          color: ${mutedText};
        }
        .lead-box input:focus,
        .lead-box textarea:focus {
          border-color: ${isSolidButton ? buttonColor : "#6366f1"};
          box-shadow: 0 0 0 4px ${isSolidButton ? buttonColor + "18" : "rgba(99,102,241,0.12)"};
          background: ${theme.backgroundColor || "#ffffff"};
        }
        .lead-box input:disabled,
        .lead-box textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .lead-box textarea {
          min-height: 108px;
          resize: none;
        }

        .lead-submit {
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          font-family: ${fontFamily};
          letter-spacing: 0.1px;
          margin-top: 4px;
          transition:
            opacity 0.18s,
            transform 0.22s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.22s;
          box-shadow: 0 6px 20px rgba(0,0,0,0.16);
        }
        .lead-submit:not(:disabled):hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.22);
        }
        .lead-submit:not(:disabled):active { transform: scale(0.98); }

        /* spinner keyframe (reuse existing spin) */
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 720px) {
          .pp-page { padding: 0 0 56px; }
          .pp-card { border-radius: 0 0 32px 32px; }
          .pp-cover { height: ${isPortrait ? "270px" : "295px"}; }
          .pp-hero-bottom { padding: 0 20px 24px; }
          .pp-hero-title h2 { font-size: 28px; letter-spacing: -1.2px; }
          .pp-content { padding: 0 20px 28px; }
          .pp-split { grid-template-columns: 1fr; gap: 24px; }
          .pp-products-wrap { padding: 28px 20px 40px; }
          .pp-top-row { margin-top: -56px; }
          .pp-avatar { width: 100px; height: 100px; }
          .pp-avatar-placeholder { width: 100px; height: 100px; font-size: 36px; }
        }
        @media (max-width: 480px) {
          .pp-tagline-pill { display: none; }
          .pp-connect-float { padding: 12px 18px; font-size: 13px; }
          .pp-hero-sub { display: none; }
        }
      `}</style>

      <div className="pp-page">
        <div className="pp-card">

          {/* ══ COVER ══ */}
          <div className="pp-cover">
            <div className="pp-cover-bg" />
            <div className="pp-cover-overlay" />
            <div className="pp-cover-grain" />
            <div className="pp-cover-glow" />

            {user.bio && !user.logoImage && (
              <div className="pp-tagline-pill">
                <span className="pp-tagline-dot" />
                {user.bio.split(" ").slice(0, 6).join(" ")}
              </div>
            )}

            {!user.logoImage && (
              <div className="pp-avail-badge">
                <div className="pp-avail-dot" />
                Available
              </div>
            )}

            {user.logoImage && (
              <div className="pp-logo">
                <img src={user.logoImage} alt="logo" />
              </div>
            )}

            <div className="pp-hero-bottom">
              <button
                className="pp-connect-float"
                style={buttonStyle}
                onClick={() => setShowLeadForm(true)}
              >
                <Zap size={14} strokeWidth={2.5} />
                Let's Connect
              </button>
            </div>
          </div>

          {/* ══ CONTENT ══ */}
          <div className="pp-content">

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
                {isCenter && (
                  <button className="pp-connect" style={buttonStyle} onClick={() => setShowLeadForm(true)}>
                    + Connect
                  </button>
                )}
              </div>
            )}

            <div className="pp-split">

              {/* ── LEFT: info ── */}
              <div>
                <div className="pp-name">
                  {user.name}
                  <span className="meta-verified">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9.5 16.5L4 11"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {(user.jobTitle || user.companyName) && (
                  <p className="pp-job">
                    {user.jobTitle}{user.companyName ? ` · ${user.companyName}` : ""}
                  </p>
                )}

                <div className="pp-pills-row">
                  {(user.city || user.state || user.country) && (
                    <span className="pp-location-pill">
                      📍 {[user.city, user.state, user.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                  <span className="pp-work-pill">🔄 Open to Work</span>
                </div>

                {user.bio && <p className="pp-bio">{user.bio}</p>}

                {/* ── SOCIALS ── */}
                {Object.entries(SOCIAL_META).some(([key]) => user[key]) && (
                  <>
                    <p className="pp-socials-label">Find me on</p>
                    <div className="pp-socials" style={{ marginBottom: 8 }}>
                      {Object.entries(SOCIAL_META).map(([key, { label, Icon, color }]) =>
                        user[key] ? (
                          <a
                            key={key}
                            href={key === "whatsapp"
                              ? `https://wa.me/${user[key].replace(/\s+/g, "")}`
                              : user[key]}
                            target="_blank"
                            rel="noreferrer"
                            className="pp-social-btn"
                            data-label={label}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = `${color}12`;
                              e.currentTarget.style.borderColor = `${color}30`;
                              e.currentTarget.style.boxShadow = `0 12px 28px ${color}28, 0 4px 10px ${color}14`;
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "#ffffff";
                              e.currentTarget.style.borderColor = "rgba(0,0,0,0.07)";
                              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)";
                            }}
                            onClick={async () => {
                              try {
                                await axios.post(
                                  `${import.meta.env.VITE_API_URL}/api/analytics/link-click`,
                                  { userId: user._id, platform: key }
                                );
                              } catch (error) {
                                console.log("ERROR:", error.response?.data || error.message);
                              }
                            }}
                          >
                            <Icon size={22} color={color} />
                          </a>
                        ) : null
                      )}
                    </div>
                  </>
                )}

                {/* contact block (center / portrait) */}
                {(isCenter || isPortrait) && (
                  <div style={{ marginTop: 32 }}>
                    <ContactBlock
                      user={user}
                      copied={copied}
                      handleCopy={handleCopy}
                      buttonStyle={buttonStyle}
                      buttonColor={buttonColor}
                      buttonTextColor={buttonTextColor}
                      textColor={textColor}
                      isCenter
                      subtleBg={subtleBg}
                      subtleBorder={subtleBorder}
                      mutedText={mutedText}
                      fontFamily={fontFamily}
                      isSolidButton={isSolidButton}
                    />
                  </div>
                )}
              </div>

              {/* ── RIGHT: contact card (left layout only) ── */}
              {isLeftLayout && (
                <ContactBlock
                  user={user}
                  copied={copied}
                  handleCopy={handleCopy}
                  buttonStyle={buttonStyle}
                  buttonColor={buttonColor}
                  buttonTextColor={buttonTextColor}
                  textColor={textColor}
                  isCenter={false}
                  subtleBg={subtleBg}
                  subtleBorder={subtleBorder}
                  mutedText={mutedText}
                  fontFamily={fontFamily}
                  isSolidButton={isSolidButton}
                />
              )}
            </div>
          </div>

          {user.youtubeVideos?.length > 0 && (
            <div
              style={{
                padding: "0 36px 40px",
                borderTop: "1px solid rgba(0,0,0,.06)",
                marginTop: "20px",
                paddingTop: "32px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: mutedText,
                  marginBottom: "20px",
                }}
              >
                Featured Videos
              </div>

              <div className="pp-video-grid">
                {user.youtubeVideos.map((video, index) => (
                  <div
                    key={video._id || index}
                    className="pp-video-card"
                    onClick={() => setSelectedVideo(video)}
                    style={{
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "20px",
                      background: "#fff",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                      }}
                      className="video-thumb-wrapper"
                    >
                      <img
                        src={video.thumbnail}
                        alt="YouTube Thumbnail"
                        className="pp-video-thumb"
                        style={{
                          width: "100%",
                          aspectRatio: "16/9",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />

                      <div className="video-play-overlay">
                        ▶
                      </div>
                    </div>

                    <div className="pp-video-body">
                      <div
                        className="pp-video-title"
                        style={{
                          fontWeight: "700",
                          fontSize: "15px",
                        }}
                      >
                        {video.title || "YouTube Video"}
                      </div>

                      <div
                        style={{
                          marginTop: "12px",
                          color: "#ef4444",
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Click to Watch
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ══ PRODUCTS ══ */}
          <div className="pp-products-wrap">
            <PublicProducts userId={user._id} theme={theme.buttonColor} />
          </div>

        </div>

        {/* ══ LEAD FORM MODAL ══ */}
        {showLeadForm && (
          <div className="lead-modal" onClick={() => !leadLoading && setShowLeadForm(false)}>
            <div className="lead-box" onClick={(e) => e.stopPropagation()}>

              <div className="lead-header">
                <div>
                  <div className="lead-title">Let's Connect</div>
                  <div className="lead-sub">Drop your details for {user.name}</div>
                </div>
                <button
                  className="lead-close-btn"
                  onClick={() => !leadLoading && setShowLeadForm(false)}
                  disabled={leadLoading}
                >
                  ×
                </button>
              </div>

              {(user?.leadCapture?.fields?.name ?? true) && (
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadForm.name}
                  disabled={leadLoading}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                />
              )}
              {(user?.leadCapture?.fields?.email ?? true) && (
                <input
                  type="email"
                  placeholder="Your Email"
                  value={leadForm.email}
                  disabled={leadLoading}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                />
              )}
              {(user?.leadCapture?.fields?.phone ?? true) && (
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={leadForm.phone}
                  disabled={leadLoading}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                />
              )}
              {(user?.leadCapture?.fields?.company ?? true) && (
                <input
                  type="text"
                  placeholder="Company Name"
                  value={leadForm.company}
                  disabled={leadLoading}
                  onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                />
              )}
              {(user?.leadCapture?.fields?.message ?? true) && (
                <textarea
                  placeholder="Message"
                  value={leadForm.message}
                  disabled={leadLoading}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                />
              )}

              <button
                className="lead-submit"
                style={{
                  ...buttonStyle,
                  opacity: leadLoading ? 0.75 : 1,
                  cursor: leadLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
                disabled={leadLoading}
                onClick={async () => {
                  if (leadLoading) return;
                  setLeadLoading(true);
                  try {
                    await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, {
                      owner: user._id,
                      name: leadForm.name,
                      email: leadForm.email,
                      phone: leadForm.phone,
                      company: leadForm.company,
                      message: leadForm.message,
                    });
                    alert("Lead Submitted 🚀");
                    setShowLeadForm(false);
                    setLeadForm({ name: "", email: "", phone: "", company: "", message: "" });
                  } catch (error) {
                    console.log(error);
                    alert("Something went wrong");
                  } finally {
                    setLeadLoading(false);
                  }
                }}
              >
                {leadLoading ? (
                  <>
                    <span style={{
                      width: 16, height: 16,
                      border: `2px solid ${buttonTextColor}40`,
                      borderTopColor: buttonTextColor,
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.75s linear infinite",
                      flexShrink: 0,
                    }} />
                    Sending…
                  </>
                ) : (
                  "Submit →"
                )}
              </button>

            </div>
          </div>
        )}

        {selectedVideo && (
          <div
            className="pp-video-modal"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="pp-video-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        )}

      </div >
    </>
  );
};


/* ─── CONTACT BLOCK ─── */
const ContactBlock = ({
  user, copied, handleCopy,
  buttonStyle, buttonColor, buttonTextColor, textColor,
  isCenter, subtleBg, subtleBorder, mutedText, fontFamily, isSolidButton,
}) => (
  <div>
    {!isCenter && (
      <div style={{
        background: subtleBg,
        border: `1px solid ${subtleBorder}`,
        borderRadius: 28,
        padding: 24,
      }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: textColor, marginBottom: 16, fontFamily, letterSpacing: -0.2 }}>
          Contact Info
        </div>
        <ContactItems
          user={user} copied={copied} handleCopy={handleCopy}
          textColor={textColor} subtleBg={subtleBg} subtleBorder={subtleBorder}
          mutedText={mutedText} buttonColor={buttonColor}
          buttonTextColor={buttonTextColor} fontFamily={fontFamily}
          isSolidButton={isSolidButton}
        />
        {user.website && (
          <WebsiteCTA
            user={user} buttonColor={buttonColor} buttonTextColor={buttonTextColor}
            fontFamily={fontFamily}
          />
        )}
      </div>
    )}
    {isCenter && (
      <>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "2px",
          textTransform: "uppercase", color: mutedText,
          marginBottom: 16, textAlign: "center",
        }}>
          Contact
        </p>
        <ContactItems
          user={user} copied={copied} handleCopy={handleCopy}
          textColor={textColor} subtleBg={subtleBg} subtleBorder={subtleBorder}
          mutedText={mutedText} buttonColor={buttonColor}
          buttonTextColor={buttonTextColor} fontFamily={fontFamily}
          isSolidButton={isSolidButton}
        />
        {user.website && (
          <WebsiteCTA
            user={user} buttonColor={buttonColor} buttonTextColor={buttonTextColor}
            fontFamily={fontFamily}
          />
        )}
      </>
    )}
  </div>
);


/* ─── CONTACT ITEMS ─── */
const ContactItems = ({
  user, copied, handleCopy, textColor,
  subtleBg, subtleBorder, mutedText, buttonColor, isSolidButton,
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {user.phone && (
      <div
        className="pp-contact-item"
        onClick={() => handleCopy(user.phone, "phone")}
        style={{ background: subtleBg, border: `1px solid ${subtleBorder}` }}
      >
        <div className="pp-contact-icon-wrap phone">
          <Phone size={18} strokeWidth={2} />
        </div>
        <div className="pp-contact-body">
          <div className="pp-contact-sublabel">Phone</div>
          <div className="pp-contact-value">{user.phone}</div>
        </div>
        {copied === "phone"
          ? <span className="pp-copy-badge"><CheckCheck size={12} strokeWidth={2.5} /> Copied</span>
          : <span className="pp-copy-hint"><Copy size={13} strokeWidth={1.8} /></span>
        }
      </div>
    )}
    {user.email && (
      <div
        className="pp-contact-item"
        onClick={() => handleCopy(user.email, "email")}
        style={{ background: subtleBg, border: `1px solid ${subtleBorder}` }}
      >
        <div className="pp-contact-icon-wrap email">
          <Mail size={18} strokeWidth={2} />
        </div>
        <div className="pp-contact-body">
          <div className="pp-contact-sublabel">Email</div>
          <div className="pp-contact-value">{user.email}</div>
        </div>
        {copied === "email"
          ? <span className="pp-copy-badge"><CheckCheck size={12} strokeWidth={2.5} /> Copied</span>
          : <span className="pp-copy-hint"><Copy size={13} strokeWidth={1.8} /></span>
        }
      </div>
    )}
    {(user.streetAddress || user.city || user.state || user.country) && (
      <div
        className="pp-contact-item no-pointer"
        style={{ background: subtleBg, border: `1px solid ${subtleBorder}` }}
      >
        <div className="pp-contact-icon-wrap addr">
          <MapPin size={18} strokeWidth={2} />
        </div>
        <div className="pp-contact-body">
          <div className="pp-contact-sublabel">Location</div>
          <div className="pp-contact-value wrap">
            {[user.streetAddress, user.city, user.state, user.country, user.postcode].filter(Boolean).join(", ")}
          </div>
        </div>
      </div>
    )}
  </div>
);


/* ─── WEBSITE CTA ─── */
const WebsiteCTA = ({ user, buttonColor, buttonTextColor, fontFamily }) => (
  <a
    href={user.website.startsWith("http://") || user.website.startsWith("https://")
      ? user.website
      : `https://${user.website}`}
    target="_blank"
    rel="noreferrer"
    className="pp-website-cta"
    style={{ background: buttonColor, color: buttonTextColor, boxShadow: `0 8px 28px rgba(0,0,0,0.18)` }}
    onClick={async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/analytics/link-click`,
          { userId: user._id, platform: "website" }
        );
      } catch (error) { console.log(error); }
    }}
  >
    <div className="pp-website-left">
      <div className="pp-website-icon">
        <Globe size={20} strokeWidth={2} color={buttonTextColor} />
      </div>
      <div className="pp-website-texts">
        <span className="pp-website-eyebrow" style={{ color: buttonTextColor }}>Website</span>
        <span className="pp-website-main" style={{ color: buttonTextColor }}>Visit My Website</span>
      </div>
    </div>
    <div className="pp-website-arrow">
      <ArrowUpRight size={16} strokeWidth={2.5} color={buttonTextColor} />
    </div>
  </a>
);

export default PublicProfile;