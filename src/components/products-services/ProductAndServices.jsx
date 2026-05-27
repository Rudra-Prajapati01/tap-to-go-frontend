import { useEffect, useState, useRef } from "react";
import axios from "axios";

// ─── CURRENCY OPTIONS ─────────────────────────────────────────────────────────
const CURRENCIES = [
  { symbol: "₹", label: "INR – ₹" },
  { symbol: "$", label: "USD – $" },
  { symbol: "€", label: "EUR – €" },
  { symbol: "£", label: "GBP – £" },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  minHeight: "52px",
  borderRadius: "12px",
  border: "1.5px solid #e8eaf0",
  padding: "14px 16px",
  fontSize: "14.5px",
  outline: "none",
  background: "#fafbff",
  color: "#0f172a",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#64748b",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  marginBottom: "6px",
  display: "block",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const ProductAndServices = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const emptyForm = {
    image: "",
    name: "",
    description: "",
    price: "",
    currency: "₹",
    showPrice: true,
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // product._id
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  // ── FETCH ──────────────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/user/${user._id}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ── ADD / UPDATE ───────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Product name is required.");
    if (form.showPrice && !form.price.trim()) return alert("Please enter a price or hide pricing.");

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          { userId: user._id, ...form }
        );
        setEditingId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
          userId: user._id,
          ...form,
        });
      }
      setForm(emptyForm);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── EDIT ───────────────────────────────────────────────────────────────────
  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      image: product.image || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      currency: product.currency || "₹",
      showPrice: product.showPrice !== false,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      setDeleteConfirm(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ── IMAGE UPLOAD ───────────────────────────────────────────────────────────
  const handleImageUpload = async (file) => {
    if (!file) return;
    try {
      setLoading(true);
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/product`,
        data
      );
      setForm((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── FOCUSED INPUT STYLE ────────────────────────────────────────────────────
  const dynInput = (name) => ({
    ...inputStyle,
    borderColor: focusedField === name ? "#7c3aed" : "#e8eaf0",
    boxShadow: focusedField === name ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
  });

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .ps-card { transition: transform 0.2s, box-shadow 0.2s; }
        .ps-card:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(15,23,42,0.12) !important; }
        .ps-btn-del { transition: background 0.15s, transform 0.1s; }
        .ps-btn-del:hover { background: #dc2626 !important; transform: scale(1.04); }
        .ps-btn-edit { transition: background 0.15s, transform 0.1s; }
        .ps-btn-edit:hover { background: #ede9fe !important; transform: scale(1.04); }
        .ps-chip { animation: fadeIn 0.25s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
      `}</style>

      <div style={{ padding: "28px 24px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
            }}>🛍️</div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", margin: 0, color: "#0f172a" }}>
              Products & Services
            </h1>
          </div>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14.5px" }}>
            Manage your offerings — they'll display beautifully on your public profile.
          </p>
        </div>

        {/* ── TWO-COLUMN LAYOUT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "28px", alignItems: "start" }}>

          {/* ── FORM ── */}
          <div ref={formRef} style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
            border: "1px solid #f1f5f9",
          }}>
            {/* Form header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: "#0f172a" }}>
                {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
              </h2>
              {editingId && (
                <button onClick={handleCancelEdit} style={{
                  border: "none", background: "#f1f5f9", color: "#64748b",
                  padding: "7px 14px", borderRadius: "8px", cursor: "pointer",
                  fontSize: "13px", fontWeight: "600",
                }}>
                  Cancel
                </button>
              )}
            </div>

            {/* Image upload */}
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Product Image</label>
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: "8px", padding: "20px",
                border: "2px dashed #e2e8f0", borderRadius: "14px",
                cursor: "pointer", background: "#fafbff",
                transition: "border-color 0.2s",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#7c3aed"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}
              >
                {form.image ? (
                  <img src={form.image} alt="preview"
                    style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "10px" }} />
                ) : (
                  <>
                    <span style={{ fontSize: "28px" }}>📷</span>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>
                      Click to upload product image
                    </span>
                  </>
                )}
                <input type="file" accept="image/*" style={{ display: "none" }}
                  onChange={e => handleImageUpload(e.target.files[0])} />
              </label>
              {loading && (
                <p style={{ color: "#7c3aed", fontWeight: "600", margin: "6px 0 0", fontSize: "13px" }}>
                  ⏳ Uploading…
                </p>
              )}
            </div>

            {/* Name */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Product Name *</label>
              <input type="text" placeholder="e.g. Logo Design Package"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={dynInput("name")} />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Description</label>
              <textarea placeholder="What's included? Who is it for?"
                rows={4} value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                onFocus={() => setFocusedField("desc")}
                onBlur={() => setFocusedField(null)}
                style={{ ...dynInput("desc"), resize: "none", minHeight: "110px", paddingTop: "14px" }} />
            </div>

            {/* Price + Currency */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Pricing</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Currency selector */}
                <select
                  value={form.currency}
                  onChange={e => setForm({ ...form, currency: e.target.value })}
                  style={{
                    ...inputStyle, width: "130px", flexShrink: 0, cursor: "pointer",
                    borderColor: focusedField === "curr" ? "#7c3aed" : "#e8eaf0",
                    boxShadow: focusedField === "curr" ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
                  }}
                  onFocus={() => setFocusedField("curr")}
                  onBlur={() => setFocusedField(null)}
                >
                  {CURRENCIES.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.label}</option>
                  ))}
                </select>

                {/* Price input */}
                <input type="text" placeholder="e.g. 1999"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  onFocus={() => setFocusedField("price")}
                  onBlur={() => setFocusedField(null)}
                  disabled={!form.showPrice}
                  style={{
                    ...dynInput("price"),
                    flex: 1,
                    opacity: form.showPrice ? 1 : 0.45,
                  }} />
              </div>
            </div>

            {/* Show price toggle */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              marginBottom: "24px", padding: "14px 16px",
              background: "#fafbff", borderRadius: "12px",
              border: "1.5px solid #e8eaf0",
            }}>
              <div
                onClick={() => setForm({ ...form, showPrice: !form.showPrice })}
                style={{
                  width: "44px", height: "24px", borderRadius: "99px",
                  background: form.showPrice ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "#cbd5e1",
                  cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
                }}>
                <div style={{
                  position: "absolute", top: "3px",
                  left: form.showPrice ? "23px" : "3px",
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: "#fff", transition: "left 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }} />
              </div>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", cursor: "pointer" }}
                onClick={() => setForm({ ...form, showPrice: !form.showPrice })}>
                {form.showPrice ? "Show price publicly" : "Hidden — show \"Custom Pricing\""}
              </label>
            </div>

            {/* Submit button */}
            <button onClick={handleSubmit} disabled={loading} style={{
              width: "100%", height: "52px", border: "none", borderRadius: "14px",
              background: editingId
                ? "linear-gradient(135deg,#0ea5e9,#6366f1)"
                : "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff", fontWeight: "800", fontSize: "15px", cursor: "pointer",
              opacity: loading ? 0.7 : 1, letterSpacing: "0.02em",
              boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,58,237,0.4)"; } }}
              onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.3)"; }}
            >
              {loading ? "Saving…" : editingId ? "✅ Update Product" : "➕ Add Product"}
            </button>
          </div>

          {/* ── LIVE PREVIEW ── */}
          <div style={{ position: "sticky", top: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff", padding: "4px 12px", borderRadius: "99px",
                fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em",
              }}>
                ⚡ LIVE PREVIEW
              </span>
            </div>

            <div style={{
              background: "#fff", borderRadius: "22px", overflow: "hidden",
              boxShadow: "0 12px 50px rgba(124,58,237,0.14)",
              border: "1px solid #ede9fe",
            }}>
              {/* Preview image */}
              <div style={{ width: "100%", height: "220px", background: "#f1f5f9", overflow: "hidden" }}>
                {form.image ? (
                  <img src={form.image} alt="preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{
                    width: "100%", height: "100%", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "8px", color: "#94a3b8",
                  }}>
                    <span style={{ fontSize: "32px" }}>🖼️</span>
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>Image preview</span>
                  </div>
                )}
              </div>

              {/* Preview content */}
              <div style={{ padding: "20px" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "19px", fontWeight: "800", color: "#0f172a", lineHeight: 1.3 }}>
                  {form.name || <span style={{ color: "#cbd5e1" }}>Product Name</span>}
                </h3>
                <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: "13.5px", lineHeight: 1.65 }}>
                  {form.description || <span style={{ color: "#cbd5e1" }}>Description appears here…</span>}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {form.showPrice ? (
                    <span style={{ fontSize: "26px", fontWeight: "800", color: "#7c3aed" }}>
                      {form.currency}{form.price || "0"}
                    </span>
                  ) : (
                    <span style={{
                      fontSize: "13px", fontWeight: "700", color: "#64748b",
                      background: "#f8fafc", padding: "6px 12px", borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}>
                      Custom Pricing
                    </span>
                  )}
                  <button style={{
                    border: "none", padding: "10px 16px", borderRadius: "10px",
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                    color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "default",
                  }}>
                    💬 Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              marginTop: "16px", padding: "14px 18px",
              background: "#faf5ff", borderRadius: "14px",
              border: "1px solid #ede9fe", display: "flex", gap: "16px",
            }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#7c3aed" }}>{products.length}</div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Products</div>
              </div>
              <div style={{ width: "1px", background: "#e9d5ff" }} />
              <div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#7c3aed" }}>
                  {products.filter(p => p.showPrice !== false).length}
                </div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Priced</div>
              </div>
              <div style={{ width: "1px", background: "#e9d5ff" }} />
              <div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#7c3aed" }}>
                  {products.filter(p => p.showPrice === false).length}
                </div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em" }}>Hidden</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRODUCT LIST ── */}
        {products.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
              Your Products ({products.length})
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}>
              {products.map(product => (
                <div key={product._id} className="ps-card" style={{
                  background: "#fff", borderRadius: "20px", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.07)",
                  border: "1px solid #f1f5f9", position: "relative",
                }}>
                  {/* Active badge */}
                  <div style={{
                    position: "absolute", top: "12px", left: "12px", zIndex: 2,
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
                    padding: "4px 10px", borderRadius: "99px",
                    fontSize: "11px", fontWeight: "700", color: "#10b981",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}>● Active</div>

                  {/* Image */}
                  <div style={{ width: "100%", height: "200px", background: "#f8fafc", overflow: "hidden" }}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}

                        style={{
                          width: "100%",
                          height: "100%",

                          objectFit: "contain",

                          background: "#fff",

                          padding: "12px",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%", display: "flex",
                        alignItems: "center", justifyContent: "center", fontSize: "36px",
                      }}>🛍️</div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 18px 16px" }}>
                    <h3 style={{ margin: "0 0 6px", fontSize: "17px", fontWeight: "800", color: "#0f172a", lineHeight: 1.3 }}>
                      {product.name}
                    </h3>
                    {product.description && (
                      <p style={{
                        margin: "0 0 14px", color: "#64748b", fontSize: "13px",
                        lineHeight: 1.6, display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {product.description}
                      </p>
                    )}

                    {/* Price chip */}
                    <div style={{ marginBottom: "16px" }}>
                      {product.showPrice !== false ? (
                        <span style={{
                          fontSize: "22px", fontWeight: "800",
                          background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>
                          {product.currency || "₹"}{product.price}
                        </span>
                      ) : (
                        <span style={{
                          display: "inline-block", fontSize: "12px", fontWeight: "700",
                          color: "#64748b", background: "#f1f5f9", padding: "5px 12px",
                          borderRadius: "8px", border: "1px solid #e2e8f0",
                        }}>
                          Custom Pricing
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="ps-btn-edit" onClick={() => handleEdit(product)} style={{
                        flex: 1, height: "40px", border: "none", borderRadius: "10px",
                        background: "#f5f3ff", color: "#7c3aed", fontWeight: "700",
                        fontSize: "13px", cursor: "pointer",
                      }}>
                        ✏️ Edit
                      </button>

                      {deleteConfirm === product._id ? (
                        <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                          <button onClick={() => handleDelete(product._id)} style={{
                            flex: 1, height: "40px", border: "none", borderRadius: "10px",
                            background: "#ef4444", color: "#fff", fontWeight: "700",
                            fontSize: "12px", cursor: "pointer",
                          }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{
                            flex: 1, height: "40px", border: "none", borderRadius: "10px",
                            background: "#f1f5f9", color: "#64748b", fontWeight: "700",
                            fontSize: "12px", cursor: "pointer",
                          }}>Cancel</button>
                        </div>
                      ) : (
                        <button className="ps-btn-del" onClick={() => setDeleteConfirm(product._id)} style={{
                          width: "40px", height: "40px", border: "none", borderRadius: "10px",
                          background: "#fee2e2", color: "#ef4444", fontWeight: "700",
                          fontSize: "16px", cursor: "pointer", flexShrink: 0,
                        }}>
                          🗑
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {products.length === 0 && (
          <div style={{
            marginTop: "40px", textAlign: "center", padding: "48px 24px",
            background: "#fff", borderRadius: "20px",
            border: "2px dashed #e2e8f0",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🛍️</div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
              No products yet
            </h3>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Add your first product or service using the form above.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductAndServices;