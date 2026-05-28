import {
  Home,
  User,
  Bell,
  BarChart3,
  Settings,
  QrCode,
  Package,
  Users,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

const DashboardLayout = ({
  children,
}) => {

  const navigate =
    useNavigate();

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [notifications] =
    useState([
      {
        id: 1,
        text:
          "New lead received 🚀",
      },
    ]);

  useEffect(() => {

    const closeMenu = () => {

      if (
        window.innerWidth > 900
      ) {
        setMobileMenu(false);
      }
    };

    window.addEventListener(
      "resize",
      closeMenu
    );

    return () =>
      window.removeEventListener(
        "resize",
        closeMenu
      );

  }, []);

  const navItems = [

    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },

    {
      name: "Profile",
      icon: User,
      path:
        "/dashboard/profile",
    },

    {
      name: "Products",
      icon: Package,
      path:
        "/dashboard/products-services",
    },

    {
      name: "Leads",
      icon: Users,
      path:
        "/dashboard/leads",
    },

    {
      name: "QR",
      icon: QrCode,
      path:
        "/dashboard/activate-tag",
    },

    {
      name: "Analytics",
      icon: BarChart3,
      path:
        "/dashboard/analytics",
    },

    {
      name: "Settings",
      icon: Settings,
      path:
        "/dashboard/settings",
    },
  ];

  return (

    <>
      <style>{`

        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          background:#faf7ff;
          font-family:
            Inter,
            sans-serif;
        }

        .jt-layout{
          display:flex;
          min-height:100vh;
        }

        /* SIDEBAR */

        .jt-sidebar{
          width:260px;
          background:
            rgba(255,255,255,0.92);

          backdrop-filter:
            blur(18px);

          border-right:
            1px solid #eee;

          padding:24px 18px;

          position:fixed;
          left:0;
          top:0;
          bottom:0;
          z-index:999;
          transition:0.3s;
        }

        .jt-logo{
          display:flex;
          align-items:center;
          gap:12px;
          margin-bottom:40px;
        }

        .jt-logo-icon{
          width:44px;
          height:44px;
          border-radius:16px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #9333ea
            );

          display:flex;
          align-items:center;
          justify-content:center;
          color:#fff;
          font-size:20px;
          font-weight:800;

          box-shadow:
            0 12px 28px
            rgba(124,58,237,0.25);
        }

        .jt-logo-text{
          font-size:30px;
          font-weight:800;
          color:#7c3aed;
        }

        .jt-nav{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .jt-link{
          height:58px;
          border-radius:18px;
          display:flex;
          align-items:center;
          gap:14px;
          padding:0 18px;
          text-decoration:none;
          color:#64748b;
          font-weight:700;
          transition:0.25s;
        }

        .jt-link:hover{
          background:#f5f3ff;
          color:#7c3aed;
          transform:translateX(4px);
        }

        .jt-link.active{
          background:
            linear-gradient(
              135deg,
              #ede9fe,
              #f3e8ff
            );

          color:#7c3aed;
        }

        .jt-link svg{
          width:22px;
          height:22px;
        }

        /* MAIN */

        .jt-main{
          flex:1;
          margin-left:260px;
          min-height:100vh;
        }

        /* TOPBAR */

        .jt-topbar{
          height:84px;
          background:
            rgba(255,255,255,0.82);

          backdrop-filter:
            blur(18px);

          border-bottom:
            1px solid #eee;

          display:flex;
          align-items:center;
          justify-content:flex-end;

          padding:0 28px;

          position:sticky;
          top:0;
          z-index:100;
        }

        .jt-top-actions{
          display:flex;
          align-items:center;
          gap:16px;
        }

        .jt-notify{
          width:52px;
          height:52px;
          border-radius:16px;
          border:none;
          background:#fff;
          position:relative;
          cursor:pointer;
          color:#7c3aed;

          display:flex;
          align-items:center;
          justify-content:center;

          box-shadow:
            0 8px 20px
            rgba(15,23,42,0.06);
        }

        .jt-badge{
          position:absolute;
          top:8px;
          right:8px;

          width:18px;
          height:18px;

          border-radius:50%;

          background:#ef4444;
          color:#fff;

          font-size:11px;
          font-weight:700;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .jt-avatar{
          width:52px;
          height:52px;
          border-radius:18px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #9333ea
            );

          color:#fff;
          font-weight:800;

          display:flex;
          align-items:center;
          justify-content:center;

          box-shadow:
            0 10px 28px
            rgba(124,58,237,0.25);
        }

        .jt-content{
          padding:28px;
        }

        /* MOBILE TOPBAR */

        .jt-mobile-top{
          display:none;
        }

        /* MOBILE NAV */

        .jt-mobile-nav{
          display:none;
        }

        /* RESPONSIVE */

        @media (max-width: 900px){

          .jt-sidebar{
            left:
              ${mobileMenu
                ? "0"
                : "-280px"};
          }

          .jt-main{
            margin-left:0;
          }

          .jt-topbar{
            display:none;
          }

          .jt-mobile-top{
            height:74px;
            background:#fff;
            padding:0 18px;

            display:flex;
            align-items:center;
            justify-content:space-between;

            position:sticky;
            top:0;
            z-index:999;

            border-bottom:
              1px solid #eee;
          }

          .jt-mobile-left{
            display:flex;
            align-items:center;
            gap:14px;
          }

          .jt-menu-btn{
            width:46px;
            height:46px;
            border:none;
            border-radius:16px;
            background:#fff;
            color:#111827;
            cursor:pointer;

            box-shadow:
              0 8px 20px
              rgba(15,23,42,0.08);
          }

          .jt-mobile-nav{
            position:fixed;
            bottom:18px;
            left:50%;
            transform:translateX(-50%);

            width:92%;
            height:78px;

            background:
              rgba(255,255,255,0.95);

            backdrop-filter:
              blur(20px);

            border-radius:28px;

            display:flex;
            align-items:center;
            justify-content:space-around;

            z-index:999;

            box-shadow:
              0 20px 40px
              rgba(15,23,42,0.12);
          }

          .jt-mobile-link{
            width:54px;
            height:54px;

            border-radius:18px;

            display:flex;
            align-items:center;
            justify-content:center;

            color:#64748b;

            transition:0.25s;
          }

          .jt-mobile-link.active{
            background:
              linear-gradient(
                135deg,
                #ede9fe,
                #f3e8ff
              );

            color:#7c3aed;
          }

          .jt-content{
            padding:
              18px 14px 110px;
          }

        }

      `}</style>

      <div className="jt-layout">

        {/* SIDEBAR */}

        <aside className="jt-sidebar">

          <div className="jt-logo">

            <div className="jt-logo-icon">
              ⚡
            </div>

            <div className="jt-logo-text">
              Jio Tap
            </div>

          </div>

          <div className="jt-nav">

            {navItems.map(
              (item) => {

                const Icon =
                  item.icon;

                return (

                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({
                      isActive,
                    }) =>

                      isActive
                        ? "jt-link active"
                        : "jt-link"
                    }
                  >

                    <Icon />

                    <span>
                      {item.name}
                    </span>

                  </NavLink>
                );
              }
            )}

          </div>

        </aside>

        {/* MAIN */}

        <main className="jt-main">

          {/* DESKTOP TOPBAR */}

          <div className="jt-topbar">

            <div className="jt-top-actions">

              <button
                className="jt-notify"
              >

                <Bell size={22} />

                <div className="jt-badge">
                  {
                    notifications.length
                  }
                </div>

              </button>

              <div className="jt-avatar">
                J
              </div>

            </div>

          </div>

          {/* MOBILE TOPBAR */}

          <div className="jt-mobile-top">

            <div className="jt-mobile-left">

              <button
                className="jt-menu-btn"
                onClick={() =>
                  setMobileMenu(
                    !mobileMenu
                  )
                }
              >

                {mobileMenu
                  ? <X />
                  : <Menu />
                }

              </button>

            </div>

            <div
              style={{
                display:"flex",
                alignItems:"center",
                gap:"12px",
              }}
            >

              <button
                className="jt-notify"
                style={{
                  width:"46px",
                  height:"46px",
                }}
              >

                <Bell size={20} />

                <div className="jt-badge">
                  {
                    notifications.length
                  }
                </div>

              </button>

              <div
                className="jt-avatar"
                style={{
                  width:"46px",
                  height:"46px",
                }}
              >
                J
              </div>

            </div>

          </div>

          {/* CONTENT */}

          <div className="jt-content">
            {children}
          </div>

        </main>

        {/* MOBILE BOTTOM NAV */}

        <div className="jt-mobile-nav">

          {navItems
            .slice(0,5)
            .map((item) => {

              const Icon =
                item.icon;

              return (

                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({
                    isActive,
                  }) =>

                    isActive
                      ? "jt-mobile-link active"
                      : "jt-mobile-link"
                  }
                >

                  <Icon size={24} />

                </NavLink>
              );
            })}

        </div>

      </div>
    </>
  );
};

export default DashboardLayout;