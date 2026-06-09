import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/forgot-password`, { email });
      localStorage.setItem("adminResetEmail", email);
      alert("OTP sent successfully");
      navigate("/admin/verify-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* LOGO WRAPPER - Centered using Flexbox */}
        <div style={logoWrapperStyle}>
          <img src={logo} alt="JioTap" style={logoImgStyle} />
        </div>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2 style={headingStyle}>Forgot Password</h2>
          <p style={subTextStyle}>Enter your email to receive a verification OTP</p>
        </div>

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

        <button onClick={handleSendOTP} disabled={loading} style={buttonStyle}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
        
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", color: "#666" }}>
          Remember your password?{" "}
          <span onClick={() => navigate("/admin")} style={{ color: "#6C47FF", cursor: "pointer", fontWeight: "600" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// --- Styles ---
const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa", padding: "20px" };
const cardStyle = { width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", boxSizing: "border-box" };

// LOGO STYLES (Center alignment fixed)
const logoWrapperStyle = { 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  marginBottom: "20px" 
};
const logoImgStyle = { width: "120px", height: "auto" };

const headingStyle = { fontSize: "24px", fontWeight: "800", color: "#1a1a1a", margin: "0" };
const subTextStyle = { color: "#888", fontSize: "14px", marginTop: "8px" };
const labelStyle = { display: "block", marginBottom: "8px", color: "#555", fontWeight: "500", fontSize: "14px" };
const inputStyle = { width: "100%", height: "50px", padding: "0 16px", borderRadius: "12px", border: "1.5px solid #eee", fontSize: "15px", outline: "none", boxSizing: "border-box" };
const buttonStyle = { width: "100%", height: "50px", borderRadius: "12px", border: "none", background: "#6C47FF", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "10px" };