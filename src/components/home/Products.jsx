import { useState, useEffect, useRef } from "react";

// ─── GLOBAL SYSTEM NAVIGATION INTEGRATION ────────────────────────────────────
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

import LightCard from "../../assets/Card/jiolight/light card.png";
import LightCustom from "../../assets/Card/jiolight/customiscard.png";
import LightRules from "../../assets/Card/jiolight/lightcardruls.png";
import LightDashboard from "../../assets/Card/jiolight/lightdashbord.png";
import LightAnalytics from "../../assets/Card/jiolight/Analytics.png";

import PremiumCard from "../../assets/Card/jiotapprim/premiumcard.png";
import PremiumCustom from "../../assets/Card/jiotapprim/customiscard.png";
import PremiumRules from "../../assets/Card/jiotapprim/premiumcardruls.png";
import PremiumDashboard from "../../assets/Card/jiotapprim/lightdashbord.png";
import PremiumAnalytics from "../../assets/Card/jiotapprim/Analytics.png";

import Review1 from "../../assets/Card/Jiotapgooglereview/googlereviewcard1.png";
import Review2 from "../../assets/Card/Jiotapgooglereview/googlereviewcard2.png";
import Review3 from "../../assets/Card/Jiotapgooglereview/googlereviewcard3.png";

/* 
  NOTE FOR SOLUTION 2 (RECOMMENDED): 
  Agar aap assets ko public folder me move karte hain (e.g., public/cards/...), 
  toh aap imports hata kar static string arrays use kar sakte hain:
  images: [ "/cards/jiolight/light card.png", ... ]
*/

const initialProducts = [
  {
    id: "jiolight",
    title: "JioTap Light Card",
    badge: "Budget Friendly",
    tagline: "Everyday smart networking with official JioTap branding.",
    price: "₹799",
    description: "The JioTap Light card is the ultimate pocket-friendly digital business card designed for seamless connectivity. Built with a high-grade durable finish and an embedded responsive NFC microchip. Note: This variant features our official JioTap branding on the physical card structure.",
    features: [
      "Official JioTap Logo Premium Print",
      "Works flawlessly with iOS & Android devices",
      "One-Time Payment, No hidden monthly fees",
      "Instant profile updates over-the-air"
    ],
    images: [
      LightCard,
      LightCustom,
      LightRules,
      LightDashboard,
      LightAnalytics
    ],
    bgColor: "#1a1a1a",
    accentColor: "#6155A6",
    specs: "Material: Matte Finished PVC | Size: Standard CR80 | Logo: JioTap Branding"
  },
  {
    id: "jiotapprim",
    title: "Premium Custom Card",
    badge: "Fully Personalized",
    tagline: "Your brand, your identity. Get your own logo printed.",
    price: "₹1,499",
    description: "Take absolute control over your professional elite identity. The Premium Custom Card offers high-end build configurations, allowing you to get your own company logo or custom corporate graphics printed directly onto the matrix plate. Perfect for business leaders and enterprise teams.",
    features: [
      "100% Custom Logo & Graphics Printing",
      "Aerospace-grade physical feedback weight",
      "Advanced enterprise dashboard architecture",
      "Integrated lead capture & dynamic forms"
    ],
    images: [
      PremiumCard,
      PremiumCustom,
      PremiumRules,
      PremiumDashboard,
      PremiumAnalytics
    ],
    bgColor: "#0f172a",
    accentColor: "#a855f7",
    specs: "Material: Premium Composite Resin / Matte Metal | Print: High Precision Laser Vector"
  },
  {
    id: "jiotapgooglereview",
    title: "JioTap Google Review Card",
    badge: "Business Booster",
    tagline: "Grow your online rating instantly with a single physical tap.",
    price: "₹1,299",
    description: "Accelerate your local business growth and trust factor. The JioTap Google Review Card routes your clients directly to your official Google Business review sub-page with a rapid contact-less tap. Drop traditional paper review prompts and capture feedback right at the point of sales.",
    features: [
      "Direct Zero-Click Google Review Redirection",
      "High-contrast QR backup pattern on the reverse side",
      "Proven 5x acceleration in customer feedback loop",
      "Highly durable scratch-resistant surface shield"
    ],
    images: [
      Review1,
      Review2,
      Review3
    ],
    bgColor: "#ffffff",
    accentColor: "#ca8a04",
    specs: "Target Layout: Local Shops, Showrooms & Restaurants | Protocol: NFC Tag 213"
  }
];

