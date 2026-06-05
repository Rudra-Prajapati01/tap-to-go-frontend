import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Dashboard = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShare = async () => {

    try {

      const profileLink =
        `${window.location.origin}/u/${user?.uniqueId}`;

      await navigator.clipboard.writeText(
        profileLink
      );

      alert("Profile Link Copied 🚀");

    } catch (error) {

      console.log(error);
    }
  };

  const handleViewCard = () => {

    if (!user?.uniqueId) {

      alert("Profile not ready yet");
      return;
    }

    window.open(
      `/u/${user.uniqueId}`,
      "_blank"
    );
  };

  return (

    <>
      <style>{`

        .dashboard-wrapper{

          display:flex;
          flex-direction:column;
          gap:24px;
        }

        .dashboard-grid{

          display:grid;
          grid-template-columns:1.5fr 1fr;
          gap:24px;
        }

        .dashboard-card{

          background:#fff;
          border-radius:28px;
          overflow:hidden;

          box-shadow:
          0 10px 40px rgba(15,23,42,.06);
        }

        .action-btn{

          border:none;
          border-radius:14px;
          padding:14px;

          cursor:pointer;

          font-weight:700;

          background:
          linear-gradient(
            135deg,
            #0B4DBB,
            #4CAF1D
          );

          color:#fff;

          width:100%;

          font-size:14px;

          transition:.3s;
        }

        .action-btn:hover{

          transform:translateY(-2px);
        }

        @media(max-width:900px){

          .dashboard-grid{

            grid-template-columns:1fr;
          }
        }

      `}</style>

      <div className="dashboard-wrapper">

        {/* HEADER */}

        <div>

          <h1
            style={{
              fontSize: "34px",
              fontWeight: "900",
              color: "#1e293b",
              marginBottom: "8px",
            }}
          >
            Welcome Back 👋
          </h1>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Manage your digital business card
          </p>

        </div>

        {/* GRID */}

        <div className="dashboard-grid">

          {/* CARD 1 */}

          <div className="dashboard-card">

            <div
              style={{
                height: "180px",
                background: user?.coverImage
                  ? `url(${user.coverImage}) center/cover`
                  : "linear-gradient(135deg,#0B4DBB,#4CAF1D,#2E7BFF)",
              }}
            />

            <div
              style={{
                padding: "24px",
                marginTop: "-60px",
              }}
            >

              <img
                src={
                  user?.profileImage ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt=""
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border:
                    "5px solid #fff",
                }}
              />

              <h2
                style={{
                  marginTop: "18px",
                  marginBottom: "6px",
                  color: "#1e293b",
                  fontWeight: "800",
                }}
              >
                {user?.name || "Your Name"}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: "24px",
                }}
              >
                {user?.jobTitle ||
                  "Digital Business Card"}
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >

                <button
                  className="action-btn"
                  onClick={() =>
                    navigate(
                      "/dashboard/profile"
                    )
                  }
                >
                  Edit Profile
                </button>

                <button
                  className="action-btn"
                  onClick={handleViewCard}
                >
                  View Card
                </button>

                <button
                  className="action-btn"
                  onClick={handleShare}
                >
                  Share Card
                </button>

              </div>

            </div>

          </div>

          {/* CARD 2 */}

          <div
            className="dashboard-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "500px",
            }}
          >

            <div
              style={{
                textAlign: "center",
                padding: "30px",
              }}
            >

              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  margin: "0 auto 20px",

                  background:
                    "linear-gradient(135deg,#0B4DBB,#4CAF1D)",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  color: "#fff",
                  fontSize: "48px",
                  fontWeight: "700",
                }}
              >
                +
              </div>

              <h2
                style={{
                  color: "#1e293b",
                  marginBottom: "10px",
                }}
              >
                Create New Card
              </h2>

              <p
                style={{
                  color: "#64748b",
                  maxWidth: "240px",
                  lineHeight: "1.6",
                }}
              >
                Multiple card support is
                coming soon for Jio Tap.
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;