const Dashboard = () => {

  return (

    <div
      style={{
        padding:"30px",
      }}
    >

      <h1
        style={{
          fontSize:"40px",
          fontWeight:"800",
          marginBottom:"20px",
        }}
      >
        Welcome to Jio Tap 🚀
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",

          gap:"20px",
        }}
      >

        <div style={cardStyle}>
          <h2>Total Leads</h2>
          <h1>9</h1>
        </div>

        <div style={cardStyle}>
          <h2>Profile Views</h2>
          <h1>50</h1>
        </div>

        <div style={cardStyle}>
          <h2>Link Clicks</h2>
          <h1>10</h1>
        </div>

      </div>

    </div>
  );
};

const cardStyle = {

  background:"#fff",

  borderRadius:"24px",

  padding:"30px",

  boxShadow:
    "0 10px 30px rgba(15,23,42,0.06)",
};

export default Dashboard;