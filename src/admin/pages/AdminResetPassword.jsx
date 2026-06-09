import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem("adminResetEmail");
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const resetPassword = async () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/reset-password`, { email, password });
      alert("Password Updated Successfully");
      localStorage.removeItem("adminResetEmail");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Password Reset Failed");
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

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={headingStyle}>Reset Password</h2>
          <p style={subTextStyle}>Create a new secure password</p>
        </div>

        <div style={{ marginBottom: "25px", position: "relative" }}>
          <label style={labelStyle}>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#6C47FF"}
            onBlur={(e) => e.target.style.borderColor = "#eee"}
          />
          <span style={eyeIconStyle} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={resetPassword} disabled={loading} style={buttonStyle}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Elite Styles ---------- */
const containerStyle = { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa", padding: "20px" };
const cardStyle = { 
  width: "100%", maxWidth: "400px", background: "#ffffff", borderRadius: "28px", 
  padding: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" 
};

const logoWrapperStyle = { display: "flex", justifyContent: "center", marginBottom: "25px" };
const logoImgStyle = { width: "130px" };

const headingStyle = { fontSize: "26px", fontWeight: "800", color: "#1a1a1a", margin: "0" };
const subTextStyle = { color: "#999", fontSize: "14px", marginTop: "8px" };
const labelStyle = { display: "block", marginBottom: "10px", color: "#444", fontWeight: "600", fontSize: "13px" };

const inputStyle = { 
  width: "100%", height: "55px", padding: "0 20px", borderRadius: "16px", 
  border: "2px solid #eee", fontSize: "15px", outline: "none", boxSizing: "border-box",
  transition: "border-color 0.3s ease" 
};

const eyeIconStyle = { 
  position: "absolute", right: "20px", top: "42px", cursor: "pointer", 
  color: "#aaa", fontSize: "16px" 
};

const buttonStyle = { 
  width: "100%", height: "55px", borderRadius: "16px", border: "none", 
  background: "#6C47FF", color: "#fff", fontSize: "16px", fontWeight: "700", 
  cursor: "pointer", marginTop: "5px", transition: "background 0.3s ease" 
};