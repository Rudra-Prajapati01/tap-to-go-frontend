import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/authApi";
import logo from "../../assets/logo.png";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resetEmail =
        localStorage.getItem("resetEmail");

      const verificationEmail =
        localStorage.getItem(
          "verificationEmail"
        );

      // FORGOT PASSWORD FLOW
      if (resetEmail) {

        await API.post(
          "/verify-otp",
          {
            email: resetEmail,
            otp,
          }
        );

        localStorage.setItem(
          "verifiedOTP",
          otp
        );

        navigate("/reset-password");
      }

      // REGISTRATION FLOW
      else if (verificationEmail) {

        await API.post(
          "/verify-registration-otp",
          {
            email: verificationEmail,
            otp,
          }
        );

        localStorage.removeItem(
          "verificationEmail"
        );

        alert(
          "Email verified successfully"
        );

        navigate("/login");
      }

      else {

        alert(
          "Session expired. Please try again."
        );

        navigate("/register");
      }

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Invalid OTP"
      );

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
          <h1 style={headingStyle}>Verify OTP</h1>
          <p style={subTextStyle}>Please enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={verifyOTP}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              const val = e.target.value;
              // Sirf numbers allow karne ke liye logic
              if (/^\d*$/.test(val) && val.length <= 6) {
                setOtp(val);
              }
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            required
            maxLength={6}
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => navigate("/forgot-password")} style={linkButtonStyle}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#F5FAFF 0%,#FFFFFF 50%,#F6FFF1 100%)",
  padding: "15px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "450px",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(25px)",
  borderRadius: "30px",
  padding: "40px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
};

const logoWrapStyle = { display: "flex", justifyContent: "center", marginBottom: "15px" };
const logoImgStyle = { width: "130px", height: "auto", objectFit: "contain" };
const headingStyle = { fontSize: "28px", fontWeight: "700", color: "#0B4DBB", margin: "10px 0" };
const subTextStyle = { color: "#666", marginBottom: "20px", fontSize: "14px" };

const inputStyle = {
  width: "100%",
  height: "54px",
  borderRadius: "14px",
  border: "1px solid #ddd",
  padding: "0 16px",
  marginBottom: "18px",
  outline: "none",
  fontSize: "20px",
  textAlign: "center",
  letterSpacing: "8px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  height: "54px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg,#0B4DBB 0%,#4CAF1D 100%)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "16px",
};

const linkButtonStyle = { background: "none", border: "none", color: "#0B4DBB", cursor: "pointer", fontWeight: "600" };

export default VerifyOTP;