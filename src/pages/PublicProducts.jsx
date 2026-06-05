import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate }
    from "react-router-dom";

const PublicProducts = ({
    userId,
    theme = "#0B4DBB",
}) => {

    const [products, setProducts] =
        useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        if (userId) {
            fetchProducts();
        }

    }, [userId]);

    const fetchProducts =
        async () => {

            try {

                const res =
                    await axios.get(

                        `${import.meta.env.VITE_API_URL}/api/products/user/${userId}`
                    );

                setProducts(res.data);

            } catch (error) {

                console.log(error);
            }
        };

    if (!products ||
        products.length === 0)
        return null;

    const activeProducts =
        products.filter(
            (p) => p.isActive !== false
        );

    if (activeProducts.length === 0)
        return null;

    return (

        <section
            style={{
                padding: "28px 0",
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    marginBottom: "24px",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: "28px",
                        fontWeight: "900",
                        color: "#0f172a",
                    }}
                >
                    Products & Services
                </h2>

                <div
                    style={{
                        width: "60px",
                        height: "5px",
                        borderRadius: "999px",
                        background: theme,
                        marginTop: "10px",
                    }}
                />
            </div>

            {/* GRID */}
            <div
                style={{
                    display: "grid",

                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(320px, 1fr))",

                    gap: "22px",
                }}
            >

                {activeProducts.map(
                    (product) => (

                        <div
                            key={product._id}

                            onClick={() =>
                                navigate(`/product/${product._id}`)
                            }

                            style={{
                                cursor: "pointer",

                                background: "#ffffff",

                                borderRadius: "24px",

                                overflow: "hidden",

                                boxShadow:
                                    "0 10px 30px rgba(15,23,42,0.08)",

                                border:
                                    "1px solid rgba(255,255,255,0.7)",

                                width: "100%",

                                display: "flex",

                                flexDirection: "column",

                                transition: "0.3s ease",
                            }}
                        >

                            {/* IMAGE */}
                            {/* IMAGE */}
                            <div
                                style={{
                                    width: "100%",

                                    height: "240px",

                                    background: "#f8fafc",

                                    overflow: "hidden",

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "center",

                                    padding: "16px",
                                }}
                            >

                                {product.image ? (

                                    <img
                                        src={product.image}

                                        alt={product.name}

                                        style={{
                                            maxWidth: "100%",

                                            maxHeight: "100%",

                                            objectFit: "contain",

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

                                            fontSize: "50px",
                                        }}
                                    >
                                        🛍️
                                    </div>
                                )}

                        </div>

                            {/* CONTENT */ }
                    < div
                                style = {{
                    padding: "20px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px",

                    flex: 1,
                }}
                            >

                {/* TITLE */}
                <h3
                    style={{
                        margin: 0,

                        fontSize: "22px",

                        fontWeight: "800",

                        color: "#0f172a",

                        lineHeight: 1.4,

                        display: "-webkit-box",

                        WebkitLineClamp: 2,

                        WebkitBoxOrient: "vertical",

                        overflow: "hidden",
                    }}
                >
                    {product.name}
                </h3>

                {/* DESCRIPTION */}
                {product.description && (

                    <p
                        style={{
                            margin: 0,

                            color: "#64748b",

                            fontSize: "14px",

                            lineHeight: 1.8,

                            display: "-webkit-box",

                            WebkitLineClamp: 4,

                            WebkitBoxOrient: "vertical",

                            overflow: "hidden",

                            minHeight: "95px",
                        }}
                    >
                        {product.description}
                    </p>
                )}

                {/* FOOTER */}
                <div
                    style={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        alignItems: "center",

                        marginTop: "auto",

                        paddingTop: "10px",
                    }}
                >

                    {/* PRICE */}
                    <div>

                        <span
                            style={{
                                fontSize: "12px",

                                color: "#94a3b8",

                                fontWeight: "700",
                            }}
                        >
                            Starting From
                        </span>

                        <div
                            style={{
                                fontSize: "28px",

                                fontWeight: "900",

                                color: theme,

                                marginTop: "2px",
                            }}
                        >
                            {product.showPrice !== false
                                ? product.price
                                    ? `${product.currency || "₹"}${product.price}`
                                    : "Contact"
                                : "Custom"}
                        </div>

                    </div>

                    {/* BUTTON */}
                    <button
                        style={{
                            border: "none",

                            padding: "12px 18px",

                            borderRadius: "14px",

                            background: theme,

                            color: "#fff",

                            fontWeight: "800",

                            fontSize: "13px",

                            cursor: "pointer",

                            boxShadow:
                                "0 4px 14px rgba(15,23,42,0.15)",
                        }}
                    >
                        💬 Inquiry
                    </button>

                </div>

            </div>

        </div>
    )
                )}

            </div >

        </section >
    );
};

export default PublicProducts;