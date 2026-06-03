import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactRequests() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    useEffect(() => {
        const filtered = contacts.filter(
            (contact) =>
                contact.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                contact.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                contact.company
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        );

        setFilteredContacts(filtered);
    }, [search, contacts]);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/contacts`
            );

            setContacts(res.data.contacts || []);
            setFilteredContacts(res.data.contacts || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this contact request?"
            );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/contacts/${id}`
            );

            setContacts(prev =>
                prev.filter(
                    contact => contact._id !== id
                )
            );

            setFilteredContacts(prev =>
                prev.filter(
                    contact => contact._id !== id
                )
            );

        } catch (error) {

            console.error(error);
            alert("Delete failed");

        }

    };

    return (
        <div
            style={{
                padding: "30px",
                background: "#f5f7fb",
                minHeight: "100vh",
            }}
        >
            {/* HEADER */}
            <div
                style={{
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "20px",
                    marginBottom: "25px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        color: "#111827",
                        fontSize: "32px",
                        fontWeight: "700",
                    }}
                >
                    Contact Requests
                </h1>

                <p
                    style={{
                        marginTop: "8px",
                        color: "#6b7280",
                    }}
                >
                    Manage all customer inquiries from JioTap website
                </p>
            </div>

            {/* STATS */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        background:
                            "linear-gradient(135deg,#6155A6,#A685E2)",
                        color: "#fff",
                        padding: "25px",
                        borderRadius: "18px",
                        minWidth: "250px",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "36px",
                        }}
                    >
                        {contacts.length}
                    </h2>

                    <p
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        Total Requests
                    </p>
                </div>
            </div>

            {/* SEARCH */}
            <div
                style={{
                    marginBottom: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search by name, email or company..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "14px 18px",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                        fontSize: "15px",
                        outline: "none",
                    }}
                />
            </div>

            {/* TABLE */}
            {loading ? (
                <div
                    style={{
                        background: "#fff",
                        padding: "30px",
                        borderRadius: "16px",
                    }}
                >
                    Loading...
                </div>
            ) : filteredContacts.length === 0 ? (
                <div
                    style={{
                        background: "#fff",
                        padding: "30px",
                        borderRadius: "16px",
                    }}
                >
                    No contact requests found.
                </div>
            ) : (
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.06)",
                    }}
                >
                    <div
                        style={{
                            overflowX: "auto",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#6155A6,#A685E2)",
                                        color: "#fff",
                                    }}
                                >
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Phone</th>
                                    <th style={thStyle}>Company</th>
                                    <th style={thStyle}>Date</th>
                                    <th style={thStyle}>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredContacts.map(
                                    (contact) => (
                                        <tr
                                            key={contact._id}
                                            style={{
                                                borderBottom:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            <td style={tdStyle}>
                                                {contact.name}
                                            </td>

                                            <td style={tdStyle}>
                                                {contact.email}
                                            </td>

                                            <td style={tdStyle}>
                                                {contact.phone}
                                            </td>

                                            <td style={tdStyle}>
                                                {contact.company}
                                            </td>

                                            <td style={tdStyle}>
                                                {new Date(
                                                    contact.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            <td style={tdStyle}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                    }}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            setSelectedMessage(contact)
                                                        }
                                                        style={{
                                                            background: "#6155A6",
                                                            color: "#fff",
                                                            border: "none",
                                                            padding: "8px 14px",
                                                            borderRadius: "8px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(contact._id)
                                                        }
                                                        style={{
                                                            background: "#ef4444",
                                                            color: "#fff",
                                                            border: "none",
                                                            padding: "8px 14px",
                                                            borderRadius: "8px",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MESSAGE MODAL */}
            {selectedMessage && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background:
                            "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            width: "90%",
                            maxWidth: "600px",
                            borderRadius: "20px",
                            padding: "25px",
                        }}
                    >
                        <h2>
                            Message From{" "}
                            {selectedMessage.name}
                        </h2>

                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedMessage.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {selectedMessage.phone}
                        </p>

                        <p>
                            <strong>Company:</strong>{" "}
                            {selectedMessage.company}
                        </p>

                        <hr />

                        <p
                            style={{
                                lineHeight: "1.8",
                            }}
                        >
                            {selectedMessage.message}
                        </p>

                        <button
                            onClick={() =>
                                setSelectedMessage(null)
                            }
                            style={{
                                marginTop: "20px",
                                background: "#ef4444",
                                color: "#fff",
                                border: "none",
                                padding: "10px 18px",
                                borderRadius: "10px",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const thStyle = {
    padding: "16px",
    textAlign: "left",
};

const tdStyle = {
    padding: "16px",
};