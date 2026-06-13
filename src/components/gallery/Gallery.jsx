import { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg, dataURLtoBlob } from "../../utils/cropImage";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [savedImages, setSavedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [editModal, setEditModal] = useState(null);

    const fileInputRef = useRef(null);
    const modalFileRef = useRef(null);

    const fetchGallery = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user?._id) return;
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/gallery/${user._id}`);
            const data = await res.json();
            if (data.success) setSavedImages(data.gallery || []);
        } catch (error) {
            console.error("Fetch Gallery API Error:", error);
        }
    };

    useEffect(() => { fetchGallery(); }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            title: "",
        }));
        setImages((prev) => [...prev, ...imagePreviews]);
        e.target.value = "";
    };

    const removeImage = (index) => {
        if (images[index]?.preview) URL.revokeObjectURL(images[index].preview);
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (imageId, oldTitle, currentUrl) => {
        setEditModal({
            imageId,
            title: oldTitle || "",
            url: currentUrl,
            newFile: null,
            newPreview: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            croppedAreaPixels: null,
            cropMode: false,
            cropAspect: undefined,
        });
    };

    const handleModalFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (editModal?.newPreview) URL.revokeObjectURL(editModal.newPreview);
        setEditModal((prev) => ({
            ...prev,
            newFile: file,
            newPreview: URL.createObjectURL(file),
            cropMode: true,
            crop: { x: 0, y: 0 },
            zoom: 1,
            croppedAreaPixels: null,
            cropAspect: undefined,
        }));
        e.target.value = "";
    };

    const closeEditModal = () => {
        if (editModal?.newPreview) URL.revokeObjectURL(editModal.newPreview);
        setEditModal(null);
    };

    const handleEditSave = async () => {
        if (!editModal) return;
        const { imageId, title, newFile, newPreview, croppedAreaPixels } = editModal;
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", title);
            if (newFile && croppedAreaPixels) {
                const dataUrl = await getCroppedImg(newPreview, croppedAreaPixels);
                const blob = dataURLtoBlob(dataUrl);
                formData.append("image", blob, newFile.name);
            } else if (newFile) {
                formData.append("image", newFile);
            }
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/gallery/image/${imageId}`,
                { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: formData }
            );
            const data = await res.json();
            if (data.success) {
                setSavedImages(
                    data.gallery ||
                    savedImages.map((img) =>
                        img._id === imageId
                            ? { ...img, title, url: data.updatedUrl || img.url }
                            : img
                    )
                );
                closeEditModal();
            } else {
                alert(data.message || "Failed to update item");
            }
        } catch (error) {
            console.error("Error updating image entry:", error);
            alert("Something went wrong while saving.");
        }
    };

    const handleDelete = async (imageId) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/gallery/image/${imageId}`,
                { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();
            if (data.success) {
                setSavedImages(data.gallery || savedImages.filter((img) => img._id !== imageId));
                alert("Image deleted successfully!");
            } else {
                alert(data.message || "Failed to delete image");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Error connecting to server.");
        }
    };

    const handleUpload = async () => {
        if (images.length === 0) { alert("Please select images first"); return; }
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
            if (!user?._id || !token) { alert("User or Token not found. Please log in again."); return; }

            const formData = new FormData();
            images.forEach((img) => formData.append("images", img.file));

            const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload/gallery`, {
                method: "POST", body: formData,
            });
            const uploadData = await uploadRes.json();
            if (!uploadData.success) { alert(uploadData.message || "Image upload failed"); return; }

            const saveRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/gallery/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    userId: user._id,
                    images: uploadData.images.map((uploadedImg, index) => ({
                        ...uploadedImg,
                        title: images[index]?.title || "",
                    })),
                }),
            });
            const saveData = await saveRes.json();
            if (saveData.success) {
                setSavedImages(saveData.gallery || []);
                alert("Gallery Uploaded Successfully");
                images.forEach((img) => { if (img.preview) URL.revokeObjectURL(img.preview); });
                setImages([]);
            }
        } catch (error) {
            console.error("Upload pipeline error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
        if (!files.length) return;
        const imagePreviews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            title: "",
        }));
        setImages((prev) => [...prev, ...imagePreviews]);
    };

    return (
        <div style={S.page}>
            <div style={S.wrap}>

                {/* Header */}
                <div style={S.header}>
                    <div style={S.titleGroup}>
                        <p style={S.eyebrow}>Portfolio</p>
                        <h1 style={S.h1}>Work Gallery</h1>
                    </div>
                    <div style={S.statBadge}>
                        <span style={S.statNum}>{savedImages.length}</span>
                        <span style={S.statLabel}>images published</span>
                    </div>
                </div>

                {/* ── Upload Zone — empty state OR filled with previews ── */}
                <div
                    style={
                        images.length > 0
                            ? S.uploadBoxFilled
                            : dragOver
                            ? S.dropzoneActive
                            : S.dropzone
                    }
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />

                    {images.length === 0 ? (
                        /* ── Empty dropzone ── */
                        <div style={S.dzInner} onClick={() => fileInputRef.current?.click()}>
                            <div style={S.uploadIcon}>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0B4DBB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="4" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <h3 style={S.uploadTitle}>
                                {dragOver ? "Drop images here" : "Upload images"}
                            </h3>
                            <p style={S.uploadSub}>Click to browse or drag &amp; drop files</p>
                            <span style={S.uploadHint}>JPG · PNG · WEBP · GIF</span>
                        </div>
                    ) : (
                        /* ── Filled: previews + title inputs + publish button ── */
                        <>
                            {/* Top bar */}
                            <div style={S.filledTopBar}>
                                <div style={S.filledTopLeft}>
                                    <span style={S.filledLabel}>Ready to publish</span>
                                    <span style={S.countPill}>{images.length}</span>
                                </div>
                                <div style={S.filledTopRight}>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        style={S.addMoreBtn}
                                    >
                                        + Add more
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        disabled={loading}
                                        style={loading ? S.uploadBtnDisabled : S.uploadBtn}
                                    >
                                        {loading ? (
                                            <><SpinnerIcon />Uploading…</>
                                        ) : (
                                            <><UploadArrow />Publish to gallery</>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Image grid with title inputs */}
                            <div style={S.previewGrid}>
                                {images.map((img, index) => (
                                    <div key={index} style={S.previewCard}>
                                        <div style={S.previewImgWrap}>
                                            <img src={img.preview} alt="" style={S.previewImg} />
                                            <button
                                                onClick={() => removeImage(index)}
                                                style={S.removeBtn}
                                                title="Remove"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div style={S.previewInputWrap}>
                                            <input
                                                type="text"
                                                placeholder="Add a title…"
                                                value={img.title}
                                                onChange={(e) => {
                                                    const updated = [...images];
                                                    updated[index].title = e.target.value;
                                                    setImages(updated);
                                                }}
                                                style={S.titleInput}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Published gallery */}
                <div style={S.sectionLabel}>
                    <span>Published</span>
                    <span style={S.sectionLine} />
                </div>

                {savedImages.length > 0 ? (
                    <div style={S.savedGrid}>
                        {savedImages.map((img, index) => (
                            <SavedCard
                                key={img._id || index}
                                img={img}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={S.emptyState}>
                        <div style={S.emptyIcon}>🖼️</div>
                        <p style={S.emptyTitle}>No images yet</p>
                        <p style={S.emptyText}>Upload your first portfolio image above</p>
                    </div>
                )}

            </div>

            {/* ── Edit Modal with Crop ── */}
            {editModal && (
                <div style={S.modalBackdrop} onClick={closeEditModal}>
                    <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>

                        <div style={S.modalHeader}>
                            <h3 style={S.modalTitle}>Edit Gallery Item</h3>
                            <p style={S.modalSub}>
                                {editModal.cropMode
                                    ? "Drag to reposition · Scroll to zoom · Click Apply when done"
                                    : "Update the image or title."}
                            </p>
                        </div>

                        <div style={S.modalBody}>
                            <label style={S.modalLabel}>Image Asset</label>

                            {editModal.cropMode ? (
                                <>
                                    <div style={S.cropWrapper}>
                                        <Cropper
                                            image={editModal.newPreview || editModal.url}
                                            crop={editModal.crop}
                                            zoom={editModal.zoom}
                                            aspect={editModal.cropAspect}
                                            onCropChange={(c) => setEditModal((p) => ({ ...p, crop: c }))}
                                            onZoomChange={(z) => setEditModal((p) => ({ ...p, zoom: z }))}
                                            onCropComplete={(_, px) => setEditModal((p) => ({ ...p, croppedAreaPixels: px }))}
                                            style={{ containerStyle: { borderRadius: "12px" } }}
                                        />
                                    </div>
                                    <input
                                        type="range" min={1} max={3} step={0.05}
                                        value={editModal.zoom}
                                        onChange={(e) => setEditModal((p) => ({ ...p, zoom: +e.target.value }))}
                                        style={{ width: "100%", marginTop: "10px" }}
                                    />
                                    <div style={S.ratioRow}>
                                        {[["Free", undefined], ["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9]].map(([label, val]) => (
                                            <button
                                                key={label}
                                                onClick={() => setEditModal((p) => ({ ...p, cropAspect: val }))}
                                                style={{ ...S.ratioBtn, ...(editModal.cropAspect === val ? S.ratioBtnActive : {}) }}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setEditModal((p) => ({ ...p, cropMode: false }))}
                                        style={S.applyCropBtn}
                                    >
                                        ✓ Apply Crop
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={S.modalImageWrapper}>
                                        <img
                                            src={editModal.newPreview || editModal.url}
                                            alt="Preview"
                                            style={S.modalImagePreview}
                                        />
                                        {editModal.newPreview && (
                                            <button
                                                onClick={() => setEditModal((p) => ({ ...p, cropMode: true }))}
                                                style={S.recropBtn}
                                            >
                                                ✂ Crop
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => modalFileRef.current?.click()}
                                        style={S.selectImageBtn}
                                    >
                                        📷 Select New Image
                                    </button>
                                    <input
                                        ref={modalFileRef}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleModalFileChange}
                                    />
                                </>
                            )}

                            <label style={{ ...S.modalLabel, marginTop: "20px" }}>Title</label>
                            <input
                                type="text"
                                value={editModal.title}
                                onChange={(e) => setEditModal({ ...editModal, title: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleEditSave();
                                    if (e.key === "Escape") closeEditModal();
                                }}
                                placeholder="e.g. Brand redesign project"
                                style={S.modalInput}
                            />
                        </div>

                        <div style={S.modalFooter}>
                            <button style={S.modalCancel} onClick={closeEditModal}>Cancel</button>
                            <button style={S.modalSave} onClick={handleEditSave}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Saved card component ────────────────────────────────────────────────
const SavedCard = ({ img, onEdit, onDelete }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            style={{
                ...S.savedCard,
                transform: hovered ? "translateY(-4px)" : "none",
                boxShadow: hovered ? "0 16px 40px rgba(11,77,187,0.10)" : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={S.savedImgWrap}>
                <img
                    src={img.url}
                    alt={img.title || "Portfolio image"}
                    style={{ ...S.savedImg, transform: hovered ? "scale(1.04)" : "scale(1)" }}
                />
                <div style={{ ...S.savedImgOverlay, opacity: hovered ? 1 : 0 }} />
            </div>
            <div style={S.cardBody}>
                <h4 style={S.cardTitle}>{img.title || "Untitled"}</h4>
                <p style={S.cardMeta}>Portfolio image</p>
                <div style={S.btnRow}>
                    <button
                        onClick={() => onEdit(img._id, img.title, img.url)}
                        style={S.btnEdit}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#093E96")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#0B4DBB")}
                    >
                        <PencilIcon /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(img._id)}
                        style={S.btnDelete}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; e.currentTarget.style.borderColor = "#FCA5A5"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#FEF2F2"; e.currentTarget.style.borderColor = "#FECACA"; }}
                    >
                        <TrashIcon /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Styles ──────────────────────────────────────────────────────────────
const S = {
    page: {
        background: "#F0F4FF",
        minHeight: "100vh",
        padding: "36px 20px 60px",
        fontFamily: "'Inter', system-ui, sans-serif",
    },
    wrap: { maxWidth: "1160px", margin: "0 auto" },
    header: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: "36px",
        gap: "16px",
        flexWrap: "wrap",
    },
    titleGroup: {},
    eyebrow: {
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#0B4DBB",
        marginBottom: "6px",
    },
    h1: {
        fontSize: "30px",
        fontWeight: "800",
        color: "#0A1628",
        margin: 0,
        letterSpacing: "-0.6px",
        lineHeight: 1.15,
    },
    statBadge: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#fff",
        border: "1px solid #C7D8F8",
        borderRadius: "14px",
        padding: "10px 18px",
    },
    statNum: { fontSize: "22px", fontWeight: "800", color: "#0B4DBB", lineHeight: 1 },
    statLabel: { fontSize: "13px", color: "#64748B", fontWeight: "500" },

    // ── Empty dropzone ──
    dropzone: {
        border: "2px dashed #93B4F0",
        borderRadius: "24px",
        background: "#fff",
        marginBottom: "44px",
        transition: "all 0.22s ease",
    },
    dropzoneActive: {
        border: "2px dashed #0B4DBB",
        borderRadius: "24px",
        background: "#EEF4FF",
        marginBottom: "44px",
        transition: "all 0.22s ease",
    },
    dzInner: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "52px 40px",
        cursor: "pointer",
        textAlign: "center",
    },

    // ── Filled upload box ──
    uploadBoxFilled: {
        border: "2px solid #C7D8F8",
        borderRadius: "24px",
        background: "#fff",
        marginBottom: "44px",
        padding: "20px 20px 24px",
    },
    filledTopBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "18px",
        flexWrap: "wrap",
        gap: "10px",
    },
    filledTopLeft: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    filledLabel: {
        fontSize: "14px",
        fontWeight: "700",
        color: "#0A1628",
    },
    filledTopRight: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    addMoreBtn: {
        background: "#EEF4FF",
        color: "#0B4DBB",
        border: "1.5px solid #C7D8F8",
        padding: "9px 18px",
        borderRadius: "10px",
        fontWeight: "600",
        fontSize: "13px",
        cursor: "pointer",
    },

    uploadIcon: {
        width: "64px",
        height: "64px",
        borderRadius: "18px",
        background: "#EEF4FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "18px",
    },
    uploadTitle: { fontSize: "17px", fontWeight: "700", color: "#0B4DBB", margin: "0 0 6px" },
    uploadSub: { fontSize: "13px", color: "#94A3B8", margin: 0 },
    uploadHint: {
        marginTop: "16px",
        fontSize: "12px",
        color: "#C0CCDD",
        background: "#F7FAFF",
        border: "1px solid #E0EAFF",
        borderRadius: "8px",
        padding: "6px 14px",
    },

    sectionLabel: {
        fontSize: "13px",
        fontWeight: "600",
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: "#94A3B8",
        marginBottom: "18px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    sectionLine: { flex: 1, height: "1px", background: "#E2EAF8" },
    savedGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: "22px",
        marginBottom: "50px",
    },
    savedCard: {
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #E2EAF8",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        cursor: "default",
    },
    savedImgWrap: { position: "relative", overflow: "hidden" },
    savedImg: {
        width: "100%",
        height: "240px",
        objectFit: "cover",
        display: "block",
        transition: "transform 0.35s ease",
    },
    savedImgOverlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(11,25,56,0.55) 0%, transparent 55%)",
        transition: "opacity 0.25s ease",
        pointerEvents: "none",
    },
    cardBody: { padding: "16px 18px 18px" },
    cardTitle: {
        fontSize: "15px",
        fontWeight: "700",
        color: "#0A1628",
        margin: "0 0 3px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    cardMeta: { fontSize: "12px", color: "#94A3B8", margin: "0 0 14px" },
    btnRow: { display: "flex", gap: "8px" },
    btnEdit: {
        flex: 1,
        background: "#0B4DBB",
        color: "#fff",
        border: "none",
        padding: "9px 12px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        transition: "background 0.18s",
    },
    btnDelete: {
        flex: 1,
        background: "#FEF2F2",
        color: "#DC2626",
        border: "1px solid #FECACA",
        padding: "9px 12px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "13px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        transition: "all 0.18s",
    },
    emptyState: {
        textAlign: "center",
        padding: "60px 30px",
        color: "#94A3B8",
        background: "#fff",
        borderRadius: "20px",
        border: "1px dashed #CBD5E1",
        marginBottom: "40px",
    },
    emptyIcon: { fontSize: "40px", marginBottom: "14px" },
    emptyTitle: { fontSize: "16px", fontWeight: "600", color: "#64748B", margin: "0 0 6px" },
    emptyText: { fontSize: "14px", margin: 0 },

    // ── Preview grid (inside upload box) ──
    previewGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "14px",
    },
    previewCard: {
        borderRadius: "14px",
        overflow: "hidden",
        background: "#F8FAFF",
        border: "1px solid #E2EAF8",
    },
    previewImgWrap: { position: "relative" },
    previewImg: { width: "100%", height: "150px", objectFit: "cover", display: "block" },
    removeBtn: {
        position: "absolute",
        top: "7px",
        right: "7px",
        width: "26px",
        height: "26px",
        border: "none",
        borderRadius: "50%",
        background: "rgba(220,38,38,0.90)",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
    },
    previewInputWrap: { padding: "8px 10px 10px" },
    titleInput: {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #CBD5E1",
        borderRadius: "8px",
        boxSizing: "border-box",
        outline: "none",
        fontSize: "12px",
        background: "#fff",
        color: "#0A1628",
    },

    countPill: {
        background: "#EEF4FF",
        color: "#0B4DBB",
        borderRadius: "20px",
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: "700",
    },

    // ── Modal ──
    modalBackdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(10,22,56,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
    },
    modalBox: {
        background: "#fff",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "440px",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(11,77,187,0.18)",
    },
    modalHeader: { padding: "22px 24px 16px", borderBottom: "1px solid #E2EAF8" },
    modalTitle: { fontSize: "17px", fontWeight: "700", color: "#0A1628", margin: "0 0 4px" },
    modalSub: { fontSize: "13px", color: "#94A3B8", margin: 0 },
    modalBody: { padding: "20px 24px" },
    modalLabel: {
        display: "block",
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        color: "#64748B",
        marginBottom: "8px",
    },
    modalInput: {
        width: "100%",
        padding: "11px 14px",
        border: "1.5px solid #C7D8F8",
        borderRadius: "10px",
        fontSize: "15px",
        color: "#0A1628",
        outline: "none",
        boxSizing: "border-box",
        background: "#F7FAFF",
    },
    modalImageWrapper: {
        position: "relative",
        width: "100%",
        height: "180px",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #C7D8F8",
        background: "#F8FAFF",
    },
    modalImagePreview: { width: "100%", height: "100%", objectFit: "contain" },
    recropBtn: {
        position: "absolute",
        bottom: "8px",
        right: "8px",
        background: "rgba(11,77,187,0.92)",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "5px 10px",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
    },
    selectImageBtn: {
        width: "100%",
        marginTop: "12px",
        background: "#0B4DBB",
        color: "#fff",
        border: "none",
        padding: "12px",
        borderRadius: "10px",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "14px",
    },
    cropWrapper: {
        position: "relative",
        width: "100%",
        height: "220px",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#000",
        border: "1px solid #C7D8F8",
    },
    ratioRow: { display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" },
    ratioBtn: {
        padding: "5px 12px",
        borderRadius: "8px",
        border: "1px solid #C7D8F8",
        background: "#F7FAFF",
        color: "#0B4DBB",
        fontSize: "12px",
        fontWeight: "600",
        cursor: "pointer",
    },
    ratioBtnActive: { background: "#0B4DBB", color: "#fff", borderColor: "#0B4DBB" },
    applyCropBtn: {
        marginTop: "10px",
        width: "100%",
        padding: "10px",
        background: "#0B4DBB",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: "700",
        fontSize: "13px",
        cursor: "pointer",
    },
    modalFooter: { display: "flex", gap: "10px", padding: "16px 24px 22px" },
    modalCancel: {
        flex: 1,
        background: "#F1F5F9",
        color: "#64748B",
        border: "none",
        padding: "11px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
    },
    modalSave: {
        flex: 2,
        background: "#0B4DBB",
        color: "#fff",
        border: "none",
        padding: "11px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "14px",
    },
    uploadBtn: {
        background: "#0B4DBB",
        color: "#fff",
        border: "none",
        padding: "10px 22px",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "14px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        transition: "background 0.18s",
    },
    uploadBtnDisabled: {
        background: "#94A3B8",
        color: "#fff",
        border: "none",
        padding: "10px 22px",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "not-allowed",
        fontSize: "14px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
    },
};

// ── Icon helpers ──────────────────────────────────────────────────────────
const PencilIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const TrashIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);

const UploadArrow = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const SpinnerIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2a10 10 0 1 0 10 10" style={{ opacity: 0.3 }} />
        <path d="M12 2a10 10 0 0 1 10 10">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
        </path>
    </svg>
);

export default Gallery;