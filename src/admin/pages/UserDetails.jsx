import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminAPI from "../../api/adminApi";

export default function UserDetails() {

    const { id } = useParams();

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        fetchUser();

    }, []);

    const fetchUser =
        async () => {

            try {

                const res =
                    await AdminAPI.get(
                        `/users/${id}`
                    );

                setUser(
                    res.data.user
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!user) {

        return (
            <h2>
                Loading...
            </h2>
        );

    }

    return (
        <div>

            <h1>
                {user.name}
            </h1>

            <p>
                Email:
                {user.email}
            </p>

            <p>
                Phone:
                {user.phone}
            </p>

            <p>
                Company:
                {user.companyName}
            </p>

            <p>
                Website:
                {user.website}
            </p>

            <p>
                Profile Link:
            </p>

            <a
                href={`${window.location.origin}/u/${user.uniqueId}`}
                target="_blank"
            >
                Open Profile
            </a>

            <div
                style={{
                    marginTop: "20px",
                }}
            >
                <button
                    onClick={() =>
                        navigate(
                            `/admin/users/edit/${user._id}`
                        )
                    }
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#6155A6",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Edit User
                </button>
            </div>

        </div>
    );
}