import { useState, useRef, useCallback, useEffect } from "react";
import ProfileQRCode from "../qr/ProfileQRCode";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";

// ── Shared style helpers ────────────────────────────────────────────────────

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px 12px 40px",
  borderRadius: "12px",
  border: "1.5px solid #e2e8f0",
  outline: "none",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "inherit",
  background: "#f8fafc",
  transition: "border-color 0.2s",
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  display: "block",
  marginBottom: "6px",
};

const fieldWrap = { display: "flex", flexDirection: "column" };

// ── Inline SVG icons ────────────────────────────────────────────────────────
const Icons = {
  user: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  mail: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  phone: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.59a16 16 0 006.5 6.5l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
  pin: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  brief: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>,
  at: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" /></svg>,
  globe: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  building: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="13" height="18" /><path d="M21 8h-5v13h5z" /><path d="M7 7h4M7 11h4M7 15h4" /></svg>,
  camera: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  save: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
  loader: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" /><path d="M21 12a9 9 0 00-9-9" /></svg>,
  edit: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B4DBB" strokeWidth="2.2" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  qr: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B4DBB" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
};

// ── Reusable Field ───────────────────────────────────────────────────────────
const Field = ({ icon, label, name, type = "text", placeholder, form, set, hint }) => (
  <div style={fieldWrap}>
    <label style={labelStyle}>{label}</label>
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none" }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name] || ""}
        onChange={e => set(name, e.target.value)}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = "#0B4DBB")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
    {hint && <span style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>{hint}</span>}
  </div>
);

// ── Tab definitions ──────────────────────────────────────────────────────────
const tabs = [
  { id: "mycard", label: "My Card" },
  { id: "social", label: "Social Links" },
  { id: "company", label: "Company Info" },
  { id: "theme", label: "Customize Theme" },
  { id: "lead", label: "Lead Capture Form" },
];

// ── Default cover gradient ───────────────────────────────────────────────────
const DEFAULT_COVER = "linear-gradient(135deg,#667eea,#764ba2,#f093fb)";

// ── Helpers ──────────────────────────────────────────────────────────────────
const getCoverBg = (coverImage, coverTheme) => {
  if (coverImage && !coverImage.startsWith("blob:")) return `url(${coverImage}) center/cover no-repeat`;
  if (coverImage && coverImage.startsWith("blob:")) return `url(${coverImage}) center/cover no-repeat`;
  if (coverTheme) return coverTheme;
  return DEFAULT_COVER;
};

const isBlob = (url) => typeof url === "string" && url.startsWith("blob:");