export default function ProductsEcosystem() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const detailRef = useRef(null);

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setActiveImage(product.images[0]); 
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleContactNavigation = () => {
    window.location.href = "/contact";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* ── GLOBAL FIXED NAVIGATION BAR ── */}
      <Navbar />

      <section style={styles.section} ref={detailRef}>
        <div style={styles.dotBg} />
        
        <div style={styles.container}>
          
          {/* ─── CASE 1: DYNAMIC PRODUCT GALLERY PREVIEW LAYER ─── */}
          {selectedProduct ? (
            <div style={styles.detailWrapper}>
              <button style={styles.backBtn} onClick={() => setSelectedProduct(null)}>
                ← Back to All Hardware
              </button>

              <div style={styles.detailGrid} className="responsive-detail-grid">
                {/* Left Block: Enlarged Image Viewport Area */}
                <div style={styles.detailVisualCell} className="responsive-visual-cell">
                  <div style={styles.detailImgWrapper} className="responsive-img-wrapper">
                    <img 
                      src={activeImage} 
                      alt={selectedProduct.title} 
                      style={styles.detailImg} 
                    />
                  </div>
                  
                  {/* Thumbnails Row Area */}
                  <div style={styles.thumbnailRow}>
                    {selectedProduct.images.map((imgUrl, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          ...styles.thumbContainer,
                          borderColor: activeImage === imgUrl ? selectedProduct.accentColor : "#e2e8f0",
                          boxShadow: activeImage === imgUrl ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
                        }}
                        onClick={() => setActiveImage(imgUrl)}
                      >
                        <img src={imgUrl} alt="gallery-thumb" style={styles.thumbItemImg} />
                      </div>
                    ))}
                  </div>
                  
                  <p style={styles.specText}>{selectedProduct.specs}</p>
                </div>

                {/* Right Block: Product Info Data Metrics */}
                <div style={styles.detailContentCell}>
                  <span style={styles.detailBadge(selectedProduct.accentColor)}>
                    {selectedProduct.badge}
                  </span>
                  
                  <h2 style={styles.detailTitle}>{selectedProduct.title}</h2>
                  <p style={styles.detailTagline}>{selectedProduct.tagline}</p>
                  
                  <div style={styles.priceContainer}>
                    <span style={styles.priceVal}>{selectedProduct.price}</span>
                    <span style={styles.taxLabel}>Incl. of all platform taxes</span>
                  </div>

                  <button 
                    style={styles.actionBtn(selectedProduct.accentColor)}
                    onClick={handleContactNavigation}
                  >
                    Contact Now To Order ✉
                  </button>

                  <div style={styles.infoDivider} />

                  <h4 style={styles.sectionLabel}>Product Overview</h4>
                  <p style={styles.longDesc}>{selectedProduct.description}</p>

                  <h4 style={styles.sectionLabel}>Key Specifications & Architecture</h4>
                  <ul style={styles.pointsList}>
                    {selectedProduct.features.map((feat, index) => (
                      <li key={index} style={styles.pointItem}>
                        <span style={styles.bulletIcon(selectedProduct.accentColor)}>✓</span>
                        <span style={styles.bulletText}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            
            /* ─── CASE 2: MAIN PRODUCTS SHOWCASE GRID ─── */
            <>
              <div style={styles.header}>
                <div style={styles.badgeWrapper}>
                  <span style={styles.badgeDot} />
                  <span style={styles.badgeText}>Smart Devices Ecosystem</span>
                </div>
                <h2 style={styles.h2}>
                  Explore Our Hardware <br />
                  <span style={styles.gradientText}>NFC Product Lineup</span>
                </h2>
                <p style={styles.subheading}>
                  Tap into modern networking with premium grade materials. Select any design variant matrix below to discover its core technical features.
                </p>
              </div>

              <div style={styles.productsGrid} className="responsive-products-grid">
                {initialProducts.map((prod) => (
                  <div 
                    key={prod.id} 
                    style={styles.productCard}
                    className="interactive-hardware-card"
                    onClick={() => handleOpenProduct(prod)}
                  >
                    <div style={styles.cardImageZone} className="responsive-card-image-zone">
                      <span style={styles.cardBadge}>{prod.badge}</span>
                      <img src={prod.images[0]} alt={prod.title} style={styles.cardImg} className="card-asset-img" />
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.titlePriceRow}>
                        <h3 style={styles.cardTitle}>{prod.title}</h3>
                        <span style={styles.cardPrice}>{prod.price}</span>
                      </div>
                      <p style={styles.cardCutDesc}>{prod.tagline}</p>
                      
                      <div style={styles.cardFooterAction}>
                        <span style={styles.viewSpecsLink(prod.accentColor)}>Core Specs →</span>
                        <button 
                          style={styles.cardContactBtn}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleContactNavigation();
                          }}
                        >
                          Contact Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Global Media Queries Injection for Mobile Responsiveness */}
        <style>{`
          .interactive-hardware-card {
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1) !important;
            cursor: pointer;
          }
          .interactive-hardware-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 30px 60px -20px rgba(97, 85, 166, 0.12) !important;
          }
          .interactive-hardware-card:hover .card-asset-img {
            transform: scale(1.04);
          }

          /* Tablet & Mobile Media Breakpoints for Open Product State */
          @media (max-width: 992px) {
            .responsive-detail-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              padding: 24px !important;
            }
            .responsive-img-wrapper {
              height: 280px !important;
            }
          }

          @media (max-width: 768px) {
            .responsive-products-grid {
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
              gap: 20px !important;
            }
            .responsive-card-image-zone {
              height: 240px !important;
            }
            .responsive-visual-cell {
              padding: 20px 12px !important;
            }
            .responsive-img-wrapper {
              height: 220px !important;
            }
          }

          @media (max-width: 480px) {
            .responsive-detail-grid {
              padding: 16px 12px !important;
              border-radius: 20px !important;
            }
            .responsive-img-wrapper {
              height: 180px !important;
            }
          }
        `}</style>
      </section>

      {/* ─── GLOBAL FOOTER SYSTEM INTEGRATION ─── */}
      <Footer />
    </>
  );
}

