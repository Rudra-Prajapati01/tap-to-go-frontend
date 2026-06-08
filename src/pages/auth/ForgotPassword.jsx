import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/authApi";
import logo from "../../assets/logo.png";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const sendOTP = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await API.post("/forgot-password", { email });
            localStorage.setItem("resetEmail", email);
            navigate("/verify-otp");
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to send OTP");
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
                    <h1 style={headingStyle}>Forgot Password</h1>
                    <p style={subTextStyle}>Enter your email to receive OTP</p>
                </div>

                <form onSubmit={sendOTP}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    
                    {error && <p style={errorTextStyle}>{error}</p>}

                    <button type="submit" disabled={loading} style={buttonStyle}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button onClick={() => navigate("/login")} style={linkButtonStyle}>
                        ← Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Responsive Styles ---
const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#F5FAFF 0%,#FFFFFF 50%,#F6FFF1 100%)",
    padding: "15px", // Added padding for small screens
};

const cardStyle = {
    width: "100%",        // Full width on mobile
    maxWidth: "450px",    // Constraint for tablets/desktops
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(25px)",
    borderRadius: "30px",
    padding: "30px",      // Slightly reduced for smaller screens
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
    boxSizing: "border-box", // Important for padding calculation
};

const logoWrapStyle = { 
    display: "flex", 
    justifyContent: "center", 
    marginBottom: "15px" 
};

const logoImgStyle = { 
    width: "100%", 
    maxWidth: "130px", // Limits logo size on large screens
    height: "auto", 
    objectFit: "contain" 
};

const headingStyle = { 
    fontSize: "clamp(22px, 5vw, 28px)", // Responsive font size
    fontWeight: "700", 
    color: "#0B4DBB",
    margin: "10px 0"
};

const subTextStyle = { color: "#666", fontSize: "14px", marginBottom: "20px" };

const inputStyle = { 
    width: "100%", 
    height: "50px", 
    borderRadius: "14px", 
    border: "1px solid #ddd", 
    padding: "0 16px", 
    marginBottom: "15px", 
    outline: "none",
    boxSizing: "border-box" // Ensures padding doesn't break width
};

const buttonStyle = { 
    width: "100%", 
    height: "50px", 
    border: "none", 
    borderRadius: "14px", 
    background: "linear-gradient(135deg,#0B4DBB 0%,#4CAF1D 100%)", 
    color: "#fff", 
    fontWeight: "600", 
    cursor: "pointer",
    fontSize: "16px"
};

const errorTextStyle = { color: "#d93025", fontSize: "13px", marginBottom: "15px", textAlign: "left" };
const linkButtonStyle = { background: "none", border: "none", color: "#0B4DBB", cursor: "pointer", fontWeight: "600" };

export default ForgotPassword;