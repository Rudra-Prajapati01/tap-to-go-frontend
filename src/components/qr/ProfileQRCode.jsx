import {
  useEffect,
} from "react";

import axios from "axios";

import {
  QRCodeCanvas,
} from "qrcode.react";

export default function ProfileQRCode({

  uniqueId,
  userId,

}) {

  if (!uniqueId) {

    return null;
  }

  const profileUrl =
    `https://jiotap.com/u/${uniqueId}`;

  /* ───────────────────────────── */
  /* TRACK QR SCAN */
  /* ───────────────────────────── */

  useEffect(() => {

    const trackQR =
    async () => {

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

  }, []);

  /* ───────────────────────────── */

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        background: "#fff",
        padding: "20px",
        borderRadius: "18px",
      }}
    >

      <QRCodeCanvas
        value={profileUrl}
        size={180}
        bgColor="#ffffff"
        fgColor="#111111"
        level="H"
      />

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          textAlign: "center",
          wordBreak: "break-all",
        }}
      >

        {profileUrl}

      </p>

    </div>
  );
}