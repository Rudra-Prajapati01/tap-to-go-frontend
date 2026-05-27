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

          background: "#f8fafc",

          padding: "40px 20px",
        }}
      >

        <div
          style={{
            maxWidth: "1200px",

            margin: "0 auto",

            background: "#fff",

            borderRadius: "32px",

            overflow: "hidden",

            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            boxShadow:
              "0 20px 60px rgba(15,23,42,0.08)",
          }}
        >

          {/* IMAGE */}
          <div
            style={{
              background: "#fff",

              padding: "40px",

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

                maxHeight: "600px",

                objectFit: "contain",
              }}
            />

          </div>

          {/* CONTENT */}
          <div
            style={{
              padding: "50px",

              display: "flex",

              flexDirection: "column",

              gap: "24px",
            }}
          >

            <span
              style={{
                background: "#ede9fe",

                color: "#7c3aed",

                width: "fit-content",

                padding: "8px 16px",

                borderRadius: "999px",

                fontWeight: "700",
              }}
            >
              Premium Product
            </span>

            <h1
              style={{
                fontSize: "48px",

                fontWeight: "900",

                lineHeight: 1.1,

                margin: 0,
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontSize: "17px",

                lineHeight: "1.9",

                color: "#64748b",
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                fontSize: "42px",

                fontWeight: "900",

                color: "#7c3aed",
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

                padding: "18px",

                borderRadius: "18px",

                background:
                  "linear-gradient(135deg,#7c3aed,#a855f7)",

                color: "#fff",

                fontSize: "16px",

                fontWeight: "800",

                cursor: "pointer",
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
                "rgba(0,0,0,0.5)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              zIndex: 999,
            }}
          >

            <form

              onSubmit={handleSubmit}

              style={{
                width: "95%",

                maxWidth: "500px",

                background: "#fff",

                borderRadius: "24px",

                padding: "30px",

                display: "flex",

                flexDirection: "column",

                gap: "16px",
              }}
            >

              <h2
                style={{
                  margin: 0,
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
                  padding: "14px",

                  borderRadius: "12px",

                  border:
                    "1px solid #e2e8f0",
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
                  padding: "14px",

                  borderRadius: "12px",

                  border:
                    "1px solid #e2e8f0",
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
                  padding: "14px",

                  borderRadius: "12px",

                  border:
                    "1px solid #e2e8f0",
                }}
              />

              <input
                type="text"

                name="company"

                value={leadData.company}

                onChange={handleChange}

                placeholder="Company Name"

                style={{
                  padding: "14px",

                  borderRadius: "12px",

                  border:
                    "1px solid #e2e8f0",
                }}
              />

              <textarea
                rows={4}

                name="message"

                value={leadData.message}

                onChange={handleChange}

                placeholder="Message"

                style={{
                  padding: "14px",

                  borderRadius: "12px",

                  border:
                    "1px solid #e2e8f0",
                }}
              />

              <button
                type="submit"

                style={{
                  border: "none",

                  padding: "16px",

                  borderRadius: "14px",

                  background:
                    "linear-gradient(135deg,#7c3aed,#a855f7)",

                  color: "#fff",

                  fontWeight: "800",

                  cursor: "pointer",
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