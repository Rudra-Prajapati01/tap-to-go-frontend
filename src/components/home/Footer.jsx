import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import kiya

export default function Footer() {
  const navigate = useNavigate(); // Hook initialize kiya

  return (
    <footer style={styles.footer}>
      {/* Background Glows */}
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.container}>

        {/* ── TOP CTA SECTION ── */}
        <div style={styles.topCta}>
          <div style={styles.ctaFlex}>
            <div>
              <h2 style={styles.ctaTitle}>
                Ready To Transform
                <br />
                Your Networking?
              </h2>
              <p style={styles.ctaSub}>
                Create your digital business card, connect instantly and grow
                your professional network with JioTap.
              </p>
            </div>

            <button
              style={styles.button}
              onClick={() => navigate("/register")} // Navigation handle kiya
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Get Started
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* ── MAIN LINKS GRID ── */}
        <div style={styles.grid}>
          {/* Brand & Socials */}
          <div style={styles.brandCol}>
            <h3 style={styles.logo}>
              Jio<span style={{ color: "#4CAF1D" }}>Tap</span>
            </h3>
            <p style={styles.brandDesc}>
              The next generation NFC-powered digital business card platform
              helping professionals and businesses connect smarter.
            </p>

            <div style={styles.socialFlex}>
              {[{ icon: <FaFacebookF />, label: "Facebook" },
              { icon: <FaInstagram />, label: "Instagram" },
              { icon: <FaLinkedinIn />, label: "LinkedIn" },
              { icon: <FaXTwitter />, label: "X" }
              ].map((soc, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={soc.label}
                  style={styles.socialIcon}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0B4DBB';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={styles.linkHeader}>Product</h4>
            <ul style={styles.linkList}>
              {["JioTap Light Card", "Premium Custom Card", "JioTap Google Review Card"].map((item) => (
                <li key={item}>
                  <Link to="/products" style={styles.link} onMouseEnter={(e) => (e.target.style.color = "#4CAF1D")} onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={styles.linkHeader}>Company</h4>
            <ul style={styles.linkList}>
              {[ {name: "Products", path: "/products"}, {name: "Features", path: "/features"}, {name: "Teams & Business", path: "/teams-business"}, {name: "About Us", path: "/about"}, {name: "Contact Us", path: "/contact"} ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} style={styles.link} onMouseEnter={(e) => (e.target.style.color = "#4CAF1D")} onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 style={styles.linkHeader}>Legal</h4>
            <ul style={styles.linkList}>
              {[ {name: "Privacy Policy", path: "/privacy-policy"}, {name: "Refund Policy", path: "/refund-policy"}, {name: "Shipping Policy", path: "/shipping-policy"} ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} style={styles.link} onMouseEnter={(e) => (e.target.style.color = "#4CAF1D")} onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM COPYRIGHT ── */}
        <div style={styles.bottomBar}>
          <p style={styles.bottomText}>© 2026 JioTap. All rights reserved.</p>
          <p style={styles.bottomText}>Made with ❤️ by DevotedInfotech</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Inline Pure CSS Styles ── */
const styles = {
  footer: { position: "relative", overflow: "hidden", backgroundColor: "#0B1020", color: "#ffffff", fontFamily: "system-ui, -apple-system, sans-serif" },
  glowLeft: { position: "absolute", top: 0, left: "15%", height: "300px", width: "300px", borderRadius: "50%", backgroundColor: "rgba(97, 85, 166, 0.15)", filter: "blur(100px)", pointerEvents: "none" },
  glowRight: { position: "absolute", bottom: 0, right: 0, height: "300px", width: "300px", borderRadius: "50%", backgroundColor: "rgba(166, 133, 226, 0.15)", filter: "blur(100px)", pointerEvents: "none" },
  container: { position: "relative", zIndex: 10, maxWidth: "1300px", margin: "0 auto", padding: "0 24px" },
  topCta: { borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "70px 0" },
  ctaFlex: { display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "32px" },
  ctaTitle: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, margin: 0, letterSpacing: "-0.02em" },
  ctaSub: { marginTop: "16px", color: "#94a3b8", fontSize: "1.1rem", maxWidth: "550px", lineHeight: 1.5 },
  button: { display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 32px", borderRadius: "16px", fontWeight: "bold", fontSize: "1rem", background: "linear-gradient(135deg, #0B4DBB 0%, #4CAF1D 100%)", color: "#ffffff", border: "none", cursor: "pointer", boxShadow: "0 10px 20px rgba(97, 85, 166, 0.2)", transition: "transform 0.3s ease" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "48px", padding: "70px 0" },
  brandCol: { gridColumn: "span min(2, max-of-columns)", minWidth: "260px" },
  logo: { fontSize: "2rem", fontWeight: 900, margin: 0, letterSpacing: "-0.01em" },
  brandDesc: { marginTop: "20px", color: "#94a3b8", lineHeight: 1.6, maxWidth: "360px", fontSize: "0.95rem" },
  socialFlex: { display: "flex", gap: "16px", marginTop: "28px" },
  socialIcon: { width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", transition: "all 0.3s ease" },
  linkHeader: { fontSize: "1.1rem", fontWeight: "bold", marginBottom: "24px", marginTop: 0, color: "#ffffff" },
  linkList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" },
  link: { color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", transition: "all 0.3s ease" },
  bottomBar: { borderTop: "1px solid rgba(255, 255, 255, 0.1)", padding: "24px 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" },
  bottomText: { margin: 0, color: "#64748b", fontSize: "0.9rem" },
};