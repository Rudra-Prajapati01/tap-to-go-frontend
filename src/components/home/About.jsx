  import { useState, useEffect, useRef } from "react";
  import { useNavigate as useReactNavigate } from "react-router-dom";

  // ─── NAVBAR IMPORT ──────────────────────────────────────────────────────────
  import Navbar from "../home/Navbar"; 

  // ─── 2 DISTINCT PREMIUM IMAGES ──────────────────────────────────────────────
  import aboutUsHeroImg from "../../assets/features/AboutUs.png"; // Top Hero image 
  import dashboardEcoImg from "../../assets/features/dashboard.png"; // Niche Ecosystem image

  // ─── SAME FOLDER FOOTER IMPORT ───────────────────────────────────────────────
  import Footer from "./Footer"; 

  // Intersection Observer Hook for smooth animations
  function useInView(threshold = 0.05) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
  }

  export default function About() {
    const navigate = useReactNavigate();
    const [heroImgRef, heroImgInView] = useInView(0.05);
    const [ecosystemRef, ecosystemInView] = useInView(0.05);

    // Scroll to top on mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <>
        <style>{`
          .about-page { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f0f0f; overflow-x: hidden; background: #ffffff; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
          .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
          .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
          .flex-center { display: flex; align-items: center; justify-content: center; }
          .btn-hover { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
          .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(97,85,166,0.4); }
          
          @media (max-width: 1024px) {
            .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
            .grid-2 { grid-template-columns: 1fr; text-align: center; }
          }
          @media (max-width: 640px) {
            .grid-3, .grid-4 { grid-template-columns: 1fr; }
            .padding-section { padding: 50px 16px !important; }
          }
        `}</style>

        <Navbar />

        <div className="about-page">
          
          <section className="padding-section" style={{ position: "relative", padding: "150px 0 60px", background: "linear-gradient(180deg, rgba(97,85,166,0.04) 0%, #ffffff 100%)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(97,85,166,0.04) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
            
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              
              {/* Margins balanced nicely */}
              <span style={{ display: "inline-block", padding: "6px 16px", background: "rgba(97,85,166,0.06)", border: "1px solid rgba(97,85,166,0.15)", borderRadius: "999px", color: "#0B4DBB", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>About JioTap</span>
              
              <h1 style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.03em", margin: "0 0 20px", color: "#111" }}>
                Smart Digital Networking <br />
                <span style={{ background: "linear-gradient(90deg, #0B4DBB, #4CAF1D, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Powered By NFC Technology</span>
              </h1>
              
              <p style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", color: "#64748b", maxWidth: "860px", margin: "0 auto 40px", lineHeight: 1.6, fontWeight: 500 }}>
               JioTap enables professionals, creators, and businesses to instantly share their digital identity, contact information, portfolio, social presence, and business details through a single NFC-powered interaction.
              </p>

              <div 
                ref={heroImgRef}
                style={{
                  width: "100%",
                  maxWidth: "840px", 
                  borderRadius: "28px",
                  background: "#ffffff",
                  padding: "12px",
                  border: "1px solid rgba(97,85,166,0.08)",
                  boxShadow: "0 30px 70px -15px rgba(97,85,166,0.1)",
                  opacity: heroImgInView ? 1 : 0,
                  transform: heroImgInView ? "translateY(0)" : "translateY(25px)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <img 
                  src={aboutUsHeroImg} 
                  alt="JioTap Smart Mobile View Identity" 
                  style={{ width: "100%", height: "auto", borderRadius: "20px", display: "block", objectFit: "contain" }}
                />
              </div>
            </div>
          </section>

          {/* 2. OUR STORY */}
          <section className="padding-section" style={{ padding: "90px 0", borderTop: "1px solid #f1f5f9" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }} className="grid-2">
              <div>
                <span style={{ color: "#0B4DBB", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "13px" }}>The Problem</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, margin: "12px 0 20px", color: "#0f0f0f" }}>Traditional Paper Cards Are Dead.</h2>
                <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  Traditional business cards are difficult to update, easy to lose, and expensive to reprint. Every time your phone number, email, or designation changes, hundreds of cards go to waste.
                </p>
              </div>
              <div style={{ background: "rgba(97,85,166,0.02)", padding: "48px", borderRadius: "24px", border: "1px dashed rgba(97,85,166,0.2)" }}>
                <span style={{ color: " #4CAF1D", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "13px" }}>Our Solution</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, margin: "12px 0 20px", color: "#0f0f0f" }}>Why JioTap?</h2>
                <p style={{ color: "#334155", fontSize: "1.05rem", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  JioTap was built to provide a smarter, greener, and more effective way of networking. With a single tap, users can instantly share their digital profile, contact information, social media links, and business details.
                </p>
              </div>
            </div>
          </section>

          {/* 3. WHAT JIOTAP OFFERS */}
          <section className="padding-section" style={{ padding: "90px 0", background: "#f8fafc" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", margin: "0 0 12px" }}>What JioTap Offers</h2>
                <p style={{ color: "#64748b", fontWeight: 500 }}>Everything ecosystem needs for premium identity representation</p>
              </div>
              
              <div className="grid-3">
                {[
                  { title: "Digital Business Cards", desc: "Eco-friendly, fast, and completely interactive custom digital profiles.", icon: "🌐" },
                  { title: "NFC Enabled Smart Cards", desc: "Premium physical cards engineered with high-grade modern tap chips.", icon: "💳" },
                  { title: "Contact Management", desc: "Sync, sort, export, and maintain all captured contacts smoothly.", icon: "👥" },
                  { title: "Profile Customization", desc: "Complete style control matching personal or brand color themes.", icon: "🎨" },
                  { title: "Analytics Dashboard", desc: "Track digital profile card view counts, taps, and link clicks live.", icon: "📊" },
                  { title: "Lead Collection", desc: "Capture user details with fields right at the moment of contact tapping.", icon: "⚡" },
                ].map((item, index) => (
                  <div key={index} style={{ background: "#ffffff", padding: "36px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.02)" }}>
                    <div style={{ fontSize: "28px", marginBottom: "16px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 12px", color: "#0f0f0f" }}>{item.title}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.98rem", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. HOW JIOTAP WORKS */}
          <section className="padding-section" style={{ padding: "90px 0" }}>
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
              <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111" }}>How JioTap Works</h2>
              </div>
              
              <div className="grid-4">
                {[
                  { step: "01", title: "Create Profile", desc: "User logs in and sets up their rich digital networking profile." },
                  { step: "02", title: "Customize Card", desc: "Add layout info, bio description, links, and custom branding." },
                  { step: "03", title: "Connect NFC Card", desc: "Link your updated online profile to the physical JioTap smart card." },
                  { step: "04", title: "Tap & Share", desc: "Bring it near any smartphone. Boom! Information shared instantly." },
                ].map((item, index) => (
                  <div key={index} style={{ position: "relative", padding: "28px", background: "#ffffff", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                    <span style={{ display: "block", fontSize: "2.8rem", fontWeight: 900, color: "rgba(97,85,166,0.1)", marginBottom: "8px" }}>{item.step}</span>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px", color: "#0f0f0f" }}>{item.title}</h3>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. ECOSYSTEM SHOWCASE SECTION */}
          <section 
            ref={ecosystemRef} 
            className="padding-section" 
            style={{ 
              padding: "90px 0", 
              background: "#fcfcfc", 
              borderTop: "1px solid #f1f5f9",
              opacity: ecosystemInView ? 1 : 0,
              transform: ecosystemInView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#111", margin: "0 0 16px" }}>
                  The Ultimate Smart Product Ecosystem
                </h2>
                <p style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: "750px", margin: "0 auto", fontWeight: 500, lineHeight: 1.6 }}>
                  Experience seamlessly interconnected data updates across your devices, physical cards, and interactive customer interfaces.
                </p>
              </div>

              <div style={{ 
                background: "#ffffff", 
                padding: "32px", 
                borderRadius: "32px", 
                border: "1px solid #e2e8f0", 
                boxShadow: "0 30px 60px -20px rgba(97,85,166,0.08)",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}>
                <img 
                  src={dashboardEcoImg} 
                  alt="JioTap Web Platform Dashboard Representation" 
                  style={{ width: "100%", height: "auto", maxHeight: "720px", objectFit: "contain", borderRadius: "16px" }} 
                />
              </div>
            </div>
          </section>

          {/* 6. CALL TO ACTION (CTA) SECTION */}
          <section className="padding-section" style={{ padding: "90px 0", textAlign: "center", background: "#ffffff" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#0f0f0f", margin: "0 0 16px" }}>Ready To Transform Your Networking?</h2>
              <p style={{ color: "#64748b", fontSize: "1.15rem", maxWidth: "650px", margin: "0 auto 36px", lineHeight: 1.6, fontWeight: 500 }}>
                Get your premium JioTap smart NFC card today and never lose a business connection again.
              </p>
              <button 
                className="btn-hover"
                onClick={() => navigate("/register")}
                style={{ padding: "18px 44px", background: "linear-gradient(135deg, #0B4DBB, #4CAF1D)", color: "#4CAF1D", border: "none", borderRadius: "16px", fontSize: "16px", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 25px rgba(97,85,166,0.3)" }}
              >
                Get Started Now →
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <Footer />
        </div>
      </>
    );
  }