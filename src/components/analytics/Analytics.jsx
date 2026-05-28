import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area,
    BarChart,
    Bar,
} from "recharts";

import {
    TrendingUp,
    Users,
    MousePointerClick,
    Smartphone,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

const Analytics = () => {

    const [analytics,
        setAnalytics] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics =
        async () => {

            try {

                const res =
                    await axios.get(

                        `${import.meta.env.VITE_API_URL}/api/analytics/${user._id}`
                    );

                setAnalytics(
                    res.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    if (loading) {

        return (

            <div
                style={{
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    fontWeight: "700",
                }}
            >
                Loading Analytics...
            </div>

        );
    }

    const stats = [

        {
            title: "Card Taps",

            value:
                analytics?.nfcTaps || 0,


            icon: Smartphone,

            color: "#7C3AED",
        },

        {
            title: "Leads",

            value:
                analytics?.leads || 0,

            icon: Users,

            color: "#22C55E",
        },

        {
            title: "Link Clicks",

            value:

                (
                    analytics?.linkClicks?.linkedin || 0
                ) +

                (
                    analytics?.linkClicks?.instagram || 0
                ) +

                (
                    analytics?.linkClicks?.website || 0
                ) +

                (
                    analytics?.linkClicks?.whatsapp || 0
                ) +

                (
                    analytics?.linkClicks?.email || 0
                ),


            icon: MousePointerClick,

            color: "#F97316",
        },

        {
            title: "Profile Views",

            value:
                analytics?.profileViews || 0,


            icon: TrendingUp,

            color: "#EC4899",
        },
    ];

    const donutData = [

        {
            name: "LinkedIn",
            value:
                analytics?.linkClicks?.linkedin || 0,
        },

        {
            name: "Instagram",
            value:
                analytics?.linkClicks?.instagram || 0,
        },

        {
            name: "WhatsApp",
            value:
                analytics?.linkClicks?.whatsapp || 0,
        },

        {
            name: "Website",
            value:
                analytics?.linkClicks?.website || 0,
        },

        {
            name: "Email",
            value:
                analytics?.linkClicks?.email || 0,
        },

    ].filter(
        (item) => item.value > 0
    );

    const areaData = [

        {
            month: "Jan",
            taps: 5,
        },

        {
            month: "Feb",
            taps: 12,
        },

        {
            month: "Mar",
            taps: 18,
        },

        {
            month: "Apr",
            taps: 28,
        },

        {
            month: "May",
            taps: 42,
        },

        {
            month: "Jun",
            taps: 50,
        },
    ];

    const barData = [

        {
            name: "Mon",
            clicks: 4,
        },

        {
            name: "Tue",
            clicks: 7,
        },

        {
            name: "Wed",
            clicks: 10,
        },

        {
            name: "Thu",
            clicks: 6,
        },

        {
            name: "Fri",
            clicks: 13,
        },

        {
            name: "Sat",
            clicks: 9,
        },

        {
            name: "Sun",
            clicks: 15,
        },
    ];

    const COLORS = [
        "#7C3AED",
        "#A855F7",
        "#EC4899",
        "#3B82F6",
        "#22C55E",
    ];

    return (

        <>
            <style>{`

        *{
          box-sizing:border-box;
        }

        .analytics-root{
          width:100%;
          min-height:100vh;
          padding:10px;
        }

        .analytics-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          margin-bottom:28px;
          flex-wrap:wrap;
        }

        .analytics-left h1{
          margin:0;
          font-size:42px;
          font-weight:900;
          color:#111827;
          letter-spacing:-1px;
        }

        .analytics-left p{
          margin-top:10px;
          color:#6B7280;
          font-size:15px;
        }

        .analytics-actions{
          display:flex;
          gap:14px;
          flex-wrap:wrap;
        }

        .analytics-btn{
          height:52px;
          padding:0 22px;
          border:none;
          border-radius:18px;
          font-weight:700;
          cursor:pointer;
          transition:0.25s;
        }

        .analytics-btn:hover{
          transform:translateY(-2px);
        }

        .primary-btn{
          background:
            linear-gradient(
              135deg,
              #7C3AED,
              #A855F7
            );

          color:#fff;

          box-shadow:
            0 15px 35px rgba(124,58,237,0.25);
        }

        .secondary-btn{
          background:#fff;
          border:1px solid #E9D5FF;
          color:#7C3AED;
        }

        .stats-grid{
          display:grid;
          grid-template-columns:
            repeat(4,1fr);

          gap:22px;
          margin-bottom:22px;
        }

        .stat-card{
          position:relative;
          overflow:hidden;

          background:
            rgba(255,255,255,0.82);

          backdrop-filter:
            blur(18px);

          border:
            1px solid rgba(255,255,255,0.6);

          border-radius:32px;

          padding:28px;

          box-shadow:
            0 20px 45px rgba(15,23,42,0.06);

          transition:0.3s;
        }

        .stat-card:hover{
          transform:translateY(-5px);
        }

        .stat-glow{
          position:absolute;
          width:120px;
          height:120px;
          border-radius:50%;
          top:-40px;
          right:-40px;
          opacity:0.12;
        }

        .stat-top{
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom:28px;
        }

        .stat-icon{
          width:68px;
          height:68px;
          border-radius:22px;

          display:flex;
          align-items:center;
          justify-content:center;

          color:#fff;
        }

        .growth{
          padding:10px 14px;
          border-radius:16px;
          background:#ECFDF3;
          color:#16A34A;
          font-size:13px;
          font-weight:800;
        }

        .stat-title{
          color:#6B7280;
          font-size:15px;
          margin-bottom:12px;
          font-weight:600;
        }

        .stat-value{
          font-size:58px;
          font-weight:900;
          color:#111827;
          line-height:1;
          letter-spacing:-2px;
        }

        .analytics-grid{
          display:grid;
          grid-template-columns:
            1.6fr 1fr;

          gap:22px;
          margin-bottom:22px;
        }

        .chart-card{
          background:
            rgba(255,255,255,0.82);

          backdrop-filter:
            blur(18px);

          border:
            1px solid rgba(255,255,255,0.6);

          border-radius:32px;

          padding:28px;

          box-shadow:
            0 20px 45px rgba(15,23,42,0.06);
        }

        .chart-title{
          font-size:24px;
          font-weight:800;
          margin-bottom:22px;
          color:#111827;
        }

        .chart-wrap{
          width:100%;
          height:380px;
        }

        .bottom-grid{
          display:grid;
          grid-template-columns:
            1fr 1fr;

          gap:22px;
        }

        .country-table{
          width:100%;
          border-collapse:collapse;
        }

        .country-table th{
          text-align:left;
          padding:16px;
          color:#6B7280;
          font-size:14px;
          border-bottom:1px solid #F3F4F6;
        }

        .country-table td{
          padding:18px 16px;
          border-bottom:1px solid #F9FAFB;
          font-weight:700;
          color:#111827;
        }

        .country-table tr:hover{
          background:#FAF7FF;
        }

        .mini-stat{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:18px 0;
          border-bottom:1px solid #F3F4F6;
        }

        .mini-stat:last-child{
          border-bottom:none;
        }

        .mini-title{
          color:#6B7280;
          font-weight:600;
        }

        .mini-value{
          font-size:28px;
          font-weight:900;
          color:#111827;
        }

        @media (max-width: 1200px){

          .stats-grid{
            grid-template-columns:
              repeat(2,1fr);
          }

          .analytics-grid{
            grid-template-columns:1fr;
          }

        }

        @media (max-width: 900px){

          .bottom-grid{
            grid-template-columns:1fr;
          }

        }

        @media (max-width: 700px){

          .stats-grid{
            grid-template-columns:1fr;
          }

          .analytics-left h1{
            font-size:32px;
          }

          .analytics-header{
            flex-direction:column;
            align-items:stretch;
          }

          .analytics-actions{
            width:100%;
          }

          .analytics-btn{
            flex:1;
          }

          .chart-card{
            border-radius:26px;
            padding:20px;
          }

          .chart-wrap{
            height:300px;
          }

          .stat-card{
            border-radius:26px;
            padding:22px;
          }

          .stat-value{
            font-size:48px;
          }

          .country-table{
            display:block;
            overflow-x:auto;
          }

        }

      `}</style>

            <div className="analytics-root">

                {/* HEADER */}

                <div className="analytics-header">

                    <div className="analytics-left">

                        <h1>
                            Analytics Dashboard
                        </h1>

                        <p>
                            Monitor your Jio Tap
                            profile performance and
                            engagement.
                        </p>

                    </div>


                </div>

                {/* STATS */}

                <div className="stats-grid">

                    {stats.map((item, index) => {

                        const Icon =
                            item.icon;

                        return (

                            <div
                                key={index}
                                className="stat-card"
                            >

                                <div
                                    className="stat-glow"
                                    style={{
                                        background:
                                            item.color,
                                    }}
                                />

                                <div className="stat-top">

                                    <div
                                        className="stat-icon"
                                        style={{
                                            background:
                                                item.color,
                                        }}
                                    >
                                        <Icon size={30} />
                                    </div>

                                </div>

                                <div className="stat-title">
                                    {item.title}
                                </div>

                                <div className="stat-value">
                                    {item.value}
                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* MAIN GRID */}

                <div className="analytics-grid">

                    {/* AREA */}

                    <div className="chart-card">

                        <div className="chart-title">
                            Engagement Growth
                        </div>

                        <div className="chart-wrap">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <AreaChart
                                    data={areaData}
                                >

                                    <defs>

                                        <linearGradient
                                            id="colorUv"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >

                                            <stop
                                                offset="5%"
                                                stopColor="#7C3AED"
                                                stopOpacity={0.5}
                                            />

                                            <stop
                                                offset="95%"
                                                stopColor="#7C3AED"
                                                stopOpacity={0}
                                            />

                                        </linearGradient>

                                    </defs>

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="month"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Area
                                        type="monotone"
                                        dataKey="taps"
                                        stroke="#7C3AED"
                                        fillOpacity={1}
                                        fill="url(#colorUv)"
                                        strokeWidth={4}
                                    />

                                </AreaChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* DONUT */}
                    {/* DONUT */}

                    <div className="chart-card">

                        <div className="chart-title">
                            Link Click Sources
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "20px",
                                flexWrap: "wrap",
                            }}
                        >

                            <div
                                style={{
                                    width: "320px",
                                    height: "320px",
                                }}
                            >

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={donutData}
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >

                                            {donutData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={index}
                                                        fill={
                                                            COLORS[index]
                                                        }
                                                    />
                                                )
                                            )}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    minWidth: "180px",
                                }}
                            >

                                {donutData.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent:
                                                    "space-between",

                                                marginBottom: "18px",
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        width: "14px",
                                                        height: "14px",
                                                        borderRadius: "50%",
                                                        background:
                                                            COLORS[index],
                                                    }}
                                                />

                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        color: "#374151",
                                                    }}
                                                >
                                                    {item.name}
                                                </span>

                                            </div>

                                            <span
                                                style={{
                                                    fontWeight: "800",
                                                    color: "#111827",
                                                    fontSize: "18px",
                                                }}
                                            >
                                                {item.value}
                                            </span>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}

                <div className="bottom-grid">

                    {/* BAR */}

                    <div className="chart-card">

                        <div className="chart-title">
                            Weekly Click Activity
                        </div>

                        <div className="chart-wrap">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={barData}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                        dataKey="clicks"
                                        fill="#7C3AED"
                                        radius={[
                                            12,
                                            12,
                                            0,
                                            0,
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* COUNTRY */}

                    {/* COUNTRY */}

                    <div className="chart-card">

                        <div className="chart-title">
                            Audience Insights
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px",
                                marginTop: "10px",
                            }}
                        >

                            <div className="mini-stat">

                                <div className="mini-title">
                                    Total Profile Views
                                </div>

                                <div className="mini-value">
                                    {
                                        analytics?.profileViews || 0
                                    }
                                </div>

                            </div>

                            <div className="mini-stat">

                                <div className="mini-title">
                                    Contact Saves
                                </div>

                                <div className="mini-value">
                                    {
                                        analytics?.leads || 0
                                    }
                                </div>

                            </div>

                            <div className="mini-stat">

                                <div className="mini-title">
                                    NFC Taps
                                </div>

                                <div className="mini-value">
                                    {
                                        analytics?.nfcTaps || 0
                                    }
                                </div>

                            </div>

                            <div className="mini-stat">

                                <div className="mini-title">
                                    Website Clicks
                                </div>

                                <div className="mini-value">
                                    {
                                        analytics?.linkClicks?.website || 0
                                    }
                                </div>

                            </div>

                            <div className="mini-stat">

                                <div className="mini-title">
                                    WhatsApp Clicks
                                </div>

                                <div className="mini-value">
                                    {
                                        analytics?.linkClicks?.whatsapp || 0
                                    }
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
};

export default Analytics;