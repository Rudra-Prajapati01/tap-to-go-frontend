import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalLeads: 0,
    activeCards: 0,
    inactiveCards: 0,
    totalScans: 0,
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(
          res.data.stats
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {
    return (
      <h2>
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div>

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          marginBottom: "25px",
        }}
      >
        JioTap Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
        />

        <StatCard
          title="Leads"
          value={stats.totalLeads}
        />

        <StatCard
          title="Active Cards"
          value={stats.activeCards}
        />

        <StatCard
          title="Inactive Cards"
          value={stats.inactiveCards}
        />

        <StatCard
          title="Total Scans"
          value={stats.totalScans}
        />

      </div>

    </div>
  );
}