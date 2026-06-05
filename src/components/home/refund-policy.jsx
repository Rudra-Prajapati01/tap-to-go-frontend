import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const RefundPolicy = () => {
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
          minHeight: "80vh", // Section background aur layout integrity ke liye add kiya gaya
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
          Refund Policy
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
          At JioTap, customer satisfaction is our priority. We strive to deliver
          high-quality NFC business cards, digital business card services, and
          related products. This Refund Policy explains the circumstances under
          which refunds, replacements, or exchanges may be provided.
        </p>

        <h2 style={styles.heading}>General Policy</h2>

        <p>
          Due to the customized nature of many JioTap products and services, not
          all purchases are eligible for refunds.
        </p>

        <p>
          Please review your order carefully before completing your purchase.
        </p>

        <h2 style={styles.heading}>Non-Refundable Items</h2>

        <ul style={styles.list}>
          <li>Customized NFC Business Cards</li>
          <li>Personalized Printed Products</li>
          <li>Completed Digital Business Card Setup Services</li>
          <li>Digital Products that have already been delivered or activated</li>
          <li>
            Design, customization, or branding services that have already been
            completed
          </li>
        </ul>

        <p>
          Once customization work has begun, refunds cannot be provided because
          the product is specifically created for the customer.
        </p>

        <h2 style={styles.heading}>Eligible Replacement Conditions</h2>

        <h3 style={styles.subHeading}>Incorrect Product Received</h3>

        <p>
          If you receive a product that is significantly different from what you
          ordered, including incorrect branding, customization, or product type,
          please contact us within 48 hours of delivery.
        </p>

        <h3 style={styles.subHeading}>Damaged Product</h3>

        <p>
          If your order arrives damaged or defective, you must notify us within
          48 hours of receiving the shipment.
        </p>

        <p>To process a replacement request, please provide:</p>

        <ul style={styles.list}>
          <li>Order Number</li>
          <li>Photos of the damaged product</li>
          <li>Description of the issue</li>
        </ul>

        <p>
          Claims submitted after 48 hours of delivery may not be eligible for
          replacement.
        </p>

        <h3 style={styles.subHeading}>Missing Items</h3>

        <p>
          If your order contains fewer items than purchased, please notify us
          within 48 hours of receiving the package so we can investigate and
          resolve the issue.
        </p>

        <h2 style={styles.heading}>Refund Approval</h2>

        <p>
          Where a refund is approved, the amount will be processed to the
          original payment method used during purchase.
        </p>

        <p>
          Refund processing times may vary depending on your bank, payment
          provider, or card issuer.
        </p>

        <h2 style={styles.heading}>Shipping Charges</h2>

        <p>
          Shipping, handling, insurance, and delivery charges are generally
          non-refundable unless the error was caused by JioTap.
        </p>

        <h2 style={styles.heading}>Order Cancellation</h2>

        <p>
          Orders may be cancelled before customization, printing, or production
          work has started.
        </p>

        <p>
          Once production, customization, printing, or digital setup has begun,
          cancellation requests may not be accepted.
        </p>

        <h2 style={styles.heading}>Digital Services</h2>

        <p>
          JioTap provides digital products and services including digital
          business cards, profile setup, NFC card linking, and related services.
        </p>

        <p>
          Once a digital service has been completed or activated, refunds will
          generally not be provided.
        </p>

        <h2 style={styles.heading}>Contact Us</h2>

        <p>
          For refund, replacement, or order-related inquiries, please contact:
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

export default RefundPolicy;