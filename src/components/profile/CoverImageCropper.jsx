import Cropper from "react-easy-crop";
import { useState } from "react";
import { ZoomIn, ZoomOut, X, Check, Move } from "lucide-react";

export default function CoverImageCropper({
  image,
  onCropComplete,
  setShowCropper,
  saveCroppedCover,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      await saveCroppedCover();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.iconBadge}>
              <Move size={14} color="#a78bfa" />
            </div>
            <div>
              <p style={styles.title}>Adjust Cover Photo</p>
              <p style={styles.subtitle}>Drag to reposition · Scroll or slide to zoom</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowCropper(false)}
            style={styles.closeBtn}
            onMouseEnter={e => (e.currentTarget.style.background = "#2a2a2a")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <X size={18} color="#9ca3af" />
          </button>
        </div>

        {/* Cropper Area */}
        <div style={styles.cropWrapper}>
          {/* Aspect ratio hint */}
          <div style={styles.aspectBadge}>16:5</div>
          <div style={styles.cropContainer}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={16 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              showGrid={false}
              style={{
                containerStyle: {
                  borderRadius: "10px",
                  overflow: "hidden",
                },
                cropAreaStyle: {
                  border: "2px solid rgba(167, 139, 250, 0.7)",
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
                },
              }}
            />
          </div>
        </div>

        {/* Zoom Control */}
        <div style={styles.zoomRow}>
          <button
            type="button"
            onClick={() => setZoom(z => Math.max(1, +(z - 0.1).toFixed(1)))}
            style={styles.zoomBtn}
            onMouseEnter={e => (e.currentTarget.style.background = "#2a2a2a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1e1e1e")}
          >
            <ZoomOut size={16} color="#9ca3af" />
          </button>

          <div style={styles.sliderTrack}>
            <div
              style={{
                ...styles.sliderFill,
                width: `${((zoom - 1) / 2) * 100}%`,
              }}
            />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              style={styles.sliderInput}
            />
          </div>

          <button
            type="button"
            onClick={() => setZoom(z => Math.min(3, +(z + 0.1).toFixed(1)))}
            style={styles.zoomBtn}
            onMouseEnter={e => (e.currentTarget.style.background = "#2a2a2a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1e1e1e")}
          >
            <ZoomIn size={16} color="#9ca3af" />
          </button>

          <span style={styles.zoomLabel}>{Math.round((zoom / 3) * 100)}%</span>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Actions */}
        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => setShowCropper(false)}
            style={styles.cancelBtn}
            onMouseEnter={e => (e.currentTarget.style.background = "#2a2a2a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1a1a1a")}
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isSaving}
            style={{
              ...styles.saveBtn,
              opacity: isSaving ? 0.7 : 1,
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
            onMouseEnter={e => {
              if (!isSaving) e.currentTarget.style.background = "#7c3aed";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#6d28d9";
            }}
          >
            {isSaving ? (
              <>
                <span style={styles.spinner} />
                Saving…
              </>
            ) : (
              <>
                <Check size={15} />
                Save Cover
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #a78bfa;
          border: 2px solid #1a1a1a;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.25);
          cursor: pointer;
          position: relative;
          z-index: 2;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #a78bfa;
          border: 2px solid #1a1a1a;
          box-shadow: 0 0 0 3px rgba(167,139,250,0.25);
          cursor: pointer;
        }
        input[type="range"]:focus {
          outline: none;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
  },
  modal: {
    background: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "900px",
    padding: "24px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconBadge: {
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    background: "rgba(167,139,250,0.1)",
    border: "1px solid rgba(167,139,250,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 0,
    color: "#f3f4f6",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
  subtitle: {
    margin: "2px 0 0",
    color: "#6b7280",
    fontSize: "12px",
  },
  closeBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "9px",
    border: "1px solid #2a2a2a",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.15s",
    flexShrink: 0,
  },
  cropWrapper: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#0a0a0a",
    border: "1px solid #2a2a2a",
  },
  aspectBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 10,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "3px 8px",
    fontSize: "11px",
    color: "#9ca3af",
    fontWeight: 500,
    letterSpacing: "0.05em",
  },
  cropContainer: {
    position: "relative",
    width: "100%",
    /*
     * Matches the 16:5 aspect ratio the cropper enforces.
     * At a typical modal content width of ~852px: 852 * 5/16 ≈ 266px.
     * Clamped so it never collapses on narrow screens.
     */
    height: "clamp(180px, 26vw, 266px)",
  },
  zoomRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "16px",
  },
  zoomBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #2a2a2a",
    background: "#1e1e1e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "background 0.15s",
  },
  sliderTrack: {
    flex: 1,
    height: "4px",
    background: "#2a2a2a",
    borderRadius: "99px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
    borderRadius: "99px",
    pointerEvents: "none",
    transition: "width 0.05s",
  },
  sliderInput: {
    width: "100%",
  },
  zoomLabel: {
    fontSize: "12px",
    color: "#6b7280",
    minWidth: "34px",
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },
  divider: {
    height: "1px",
    background: "#1f1f1f",
    margin: "20px 0",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelBtn: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
    background: "#1a1a1a",
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  saveBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#6d28d9",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    transition: "background 0.15s",
    letterSpacing: "-0.01em",
  },
  spinner: {
    width: "13px",
    height: "13px",
    border: "2px solid rgba(255,255,255,0.25)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    display: "inline-block",
  },
};