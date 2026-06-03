export default function StatCard({
  title,
  value,
}) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h4
        style={{
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          fontSize: "32px",
          fontWeight: "800",
        }}
      >
        {value}
      </h2>
    </div>
  );
}