/* ─── STYLE ARCHITECTURE SHEET ─── */
const styles = {
  section: {
    position: "relative",
    width: "100%",
    padding: "140px 0 0px", 
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
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px 100px",
  },
  header: {
    textAlign: "center",
    marginBottom: "56px",
  },
  badgeWrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(97,85,166,0.12)",
    background: "rgba(97,85,166,0.03)",
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
    fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
    fontWeight: 800,
    color: "#0f0f0f",
    lineHeight: 1.2,
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
    fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
    color: "#64748b",
    maxWidth: "640px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: 500,
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    marginTop: "20px",
  },
  productCard: {
    background: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.02)",
  },
  cardImageZone: {
    position: "relative",
    height: "300px",
    background: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    overflow: "hidden",
  },
  cardBadge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    fontSize: "10px",
    fontWeight: 700,
    padding: "4px 10px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#334155",
    borderRadius: "999px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    zIndex: 10,
  },
  cardImg: {
    width: "90%",
    height: "90%",
    objectFit: "contain",
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardBody: {
    padding: "24px",
  },
  titlePriceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#0f0f0f",
    margin: 0,
  },
  cardPrice: {
    fontSize: "1.15rem",
    fontWeight: 800,
    color: "#6155A6",
  },
  cardCutDesc: {
    fontSize: "0.9rem",
    lineHeight: 1.5,
    color: "#64748b",
    height: "44px",
    overflow: "hidden",
    margin: "0 0 20px",
  },
  cardFooterAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "16px",
  },
  viewSpecsLink: (color) => ({
    fontSize: "0.85rem",
    fontWeight: 700,
    color: color,
  }),
  cardContactBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    background: "#0f0f0f",
    color: "#ffffff",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
  },
  detailWrapper: {
    animation: "fadeIn 0.4s ease-out",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "24px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  detailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    background: "#ffffff",
    borderRadius: "32px",
    border: "1px solid #e2e8f0",
    padding: "40px",
    boxShadow: "0 20px 50px -20px rgba(0,0,0,0.04)",
  },
  detailVisualCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fafafa",
    borderRadius: "24px",
    padding: "32px 24px 24px",
    border: "1px solid #f1f5f9",
    height: "fit-content",
  },
  detailImgWrapper: {
    width: "100%",
    height: "320px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px"
  },
  detailImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  thumbnailRow: {
    display: "flex",
    gap: "10px",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "8px"
  },
  thumbContainer: {
    width: "60px",
    height: "60px",
    background: "#ffffff",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease"
  },
  thumbItemImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
  },
  specText: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "20px",
    fontWeight: 500,
    textAlign: "center",
    lineHeight: 1.4,
  },
  detailContentCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  detailBadge: (color) => ({
    display: "inline-block",
    padding: "4px 12px",
    background: `${color}10`,
    color: color,
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    width: "fit-content",
    marginBottom: "16px",
  }),
  detailTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
    fontWeight: 800,
    color: "#0f0f0f",
    margin: "0 0 8px",
  },
  detailTagline: {
    fontSize: "1rem",
    lineHeight: 1.5,
    color: "#475569",
    fontWeight: 500,
    marginBottom: "20px",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "24px",
  },
  priceVal: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0f0f0f",
  },
  taxLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: 500,
  },
  actionBtn: (color) => ({
    width: "100%",
    padding: "14px 28px",
    borderRadius: "14px",
    background: color,
    color: "#ffffff",
    border: "none",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: `0 10px 25px -10px ${color}`,
  }),
  infoDivider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "24px 0 20px",
  },
  sectionLabel: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    color: "#94a3b8",
    fontWeight: 800,
    margin: "0 0 10px",
  },
  longDesc: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#64748b",
    margin: "0 0 24px",
    fontWeight: 500,
  },
  pointsList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  pointItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  bulletIcon: (color) => ({
    color: color,
    fontWeight: 900,
    fontSize: "1.1rem",
    lineHeight: "1.2rem",
  }),
  bulletText: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#334155",
  },
};