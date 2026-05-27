import { useEffect, useState } from "react";
import axios from "axios";

const Leads = () => {

  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedLead, setSelectedLead] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    fetchLeads();

  }, []);

  const fetchLeads = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/leads/${user._id}`

      );

      setLeads(

        Array.isArray(res.data)
          ? res.data
          : []

      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        padding: "30px",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "25px",
          color: "#1e1b4b",
        }}
      >
        Contacts
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #eee",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr 1fr",
            padding: "18px 24px",
            fontWeight: "700",
            color: "#64748b",
            borderBottom:
              "1px solid #eee",
            background: "#fafafa",
          }}
        >

          <div>Contact</div>
          <div>Company</div>
          <div>Date</div>
          <div>Action</div>

        </div>

        {/* LOADING */}
        {loading && (

          <div
            style={{
              padding: "40px",
            }}
          >
            Loading...
          </div>

        )}

        {/* EMPTY */}
        {!loading &&
          leads.length === 0 && (

            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No Leads Yet 🚀
            </div>

          )}

        {/* LEADS */}
        {leads.map((lead) => (

          <div
            key={lead._id}
            style={{
              display: "grid",
              gridTemplateColumns:
                "2fr 1fr 1fr 1fr",
              padding: "20px 24px",
              borderBottom:
                "1px solid #f1f5f9",
              alignItems: "center",
            }}
          >

            {/* CONTACT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >

              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    "#ede9fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  fontWeight: "700",
                  color: "#7c3aed",
                }}
              >

                {lead.name?.charAt(0)}

              </div>

              <div>

                <div
                  style={{
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {lead.name}
                </div>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                  }}
                >
                  {lead.email}
                </div>

              </div>

            </div>

            {/* COMPANY */}
            <div>
              {lead.company || "-"}
            </div>

            {/* DATE */}
            <div>

              {new Date(
                lead.createdAt
              ).toLocaleDateString()}

            </div>

            {/* ACTION */}
            <div>

              <button
                onClick={() =>
                  setSelectedLead(lead)
                }
                style={{
                  background:
                    "linear-gradient(135deg,#7c3aed,#ec4899)",
                  color: "#fff",
                  border: "none",
                  padding:
                    "10px 18px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                View
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {selectedLead && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",
            zIndex: 999,
          }}
        >

          <div
            style={{
              width: "90%",
              maxWidth: "700px",
              background: "#fff",
              borderRadius: "28px",
              padding: "35px",
              position: "relative",
            }}
          >

            <button
              onClick={() =>
                setSelectedLead(null)
              }
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: "30px",
                fontWeight: "800",
                marginBottom: "25px",
              }}
            >
              View Connection
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "24px",
              }}
            >

              <div>

                <p>
                  <strong>
                    Full Name:
                  </strong>
                  <br />
                  {selectedLead.name}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>
                  <br />
                  {selectedLead.email}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>
                  <br />
                  {selectedLead.phone}
                </p>

                <p>
                  <strong>
                    Company:
                  </strong>
                  <br />
                  {selectedLead.company}
                </p>

                <p>
                  <strong>
                    Message:
                  </strong>
                  <br />
                  {selectedLead.message}
                </p>

              </div>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "24px",
                  padding: "24px",
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: "16px",
                  justifyContent:
                    "center",
                }}
              >

                <button
                  style={{
                    background:
                      "#7c3aed",
                    color: "#fff",
                    border: "none",
                    padding:
                      "14px",
                    borderRadius:
                      "14px",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Save Contact
                </button>

                <button
                  style={{
                    background:
                      "#0f172a",
                    color: "#fff",
                    border: "none",
                    padding:
                      "14px",
                    borderRadius:
                      "14px",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Export Contact
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Leads;