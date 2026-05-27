import { useState, useContext } from "react";
import API from "../../api/authApi";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { Eye, EyeOff } from "lucide-react";

const LotusIcon = () => (
  <svg width="80" height="80" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rp1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFAED6" />
        <stop offset="100%" stopColor="#D4A8FF" />
      </linearGradient>
      <linearGradient id="rp2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C9B8FF" />
        <stop offset="100%" stopColor="#7B68CC" />
      </linearGradient>
      <linearGradient id="rp3" x1="0" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#9B85E0" />
        <stop offset="100%" stopColor="#D4A8FF" />
      </linearGradient>
      <linearGradient id="rp4" x1="1" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FFC0D8" />
        <stop offset="100%" stopColor="#F0A0C8" />
      </linearGradient>
    </defs>
    <ellipse cx="28" cy="63" rx="13" ry="23" transform="rotate(-30 28 63)" fill="url(#rp2)" opacity="0.9" />
    <ellipse cx="62" cy="63" rx="13" ry="23" transform="rotate(30 62 63)" fill="url(#rp3)" opacity="0.9" />
    <ellipse cx="36" cy="55" rx="11" ry="25" transform="rotate(-13 36 55)" fill="url(#rp4)" opacity="0.95" />
    <ellipse cx="54" cy="55" rx="11" ry="25" transform="rotate(13 54 55)" fill="url(#rp2)" opacity="0.9" />
    <ellipse cx="45" cy="46" rx="10" ry="28" fill="url(#rp1)" />
    <text x="14" y="36" fontSize="10" fill="#8471D0" opacity="0.85">✦</text>
    <text x="65" y="30" fontSize="10" fill="#D4A8FF" opacity="0.85">✦</text>
    <text x="10" y="57" fontSize="7" fill="#FFAED6" opacity="0.7">+</text>
    <text x="72" y="60" fontSize="7" fill="#9B85E0" opacity="0.7">+</text>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const AtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Registration Failed");
    }
  };

  const googleRegister = async () => {

    try {

      // GOOGLE PROVIDER
      const provider =
        new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      // FIREBASE LOGIN
      const result =
        await signInWithPopup(
          auth,
          provider
        );

      // GOOGLE USER
      const googleUser =
        result.user;

      console.log(
        "GOOGLE USER:",
        googleUser
      );

      // SEND TO BACKEND
      const res = await API.post(
        "/google-login",
        {

          name:
            googleUser.displayName,

          email:
            googleUser.email,

          profileImage:
            googleUser.photoURL,

        }
      );

      console.log(
        "BACKEND RESPONSE:",
        res.data
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      // CONTEXT
      setUser(res.data.user);

      // REDIRECT
      navigate("/dashboard");

    } catch (error) {

      console.log(
        "GOOGLE REGISTER ERROR:",
        error
      );

    }
  };

  const inputStyle = {
    width: "100%",
    height: "52px",
    padding: "0 16px 0 46px",
    border: "1.5px solid #E8DCFF",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.85)",
    fontSize: "14px",
    fontFamily: "inherit",
    color: "#444",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      {/* Sparkles */}
      <span style={{ ...styles.star, top: "10%", left: "7%" }}>✦</span>
      <span style={{ ...styles.star, top: "18%", right: "9%" }}>✦</span>
      <span style={{ ...styles.star, top: "60%", right: "5%" }}>✦</span>
      <span style={{ ...styles.star, bottom: "18%", left: "10%" }}>✦</span>
      <span style={{ ...styles.starDot, bottom: "32%", left: "26%" }}>·</span>
      <span style={{ ...styles.starDot, top: "42%", left: "4%" }}>·</span>

      {/* Card */}
      <div style={styles.card}>

        {/* Lotus Logo */}
        <div style={styles.logoWrap}>
          <LotusIcon />
        </div>

        {/* Title */}
        <div style={styles.titleArea}>
          <h1 style={styles.title}>Create Account ✨</h1>
          <p style={styles.subtitle}>Sign up to get started today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

          {/* Full Name */}
          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><UserIcon /></span>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = "#9B8DCF";
                e.target.style.boxShadow = "0 0 0 3px rgba(155,141,207,0.15)";
                e.target.style.background = "rgba(255,255,255,0.95)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#E8DCFF";
                e.target.style.boxShadow = "none";
                e.target.style.background = "rgba(255,255,255,0.85)";
              }}
            />
          </div>

          {/* Username */}
          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><AtIcon /></span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = "#9B8DCF";
                e.target.style.boxShadow = "0 0 0 3px rgba(155,141,207,0.15)";
                e.target.style.background = "rgba(255,255,255,0.95)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#E8DCFF";
                e.target.style.boxShadow = "none";
                e.target.style.background = "rgba(255,255,255,0.85)";
              }}
            />
          </div>

          {/* Email */}
          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><MailIcon /></span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = "#9B8DCF";
                e.target.style.boxShadow = "0 0 0 3px rgba(155,141,207,0.15)";
                e.target.style.background = "rgba(255,255,255,0.95)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#E8DCFF";
                e.target.style.boxShadow = "none";
                e.target.style.background = "rgba(255,255,255,0.85)";
              }}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><LockIcon /></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              style={{ ...inputStyle, paddingRight: "48px" }}
              onFocus={e => {
                e.target.style.borderColor = "#9B8DCF";
                e.target.style.boxShadow = "0 0 0 3px rgba(155,141,207,0.15)";
                e.target.style.background = "rgba(255,255,255,0.95)";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#E8DCFF";
                e.target.style.boxShadow = "none";
                e.target.style.background = "rgba(255,255,255,0.85)";
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword
                ? <EyeOff size={18} color="#9B8DCF" />
                : <Eye size={18} color="#9B8DCF" />
              }
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            style={styles.registerBtn}
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 8px 28px rgba(92,82,160,0.48)";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(92,82,160,0.38)";
            }}
          >
            Create Account
          </button>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={googleRegister}
            style={styles.googleBtn}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#FDF7FF";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(155,141,207,0.22)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

        </form>

        {/* Login Link */}
        <p style={styles.loginRow}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.loginLink}
            onMouseEnter={e => e.target.style.color = "#6155A6"}
            onMouseLeave={e => e.target.style.color = "#FF69B4"}
          >
            Sign In
          </span>
        </p>

      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #FFD6E0 0%, #F5DDFF 40%, #D5C2FF 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    top: "-130px",
    left: "-80px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #FFAED6 0%, transparent 70%)",
    opacity: 0.6,
  },
  blob2: {
    position: "absolute",
    bottom: "-110px",
    right: "-70px",
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #B8A0E8 0%, transparent 70%)",
    opacity: 0.65,
  },
  blob3: {
    position: "absolute",
    bottom: "80px",
    left: "-50px",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #C9B8FF 0%, transparent 70%)",
    opacity: 0.45,
  },
  star: {
    position: "absolute",
    color: "#C0AAEE",
    fontSize: "14px",
    opacity: 0.75,
    pointerEvents: "none",
  },
  starDot: {
    position: "absolute",
    color: "#FFFFFF",
    fontSize: "20px",
    opacity: 0.8,
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "430px",
    background: "rgba(255, 255, 255, 0.68)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: "1px solid rgba(255, 255, 255, 0.55)",
    borderRadius: "32px",
    boxShadow: "0 20px 60px rgba(120,80,200,0.14), 0 4px 20px rgba(0,0,0,0.08)",
    padding: "36px 36px 32px",
  },
  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "14px",
  },
  titleArea: {
    textAlign: "center",
    marginBottom: "24px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#3D3480",
    margin: "0 0 6px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#999",
    fontWeight: 400,
    margin: 0,
  },
  fieldWrap: {
    position: "relative",
    marginBottom: "13px",
  },
  fieldIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 1,
  },
  eyeBtn: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  registerBtn: {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #5C52A0 0%, #9B8DCF 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(92,82,160,0.38)",
    transition: "transform 0.2s, box-shadow 0.2s",
    marginBottom: "18px",
    marginTop: "4px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#E0D5F5",
  },
  dividerText: {
    color: "#aaa",
    fontSize: "12px",
    fontWeight: 500,
  },
  googleBtn: {
    width: "100%",
    height: "52px",
    border: "1.5px solid #EAE0FF",
    borderRadius: "14px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#555",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "22px",
  },
  loginRow: {
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
    margin: 0,
  },
  loginLink: {
    color: "#FF69B4",
    fontWeight: 700,
    cursor: "pointer",
    transition: "color 0.2s",
  },
};

export default RegisterForm;