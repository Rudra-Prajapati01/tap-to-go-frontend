const ProductCard = ({
  image,
  name,
  description,
  price,
  currency = "₹",
  showPrice = true,
  theme = "#7c3aed",
}) => {

  const isMobile =
    window.innerWidth < 600;

  return (

    <>
      <style>{`

        .jt-product-card{
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .jt-product-card:hover{
          transform:translateY(-6px);
          box-shadow:
            0 20px 50px rgba(15,23,42,0.12) !important;
        }

        .jt-product-image img{
          transition:
            transform 0.35s ease;
        }

        .jt-product-card:hover .jt-product-image img{
          transform:scale(1.06);
        }

        .jt-inquiry-btn{
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .jt-inquiry-btn:hover{
          transform:translateY(-2px);
          opacity:0.92;
        }

        @media (max-width: 768px){

          .jt-product-card{
            border-radius:20px !important;
          }

          .jt-product-image{
            height:210px !important;
          }

          .jt-product-content{
            padding:18px !important;
          }

          .jt-product-title{
            font-size:18px !important;
          }

          .jt-product-desc{
            font-size:13px !important;
            min-height:auto !important;
          }

          .jt-product-footer{
            gap:14px !important;
          }

          .jt-product-price{
            font-size:24px !important;
          }

        }

        @media (max-width: 520px){

          .jt-product-image{
            height:180px !important;
          }

          .jt-product-content{
            padding:16px !important;
          }

          .jt-product-footer{
            flex-direction:column;
            align-items:stretch !important;
          }

          .jt-inquiry-btn{
            width:100%;
            justify-content:center;
          }

          .jt-product-title{
            font-size:17px !important;
          }

          .jt-product-price{
            font-size:22px !important;
          }

        }

      `}</style>

      <div
        className="jt-product-card"
        style={{
          width: "100%",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #eef2ff",
          boxShadow:
            "0 10px 30px rgba(15,23,42,0.08)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >

        {/* IMAGE */}

        <div
          className="jt-product-image"
          style={{
            width: "100%",
            height: isMobile
              ? "200px"
              : "240px",
            background: "#f8fafc",
            overflow: "hidden",
            position: "relative",
          }}
        >

          {image ? (

            <img
              src={image}
              alt={name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
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
                fontSize: "44px",
                color: "#94a3b8",
              }}
            >
              🛍️
            </div>

          )}

        </div>

        {/* CONTENT */}

        <div
          className="jt-product-content"
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >

          {/* TITLE */}

          <h2
            className="jt-product-title"
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {name}
          </h2>

          {/* DESCRIPTION */}

          <p
            className="jt-product-desc"
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#64748b",
              lineHeight: "1.7",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "72px",
              wordBreak: "break-word",
            }}
          >
            {description}
          </p>

          {/* FOOTER */}

          <div
            className="jt-product-footer"
            style={{
              marginTop: "auto",
              paddingTop: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >

            {/* LEFT */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >

              <span
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  fontWeight: "700",
                  marginBottom: "2px",
                }}
              >
                Starting From
              </span>

              {showPrice ? (

                <h3
                  className="jt-product-price"
                  style={{
                    margin: 0,
                    fontSize: "28px",
                    fontWeight: "900",
                    color: theme,
                    lineHeight: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {currency}
                  {price}
                </h3>

              ) : (

                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#64748b",
                    background: "#f8fafc",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    border:
                      "1px solid #e2e8f0",
                  }}
                >
                  Contact For Pricing
                </span>

              )}

            </div>

            {/* BUTTON */}

            <button
              className="jt-inquiry-btn"
              style={{
                border: "none",
                padding: "12px 18px",
                borderRadius: "14px",
                background:
                  `linear-gradient(135deg, ${theme}, ${theme})`,
                color: "#fff",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow:
                  "0 4px 14px rgba(15,23,42,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              💬 Inquiry
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default ProductCard;