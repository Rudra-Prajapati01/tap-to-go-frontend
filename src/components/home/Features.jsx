import { useState, useEffect, useRef } from "react";

// ─── REAL ASSET IMPORTS ──────────────────────────────────────────────────────
import contactImg from "../../assets/features/contact-management.png";
import customizeImg from "../../assets/features/customize-profile.png";
import dashboardImg from "../../assets/features/dashboard.png";

// ─── GLOBAL SYSTEM NAVIGATION INTEGRATION ────────────────────────────────────
import Navbar from "./Navbar"; // <-- NAVBAR IMPORT ADDED HERE (Adjust path if needed)
import Footer from "./Footer"; 
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  {
    id: "01",
    tag: "Contacts",
    title: "Contact Management",
    subtitle: "Your network, perfectly organised",
    description:
      "Store, organise, update and manage all your contacts from a single dashboard. Keep your network accessible, searchable and always in sync across devices.",
    image: contactImg,
    accent: "#6155A6",
    accentLight: "#A685E2",
    gradient: "linear-gradient(135deg, #6155A6 0%, #A685E2 100%)",
    points: [
      { icon: "⚡", label: "Real-time sync across devices" },
      { icon: "🔍", label: "Smart search & filters" },
      { icon: "📤", label: "One-click VCF export" },
    ],
  },
  {
    id: "02",
    tag: "Profile",
    title: "Customize Your Profile",
    subtitle: "Your brand, your rules",
    description:
      "Personalize your digital business card with colors, fonts, branding, social links and custom sections to reflect your unique professional identity.",
    image: customizeImg,
    accent: "#a855f7",
    accentLight: "#ec4899",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    points: [
      { icon: "🎨", label: "Full theme & color control" },
      { icon: "🔗", label: "Social links & custom sections" },
      { icon: "📱", label: "Live NFC card preview" },
    ],
  },
  {
    id: "03",
    tag: "Dashboard",
    title: "Manage Digital Cards",
    subtitle: "Analytics that drive action",
    description:
      "Control all your NFC cards from one intelligent dashboard. Update information instantly, monitor engagement metrics and act on real-time insights.",
    image: dashboardImg,
    accent: "#6366f1",
    accentLight: "#06b6d4",
    gradient: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
    points: [
      { icon: "📊", label: "Live engagement analytics" },
      { icon: "🃏", label: "Multi-card management" },
      { icon: "🔔", label: "Instant lead notifications" },
    ],
  },
];

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── INLINE STYLES ── */
const styles = {
  section: {
    position: "relative",
    width: "100%",
    padding: "160px 0 0px", // Exact safe area padding so content doesn't hide under Navbar
    background: "#ffffff",
    overflow: "hidden",
  },
  dotBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle, rgba(97,85,166,0.04) 1.5px, transparent 1.5px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 32px 120px", 
  },
  header: {
    textAlign: "center",
    marginBottom: "88px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(97,85,166,0.15)",
    background: "rgba(97,85,166,0.04)",
    marginBottom: "24px",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6155A6",
  },
  badgeText: {
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#6155A6",
  },
  h2: {
    fontSize: "clamp(2.25rem, 5vw, 3.8rem)",
    fontWeight: 800,
    color: "#0f0f0f",
    lineHeight: 1.15,
    margin: "0 0 20px",
    letterSpacing: "-0.02em",
  },
  gradientText: {
    background: "linear-gradient(90deg, #6155A6 0%, #A685E2 50%, #ec4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subheading: {
    fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
    color: "#64748b",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.65,
    fontWeight: 500,
  },
  cardStack: {
    display: "flex",
    flexDirection: "column",
    gap: "64px", 
  },
  card: {
    background: "#ffffff",
    borderRadius: "32px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.03)",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "55% 45%",
    minHeight: "520px",
  },
  imageCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px", 
    background: "#fafafa", 
  },
  img: {
    width: "100%",
    maxWidth: "540px", 
    height: "auto",
    maxHeight: "440px", 
    objectFit: "contain",
  },
  contentCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "64px 60px",
  },
  tag: (feature) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "999px",
    border: `1px solid ${feature.accent}15`,
    background: `${feature.accent}05`,
    color: feature.accent,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "24px",
    width: "fit-content",
  }),
  tagDot: (feature) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: feature.accent,
    flexShrink: 0,
  }),
  h3: {
    fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
    fontWeight: 800,
    color: "#0f0f0f",
    lineHeight: 1.15,
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
  },
  subtitle: (feature) => ({
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    background: feature.gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 18px",
  }),
  description: {
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "#64748b",
    margin: "0 0 28px",
    maxWidth: "580px",
    fontWeight: 500,
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "0 0 24px",
  },
  pointsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  pointItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  pointIcon: (feature) => ({
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: `${feature.accent}06`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  }),
  pointLabel: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#334155",
  },
};

function useIsMobile(bp = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [bp]);
  return isMobile;
}

function FeatureCard({ feature, index }) {
  const [ref, inView] = useInView(0.05);
  const isMobile = useIsMobile();
  const isEven = index % 2 === 0;

  const animStyle = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s,
                 transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
  };

  const gridStyle = isMobile ? { display: "flex", flexDirection: "column" } : { ...styles.cardGrid };
  const imageCellStyle = isMobile ? { ...styles.imageCell, padding: "40px 24px", order: 0 } : { ...styles.imageCell, order: isEven ? 0 : 1, borderRight: isEven ? "1px solid #f1f5f9" : "none", borderLeft: isEven ? "none" : "1px solid #f1f5f9" };
  const contentCellStyle = isMobile ? { ...styles.contentCell, padding: "48px 32px", order: 1 } : { ...styles.contentCell, order: isEven ? 1 : 0, paddingLeft: isEven ? "64px" : "48px", paddingRight: isEven ? "48px" : "64px" };

  return (
    <div ref={ref} style={animStyle}>
      <div style={styles.card}>
        <div style={gridStyle}>
          <div style={imageCellStyle}>
            <img src={feature.image} alt={feature.title} style={styles.img} />
          </div>
          <div style={contentCellStyle}>
            <div style={styles.tag(feature)}>
              <span style={styles.tagDot(feature)} />
              {feature.tag}
            </div>
            <h3 style={styles.h3}>{feature.title}</h3>
            <p style={styles.subtitle(feature)}>{feature.subtitle}</p>
            <p style={styles.description}>{feature.description}</p>
            <div style={styles.divider} />
            <ul style={styles.pointsList}>
              {feature.points.map((pt, i) => (
                <li key={i} style={styles.pointItem}>
                  <span style={styles.pointIcon(feature)}>{pt.icon}</span>
                  <span style={styles.pointLabel}>{pt.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const [headerRef, headerInView] = useInView(0.05);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* GLOBAL FIXED NAVIGATION BAR */}
      <Navbar />

      <section style={styles.section}>
        <div style={styles.dotBg} />

        <div style={styles.container}>
          {/* ── HEADER ── */}
          <div
            ref={headerRef}
            style={{
              ...styles.header,
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div style={styles.badge}>
              <span style={styles.badgeDot} />
              <span style={styles.badgeText}>Platform Features</span>
            </div>

            <h2 style={styles.h2}>
              Powerful Features For <br />
              <span style={styles.gradientText}>Modern Networking</span>
            </h2>

            <p style={styles.subheading}>
              Everything you need to manage contacts, customise profiles and grow
              your professional network — all in one place with JioTap.
            </p>
          </div>

          {/* ── CARD STACK ── */}
          <div style={styles.cardStack}>
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ATTACHED SUCCESSFULLY ─── */}
      <Footer />
    </>
  );
}