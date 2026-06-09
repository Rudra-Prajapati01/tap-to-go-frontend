import Cropper from "react-easy-crop";
import { useState } from "react";

export default function CoverImageCropper({ image, onCropComplete, setShowCropper, saveCroppedCover }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Temporary test function to verify button click
  const handleSaveClick = async () => {
    alert("SAVE CLICKED");
    await saveCroppedCover();
  };

  return (
    <div
      style={{
        background: "#111",
        padding: "25px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto", // Center the cropper container
      }}
    >
      {/* Cropper Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1584 / 396} // Actual 4:1 ratio
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Zoom Slider */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer" }}
        />
      </div>

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button
          type="button"
          onClick={() => setShowCropper(false)}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "#333",
            color: "#fff",
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSaveClick} // Test alert integrated here
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#0B4DBB",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save Cover
        </button>
      </div>
    </div>
  );
}