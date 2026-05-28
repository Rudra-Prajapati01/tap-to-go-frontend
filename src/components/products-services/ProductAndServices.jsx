import { useEffect, useState, useRef } from "react";
import axios from "axios";

/* ─────────────────────────────────────────────────────────────
   CURRENCIES
───────────────────────────────────────────────────────────── */

const CURRENCIES = [
  { symbol: "₹", label: "INR – ₹" },
  { symbol: "$", label: "USD – $" },
  { symbol: "€", label: "EUR – €" },
  { symbol: "£", label: "GBP – £" },
];

/* ─────────────────────────────────────────────────────────────
   INPUT STYLES
───────────────────────────────────────────────────────────── */

const inputStyle = {
  width: "100%",
  minHeight: "52px",
  borderRadius: "12px",
  border: "1.5px solid #e8eaf0",
  padding: "14px 16px",
  fontSize: "16px",
  outline: "none",
  background: "#fafbff",
  color: "#0f172a",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
  transition: "0.2s",
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

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */

const ProductAndServices = () => {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const emptyForm = {
    image: "",
    name: "",
    description: "",
    price: "",
    currency: "₹",
    showPrice: true,
  };

  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [deleteConfirm, setDeleteConfirm] =
    useState(null);

  const [focusedField, setFocusedField] =
    useState(null);

  const formRef = useRef(null);

  /* ───────────────────────────────────────────────────────── */

  const fetchProducts = async () => {

    try {

      const res =
        await axios.get(
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

  /* ───────────────────────────────────────────────────────── */

  const handleSubmit = async () => {

    if (!form.name.trim()) {

      return alert(
        "Product name is required."
      );
    }

    if (
      form.showPrice &&
      !form.price.trim()
    ) {

      return alert(
        "Please enter a price."
      );
    }

    try {

      setLoading(true);

      if (editingId) {

        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          {
            userId: user._id,
            ...form,
          }
        );

        setEditingId(null);

      } else {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          {
            userId: user._id,
            ...form,
          }
        );
      }

      setForm(emptyForm);

      fetchProducts();

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  /* ───────────────────────────────────────────────────────── */

  const handleEdit = (product) => {

    setEditingId(product._id);

    setForm({
      image: product.image || "",
      name: product.name || "",
      description:
        product.description || "",
      price: product.price || "",
      currency:
        product.currency || "₹",
      showPrice:
        product.showPrice !== false,
    });

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
      );

      setDeleteConfirm(null);

      fetchProducts();

    } catch (err) {

      console.error(err);

    }
  };

  /* ───────────────────────────────────────────────────────── */

  const handleImageUpload =
    async (file) => {

      if (!file) return;

      try {

        setLoading(true);

        const data =
          new FormData();

        data.append(
          "image",
          file
        );

        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload/product`,
            data
          );

        setForm((prev) => ({
          ...prev,
          image:
            res.data.imageUrl,
        }));

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

  /* ───────────────────────────────────────────────────────── */

  const dynInput = (name) => ({
    ...inputStyle,

    borderColor:
      focusedField === name
        ? "#7c3aed"
        : "#e8eaf0",

    boxShadow:
      focusedField === name
        ? "0 0 0 3px rgba(124,58,237,0.1)"
        : "none",
  });

  /* ───────────────────────────────────────────────────────── */

  return (

    <>
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        *{
          font-family:'DM Sans',sans-serif;
          box-sizing:border-box;
        }

        .ps-root{
          padding:28px 24px;
          max-width:1100px;
          margin:0 auto;
        }

        .ps-layout{
          display:grid;
          grid-template-columns:1fr 380px;
          gap:28px;
          align-items:start;
        }

        .ps-form-card{
          background:#fff;
          border-radius:20px;
          padding:28px;
          box-shadow:0 4px 24px rgba(15,23,42,0.07);
          border:1px solid #f1f5f9;
          min-width:0;
        }

        .ps-preview{
          position:sticky;
          top:24px;
        }

        .ps-card{
          transition:0.25s;
        }

        .ps-card:hover{
          transform:translateY(-4px);
          box-shadow:
            0 20px 50px rgba(15,23,42,0.12) !important;
        }

        .ps-product-grid{
          display:grid;
          grid-template-columns:
            repeat(auto-fill,minmax(300px,1fr));
          gap:20px;
        }

        .ps-btn{
          transition:0.2s;
        }

        .ps-btn:hover{
          transform:translateY(-1px);
        }

        @media (max-width:1100px){

          .ps-layout{
            grid-template-columns:1fr;
          }

          .ps-preview{
            position:relative;
            top:0;
          }

        }

        @media (max-width:768px){

          .ps-root{
            padding:18px 14px;
          }

          .ps-form-card{
            padding:20px;
          }

          .ps-product-grid{
            grid-template-columns:1fr;
          }

          .ps-price-row{
            flex-direction:column;
          }

          .ps-price-row select{
            width:100% !important;
          }

          .ps-action-row{
            flex-direction:column;
          }

          .ps-action-row button{
            width:100%;
          }

          .ps-preview{
            width:100%;
          }

        }

        @media (max-width:480px){

          .ps-root{
            padding:14px 10px;
          }

          .ps-form-card{
            padding:16px;
            border-radius:18px;
          }

          .ps-title{
            font-size:22px !important;
          }

          .ps-preview-image{
            height:180px !important;
          }

        }

      `}</style>

      <div className="ps-root">

        {/* HEADER */}

        <div style={{ marginBottom: "32px" }}>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >

            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg,#7c3aed,#a855f7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              🛍️
            </div>

            <h1
              className="ps-title"
              style={{
                fontSize: "26px",
                fontWeight: "800",
                margin: 0,
                color: "#0f172a",
              }}
            >
              Products & Services
            </h1>

          </div>

        </div>

        {/* LAYOUT */}

        <div className="ps-layout">

          {/* FORM */}

          <div
            ref={formRef}
            className="ps-form-card"
          >

            <h2
              style={{
                marginTop: 0,
                marginBottom: "24px",
              }}
            >
              {editingId
                ? "✏️ Edit Product"
                : "➕ Add Product"}
            </h2>

            {/* IMAGE */}

            <div
              style={{
                marginBottom: "18px",
              }}
            >

              <label style={labelStyle}>
                Product Image
              </label>

              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "20px",
                  border:
                    "2px dashed #e2e8f0",
                  borderRadius: "14px",
                  cursor: "pointer",
                  background: "#fafbff",
                }}
              >

                {form.image ? (

                  <img
                    src={form.image}
                    alt="preview"
                    style={{
                      width: "100%",
                      maxHeight: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                ) : (

                  <>
                    <span
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      📷
                    </span>

                    <span
                      style={{
                        fontSize: "13px",
                        color: "#94a3b8",
                        fontWeight: "600",
                      }}
                    >
                      Upload Image
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) =>
                    handleImageUpload(
                      e.target.files[0]
                    )
                  }
                />

              </label>

            </div>

            {/* NAME */}

            <div
              style={{
                marginBottom: "16px",
              }}
            >

              <label style={labelStyle}>
                Product Name
              </label>

              <input
                type="text"
                value={form.name}
                placeholder="Product name"
                onChange={(e) =>
                  setForm({
                    ...form,
                    name:
                      e.target.value,
                  })
                }
                onFocus={() =>
                  setFocusedField("name")
                }
                onBlur={() =>
                  setFocusedField(null)
                }
                style={dynInput("name")}
              />

            </div>

            {/* DESCRIPTION */}

            <div
              style={{
                marginBottom: "16px",
              }}
            >

              <label style={labelStyle}>
                Description
              </label>

              <textarea
                rows={4}
                placeholder="Description..."
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                style={{
                  ...dynInput("desc"),
                  resize: "none",
                  minHeight: "110px",
                }}
              />

            </div>

            {/* PRICE */}

            <div
              className="ps-price-row"
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "16px",
              }}
            >

              <select
                value={form.currency}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currency:
                      e.target.value,
                  })
                }
                style={{
                  ...inputStyle,
                  width: "130px",
                }}
              >

                {CURRENCIES.map(
                  (c) => (

                    <option
                      key={c.symbol}
                      value={c.symbol}
                    >
                      {c.label}
                    </option>

                  )
                )}

              </select>

              <input
                type="text"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price:
                      e.target.value,
                  })
                }
                style={{
                  ...dynInput("price"),
                  flex: 1,
                }}
              />

            </div>

            {/* SUBMIT */}

            <button
              className="ps-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                height: "52px",
                border: "none",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg,#7c3aed,#a855f7)",
                color: "#fff",
                fontWeight: "800",
                fontSize: "15px",
                cursor: "pointer",
                boxShadow:
                  "0 4px 16px rgba(124,58,237,0.3)",
              }}
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
            </button>

          </div>

          {/* PREVIEW */}

          <div className="ps-preview">

            <div
              style={{
                background: "#fff",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow:
                  "0 12px 50px rgba(124,58,237,0.14)",
                border:
                  "1px solid #ede9fe",
              }}
            >

              <div
                className="ps-preview-image"
                style={{
                  width: "100%",
                  height: "220px",
                  background: "#f1f5f9",
                }}
              >

                {form.image ? (

                  <img
                    src={form.image}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                ) : (

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                    }}
                  >
                    🖼️
                  </div>

                )}

              </div>

              <div
                style={{
                  padding: "20px",
                }}
              >

                <h3
                  style={{
                    marginTop: 0,
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                >
                  {form.name ||
                    "Product Name"}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {form.description ||
                    "Description preview"}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >

                  <span
                    style={{
                      fontSize: "26px",
                      fontWeight: "800",
                      color: "#7c3aed",
                    }}
                  >
                    {form.currency}
                    {form.price || "0"}
                  </span>

                  <button
                    style={{
                      border: "none",
                      padding:
                        "10px 16px",
                      borderRadius:
                        "10px",
                      background:
                        "linear-gradient(135deg,#7c3aed,#a855f7)",
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  >
                    Inquiry
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PRODUCT LIST */}

        {products.length > 0 && (

          <div
            style={{
              marginTop: "40px",
            }}
          >

            <h2
              style={{
                fontSize: "20px",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              Your Products
            </h2>

            <div className="ps-product-grid">

              {products.map(
                (product) => (

                  <div
                    key={product._id}
                    className="ps-card"
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow:
                        "0 4px 20px rgba(15,23,42,0.07)",
                    }}
                  >

                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        background:
                          "#f8fafc",
                      }}
                    >

                      {product.image ? (

                        <img
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit:
                              "contain",
                            background:
                              "#fff",
                            padding:
                              "12px",
                          }}
                        />

                      ) : (

                        <div
                          style={{
                            width:
                              "100%",
                            height:
                              "100%",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            fontSize:
                              "40px",
                          }}
                        >
                          🛍️
                        </div>

                      )}

                    </div>

                    <div
                      style={{
                        padding: "18px",
                      }}
                    >

                      <h3
                        style={{
                          marginTop: 0,
                          fontWeight:
                            "800",
                        }}
                      >
                        {product.name}
                      </h3>

                      <p
                        style={{
                          color:
                            "#64748b",
                        }}
                      >
                        {
                          product.description
                        }
                      </p>

                      <div
                        style={{
                          marginBottom:
                            "16px",
                        }}
                      >

                        <span
                          style={{
                            fontSize:
                              "24px",
                            fontWeight:
                              "800",
                            color:
                              "#7c3aed",
                          }}
                        >
                          {
                            product.currency
                          }
                          {
                            product.price
                          }
                        </span>

                      </div>

                      <div
                        className="ps-action-row"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: "10px",
                          marginTop: "8px",
                        }}
                      >

                        <button
                          className="ps-btn"
                          onClick={() =>
                            handleEdit(
                              product
                            )
                          }
                          style={{
                            height: "42px",
                            minWidth: "120px",
                            border: "none",
                            borderRadius: "12px",
                            background: "#f5f3ff",
                            color: "#7c3aed",
                            fontWeight: "700",
                            fontSize: "14px",
                            cursor: "pointer",
                            padding: "0 18px",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="ps-btn"
                          onClick={() =>
                            setDeleteConfirm(
                              product._id
                            )
                          }
                          style={{
                            width: "42px",
                            height: "42px",
                            border: "none",
                            borderRadius: "12px",
                            background: "#fee2e2",
                            color: "#ef4444",
                            fontWeight: "700",
                            fontSize: "15px",
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                        >
                          🗑
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default ProductAndServices;