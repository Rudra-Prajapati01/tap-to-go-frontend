import { useEffect, useState } from "react";
import AdminAPI from "../../api/adminApi";
import {
    useNavigate
} from "react-router-dom";


export default function Users() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const navigate =
        useNavigate();

    const fetchUsers = async () => {
        try {
            const res = await AdminAPI.get("/users");

            setUsers(res.data.users || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await AdminAPI.delete(
                `/users/${id}`
            );

            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredUsers = users.filter(
        (user) => {
            const name =
                user.name || "";

            const email =
                user.email || "";

            return (
                name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                email
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        }
    );

    if (loading) {
        return (
            <h2>
                Loading Users...
            </h2>
        );
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h1
                    style={{
                        fontSize: "32px",
                        fontWeight: "800",
                    }}
                >
                    Users
                </h1>

                <input
                    type="text"
                    placeholder="Search User..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    style={{
                        padding: "12px",
                        width: "300px",
                        borderRadius: "10px",
                        border:
                            "1px solid #ddd",
                    }}
                />
            </div>

            <div
                style={{
                    marginBottom: "20px",
                    fontSize: "18px",
                    fontWeight: "700",
                }}
            >
                Total Users: {users.length}
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse:
                            "collapse",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                background:
                                    "#f8fafc",
                            }}
                        >
                            <th style={th}>
                                Name
                            </th>

                            <th style={th}>
                                Email
                            </th>

                            <th style={th}>
                                Company
                            </th>

                            <th style={th}>
                                Status
                            </th>

                            <th style={th}>
                                Scans
                            </th>

                            <th style={th}>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map(
                            (user) => (
                                <tr
                                    key={user._id}
                                >
                                    <td style={td}>
                                        {user.name}
                                    </td>

                                    <td style={td}>
                                        {user.email}
                                    </td>

                                    <td style={td}>
                                        {user.companyName ||
                                            "-"}
                                    </td>

                                    <td style={td}>
                                        <span
                                            style={{
                                                background:
                                                    user.qrActive
                                                        ? "#dcfce7"
                                                        : "#fee2e2",

                                                color:
                                                    user.qrActive
                                                        ? "#166534"
                                                        : "#991b1b",

                                                padding:
                                                    "6px 12px",

                                                borderRadius:
                                                    "999px",

                                                fontSize:
                                                    "13px",
                                            }}
                                        >
                                            {user.qrActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>

                                    <td style={td}>
                                        {user.totalScans ||
                                            0}
                                    </td>

                                    <td style={td}>
                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                gap: "8px",
                                            }}
                                        >
                                            <button
                                                style={btnPrimary}
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/users/${user._id}`
                                                    )
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                style={btnSecondary}
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/users/edit/${user._id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                style={
                                                    btnDanger
                                                }
                                                onClick={() =>
                                                    deleteUser(
                                                        user._id
                                                    )
                                                }
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
    );
}

const th = {
    textAlign: "left",
    padding: "16px",
    fontWeight: "700",
};

const td = {
    padding: "16px",
    borderTop:
        "1px solid #f1f5f9",
};

const btnPrimary = {
    border: "none",
    background: "#6C47FF",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
};

const btnSecondary = {
    border: "none",
    background: "#2563eb",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
};

const btnDanger = {
    border: "none",
    background: "#ef4444",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
};