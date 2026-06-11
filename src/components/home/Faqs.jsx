import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Faqs = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "120px 20px 80px",
          lineHeight: "1.8",
          color: "#1F2937",
          minHeight: "80vh",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "#0B4DBB",
            marginBottom: "20px",
          }}
        >
          Frequently Asked Questions
        </h1>

        <p style={{ color: "#64748B", marginBottom: "40px" }}>
          Find answers to the most common questions about JioTap.
        </p>

        {[
          { q: "What is JioTap?", a: "JioTap is a digital business card platform that allows users to instantly share their contact information, social links, products, services, videos, and business details using NFC cards, QR codes, and online profiles." },
          { q: "How does the NFC card work?", a: "Simply tap your JioTap NFC card on a compatible smartphone. Your digital profile will open instantly without requiring any app installation." },
          { q: "Do I need an app to view a JioTap profile?", a: "No. Anyone can access your profile through a web browser by tapping your NFC card or scanning your QR code." },
          { q: "Can I edit my profile after creating it?", a: "Yes. You can update your profile information, products, social links, videos, and business details at any time." },
          { q: "Can I add products and services?", a: "Yes. JioTap allows you to showcase products, services, portfolios, videos, and other business information directly on your profile." },
          { q: "Is my information secure?", a: "Yes. We use modern security practices to protect user accounts and personal information." },
          { q: "How do I delete my account?", a: "Open the JioTap app and navigate to: Menu → Delete Account." },
          { q: "Does JioTap support Google Sign-In?", a: "Yes. Users can securely create and access their accounts using Google Sign-In." },
          { q: "Can I use JioTap for my company or team?", a: "Yes. JioTap provides solutions for teams, sales professionals, organizations, and enterprises." },
          { q: "How can I contact support?", a: "Email: info@jiotap.com | Website: https://jiotap.com/contact" }
        ].map((item, index) => (
          <div key={index} style={styles.faq}>
            <h3 style={styles.question}>{item.q}</h3>
            <p style={{ margin: 0 }}>{item.a}</p>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

const styles = {
  faq: {
    marginBottom: "20px",
    padding: "24px",
    background: "#F8FAFC",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
  },
  question: {
    margin: "0 0 10px 0",
    color: "#0B4DBB",
  }
};

export default Faqs;