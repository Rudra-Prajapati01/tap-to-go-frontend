import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import logo from "../../assets/logo.png";

const LotusIcon = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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

    <ellipse
      cx="28"
      cy="63"
      rx="13"
      ry="23"
      transform="rotate(-30 28 63)"
      fill="url(#dlp2)"
      opacity="0.9"
    />

    <ellipse
      cx="62"
      cy="63"
      rx="13"
      ry="23"
      transform="rotate(30 62 63)"
      fill="url(#dlp3)"
      opacity="0.9"
    />

    <ellipse
      cx="36"
      cy="55"
      rx="11"
      ry="25"
      transform="rotate(-13 36 55)"
      fill="url(#dlp4)"
      opacity="0.95"
    />

    <ellipse
      cx="54"
      cy="55"
      rx="11"
      ry="25"
      transform="rotate(13 54 55)"
      fill="url(#dlp2)"
      opacity="0.9"
    />

    <ellipse cx="45" cy="46" rx="10" ry="28" fill="url(#dlp1)" />
  </svg>
);

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Products",
    path: "/dashboard/products-services",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </svg>
    ),
  },
  {
    label: "Add Videos",
    path: "/dashboard/videos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    label: "Leads",
    path: "/dashboard/leads",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("googleUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <style>{`
        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          overflow-x:hidden;
          background:#F5FAFF;
        }

        .dashboard-root{
          display:flex;
          min-height:100vh;
          width:100%;
          overflow:hidden;
        }

        .dashboard-sidebar{
          width:250px;
          min-width:250px;
          height:100vh;
          background:rgba(255,255,255,0.9);
          backdrop-filter:blur(20px);
          border-right:1px solid rgba(11,77,187,0.12);
          padding:24px 16px;
          position:fixed;
          left:0;
          top:0;
          z-index:200;
          display:flex;
          flex-direction:column;
          transition:0.3s ease;
        }

        .dashboard-main{
          flex:1;
          margin-left:250px;
          width:100%;
          min-width:0;
          overflow-x:hidden;
        }

        .dashboard-topbar{
          height:72px;
          padding:0 28px;
          display:flex;
          align-items:center;
          justify-content: flex-end; /* content ko end me push karega flawlessly */
          background:rgba(255,255,255,0.8);
          backdrop-filter:blur(18px);
          border-bottom:1px solid rgba(220,210,255,0.5);
          position:sticky;
          top:0;
          z-index:100;
        }

        .dashboard-content{
          padding:28px;
          width:100%;
          overflow-x:hidden;
        }

        .sidebar-logo{
          display:flex;
          justify-content:center;
          align-items:center;
          margin-bottom:32px;
          padding:10px 0;
        }

        .nav-list{
          display:flex;
          flex-direction:column;
          gap:6px;
          flex:1;
        }

        .nav-item{
          padding:12px 14px;
          border:none;
          border-radius:14px;
          background:transparent;
          cursor:pointer;
          text-align:left;
          font-size:14px;
          font-weight:600;
          color:#666;
          transition:0.25s;
        }

        .nav-item:hover{
          background:rgba(155,141,207,0.08);
          color:#0B4DBB;
        }

        .nav-item.active{
          background:linear-gradient(
            135deg,
            rgba(92,82,160,0.12),
            rgba(192,132,252,0.12)
          );
          color:#0B4DBB;
        }

        .logout-btn{
          margin-top:10px;
          border:none;
          background:transparent;
          padding:12px 14px;
          border-radius:14px;
          cursor:pointer;
          color:#E85D5D;
          font-size:14px;
          font-weight:700;
          text-align:left;
          transition:0.25s;
        }

        .logout-btn:hover{
          background:rgba(255,100,100,0.08);
        }

        .hamburger{
          display:none;
          width:40px;
          height:40px;
          border:none;
          border-radius:12px;
          background:#fff;
          cursor:pointer;
          align-items:center;
          justify-content:center;
          border:1px solid #E8DCFF;
          margin-right: auto; /* Hamburger ko hamesha left side rakhega */
        }

        .overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.3);
          z-index:150;
        }

        @media (max-width: 900px){
          .dashboard-sidebar{
            left:-260px;
          }

          .dashboard-sidebar.open{
            left:0;
          }

          .dashboard-main{
            margin-left:0;
          }

          .hamburger{
            display:flex;
          }

          .dashboard-topbar{
            padding:0 16px;
          }

          .dashboard-content{
            padding:20px 16px;
          }
        }

        @media (max-width: 600px){
          .dashboard-topbar{
            height:64px;
            padding:0 12px;
          }

          .dashboard-content{
            padding:16px 12px;
          }

          .dashboard-sidebar{
            width:240px;
            min-width:240px;
          }
        }
      `}</style>

      <div className="dashboard-root">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <img
              src={logo}
              alt="JioTap"
              style={{
                width: "80px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <div className="nav-list">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  className={`nav-item ${active ? "active" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* Overlay */}
        {sidebarOpen && isMobile && (
          <div className="overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Topbar */}
          <div className="dashboard-topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>

            {/* Profile Element - Pure single structural layout wrapper */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "transparent", // Ab alag se box jaisa background nahi dikhega
                padding: "4px 0px",
                minWidth: "max-content",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#EAEAEA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {currentUser?.profileImage ? (
                  <img
                    src={currentUser?.profileImage}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  "👤"
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#222",
                    fontSize: "15px",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap"
                  }}
                >
                  {currentUser?.name || "User"}
                </div>

                <div
                  style={{
                    color: "#888",
                    fontSize: "13px",
                    lineHeight: "1.2",
                    marginTop: "3px",
                    whiteSpace: "nowrap"
                  }}
                >
                  {currentUser?.email || "No Email"}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="dashboard-content">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;