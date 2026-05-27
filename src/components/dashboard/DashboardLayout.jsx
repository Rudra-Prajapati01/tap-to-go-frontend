import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


const LotusIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dlp1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFAED6" />
        <stop offset="100%" stopColor="#D4A8FF" />
      </linearGradient>
      <linearGradient id="dlp2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C9B8FF" />
        <stop offset="100%" stopColor="#7B68CC" />
      </linearGradient>
      <linearGradient id="dlp3" x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#9B85E0" />
        <stop offset="100%" stopColor="#D4A8FF" />
      </linearGradient>
      <linearGradient id="dlp4" x1="1" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FFC0D8" />
        <stop offset="100%" stopColor="#F0A0C8" />
      </linearGradient>
    </defs>
    <ellipse cx="28" cy="63" rx="13" ry="23" transform="rotate(-30 28 63)" fill="url(#dlp2)" opacity="0.9" />
    <ellipse cx="62" cy="63" rx="13" ry="23" transform="rotate(30 62 63)" fill="url(#dlp3)" opacity="0.9" />
    <ellipse cx="36" cy="55" rx="11" ry="25" transform="rotate(-13 36 55)" fill="url(#dlp4)" opacity="0.95" />
    <ellipse cx="54" cy="55" rx="11" ry="25" transform="rotate(13 54 55)" fill="url(#dlp2)" opacity="0.9" />
    <ellipse cx="45" cy="46" rx="10" ry="28" fill="url(#dlp1)" />
  </svg>
);

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Product & Services",
    path: "/dashboard/products-services",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Box */}
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />

        {/* Box bottom */}
        <path d="M3 8v8l9 5 9-5V8" />

        {/* Middle line */}
        <path d="M12 13v8" />
      </svg>
    )
  },
  {
    label: "Leads",
    path: "/dashboard/leads",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "QR Activation",
    path: "/qr",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="5" height="5" rx="1" />
        <rect x="16" y="3" width="5" height="5" rx="1" />
        <rect x="3" y="16" width="5" height="5" rx="1" />
        <path d="M16 16h5v5M16 16v5" />
        <path d="M3 10h3M10 3v3M10 10h.01M10 16v5M16 10h5" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "Settings",
    path: "/settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("googleUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={styles.root}>
      {/* ── Sidebar ── */}
      <aside style={{ ...styles.sidebar, left: sidebarOpen ? 0 : undefined }}>
        {/* Logo */}
        <div style={styles.sidebarLogo}>
          <LotusIcon size={38} />
          <span style={styles.brandName}>Jio Tap</span>
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{
                  ...styles.navItem,
                  ...(active ? styles.navItemActive : {}),
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(155,141,207,0.08)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ color: active ? "#6155A6" : "#aaa", display: "flex", transition: "color 0.2s" }}>
                  {item.icon}
                </span>
                <span style={{ ...styles.navLabel, color: active ? "#3D3480" : "#777" }}>
                  {item.label}
                </span>
                {active && <div style={styles.activeBar} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,100,100,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D5D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span style={{ color: "#E85D5D", fontWeight: 600, fontSize: "14px" }}>Logout</span>
        </button>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ── */}
      <main style={styles.main}>
        {/* Top bar */}
        <div style={styles.topbar}>
          {/* Hamburger (mobile) */}
          <button style={styles.hamburger} onClick={() => setSidebarOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6155A6" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={styles.searchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>

          {/* Bell */}
          <button style={styles.iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span style={styles.notifDot} />
          </button>

          {/* Avatar */}
          <div style={styles.avatar}>J</div>
        </div>

        {/* Page content */}
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#F5F0FF",
  },
  sidebar: {
    width: "240px",
    minWidth: "240px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRight: "1px solid rgba(220,210,255,0.6)",
    display: "flex",
    flexDirection: "column",
    padding: "28px 16px 24px",
    position: "sticky",
    top: 0,
    height: "100vh",
    zIndex: 100,
    boxShadow: "2px 0 20px rgba(155,141,207,0.08)",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingLeft: "8px",
    marginBottom: "32px",
  },
  brandName: {
    fontSize: "22px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #5C52A0, #C084FC)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.3px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "14px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    position: "relative",
    transition: "background 0.2s",
    textAlign: "left",
  },
  navItemActive: {
    background: "linear-gradient(135deg, rgba(92,82,160,0.1), rgba(192,132,252,0.1))",
  },
  navLabel: {
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  activeBar: {
    position: "absolute",
    right: "0",
    top: "20%",
    height: "60%",
    width: "3px",
    borderRadius: "2px",
    background: "linear-gradient(180deg, #5C52A0, #C084FC)",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "14px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: "8px",
    transition: "background 0.2s",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 99,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 28px",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(220,210,255,0.5)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    "@media (max-width: 768px)": { display: "flex" },
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    height: "38px",
    width: "200px",
    padding: "0 16px 0 36px",
    border: "1.5px solid #E8DCFF",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.9)",
    fontSize: "13px",
    fontFamily: "inherit",
    color: "#444",
    outline: "none",
  },
  iconBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    border: "1.5px solid #E8DCFF",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
  },
  notifDot: {
    position: "absolute",
    top: "7px",
    right: "7px",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#FF69B4",
    border: "1.5px solid #fff",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #5C52A0, #C084FC)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(92,82,160,0.3)",
  },
  content: {
    padding: "32px 28px",
    flex: 1,
  },
};

export default DashboardLayout;