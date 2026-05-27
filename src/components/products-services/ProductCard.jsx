const ProductCard = ({
  image,
  name,
  description,
  price,
  currency = "₹",
  showPrice = true,
  theme = "#7c3aed",
}) => {

  return (

    <div
      style={{
        width: "100%",

        background: "#ffffff",

        borderRadius: "24px",

        overflow: "hidden",

        border: "1px solid #eef2ff",

        boxShadow:
          "0 10px 30px rgba(15,23,42,0.08)",

        transition: "all 0.3s ease",

        display: "flex",

        flexDirection: "column",

        position: "relative",
      }}
    >

      {/* IMAGE */}
      <div
        style={{
          width: "100%",

          height: "240px",

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

              transform: "scale(1.12)",

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
        style={{
          padding: "20px",

          display: "flex",

          flexDirection: "column",

          gap: "12px",

          flex: 1,
        }}
      >

        {/* PRODUCT NAME */}
        <h2
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
          }}
        >
          {name}
        </h2>

        {/* DESCRIPTION */}
        <p
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
          }}
        >
          {description}
        </p>

        {/* FOOTER */}
        <div
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
                style={{
                  margin: 0,

                  fontSize: "28px",

                  fontWeight: "900",

                  color: theme,

                  lineHeight: 1,
                }}
              >
                {currency}{price}
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

          {/* RIGHT */}
          <button
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
            }}
          >
            💬 Inquiry
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;