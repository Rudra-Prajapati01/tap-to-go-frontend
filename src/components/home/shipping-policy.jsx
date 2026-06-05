import Navbar from "./Navbar"; // apna actual path
import Footer from "./Footer"; // apna actual path

const ShippingPolicy = () => {
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
          Shipping Policy
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
          At JioTap, we are committed to delivering your NFC business cards and
          related products efficiently and securely. This Shipping Policy
          explains how orders are processed, shipped, and delivered.
        </p>

        <h2 style={styles.heading}>Order Processing</h2>

        <p>
          Once you place an order, a confirmation email will be sent to your
          registered email address. Please keep this email as proof of
          purchase.
        </p>

        <p>
          Customized NFC cards require production and personalization before
          shipping. Processing times may vary depending on customization
          requirements and order volume.
        </p>

        <p>
          We may accommodate special delivery instructions where possible;
          however, JioTap is not responsible for packages left at a designated
          safe location after successful delivery.
        </p>

        <h2 style={styles.heading}>Order Tracking</h2>

        <p>
          All shipped orders include tracking information.
        </p>

        <p>
          Once your order has been dispatched, you will receive tracking
          details via email or other communication channels provided during
          checkout.
        </p>

        <h2 style={styles.heading}>Delivery Times</h2>

        <h3 style={styles.subHeading}>Processing Time</h3>

        <p>
          Most orders are processed and prepared for shipment within
          <strong> 5–10 business days.</strong>
        </p>

        <h3 style={styles.subHeading}>Shipping Time</h3>

        <ul style={styles.list}>
          <li>2–7 business days within India</li>
          <li>
            International delivery times may vary depending on destination and
            customs processing
          </li>
        </ul>

        <p>
          Delivery times are estimates and may be affected by courier delays,
          public holidays, weather conditions, or other circumstances beyond
          our control.
        </p>

        <h2 style={styles.heading}>Incorrect Orders</h2>

        <p>
          Upon receiving your order, please inspect the package and verify that
          all items are correct.
        </p>

        <p>
          If you receive an incorrect product, please contact us within
          <strong> 48 hours of delivery.</strong>
        </p>

        <h2 style={styles.heading}>Damaged Products</h2>

        <p>
          If your order arrives damaged, please notify us within
          <strong> 48 hours of delivery.</strong>
        </p>

        <ul style={styles.list}>
          <li>Order Number</li>
          <li>Photos of the damaged product</li>
          <li>A brief description of the issue</li>
        </ul>

        <h2 style={styles.heading}>Missing Items</h2>

        <p>
          If any items are missing from your order, please contact us within
          48 hours of receiving the shipment.
        </p>

        <h2 style={styles.heading}>Delayed Deliveries</h2>

        <p>
          JioTap is not responsible for delays caused by third-party shipping
          providers, customs procedures, weather conditions, or other external
          factors.
        </p>

        <h2 style={styles.heading}>Digital Services</h2>

        <ul style={styles.list}>
          <li>Digital Business Cards</li>
          <li>NFC Card Linking</li>
          <li>Profile Setup Services</li>
          <li>Online Profile Hosting</li>
        </ul>

        <p>
          Digital services do not require physical shipping and are typically
          activated shortly after setup is completed.
        </p>

        <h2 style={styles.heading}>Contact Us</h2>

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
          Website: https://jiotap.com
          <br />
          Email: info@jiotap.com
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
  },
};

export default ShippingPolicy;