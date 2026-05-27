import { QRCodeCanvas }
from "qrcode.react";

export default function ProfileQRCode({

  uniqueId,

}) {

  if (!uniqueId) {

    return null;

  }

  const profileUrl =

    `https://tap-to-go-nine.vercel.app/u/${uniqueId}`;

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