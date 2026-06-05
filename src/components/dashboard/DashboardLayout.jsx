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

      <linearGradient
        id="dlp1"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor="#FFAED6"
        />

        <stop
          offset="100%"
          stopColor="#D4A8FF"
        />
      </linearGradient>

      <linearGradient
        id="dlp2"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor="#C9B8FF"
        />

        <stop
          offset="100%"
          stopColor="#7B68CC"
        />
      </linearGradient>

      <linearGradient
        id="dlp3"
        x1="0"
        y1="1"
        x2="0.5"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor="#9B85E0"
        />

        <stop
          offset="100%"
          stopColor="#D4A8FF"
        />
      </linearGradient>

      <linearGradient
        id="dlp4"
        x1="1"
        y1="1"
        x2="0"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor="#FFC0D8"
        />

        <stop
          offset="100%"
          stopColor="#F0A0C8"
        />
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

    <ellipse
      cx="45"
      cy="46"
      rx="10"
      ry="28"
      fill="url(#dlp1)"
    />
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

  const { setUser } =
    useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(window.innerWidth < 900);

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth < 900
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
          gap:14px;
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

        .brand-name{
          font-size:22px;
          font-weight:800;
          background:linear-gradient(135deg,#0B4DBB,#4CAF1D);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
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
        }

        .search-box{
          position:relative;
          width:220px;
        }

        .search-input{
          width:100%;
          height:40px;
          border-radius:12px;
          border:1.5px solid #E8DCFF;
          background:#fff;
          padding:0 14px 0 40px;
          outline:none;
          font-size:13px;
        }

        .topbar-actions{
          display:flex;
          align-items:center;
          gap:12px;
        }

        .icon-btn{
          width:40px;
          height:40px;
          border-radius:12px;
          border:1px solid #E8DCFF;
          background:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
        }

        .avatar{
          width:40px;
          height:40px;
          border-radius:12px;
          background:linear-gradient(135deg,#0B4DBB,#4CAF1D);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-weight:700;
          font-size:15px;
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
            gap:10px;
          }

          .dashboard-content{
            padding:16px 12px;
          }

          .search-box{
            display:none;
          }

          .icon-btn{
            width:36px;
            height:36px;
            border-radius:10px;
          }

          .avatar{
            width:36px;
            height:36px;
            border-radius:10px;
            font-size:14px;
          }

          .dashboard-sidebar{
            width:240px;
            min-width:240px;
          }

        }

      `}</style>

      <div className="dashboard-root">

        {/* Sidebar */}

        <aside
          className={`dashboard-sidebar ${sidebarOpen
            ? "open"
            : ""
            }`}
        >

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

              const active =
                location.pathname === item.path;

              return (

                <button
                  key={item.path}
                  className={`nav-item ${active
                    ? "active"
                    : ""
                    }`}
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

                    <span>
                      {item.label}
                    </span>
                  </div>
                </button>

              );
            })}

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </aside>

        {/* Overlay */}

        {sidebarOpen && isMobile && (

          <div
            className="overlay"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        )}

        {/* Main */}

        <main className="dashboard-main">

          {/* Topbar */}

          <div className="dashboard-topbar">

            <button
              className="hamburger"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              ☰
            </button>

            <div style={{ flex: 1 }} />

            {/* Search */}

            <div className="search-box">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#aaa"
                strokeWidth="2"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                }}
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />
              </svg>

              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />

            </div>

            {/* Actions */}

            <div className="topbar-actions">

              <button className="icon-btn">
                🔔
              </button>

              <div className="avatar">
                J
              </div>

            </div>

          </div>

          {/* Content */}

          <div className="dashboard-content">
            {children}
          </div>

        </main>

      </div>
    </>
  );
};

export default DashboardLayout;