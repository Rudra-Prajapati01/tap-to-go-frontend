import { useEffect, useState } from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [showLeadModal, setShowLeadModal] =
    useState(false);

  const [leadData, setLeadData] =
    useState({

      name: "",

      email: "",

      phone: "",

      company: "",

      message: "",
    });

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct =
    async () => {

      try {

        const res =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/products/${id}`
          );

        setProduct(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  const handleChange =
    (e) => {

      setLeadData({

        ...leadData,

        [e.target.name]:
          e.target.value,
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/leads`,

          {

            owner:

              product.owner?._id ||

              product.owner ||

              product.userId?._id ||

              product.userId,

            ...leadData,
          }
        );

        alert(
          "Inquiry sent successfully 🚀"
        );

        setShowLeadModal(false);

        setLeadData({

          name: "",

          email: "",

          phone: "",

          company: "",

          message: "",
        });

      } catch (error) {

        console.log(error);

        alert(
          "Failed to send inquiry"
        );
      }
    };

  if (!product) {

    return (

      <div
        style={{
          padding: "40px",
        }}
      >
        Loading...
      </div>

    );
  }

  return (

    <>
      <div
        style={{
          minHeight: "100vh",

          background: "#EAF4FF",

          padding:
            window.innerWidth < 768
              ? "20px 14px"
              : "40px 20px",
        }}
      >

        <div
          style={{
            maxWidth: "1200px",

            margin: "0 auto",

            background: "#fff",

            borderRadius:
              window.innerWidth < 768
                ? "24px"
                : "32px",

            overflow: "hidden",

            display: "grid",

            gridTemplateColumns:
              window.innerWidth < 768
                ? "1fr"
                : "1fr 1fr",

            boxShadow:
              "0 20px 60px rgba(15,23,42,0.08)",
          }}
        >

          {/* IMAGE */}

          <div
            style={{
              background: "#fff",

              padding:
                window.innerWidth < 768
                  ? "24px"
                  : "40px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",
            }}
          >

            <img
              src={product.image}

              alt={product.name}

              style={{
                width: "100%",

                maxHeight:
                  window.innerWidth < 768
                    ? "280px"
                    : "600px",

                objectFit: "contain",

                borderRadius: "20px",
              }}
            />

          </div>

          {/* CONTENT */}

          <div
            style={{
              padding:
                window.innerWidth < 768
                  ? "28px 24px"
                  : "50px",

              display: "flex",

              flexDirection: "column",

              gap:
                window.innerWidth < 768
                  ? "20px"
                  : "24px",
            }}
          >

            <span
              style={{
                background: "rgba(11,77,187,0.12)",

                color: "#0B4DBB",

                width: "fit-content",

                padding: "10px 18px",

                borderRadius: "999px",

                fontWeight: "700",

                fontSize: "14px",
              }}
            >
              Premium Product
            </span>

            <h1
              style={{
                fontSize:
                  window.innerWidth < 768
                    ? "38px"
                    : "54px",

                fontWeight: "900",

                lineHeight: 1.1,

                margin: 0,

                color: "#0f172a",

                wordBreak: "break-word",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontSize:
                  window.innerWidth < 768
                    ? "17px"
                    : "18px",

                lineHeight: "1.9",

                color: "#64748b",

                wordBreak: "break-word",

                margin: 0,
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                fontSize:
                  window.innerWidth < 768
                    ? "34px"
                    : "46px",

                fontWeight: "900",

                color: "#0B4DBB",
              }}
            >
              {product.currency}
              {product.price}
            </div>

            <button

              onClick={() =>
                setShowLeadModal(true)
              }

              style={{
                border: "none",

                padding:
                  window.innerWidth < 768
                    ? "16px"
                    : "18px",

                borderRadius: "18px",

                background:
                  "linear-gradient(135deg,#0B4DBB,#4CAF1D)",

                color: "#fff",

                fontSize: "16px",

                fontWeight: "800",

                cursor: "pointer",

                boxShadow:
                  "0 10px 30px rgba(11,77,187,0.35)",
              }}
            >
              💬 Inquiry Now
            </button>

          </div>

        </div>

      </div>

      {/* LEAD MODAL */}

      {
        showLeadModal && (

          <div
            style={{
              position: "fixed",

              top: 0,
              left: 0,

              width: "100%",

              height: "100vh",

              background:
                "rgba(15,23,42,0.55)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              padding: "20px",

              zIndex: 999,
            }}
          >

            <form

              onSubmit={handleSubmit}

              style={{
                width: "100%",

                maxWidth: "500px",

                background: "#fff",

                borderRadius: "28px",

                padding:
                  window.innerWidth < 768
                    ? "24px"
                    : "30px",

                display: "flex",

                flexDirection: "column",

                gap: "16px",

                boxShadow:
                  "0 20px 60px rgba(15,23,42,0.2)",
              }}
            >

              <h2
                style={{
                  margin: 0,

                  fontSize: "28px",

                  color: "#0f172a",
                }}
              >
                Inquiry for {product.name}
              </h2>

              <input
                type="text"

                name="name"

                value={leadData.name}

                onChange={handleChange}

                placeholder="Your Name"

                required

                style={{
                  padding: "16px",

                  borderRadius: "14px",

                  border:
                    "1px solid #e2e8f0",

                  outline: "none",

                  fontSize: "15px",
                }}
              />

              <input
                type="email"

                name="email"

                value={leadData.email}

                onChange={handleChange}

                placeholder="Your Email"

                required

                style={{
                  padding: "16px",

                  borderRadius: "14px",

                  border:
                    "1px solid #e2e8f0",

                  outline: "none",

                  fontSize: "15px",
                }}
              />

              <input
                type="text"

                name="phone"

                value={leadData.phone}

                onChange={handleChange}

                placeholder="Your Phone"

                required

                style={{
                  padding: "16px",

                  borderRadius: "14px",

                  border:
                    "1px solid #e2e8f0",

                  outline: "none",

                  fontSize: "15px",
                }}
              />

              <input
                type="text"

                name="company"

                value={leadData.company}

                onChange={handleChange}

                placeholder="Company Name"

                style={{
                  padding: "16px",

                  borderRadius: "14px",

                  border:
                    "1px solid #e2e8f0",

                  outline: "none",

                  fontSize: "15px",
                }}
              />

              <textarea
                rows={4}

                name="message"

                value={leadData.message}

                onChange={handleChange}

                placeholder="Message"

                style={{
                  padding: "16px",

                  borderRadius: "14px",

                  border:
                    "1px solid #e2e8f0",

                  outline: "none",

                  resize: "none",

                  fontSize: "15px",
                }}
              />

              <button
                type="submit"

                style={{
                  border: "none",

                  padding: "16px",

                  borderRadius: "16px",

                  background:
                    "linear-gradient(135deg,#0B4DBB,#4CAF1D)",

                  color: "#fff",

                  fontWeight: "800",

                  fontSize: "15px",

                  cursor: "pointer",

                  boxShadow:
                    "0 10px 30px rgba(11,77,187,0.35)",
                }}
              >
                Submit Inquiry
              </button>

              <button

                type="button"

                onClick={() =>
                  setShowLeadModal(false)
                }

                style={{
                  border: "none",

                  background: "none",

                  color: "#64748b",

                  cursor: "pointer",

                  fontSize: "15px",

                  fontWeight: "600",
                }}
              >
                Close
              </button>

            </form>

          </div>
        )
      }
    </>
  );
};

export default ProductDetails;