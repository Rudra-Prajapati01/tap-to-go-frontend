import { useState } from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      console.log("Contact submitted:", data);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact Form Error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      {/* GLOBAL SITE NAVIGATION LAYER */}
      <Navbar />

      <section style={styles.section}>
        <div style={styles.dotBg} />

        <div style={styles.container}>
          {/* ── HEADER ── */}
          <div style={styles.header}>
            <div style={styles.badge}>
              <span style={styles.badgeDot} />
              <span style={styles.badgeText}>Get In Touch</span>
            </div>
            <h2 style={styles.h2}>
              Let’s Build Something <br />
              <span style={styles.gradientText}>Exceptional Together</span>
            </h2>
            <p style={styles.subheading}>
              Have questions about JioTap features, enterprise white-label solutions, or custom bulk orders? Drop us a message below.
            </p>
          </div>

          {/* ── CONTACT GRID ── */}
          <div style={styles.grid}>

            {/* COLUMN 1: INTERACTIVE LEAD FORM */}
            <div style={styles.formCard}>
              <h3 style={styles.cardTitle}>Send us a Message</h3>
              <p style={styles.cardSubtitle}>Our corporate ecosystem team typically responds within 2 hours.</p>

              {submitted && (
                <div style={styles.successBox}>
                  🎉 Thank you! Your inquiry has been transmitted successfully. We will connect shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    style={styles.input}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 xxx xxx xxx x"
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Company / Organisation</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name / organisation name"
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your networking or card customization requirements..."
                    style={styles.textarea}
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Submit Inquiry →
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ── LUXURY CONTACT INLINE STYLES SHEET ── */
const styles = {
  section: {
    position: "relative",
    width: "100%",
    padding: "160px 0 0px", 
    background: "#ffffff",
    overflow: "hidden",
  },
  dotBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "radial-gradient(circle, rgba(97,85,166,0.03) 1.5px, transparent 1.5px)",
    backgroundSize: "32px 32px",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "0 24px 120px",
    boxSizing: "border-box", /* Extra padding handling safe rakhne ke liye */
  },
  header: {
    textAlign: "center",
    marginBottom: "64px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(97,85,166,0.15)",
    background: "rgba(97,85,166,0.04)",
    marginBottom: "20px",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#6155A6",
  },
  badgeText: {
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "#6155A6",
  },
  h2: {
    fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)",
    fontWeight: 800,
    color: "#0f0f0f",
    lineHeight: 1.15,
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
  },
  gradientText: {
    background: "linear-gradient(90deg, #6155A6 0%, #a855f7 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subheading: {
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
    color: "#64748b",
    maxWidth: "660px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  grid: {
    display: "grid",
    /* FIX: minmax ko 420px se badal kar 280px kiya taaki UI same rahe par mobile pe width auto-adjust ho jaye */
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "48px",
    alignItems: "start",
    width: "100%",
  },
  formCard: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "28px",
    padding: "40px",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.02)",
    boxSizing: "border-box", /* Padding overflow issue fix */
    width: "100%",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#0f0f0f",
    margin: "0 0 6px",
  },
  cardSubtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "0 0 32px",
    fontWeight: 500,
  },
  successBox: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#166534",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  formRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
    minWidth: "260px", /* Mobile fields break correctly down */
    boxSizing: "border-box",
  },
  label: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: "0.98rem",
    color: "#0f0f0f",
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    fontSize: "0.98rem",
    color: "#0f0f0f",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "16px",
    background: "#6155A6",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 20px -10px #6155A6",
    marginTop: "12px",
    transition: "opacity 0.2s ease",
    boxSizing: "border-box",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  infoCard: {
    display: "flex",
    gap: "20px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    padding: "24px",
    alignItems: "center",
  },
  infoIconZone: (color) => ({
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: `${color}08`,
    border: `1px solid ${color}15`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  }),
  infoTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#0f0f0f",
    margin: "0 0 4px",
  },
  infoDesc: {
    fontSize: "0.92rem",
    color: "#64748b",
    margin: "0 0 8px",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  linkAction: (color) => ({
    fontSize: "0.92rem",
    fontWeight: 700,
    color: color,
    textDecoration: "none",
  }),
};