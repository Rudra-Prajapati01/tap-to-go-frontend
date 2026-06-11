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
                href={`/u/${user.uniqueId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    background: "#0B4DBB",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 22px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                👁 View Live Profile
            </a>

            <div
                style={{
                    marginTop: "20px",
                }}
            >
            </div>

        </div>
    );
}