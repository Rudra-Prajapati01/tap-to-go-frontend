import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function TeamsBusiness() {
  const navigate = useNavigate();

  const stats = [
    { value: "500+", label: "Businesses", icon: "🏢" },
    { value: "10K+", label: "Team Members", icon: "👥" },
    { value: "1M+", label: "Profile Views", icon: "👁️" },
    { value: "80%", label: "Increase in Leads", icon: "📈" },
    { value: "99.9%", label: "Uptime", icon: "🛡️" },
  ];

  const features = [
    {
      title: "Centralized Team Management",
      desc: "Add, remove and manage all employees easily.",
      icon: "👥",
    },
    {
      title: "Instant Updates",
      desc: "Update information once, reflect everywhere.",
      icon: "⚡",
    },
    {
      title: "Advanced Analytics",
      desc: "Track views, taps, location and device data.",
      icon: "📊",
    },
    {
      title: "Lead Capture",
      desc: "Capture leads and export with one click.",
      icon: "🎯",
    },
    {
      title: "Brand Consistency",
      desc: "Maintain uniform branding across all cards.",
      icon: "🎨",
    },
    {
      title: "Role Based Access",
      desc: "Secure data with role-based permissions.",
      icon: "🔒",
    },
  ];

  const steps = [
    { title: "Create Workspace", desc: "Set up your company workspace in minutes." },
    { title: "Invite Team Members", desc: "Send invites and onboard your team effortlessly." },
    { title: "Assign NFC Cards", desc: "Assign digital business cards to your team members." },
    { title: "Track & Grow", desc: "Monitor performance and generate more leads." },
  ];

  const categories = [
    { name: "Sales Teams", desc: "Share contacts instantly and close more deals.", icon: "💼" },
    { name: "Real Estate", desc: "Generate and capture more property leads.", icon: "🏠" },
    { name: "Corporate Offices", desc: "Maintain professional branding across teams.", icon: "🏢" },
    { name: "Startups", desc: "Scale networking without printing costs.", icon: "🚀" },
    { name: "Educational Institutions", desc: "Digital identity for faculty and staff.", icon: "🎓" },
    { name: "Healthcare", desc: "Securely share and connect with patients.", icon: "➕" },
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          paddingTop: "120px",
          overflowX: "hidden",
          backgroundColor: "#FFFFFF",
          color: "#1E293B",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* HERO SECTION */}
        <section
          style={{
            padding: "80px 20px 60px",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(97, 85, 166, 0.05) 0%, #FFFFFF 100%)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <span
              style={{
                background: "#6155A6",
                color: "#FFFFFF",
                padding: "6px 16px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}
            >
              Teams & Business
            </span>

            <h1
              style={{
                marginTop: "25px",
                fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                fontWeight: "800",
                lineHeight: "1.1",
                color: "#0F172A",
                letterSpacing: "-0.02em"
              }}
            >
              One Platform for
              <br />
              <span style={{ color: "#6155A6" }}>Your Entire Team</span>
            </h1>

            <p
              style={{
                maxWidth: "750px",
                margin: "20px auto 35px",
                color: "#64748B",
                fontSize: "1.15rem",
                lineHeight: "1.7",
              }}
            >
              Create, manage, and update digital business cards for every employee from a single dashboard. Empower your team, maintain brand consistency and track real results.
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/register")}
                style={{
                  background: "linear-gradient(135deg, #6155A6 0%, #A685E2 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "16px 35px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </section>

        {/* POWERFUL FEATURES SECTION */}
        <section style={{ padding: "80px 20px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "50px" }}>
              <span style={{ color: "#6155A6", fontWeight: "700", textTransform: "uppercase", fontSize: "0.9rem" }}>Features</span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginTop: "5px" }}>Powerful Features</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "25px",
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    background: "#FFFFFF",
                    padding: "30px",
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "15px",
                      background: "rgba(97, 85, 166, 0.08)",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "10px",
                      color: "#6155A6"
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#1E293B", marginBottom: "8px" }}>{feature.title}</h3>
                  <p style={{ color: "#64748B", lineHeight: "1.6", fontSize: "0.95rem" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section style={{ padding: "80px 20px", background: "#FFFFFF" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "50px" }}>
              <span style={{ color: "#6155A6", fontWeight: "700", textTransform: "uppercase", fontSize: "0.9rem" }}>Process</span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginTop: "5px" }}>How It Works</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px",
              }}
            >
              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    padding: "30px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "800",
                      color: "#6155A6",
                      background: "rgba(97, 85, 166, 0.1)",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      marginBottom: "20px"
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3 style={{ color: "#1E293B", fontSize: "1.2rem", fontWeight: "700", marginBottom: "10px" }}>{step.title}</h3>
                  <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: "1.6" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRADITIONAL VS JIOTAP SECTION */}
        <section style={{ padding: "80px 20px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2.5rem", fontWeight: "800", color: "#0F172A" }}>
              Traditional vs JioTap
            </h2>

            <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#FFFFFF" }}>
                <thead>
                  <tr style={{ background: "rgba(97, 85, 166, 0.05)" }}>
                    <th style={{ padding: "18px 20px", textAlign: "left", color: "#1E293B", fontWeight: "700", borderBottom: "2px solid #E2E8F0" }}>Feature</th>
                    <th style={{ padding: "18px 20px", color: "#64748B", textAlign: "center", borderBottom: "2px solid #E2E8F0" }}>Traditional Cards</th>
                    <th style={{ padding: "18px 20px", color: "#6155A6", textAlign: "center", fontWeight: "800", borderBottom: "2px solid #E2E8F0" }}>Jio Tap</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Reprint Cost", "❌", "✅"],
                    ["Instant Updates", "❌", "✅"],
                    ["Analytics", "❌", "✅"],
                    ["Lead Capture", "❌", "✅"],
                    ["Team Management", "❌", "✅"],
                    ["Brand Consistency", "❌", "✅"],
                    ["NFC Sharing", "❌", "✅"],
                    ["Eco Friendly", "❌", "✅"],
                  ].map((row, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #E2E8F0" }}>
                      <td style={{ padding: "16px 20px", fontWeight: "600", color: "#334155" }}>{row[0]}</td>
                      <td style={{ textAlign: "center", padding: "16px 20px", color: "#EF4444" }}>{row[1]}</td>
                      <td style={{ textAlign: "center", padding: "16px 20px", color: "#22C55E", fontWeight: "700" }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PERFECT FOR EVERY BUSINESS CATEGORY GRID */}
        <section style={{ padding: "80px 20px", background: "#FFFFFF" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "50px", textAlign: "center" }}>
              <span style={{ color: "#6155A6", fontWeight: "700", textTransform: "uppercase", fontSize: "0.9rem" }}>Versatility</span>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginTop: "5px" }}>Perfect For Every Business</h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "25px",
              }}
            >
              {categories.map((cat, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "15px",
                    background: "#F8FAFC",
                    padding: "25px",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    alignItems: "flex-start"
                  }}
                >
                  <div style={{ fontSize: "1.5rem", background: "#FFFFFF", padding: "10px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#1E293B", marginBottom: "5px" }}>{cat.name}</h3>
                    <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: "1.5" }}>{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BOTTTOM BANNER */}
        <section
          style={{
            padding: "80px 20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #6155A6 0%, #A685E2 100%)",
            color: "#FFFFFF",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.6rem", fontWeight: "800", letterSpacing: "-0.01em" }}>
              Ready to Upgrade Your Team Networking?
            </h2>

            <p style={{ margin: "15px auto 30px", fontSize: "1.1rem", opacity: 0.9, lineHeight: "1.6" }}>
              Empower your employees with smart NFC business cards and centralized management workspace room.
            </p>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/register")}
                style={{
                  background: "#FFFFFF",
                  color: "#6155A6",
                  border: "none",
                  padding: "15px 35px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                Start Free Trial
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "#FFFFFF",
                  border: "1px solid #FFFFFF",
                  padding: "15px 35px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}