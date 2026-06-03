import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout({
  children,
}) {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "25px",
        }}
      >

        <Navbar />

        {children}

      </div>

    </div>
  );
}