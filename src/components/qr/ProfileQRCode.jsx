import { useEffect, useRef } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function ProfileQRCode({

  uniqueId,
  userId,

}) {

  const qrRef = useRef(null);

  if (!uniqueId) {

    return null;
  }

  const profileUrl =
    `https://jiotap.com/u/${uniqueId}`;

  /* TRACK QR SCAN */

  useEffect(() => {

    const trackQR = async () => {

      try {

        if (!userId) return;

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/analytics/qr-scan`,
          {
            userId,
          }
        );

      } catch (error) {

        console.log(error);
      }
    };

    trackQR();

  }, [userId]);

  /* DOWNLOAD QR */

  const downloadQR = () => {

    const canvas =
      qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const pngUrl =
      canvas
        .toDataURL("image/png")
        .replace(
          "image/png",
          "image/octet-stream"
        );

    const downloadLink =
      document.createElement("a");

    downloadLink.href =
      pngUrl;

    downloadLink.download =
      `JioTap-${uniqueId}.png`;

    document.body.appendChild(
      downloadLink
    );

    downloadLink.click();

    document.body.removeChild(
      downloadLink
    );
  };

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        background: "#fff",
        padding: "24px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(15,23,42,.06)",
      }}
    >

      <div ref={qrRef}>

        <QRCodeCanvas
          value={profileUrl}
          size={220}
          bgColor="#ffffff"
          fgColor="#111111"
          level="H"
          includeMargin={true}
        />

      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          textAlign: "center",
          wordBreak: "break-all",
          margin: 0,
        }}
      >
        {profileUrl}
      </p>

      <button
        onClick={downloadQR}
        style={{
          border: "none",
          cursor: "pointer",
          padding: "12px 20px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg,#6155A6,#A685E2)",
          color: "#fff",
          fontWeight: "700",
          fontSize: "14px",
          width: "100%",
        }}
      >
        ⬇ Download QR
      </button>

    </div>
  );
}