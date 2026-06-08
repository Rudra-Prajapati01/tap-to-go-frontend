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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        { email, password }
      );

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
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          {/* Logo added here */}
          <div style={logoWrapStyle}>
            <img src={logo} alt="JioTap" style={logoImgStyle} />
          </div>
          <h1 style={headingStyle}>Admin Login</h1>
          <p style={subTextStyle}>Enter your credentials to access panel</p>
        </div>

        <form onSubmit={handleAdminLogin}>
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

          <div style={{ marginBottom: "28px" }}>
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
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Styles (Matching your previous components) ---
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#ffffff",
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "430px",
  background: "#ffffff",
  borderRadius: "30px",
  padding: "40px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  boxSizing: "border-box",
};

const logoWrapStyle = { display: "flex", justifyContent: "center", marginBottom: "15px" };
const logoImgStyle = { width: "130px", height: "auto", objectFit: "contain" };
const headingStyle = { fontSize: "28px", fontWeight: "700", color: "#6C47FF", margin: "10px 0" };
const subTextStyle = { color: "#666", fontSize: "14px", marginBottom: "20px" };
const labelStyle = { display: "block", marginBottom: "8px", color: "#444", fontWeight: "600" };

const inputWrapperStyle = { position: "relative" };
const inputStyle = {
  width: "100%",
  height: "54px",
  padding: "0 16px",
  borderRadius: "14px",
  border: "1px solid #ddd",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const eyeIconStyle = {
  position: "absolute",
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#666",
};

const buttonStyle = {
  width: "100%",
  height: "54px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg,#6C47FF,#8E5CFF)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};