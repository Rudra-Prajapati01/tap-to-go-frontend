import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/authApi";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icon library

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Eye icon toggle state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const email = localStorage.getItem("resetEmail");
      const otp = localStorage.getItem("verifiedOTP");
      await API.post("/reset-password", { email, otp, password });
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("verifiedOTP");
      alert("Password updated successfully");
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div style={logoWrapStyle}>
            <img src={logo} alt="JioTap" style={logoImgStyle} />
          </div>
          <h1 style={headingStyle}>Create New Password</h1>
        </div>

        <form onSubmit={resetPassword}>
          {/* New Password Input */}
          <div style={inputWrapperStyle}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <span style={eyeIconStyle} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div style={inputWrapperStyle}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <span style={eyeIconStyle} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg,#F5FAFF 0%,#FFFFFF 50%,#F6FFF1 100%)", padding: "15px" };
const cardStyle = { width: "100%", maxWidth: "450px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(25px)", borderRadius: "30px", padding: "40px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", boxSizing: "border-box" };
const logoWrapStyle = { display: "flex", justifyContent: "center", marginBottom: "15px" };
const logoImgStyle = { width: "130px", height: "auto", objectFit: "contain" };
const headingStyle = { fontSize: "28px", fontWeight: "700", color: "#0B4DBB", margin: "10px 0" };

// Input Wrapper for Eye Icon
const inputWrapperStyle = { position: "relative", width: "100%", marginBottom: "18px" };

const inputStyle = { width: "100%", height: "54px", borderRadius: "14px", border: "1px solid #ddd", padding: "0 45px 0 16px", outline: "none", fontSize: "16px", boxSizing: "border-box" };

const eyeIconStyle = { 
  position: "absolute", 
  right: "15px", 
  top: "50%", 
  transform: "translateY(-50%)", 
  cursor: "pointer", 
  color: "#666",
  fontSize: "20px"
};

const buttonStyle = { width: "100%", height: "54px", border: "none", borderRadius: "14px", background: "linear-gradient(135deg,#0B4DBB 0%,#4CAF1D 100%)", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "16px" };

export default ResetPassword;