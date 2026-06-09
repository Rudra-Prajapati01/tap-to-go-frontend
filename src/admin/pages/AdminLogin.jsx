import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, { 
        email, 
        password 
      });
      
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
        navigate("/admin/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo and Header Section */}
        <div style={headerWrapperStyle}>
          <div style={logoWrapStyle}>
            <img src={logo} alt="JioTap" style={logoImgStyle} />
          </div>
          <h1 style={headingStyle}>Admin Login</h1>
          <p style={subTextStyle}>Enter your credentials to access panel</p>
        </div>

        <form onSubmit={handleAdminLogin}>
          {/* Email Input */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Admin Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "25px" }}>
            <label style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <span style={eyeIconStyle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            
            {/* Forgot Password Link */}
            <div style={forgotPasswordContainerStyle}>
              <span onClick={() => navigate("/admin/forgot-password")} style={forgotPasswordTextStyle}>
                Forgot Password?
              </span>
            </div>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa", padding: "20px" };
const cardStyle = { width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" };
const headerWrapperStyle = { textAlign: "center", marginBottom: "30px" };

// Centering Logic
const logoWrapStyle = { display: "flex", justifyContent: "center", marginBottom: "15px" };
const logoImgStyle = { width: "130px", height: "auto", objectFit: "contain" };

const headingStyle = { fontSize: "26px", fontWeight: "800", color: "#1a1a1a", margin: "0" };
const subTextStyle = { color: "#888", fontSize: "14px", marginTop: "8px" };
const labelStyle = { display: "block", marginBottom: "8px", color: "#555", fontWeight: "500", fontSize: "14px" };

const inputWrapperStyle = { position: "relative" };
const inputStyle = { width: "100%", height: "50px", padding: "0 16px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none" };
const eyeIconStyle = { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#aaa" };

const forgotPasswordContainerStyle = { display: "flex", justifyContent: "flex-end", marginTop: "12px" };
const forgotPasswordTextStyle = { color: "#6C47FF", cursor: "pointer", fontWeight: "600", fontSize: "13px" };

const buttonStyle = { width: "100%", height: "50px", borderRadius: "12px", border: "none", background: "#6C47FF", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer" };