import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const menus = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },

    {
      name: "Users",
      path: "/admin/users",
    },

    {
      name: "Contact Requests",
      path: "/admin/contacts",
    },

  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#111827",
        color: "#fff",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: "800",
          marginBottom: "40px",
        }}
      >
        JioTap Admin
      </h2>

      {menus.map((menu) => (

        <Link
          key={menu.path}
          to={menu.path}
          style={{
            display: "block",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "12px",
            textDecoration: "none",

            background:
              location.pathname === menu.path
                ? "#6C47FF"
                : "transparent",

            color: "#fff",
            fontWeight: "600",
          }}
        >
          {menu.name}
        </Link>

      ))}

      <button
        onClick={() => {

          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");

          window.location.href = "/admin";

        }}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "700",
        }}
      >
        Logout
      </button>
    </div>
  );
}