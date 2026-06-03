import { useEffect, useState } from "react";

export default function Navbar() {

  const [admin, setAdmin] =
    useState(null);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          "adminData"
        )
      );

    if (data) {
      setAdmin(data);
    }

  }, []);

  return (

    <div
      style={{
        width: "100%",
        height: "75px",
        background: "#ffffff",
        borderRadius: "18px",
        padding: "0 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.05)",
        marginBottom: "25px",
      }}
    >

      {/* LEFT */}

      <div>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            margin: 0,
            color: "#111827",
          }}
        >
          JioTap Admin Panel
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#6b7280",
          }}
        >
          Manage Users, Cards & Analytics
        </p>

      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >

        <div
          style={{
            textAlign: "right",
          }}
        >

          <h4
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            {admin?.name || "Admin"}
          </h4>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "13px",
            }}
          >
            {admin?.email || ""}
          </p>

        </div>

        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#6C47FF,#8E5CFF)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {admin?.name
            ? admin.name
                .charAt(0)
                .toUpperCase()
            : "A"}
        </div>

      </div>

    </div>
  );
}