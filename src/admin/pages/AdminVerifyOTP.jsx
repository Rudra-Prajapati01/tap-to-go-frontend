import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminVerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("adminResetEmail");

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/verify-otp`, { email, otp });
      navigate("/admin/reset-password");
    } catch (error) {
      alert(error.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={logoWrapperStyle}>
          <img src={logo} alt="JioTap" style={logoImgStyle} />
        </div>

        <div style={headerStyle}>
          <h2 style={headingStyle}>Verify OTP</h2>
          <p style={subTextStyle}>We've sent a 6-digit code to your email</p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <input
            type="text"
            maxLength="6"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            style={inputStyle}
          />
        </div>

        <button onClick={verifyOTP} disabled={loading} style={buttonStyle}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa", padding: "20px" };
const cardStyle = { width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "28px", padding: "40px", boxShadow: "0 15px 35px rgba(108, 71, 255, 0.1)", boxSizing: "border-box" };

const logoWrapperStyle = { display: "flex", justifyContent: "center", marginBottom: "25px" };
const logoImgStyle = { width: "130px" };

const headerStyle = { textAlign: "center", marginBottom: "30px" };
const headingStyle = { fontSize: "28px", fontWeight: "800", color: "#1a1a1a", margin: "0" };
const subTextStyle = { color: "#777", fontSize: "14px", marginTop: "10px" };

const inputStyle = { 
  width: "100%", height: "60px", padding: "0 20px", borderRadius: "16px", 
  border: "2px solid #eee", fontSize: "24px", textAlign: "center", 
  letterSpacing: "12px", outline: "none", boxSizing: "border-box",
  transition: "all 0.3s ease" 
};

const buttonStyle = { 
  width: "100%", height: "55px", borderRadius: "16px", border: "none", 
  background: "#6C47FF", color: "#fff", fontSize: "16px", fontWeight: "700", 
  cursor: "pointer", transition: "transform 0.2s, background 0.3s" 
};