// ── Main Component ───────────────────────────────────────────────────────────
export default function EditProfile() {
  const fileRef = useRef(null);
  const coverRef = useRef(null);
  const logoRef = useRef(null);

  const [activeTab, setActiveTab] = useState("mycard");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [cropImage, setCropImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedCover = async () => {
    const cropped = await getCroppedImg(cropImage, croppedAreaPixels);
    const blob = await (await fetch(cropped)).blob();
    const file = new File([blob], "cover.jpg", { type: "image/jpeg" });
    await handleImageField(file, "coverImage");
    setShowCropper(false);
  };

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; }
    catch { return {}; }
  })();

  useEffect(() => {
    const fetchLatestUser = async () => {
      try {
        if (!storedUser?._id) return;
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/user/${storedUser._id}`
        );
        const data = await response.json();
        if (!data) return;
        localStorage.setItem("user", JSON.stringify(data));
        setForm((prev) => ({
          ...prev,
          profileImage: data.profileImage || "",
          coverImage: data.coverImage || "",
          logoImage: data.logoImage || "",
          coverTheme: data.coverTheme || "",
          firstName: data.name?.split(" ")[0] || "",
          lastName: data.name?.split(" ").slice(1).join(" ") || "",
          username: data.username || "",
          email: data.email || "",
          jobTitle: data.jobTitle || "",
          companyName: data.companyName || "",
          companyContact: data.companyContact || "",
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          postcode: data.postcode || "",
          phone: data.phone || "",
          website: data.website || "",
          location: data.location || "",
          bio: data.bio || "",
          instagram: data.instagram || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          youtube: data.youtube || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          whatsapp: data.whatsapp || "",
          uniqueId: data.uniqueId || "",
          leadCapture: data.leadCapture || prev.leadCapture,
          theme: data.theme || prev.theme,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLatestUser();
  }, []);

  const [form, setForm] = useState({
    profileImage: storedUser.profileImage || "",
    coverImage: storedUser.coverImage || "",
    logoImage: storedUser.logoImage || "",
    coverTheme: storedUser.coverTheme || "",
    firstName: storedUser.name?.split(" ")[0] || "",
    lastName: storedUser.name?.split(" ").slice(1).join(" ") || "",
    username: storedUser.username || "",
    email: storedUser.email || "",
    jobTitle: storedUser.jobTitle || "",
    companyName: storedUser.companyName || "",
    companyContact: storedUser.companyContact || "",
    streetAddress: storedUser.streetAddress || "",
    city: storedUser.city || "",
    state: storedUser.state || "",
    country: storedUser.country || "",
    postcode: storedUser.postcode || "",
    phone: storedUser.phone || "",
    website: storedUser.website || "",
    location: storedUser.location || "",
    bio: storedUser.bio || "",
    instagram: storedUser.instagram || "",
    linkedin: storedUser.linkedin || "",
    github: storedUser.github || "",
    youtube: storedUser.youtube || "",
    facebook: storedUser.facebook || "",
    twitter: storedUser.twitter || "",
    whatsapp: storedUser.whatsapp || "",
    uniqueId: storedUser.uniqueId || "",
    leadCapture: storedUser.leadCapture || {
      enabled: true,
      fields: {
        name: true,
        email: true,
        phone: true,
        company: false,
        message: false,
      },
    },
    theme: {
      profileTheme: storedUser.theme?.profileTheme || "#0B4DBB",
      backgroundColor: storedUser.theme?.backgroundColor || "#ffffff",
      textColor: storedUser.theme?.textColor || "#1e293b",
      buttonColor: storedUser.theme?.buttonColor || "#0B4DBB",
      buttonTextColor: storedUser.theme?.buttonTextColor || "#ffffff",
      fontFamily: storedUser.theme?.fontFamily || "Poppins",
      cardView: storedUser.theme?.cardView || "left",
    },
  });

  const set = useCallback((k, v) => setForm(f => ({ ...f, [k]: v })), []);
  const setTheme = useCallback((k, v) =>
    setForm(f => ({ ...f, theme: { ...f.theme, [k]: v } })), []);

  const uploadImage = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/profile`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      console.log("UPLOAD RESPONSE:", data);
      return data?.imageUrl || "";
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      return "";
    }
  }, []);

  const handleImageField = useCallback(
    async (file, fieldName) => {
      if (!file) return;
      try {
        const realUrl = await uploadImage(file);
        if (realUrl) {
          setForm((f) => ({ ...f, [fieldName]: realUrl }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [uploadImage]
  );

  const handleSave = useCallback(async () => {
    console.log("PROFILE IMAGE:", form.profileImage);
    console.log("COVER IMAGE:", form.coverImage);
    console.log("LOGO IMAGE:", form.logoImage);
    if (loading) return;
    try {
      setLoading(true);
      setError(null);
      const user = (() => {
        try { return JSON.parse(localStorage.getItem("user")) || {}; }
        catch { return {}; }
      })();
      if (!user?._id) { setError("User not found. Please log in again."); return; }
      const sanitised = {
        ...form,
        uniqueId: form.uniqueId || storedUser.uniqueId || "",
        name: `${form.firstName || ""} ${form.lastName || ""}`.trim(),
      };
      console.log("SAVING USER", sanitised);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user._id}`,
        { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sanitised) }
      );
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setForm(prev => ({
        ...prev,
        ...data,
        theme: { ...prev.theme, ...(data.theme || {}) },
        profileImage: data.profileImage || prev.profileImage,
        coverImage: data.coverImage || prev.coverImage,
        logoImage: data.logoImage || prev.logoImage,
        firstName: data.name?.split(" ")[0] || "",
        lastName: data.name?.split(" ").slice(1).join(" ") || "",
      }));
      localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, loading, storedUser]);

  const downloadVCF = () => {
    const vcf = `BEGIN:VCARD\nVERSION:3.0\nFN:${form.firstName} ${form.lastName}\nORG:${form.companyName}\nTITLE:${form.jobTitle}\nTEL:${form.phone}\nEMAIL:${form.email}\nURL:${form.website}\nNOTE:${form.bio}\nEND:VCARD`;
    const blob = new Blob([vcf], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${form.firstName || "contact"}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const { theme } = form;
  const isCenter = theme.cardView === "center";
  const isPortrait = theme.cardView === "portrait";
  const coverBg = getCoverBg(form.coverImage, form.coverTheme);

  const pillStyle = {
    background: theme.backgroundColor,
    padding: "9px 12px",
    borderRadius: "12px",
    fontSize: "13px",
    color: theme.textColor,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: `1px solid ${theme.buttonColor}30`,
    transition: "all 0.2s",
    minWidth: 0,
  };

  const bioMax = 250;
  const bioLeft = bioMax - (form.bio?.length || 0);

  // ── My Card Tab ─────────────────────────────────────────────────────────────
  const myCardTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* Cover image */}
      <div>
        <label style={labelStyle}>Cover Image</label>
        <div
          onClick={() => coverRef.current?.click()}
          style={{
            /* Match the 16:5 ratio CoverImageCropper enforces.
               Preview looks identical to the PublicProfile banner. */
            aspectRatio: "16 / 5",
            minHeight: "80px",
            borderRadius: "16px",
            cursor: "pointer",
            background: coverBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            transition: "opacity 0.2s",
            width: "100%",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.18)", opacity: 0, transition: "opacity 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0"}
          >
            <span style={{ color: "#fff", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
              {Icons.camera} Change Cover
            </span>
          </div>
          <input ref={coverRef} type="file" hidden accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setCropImage(reader.result);
                setShowCropper(true);
              };
              reader.readAsDataURL(file);
            }} />
        </div>
      </div>

      {/* Profile photo + Logo + Name row */}
      <div className="media-name-row" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Profile photo */}
        <div style={fieldWrap}>
          <label style={labelStyle}>Profile Photo</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{ width: "82px", height: "82px", borderRadius: "16px", overflow: "hidden", cursor: "pointer", position: "relative", flexShrink: 0, border: "3px solid #fff", boxShadow: "0 4px 16px rgba(99,102,241,0.15)", background: "#f3f4f6" }}
          >
            {form.profileImage
              ? <img src={form.profileImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: theme.buttonColor, color: theme.buttonTextColor, fontSize: "30px", fontWeight: "700" }}>+</div>
            }
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Icons.camera}</div>
            <input ref={fileRef} type="file" hidden accept="image/*"
              onChange={e => handleImageField(e.target.files?.[0], "profileImage")} />
          </div>
        </div>

        {/* Company Logo */}
        <div style={fieldWrap}>
          <label style={labelStyle}>Company Logo</label>
          <div
            onClick={() => logoRef.current?.click()}
            style={{ width: "82px", height: "82px", borderRadius: "16px", cursor: "pointer", border: "2px dashed #c7d2fe", background: "#EAF4FF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", transition: "border-color 0.2s", position: "relative", overflow: "hidden", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#EAF4FF"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#c7d2fe"}
          >
            {form.logoImage
              ? <img src={form.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px", boxSizing: "border-box" }} />
              : <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <span style={{ fontSize: "10px", color: "#a78bfa", fontWeight: "700", textAlign: "center", lineHeight: 1.2 }}>Upload Logo</span>
              </>
            }
            <input ref={logoRef} type="file" hidden accept="image/*"
              onChange={e => handleImageField(e.target.files?.[0], "logoImage")} />
          </div>
        </div>

        {/* First + Last Name */}
        <div className="name-fields" style={{ flex: 1, minWidth: "160px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignContent: "start" }}>
          <Field icon={Icons.user} label="First Name" name="firstName" placeholder="First name" form={form} set={set} />
          <Field icon={Icons.user} label="Last Name" name="lastName" placeholder="Last name" form={form} set={set} />
        </div>
      </div>

      {/* Detail grid */}
      <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
        <Field icon={Icons.at} label="Username" name="username" placeholder="yourhandle" form={form} set={set} hint="taplink.cc/yourhandle" />
        <Field icon={Icons.mail} label="Email" name="email" placeholder="you@example.com" type="email" form={form} set={set} />
        <Field icon={Icons.brief} label="Job Title" name="jobTitle" placeholder="e.g. Director" form={form} set={set} />
        <Field icon={Icons.globe} label="Website" name="website" placeholder="company.com" form={form} set={set} />
        <Field icon={Icons.phone} label="Phone Number" name="phone" placeholder="+91 XXXXX XXXXX" type="tel" form={form} set={set} />
      </div>

      {/* Bio */}
      <div style={fieldWrap}>
        <label style={labelStyle}>Bio</label>
        <textarea
          placeholder="Write something about yourself..."
          value={form.bio || ""}
          onChange={(e) => set("bio", e.target.value)}
          maxLength={250}
          style={{
            width: "100%",
            minHeight: "110px",
            padding: "14px",
            borderRadius: "14px",
            border: "1.5px solid #e2e8f0",
            outline: "none",
            resize: "vertical",
            fontSize: "14px",
            fontFamily: "inherit",
            background: "#f8fafc",
            color: "inherit",
            lineHeight: "1.7",
            transition: "0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#0B4DBB")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
        <span style={{ marginTop: "6px", fontSize: "12px", color: bioLeft < 20 ? "#ef4444" : "#94a3b8", textAlign: "right" }}>
          {bioLeft} characters left
        </span>
      </div>
    </div>
  );

  // ── Social Tab ──────────────────────────────────────────────────────────────
  const socialTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Add your social links to display them on your card.</p>
      {[
        { name: "instagram", label: "Instagram", placeholder: "instagram.com/yourhandle", color: "#E1306C" },
        { name: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourprofile", color: "#0A66C2" },
        { name: "github", label: "GitHub", placeholder: "github.com/yourusername", color: "#333333" },
        { name: "twitter", label: "Twitter/X", placeholder: "twitter.com/yourhandle", color: "#1DA1F2" },
        { name: "youtube", label: "YouTube", placeholder: "youtube.com/@channel", color: "#FF0000" },
        { name: "facebook", label: "Facebook", placeholder: "facebook.com/yourprofile", color: "#1877F2" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "+91 XXXXX XXXXX", color: "#25D366" },
      ].map(({ name, label, placeholder, color }) => (
        <div key={name} style={fieldWrap}>
          <label style={labelStyle}>{label}</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", display: "flex" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={form[name] ? color : "#94a3b8"} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
            </span>
            <input
              type="url"
              placeholder={placeholder}
              value={form[name] || ""}
              onChange={e => set(name, e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = color)}
              onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // ── Company Tab ─────────────────────────────────────────────────────────────
  const companyTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Company information shown on your digital card.</p>
      <Field icon={Icons.building} label="Company Name" name="companyName" placeholder="Your company name" form={form} set={set} />
      <Field icon={Icons.phone} label="Company Contact" name="companyContact" placeholder="+91 XXXXX XXXXX" type="tel" form={form} set={set} />
      <Field icon={Icons.pin} label="Street Address" name="streetAddress" placeholder="Enter street address" form={form} set={set} />
      <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <Field icon={Icons.pin} label="City" name="city" placeholder="City" form={form} set={set} />
        <Field icon={Icons.pin} label="State" name="state" placeholder="State" form={form} set={set} />
      </div>
      <div className="two-col-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <Field icon={Icons.globe} label="Country" name="country" placeholder="Country" form={form} set={set} />
        <Field icon={Icons.pin} label="Postcode" name="postcode" placeholder="Postcode" form={form} set={set} />
      </div>
      <Field icon={Icons.globe} label="Website" name="website" placeholder="company.com" form={form} set={set} />
    </div>
  );

  // ── Theme Tab ───────────────────────────────────────────────────────────────
  const themeTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#111827" }}>Profile Theme</h3>
        <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "14px", margin: "6px 0 0" }}>Customize your digital business card appearance.</p>
      </div>

      {/* Cover gradient presets */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "18px", padding: "20px", background: "#fff" }}>
        <h4 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#111827" }}>Cover Gradient</h4>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { label: "Ocean", value: "linear-gradient(135deg,#667eea,#764ba2,#f093fb)" },
            { label: "Sunset", value: "linear-gradient(135deg,#f97316,#ec4899,#8b5cf6)" },
            { label: "Forest", value: "linear-gradient(135deg,#11998e,#38ef7d)" },
            { label: "Midnight", value: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)" },
            { label: "Gold", value: "linear-gradient(135deg,#f7971e,#ffd200)" },
            { label: "Rose", value: "linear-gradient(135deg,#f953c6,#b91d73)" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setForm(f => ({ ...f, coverTheme: value, coverImage: "" }))}
              title={label}
              style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: value,
                border: form.coverTheme === value && !form.coverImage ? "3px solid #111827" : "3px solid transparent",
                cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.12)", transition: "transform 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          ))}
        </div>
      </div>

      {/* Accent colour presets */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "18px", padding: "20px", background: "#fff" }}>
        <h4 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "#111827" }}>Accent Color</h4>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["#0B4DBB", "#2563eb", "#dc2626", "#ea580c", "#16a34a", "#0891b2", "#db2777", "#000000"].map(color => (
            <button
              key={color}
              onClick={() => setForm(f => ({ ...f, theme: { ...f.theme, profileTheme: color, buttonColor: color } }))}
              style={{
                width: "44px", height: "44px", borderRadius: "999px",
                border: theme.profileTheme === color ? "4px solid #111827" : "3px solid #fff",
                background: color, cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)", transition: "transform 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            />
          ))}
        </div>
      </div>

      {/* Fine-grained controls */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "18px", padding: "20px", background: "#fff" }}>
        <h4 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#111827" }}>Fine-tune Theme</h4>
        <div className="theme-fine-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
          {[
            { label: "Background Color", key: "backgroundColor" },
            { label: "Button Color", key: "buttonColor" },
            { label: "Text Color", key: "textColor" },
            { label: "Button Text Color", key: "buttonTextColor" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="color"
                  value={theme[key]}
                  onChange={e => setTheme(key, e.target.value)}
                  style={{ width: "44px", height: "44px", border: "none", borderRadius: "10px", cursor: "pointer", flexShrink: 0 }}
                />
                <input
                  type="text"
                  value={theme[key]}
                  onChange={e => setTheme(key, e.target.value)}
                  style={{ flex: 1, minWidth: 0, padding: "10px 12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", fontFamily: "monospace", color: "#1e293b", outline: "none" }}
                  onFocus={e => (e.target.style.borderColor = "#0B4DBB")}
                  onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
          ))}

          {/* Font family */}
          <div>
            <label style={labelStyle}>Font Family</label>
            <select
              value={theme.fontFamily}
              onChange={e => setTheme("fontFamily", e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1.5px solid #e5e7eb", fontSize: "14px", fontFamily: "inherit", outline: "none", cursor: "pointer", background: "#f8fafc" }}
            >
              {["Poppins", "Inter", "DM Sans", "Montserrat", "Raleway", "Nunito"].map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Card layout */}
          <div>
            <label style={labelStyle}>Card Layout</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["left", "portrait"].map(view => (
                <button
                  key={view}
                  onClick={() => setTheme("cardView", view)}
                  style={{
                    padding: "10px 16px", borderRadius: "12px", border: "none",
                    background: theme.cardView === view ? theme.buttonColor : "#e5e7eb",
                    color: theme.cardView === view ? theme.buttonTextColor : "#374151",
                    fontWeight: "700", cursor: "pointer", textTransform: "capitalize",
                    transition: "all 0.2s", fontSize: "13px",
                  }}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Lead Capture Tab ────────────────────────────────────────────────────────
  const leadFieldsList = [
    { key: "name", label: "Name", checked: form.leadCapture?.fields?.name },
    { key: "email", label: "Email", checked: form.leadCapture?.fields?.email },
    { key: "phone", label: "Phone", checked: form.leadCapture?.fields?.phone },
    { key: "company", label: "Company", checked: form.leadCapture?.fields?.company },
    { key: "message", label: "Message", checked: form.leadCapture?.fields?.message },
  ];

  const toggleLeadField = (field) => {
    setForm((prev) => ({
      ...prev,
      leadCapture: {
        ...prev.leadCapture,
        fields: { ...prev.leadCapture.fields, [field]: !prev.leadCapture.fields[field] },
      },
    }));
  };

  const leadTab = (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Fields to collect from visitors on your card.</p>
      <div style={{ padding: "12px 16px", borderRadius: "12px", background: "#eef2ff", border: "1.5px solid #c7d2fe", fontSize: "13px", color: "#4f46e5", lineHeight: 1.5 }}>
        Lead capture lets visitors submit their contact info directly from your card page.
      </div>
      {leadFieldsList.map((field) => {
        const checked = form.leadCapture?.fields?.[field.key];
        return (
          <label
            key={field.key}
            onClick={() => toggleLeadField(field.key)}
            style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", userSelect: "none" }}
          >
            <div
              style={{
                width: "24px", height: "24px", borderRadius: "7px",
                border: `2px solid ${checked ? theme.buttonColor : "#cbd5e1"}`,
                background: checked ? theme.buttonColor : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "0.2s", flexShrink: 0,
              }}
            >
              {checked && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: "14px", color: "#334155", fontWeight: "600" }}>{field.label}</span>
          </label>
        );
      })}
    </div>
  );

  const tabContent = { mycard: myCardTab, social: socialTab, company: companyTab, theme: themeTab, lead: leadTab };

  // ── Card Preview ─────────────────────────────────────────────────────────────
  const cardPreview = (
    <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 32px rgba(99,102,241,0.1)", border: "1px solid #f1f5f9" }}>
      {/* Cover — aspect-ratio matches the 16:5 cropper output */}
      <div style={{ aspectRatio: "16 / 5", minHeight: "60px", background: coverBg, position: "relative", overflow: "hidden" }}>
        {form.logoImage && (
          <div style={{ position: "absolute", top: "10px", right: "10px", width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.92)", padding: "4px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={form.logoImage} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        )}
      </div>
      {/* Body */}
      <div
        style={{
          background: theme.backgroundColor,
          padding: isPortrait ? "0 16px 20px" : "0 14px 16px",
          color: theme.textColor,
          fontFamily: theme.fontFamily,
          transition: "all 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: isCenter || isPortrait ? "center" : "flex-start",
          textAlign: isCenter || isPortrait ? "center" : "left",
        }}
      >
        {/* Avatar row */}
        <div
          style={{
            display: "flex",
            justifyContent: isPortrait ? "center" : "space-between",
            alignItems: "flex-end",
            marginTop: isPortrait ? "10px" : "16px",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          {form.profileImage && (
            <img
              src={form.profileImage}
              alt=""
              style={{
                width: isPortrait ? "72px" : "56px",
                height: isPortrait ? "72px" : "56px",
                borderRadius: isPortrait ? "50%" : "12px",
                objectFit: "cover",
                border: "3px solid #fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
            />
          )}
          {!isPortrait && (
            <button style={{ marginBottom: "4px", padding: "6px 12px", borderRadius: "10px", background: theme.buttonColor, color: theme.buttonTextColor, fontSize: "11px", fontWeight: "700", border: "none", cursor: "pointer", transition: "all 0.2s", fontFamily: theme.fontFamily }}>
              Connect
            </button>
          )}
        </div>

        {isPortrait && (
          <button style={{ marginBottom: "10px", padding: "7px 20px", borderRadius: "10px", background: theme.buttonColor, color: theme.buttonTextColor, fontSize: "11px", fontWeight: "700", border: "none", cursor: "pointer", fontFamily: theme.fontFamily }}>
            Connect
          </button>
        )}

        <h2 style={{ margin: "0 0 2px", fontSize: isPortrait ? "18px" : "15px", fontWeight: "800", color: theme.textColor, fontFamily: theme.fontFamily }}>
          {form.firstName} {form.lastName}
        </h2>
        <p style={{ margin: "0 0 2px", fontSize: "11px", color: theme.profileTheme, fontWeight: "700", fontFamily: theme.fontFamily }}>
          {form.jobTitle}{form.companyName ? ` · ${form.companyName}` : ""}
        </p>

        {(form.city || form.state || form.country) && (
          <p style={{ margin: "0 0 8px", fontSize: "10px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "3px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {[form.city, form.state, form.country].filter(Boolean).join(", ")}
          </p>
        )}

        {form.bio && (
          <p style={{ margin: "0 0 10px", fontSize: "11px", color: theme.textColor, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", fontFamily: theme.fontFamily }}>
            {form.bio}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", alignItems: isCenter || isPortrait ? "center" : "flex-start" }}>
          {form.phone && (
            <div style={{ ...pillStyle, fontSize: "11px", padding: "7px 10px" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={theme.buttonColor} strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.59a16 16 0 006.5 6.5l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              <span style={{ color: theme.textColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.phone}</span>
            </div>
          )}
          {form.email && (
            <div style={{ ...pillStyle, fontSize: "11px", padding: "7px 10px" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={theme.buttonColor} strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: theme.textColor }}>{form.email}</span>
            </div>
          )}
          {form.website && (
            <div style={{ ...pillStyle, fontSize: "11px", padding: "7px 10px" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={theme.buttonColor} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: theme.textColor }}>{form.website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Tab bar ── */
        .tab-bar { scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .tab-bar::-webkit-scrollbar { display: none; }

        /* ── Mobile preview overlay ── */
        .mobile-preview-overlay {
          display: none;
        }
        .mobile-preview-fab {
          display: none;
        }

        /* ── Breakpoints ── */

        /* ≤ 900px — stack columns */
        @media (max-width: 900px) {
          .edit-grid {
            grid-template-columns: 1fr !important;
          }
          .preview-col {
            display: none !important;
          }
          .mobile-preview-fab {
            display: flex !important;
            position: fixed;
            bottom: 24px;
            right: 20px;
            z-index: 200;
            align-items: center;
            gap: 8px;
            padding: 12px 18px;
            background: linear-gradient(135deg, #0B4DBB, #4CAF1D);
            color: #fff;
            border: none;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 6px 24px rgba(11,77,187,0.35);
            font-family: inherit;
          }
          .mobile-preview-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 300;
            background: rgba(15,23,42,0.55);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            overflow-y: auto;
          }
          .mobile-preview-sheet {
            background: #fff;
            border-radius: 24px 24px 0 0;
            padding: 20px 16px 40px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            max-height: 90vh;
            overflow-y: auto;
          }
        }

        /* ≤ 600px — tighten spacing */
        @media (max-width: 600px) {
          .page-header h1 { font-size: 22px !important; }
          .page-padding { padding: 16px 14px !important; }
          .tab-content-pad { padding: 18px 14px !important; }
          .name-fields { grid-template-columns: 1fr !important; }
          .two-col-grid { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
          .theme-fine-grid { grid-template-columns: 1fr !important; }
          .action-row { flex-direction: column !important; }
          .action-row button { width: 100% !important; }
          .media-name-row { flex-direction: column !important; }
          .media-name-row .name-fields { min-width: 100% !important; }
          .tab-bar button { padding: 12px 14px !important; font-size: 12px !important; }
        }

        /* ≤ 380px — extra-small phones */
        @media (max-width: 380px) {
          .page-padding { padding: 12px 10px !important; }
          .tab-content-pad { padding: 14px 10px !important; }
          .tab-bar button { padding: 11px 10px !important; font-size: 11px !important; }
        }
      `}</style>

      <main style={{ flex: 1, minWidth: 0, maxWidth: "100%", overflowX: "hidden", fontFamily: `'${theme.fontFamily}','Segoe UI',sans-serif` }}>
        <div className="page-padding" style={{ padding: "28px 20px" }}>

          {/* Page Header */}
          <div className="page-header" style={{ marginBottom: "20px" }}>
            <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "800", color: "#1e293b", display: "flex", alignItems: "center", gap: "10px" }}>
              {Icons.edit} Edit Profile
            </h1>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>Manage your digital business card.</p>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{ marginBottom: "16px", padding: "12px 16px", borderRadius: "12px", background: "#fef2f2", border: "1.5px solid #fecaca", color: "#dc2626", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {error}
              <button onClick={() => setError(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: "700", fontSize: "18px", padding: 0, lineHeight: 1, flexShrink: 0 }}>×</button>
            </div>
          )}

          {/* Grid layout */}
          <div className="edit-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>

            {/* ── LEFT: Form ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: 0 }}>
              <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1.5px solid #f1f5f9", boxShadow: "0 2px 16px rgba(99,102,241,0.06)" }}>

                {/* Tabs */}
                <div className="tab-bar" style={{ display: "flex", overflowX: "auto", borderBottom: "1.5px solid #f1f5f9" }}>
                  {tabs.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{
                        padding: "14px 18px",
                        border: "none",
                        borderBottom: `2px solid ${activeTab === id ? theme.buttonColor : "transparent"}`,
                        background: activeTab === id ? `${theme.buttonColor}12` : "transparent",
                        color: activeTab === id ? theme.buttonColor : "#64748b",
                        fontWeight: "700", cursor: "pointer", fontFamily: "inherit",
                        fontSize: "13px", whiteSpace: "nowrap", transition: "all 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="tab-content-pad" style={{ padding: "22px" }}>{tabContent[activeTab]}</div>
              </div>

              {/* Action buttons */}
              <div className="action-row" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: saved
                      ? "#10b981"
                      : loading
                        ? "linear-gradient(135deg,#0B4DBBcc,#4CAF1Dcc)"
                        : "linear-gradient(135deg,#0B4DBB,#4CAF1D)",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: saved
                      ? "0 4px 16px rgba(16,185,129,0.25)"
                      : "0 4px 20px rgba(11,77,187,0.28)",
                    transition: "all 0.2s",
                    opacity: loading ? 0.85 : 1,
                  }}
                >
                  {saved ? <>{Icons.check} Saved!</> : loading ? <>{Icons.loader} Saving…</> : <>{Icons.save} Save Changes</>}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    flex: "0 0 auto",
                    padding: "14px 22px",
                    borderRadius: "14px",
                    border: "1.5px solid #e2e8f0",
                    background: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#64748b",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#94a3b8"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* ── RIGHT: Preview (desktop only) ── */}
            <div className="preview-col" style={{ position: "sticky", top: "90px", minWidth: 0 }}>
              <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1.5px solid #f1f5f9", boxShadow: "0 2px 16px rgba(99,102,241,0.06)" }}>
                <div style={{ padding: "14px 18px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>Card Preview</span>
                  <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                    Live
                  </span>
                </div>
                <div style={{ margin: "14px" }}>{cardPreview}</div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Mobile: FAB to open preview ── */}
      <button
        className="mobile-preview-fab"
        onClick={() => setShowPreview(true)}
        aria-label="Preview card"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
        Preview Card
      </button>

      {/* ── Mobile: Preview sheet overlay ── */}
      {showPreview && (
        <div className="mobile-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="mobile-preview-sheet" onClick={e => e.stopPropagation()}>

            {/* Sheet handle + header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontWeight: "700", fontSize: "15px", color: "#1e293b" }}>Card Preview</span>
              <button
                onClick={() => setShowPreview(false)}
                style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: "#64748b" }}
              >
                ×
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>Live Preview</span>
            </div>

            {cardPreview}
          </div>
        </div>
      )}

      {/* ── Cover Cropper Modal (uses CoverImageCropper inline for legacy fallback) ── */}
      {showCropper && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.85)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              background: "#111",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                overflow: "hidden",
                borderRadius: "16px",
              }}
            >
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 5}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                position: "relative",
                zIndex: 999999,
              }}
            >
              <button
                type="button"
                onClick={() => setShowCropper(false)}
                style={{ padding: "12px 24px", cursor: "pointer" }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log("SAVE CLICKED");
                  saveCroppedCover();
                }}
                style={{
                  padding: "12px 24px",
                  background: "#0B4DBB",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Save Cover
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}