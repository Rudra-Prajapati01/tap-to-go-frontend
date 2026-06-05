import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
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
            marginBottom: "10px",
          }}
        >
          Privacy Policy
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "40px",
          }}
        >
          Last Updated: June 2026
        </p>

        <p>
          Welcome to JioTap. Your privacy is important to us. This Privacy Policy explains how JioTap ("we", "our", or "us") collects, uses, stores, and protects your information when you use our website, mobile applications, digital business card platform, NFC products, and related services.
        </p>
        
        <p>
          By using JioTap, you agree to the practices described in this Privacy Policy.
        </p>

        {/* ── SECTION 1 ── */}
        <h2 style={styles.heading}>Information We Collect</h2>
        <p>
          We may collect the following information when you create an account, use our services, or interact with our platform:
        </p>

        <h3 style={styles.subHeading}>Personal Information</h3>
        <ul style={styles.list}>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Mobile Number</li>
          <li>Company Name</li>
          <li>Job Title</li>
          <li>Website URL</li>
          <li>Business Address</li>
          <li>Social Media Links</li>
          <li>Profile Photo</li>
          <li>Company Logo</li>
          <li>Cover Images</li>
          <li>Contact Information you choose to share</li>
        </ul>

        <h3 style={styles.subHeading}>Technical Information</h3>
        <ul style={styles.list}>
          <li>IP Address</li>
          <li>Device Information</li>
          <li>Browser Type</li>
          <li>Operating System</li>
          <li>Website Usage Data</li>
          <li>Analytics and Performance Data</li>
        </ul>

        <h3 style={styles.subHeading}>Optional Information</h3>
        <p>You may voluntarily provide:</p>
        <ul style={styles.list}>
          <li>Social Media Profiles</li>
          <li>Business Information</li>
          <li>Product Information</li>
          <li>Portfolio Links</li>
          <li>Marketing Content</li>
          <li>Custom Digital Card Details</li>
        </ul>

        {/* ── SECTION 2 ── */}
        <h2 style={styles.heading}>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul style={styles.list}>
          <li>Create and manage your JioTap account</li>
          <li>Generate and host your digital business card</li>
          <li>Enable NFC card functionality</li>
          <li>Share your profile when someone scans or taps your card</li>
          <li>Improve our platform and services</li>
          <li>Provide customer support</li>
          <li>Respond to inquiries and requests</li>
          <li>Send important service updates</li>
          <li>Prevent fraud and misuse of our platform</li>
        </ul>

        {/* ── SECTION 3 ── */}
        <h2 style={styles.heading}>Information Sharing</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul style={styles.list}>
          <li>Trusted service providers that help operate JioTap</li>
          <li>Cloud storage and hosting providers</li>
          <li>Analytics providers</li>
          <li>Legal authorities when required by law</li>
          <li>Third-party services that you connect to your profile</li>
        </ul>

        {/* ── SECTION 4 ── */}
        <h2 style={styles.heading}>Data Storage and Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect your information from unauthorized access, misuse, disclosure, or loss.
        </p>
        <p>
          While we take appropriate security precautions, no internet-based system can be guaranteed to be completely secure.
        </p>

        {/* ── SECTION 5 ── */}
        <h2 style={styles.heading}>Public Profile Information</h2>
        <p>
          JioTap digital business cards are designed to be shared publicly.
        </p>
        <p>
          Information that you choose to display on your public profile may be visible to anyone who accesses your digital card through NFC, QR Code, or direct link.
        </p>
        <p>
          You are responsible for reviewing and managing the information you choose to make public.
        </p>

        {/* ── SECTION 6 ── */}
        <h2 style={styles.heading}>Cookies and Analytics</h2>
        <p>We may use cookies and similar technologies to:</p>
        <ul style={styles.list}>
          <li>Improve website performance</li>
          <li>Remember user preferences</li>
          <li>Analyze platform usage</li>
          <li>Enhance user experience</li>
          <li>Maintain account security</li>
        </ul>
        <p>
          You may disable cookies through your browser settings, though some features may not function properly.
        </p>

        {/* ── SECTION 7 ── */}
        <h2 style={styles.heading}>Third-Party Services</h2>
        <p>
          Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices or content of those third-party platforms.
        </p>

        {/* ── SECTION 8 ── */}
        <h2 style={styles.heading}>Children's Privacy</h2>
        <p>
          JioTap services are intended for users who are at least 18 years of age. We do not knowingly collect personal information from children.
        </p>

        {/* ── SECTION 9 ── */}
        <h2 style={styles.heading}>Your Rights</h2>
        <p>You may request to:</p>
        <ul style={styles.list}>
          <li>Access your personal information</li>
          <li>Update your information</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account</li>
          <li>Request removal of certain information</li>
        </ul>
        <p>
          Requests may be submitted through our contact channels.
        </p>

        {/* ── SECTION 10 ── */}
        <h2 style={styles.heading}>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a revised effective date.
        </p>

        {/* ── SECTION 11 ── */}
        <h2 style={styles.heading}>Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, please contact us:
        </p>

        <div
          style={{
            background: "#F5FAFF",
            border: "1px solid rgba(11,77,187,0.15)",
            padding: "20px",
            borderRadius: "16px",
            marginTop: "15px",
          }}
        >
          <strong>JioTap</strong>
          <br />
          Website:{" "}
          <a
            href="https://jiotap.com"
            style={{ color: "#0B4DBB", textDecoration: "none" }}
          >
            https://jiotap.com
          </a>
          <br />
          Email:{" "}
          <a
            href="mailto:info@jiotap.com"
            style={{ color: "#0B4DBB", textDecoration: "none" }}
          >
            info@jiotap.com
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0B4DBB",
    marginTop: "40px",
    marginBottom: "15px",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    marginTop: "20px",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "20px",
  },
};

export default PrivacyPolicy;