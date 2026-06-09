import { useState, useContext } from "react";
import API from "../../api/authApi";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase"; 
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

// Icons
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const UserIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const LockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8DCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Login Failed");
    }
  };

  // Google Login Logic
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Backend ko user data bhejein
      const res = await API.post("/login/google", { 
        email: result.user.email,
        uid: result.user.uid
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google Login Failed: " + error.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}><img src={logo} alt="JioTap" style={{ width: "130px" }} /></div>
        <div style={styles.titleArea}>
          <h1 style={styles.title}>Welcome Back 🖤</h1>
          <p style={styles.subtitle}>Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><UserIcon /></span>
            <input type="text" name="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.fieldWrap}>
            <span style={styles.fieldIcon}><LockIcon /></span>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} style={{ ...styles.input, paddingRight: "48px" }} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeOff size={18} color="#9B8DCF" /> : <Eye size={18} color="#9B8DCF" />}
            </button>
          </div>

          <div style={styles.forgotWrapper}>
            <button type="button" style={styles.forgotBtn} onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>

          <button type="submit" style={styles.loginBtn}>Log In</button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          <button type="button" onClick={handleGoogleLogin} style={styles.socialBtn}>
            <GoogleIcon /> <span>Google</span>
          </button>
        </form>

        <p style={styles.signupRow}>
          Don't have an account? <span onClick={() => navigate("/register")} style={styles.signupLink}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5FAFF" },
  card: { width: "430px", background: "#fff", padding: "40px", borderRadius: "32px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  logoWrap: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  titleArea: { textAlign: "center", marginBottom: "28px" },
  title: { fontSize: "26px", fontWeight: 700, color: "#0B4DBB", margin: 0 },
  subtitle: { fontSize: "14px", color: "#999", margin: "5px 0" },
  form: { display: "flex", flexDirection: "column" },
  fieldWrap: { position: "relative", marginBottom: "15px" },
  fieldIcon: { position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" },
  input: { width: "100%", height: "52px", padding: "0 16px 0 46px", border: "1.5px solid #E8DCFF", borderRadius: "14px", boxSizing: "border-box" },
  eyeBtn: { position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" },
  forgotWrapper: { display: "flex", justifyContent: "flex-end", marginBottom: "20px" },
  forgotBtn: { color: "#0B4DBB", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: "13px" },
  loginBtn: { width: "100%", height: "52px", border: "none", borderRadius: "14px", background: "#0B4DBB", color: "#fff", fontWeight: 600, cursor: "pointer", marginBottom: "20px" },
  divider: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  dividerLine: { flex: 1, height: "1px", background: "#E0D5F5" },
  dividerText: { color: "#aaa", fontSize: "12px" },
  socialBtn: { width: "100%", height: "48px", border: "1.5px solid #E8DCFF", borderRadius: "14px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" },
  signupRow: { textAlign: "center", fontSize: "14px", marginTop: "20px" },
  signupLink: { color: "#4CAF1D", fontWeight: 700, cursor: "pointer" }
};