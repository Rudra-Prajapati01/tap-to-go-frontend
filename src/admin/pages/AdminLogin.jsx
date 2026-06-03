// client/src/admin/pages/AdminLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAdminLogin =
    async (e) => {

      e.preventDefault();

      if (
        !email ||
        !password
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await axios.post(

            "http://localhost:5000/api/admin/login",

            {
              email,
              password,
            }
          );

        if (
          response.data.success
        ) {

          localStorage.setItem(
            "adminToken",
            response.data.token
          );

          localStorage.setItem(
            "adminData",

            JSON.stringify(
              response.data.admin
            )
          );

          navigate(
            "/admin/dashboard"
          );

        } else {

          alert(
            response.data.message
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Invalid Admin Credentials"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#6C47FF,#8E5CFF,#B06CFF)",
        padding: "20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "28px",
          padding: "40px",
          boxShadow:
            "0 20px 70px rgba(0,0,0,0.18)",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >

          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "#6C47FF",
              marginBottom: "10px",
            }}
          >
            Jio Tap
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "15px",
            }}
          >
            Admin Panel Login
          </p>

        </div>

        <form
          onSubmit={
            handleAdminLogin
          }
        >

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#444",
                fontWeight: "600",
              }}
            >
              Admin Email
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border:
                  "1px solid #ddd",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          <div
            style={{
              marginBottom: "28px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#444",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                border:
                  "1px solid #ddd",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(135deg,#6C47FF,#8E5CFF)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >

            {loading
              ? "Logging In..."
              : "Admin Login"}

          </button>

        </form>

      </div>

    </div>
  );
}