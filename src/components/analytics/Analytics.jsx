import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

import {
    TrendingUp,
    Users,
    MousePointerClick,
    Smartphone,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/analytics/${user._id}`
            );
            setAnalytics(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "700",
            }}>
                Loading Analytics...
            </div>
        );
    }

    const stats = [
        { title: "Card Taps", value: analytics?.nfcTaps || 0, icon: Smartphone, color: "#0B4DBB" },
        { title: "Leads", value: analytics?.leads || 0, icon: Users, color: "#22C55E" },
        {
            title: "Link Clicks",
            value:
                (analytics?.linkClicks?.linkedin || 0) +
                (analytics?.linkClicks?.instagram || 0) +
                (analytics?.linkClicks?.website || 0) +
                (analytics?.linkClicks?.whatsapp || 0) +
                (analytics?.linkClicks?.email || 0),
            icon: MousePointerClick,
            color: "#F97316",
        },
        { title: "Profile Views", value: analytics?.profileViews || 0, icon: TrendingUp, color: "#EC4899" },
    ];

    const donutData = [
        { name: "LinkedIn", value: analytics?.linkClicks?.linkedin || 0 },
        { name: "Instagram", value: analytics?.linkClicks?.instagram || 0 },
        { name: "WhatsApp", value: analytics?.linkClicks?.whatsapp || 0 },
        { name: "Website", value: analytics?.linkClicks?.website || 0 },
        { name: "Email", value: analytics?.linkClicks?.email || 0 },
    ].filter((item) => item.value > 0);

    const areaData = [
        { month: "Jan", taps: 5 },
        { month: "Feb", taps: 12 },
        { month: "Mar", taps: 18 },
        { month: "Apr", taps: 28 },
        { month: "May", taps: 42 },
        { month: "Jun", taps: 50 },
    ];

    const barData = [
        { name: "Mon", clicks: 4 },
        { name: "Tue", clicks: 7 },
        { name: "Wed", clicks: 10 },
        { name: "Thu", clicks: 6 },
        { name: "Fri", clicks: 13 },
        { name: "Sat", clicks: 9 },
        { name: "Sun", clicks: 15 },
    ];

    const COLORS = ["#0B4DBB", " #4CAF1D", "#EC4899", "#3B82F6", "#22C55E"];

    return (
        <>
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .analytics-root {
            width: 100%;
            min-height: 100vh;
            padding: 16px;
            background: #EAF4FF;
        }

        /* ── HEADER ── */
        .analytics-header {
            margin-bottom: 24px;
        }
        .analytics-header h1 {
            font-size: clamp(26px, 6vw, 42px);
            font-weight: 900;
            color: #111827;
            letter-spacing: -1px;
        }
        .analytics-header p {
            margin-top: 8px;
            color: #6B7280;
            font-size: 14px;
        }

        /* ── STAT CARDS ── */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
            margin-bottom: 18px;
        }
        .stat-card {
            position: relative;
            overflow: hidden;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(18px);
            border: 1px solid rgba(255,255,255,0.7);
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 8px 24px rgba(15,23,42,0.07);
            transition: transform 0.25s;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-glow {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            top: -30px;
            right: -30px;
            opacity: 0.12;
        }
        .stat-icon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            margin-bottom: 16px;
        }
        .stat-title {
            color: #6B7280;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .stat-value {
            font-size: clamp(36px, 8vw, 52px);
            font-weight: 900;
            color: #111827;
            line-height: 1;
            letter-spacing: -2px;
        }

        /* ── CHART CARDS ── */
        .chart-card {
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(18px);
            border: 1px solid rgba(255,255,255,0.7);
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 8px 24px rgba(15,23,42,0.07);
            margin-bottom: 18px;
            /* prevent any child from overflowing */
            overflow: hidden;
        }
        .chart-title {
            font-size: clamp(18px, 4vw, 24px);
            font-weight: 800;
            color: #111827;
            margin-bottom: 18px;
        }

        /* ── AREA CHART ── */
        .area-wrap {
            width: 100%;
            height: 220px;
        }

        /* ── DONUT CHART ── */
        .donut-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .donut-wrap {
            width: 100%;
            height: 220px;
        }
        .donut-legend {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .donut-legend-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .donut-legend-left {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .legend-name {
            font-weight: 700;
            font-size: 14px;
            color: #374151;
        }
        .legend-val {
            font-weight: 800;
            font-size: 16px;
            color: #111827;
        }

        /* ── BAR CHART ── */
        .bar-wrap {
            width: 100%;
            height: 220px;
        }

        /* ── AUDIENCE INSIGHTS ── */
        .mini-stat {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 0;
            border-bottom: 1px solid #F3F4F6;
        }
        .mini-stat:last-child { border-bottom: none; }
        .mini-title {
            color: #6B7280;
            font-size: 14px;
            font-weight: 600;
        }
        .mini-value {
            font-size: clamp(22px, 5vw, 28px);
            font-weight: 900;
            color: #111827;
        }

        /* ── TABLET+ ── */
        @media (min-width: 640px) {
            .analytics-root { padding: 24px; }
            .stats-grid { grid-template-columns: repeat(4, 1fr); gap: 18px; }
            .area-wrap { height: 280px; }
            .donut-layout { flex-direction: row; align-items: center; }
            .donut-wrap { max-width: 280px; height: 260px; }
            .donut-legend { flex: 1; }
            .bar-wrap { height: 280px; }
        }

        /* ── DESKTOP ── */
        @media (min-width: 1024px) {
            .analytics-root { padding: 32px; }
            .stats-grid { gap: 22px; }

            .main-grid {
                display: grid;
                grid-template-columns: 1.6fr 1fr;
                gap: 22px;
                margin-bottom: 22px;
            }
            .main-grid .chart-card { margin-bottom: 0; }

            .bottom-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 22px;
            }
            .bottom-grid .chart-card { margin-bottom: 0; }

            .area-wrap { height: 340px; }
            .donut-wrap { max-width: 300px; height: 300px; }
            .bar-wrap { height: 300px; }
        }
      `}</style>

            <div className="analytics-root">

                {/* HEADER */}
                <div className="analytics-header">
                    <h1>Analytics Dashboard</h1>
                    <p>Monitor your Jio Tap profile performance and engagement.</p>
                </div>

                {/* STATS */}
                <div className="stats-grid">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="stat-card">
                                <div className="stat-glow" style={{ background: item.color }} />
                                <div className="stat-icon" style={{ background: item.color }}>
                                    <Icon size={24} />
                                </div>
                                <div className="stat-title">{item.title}</div>
                                <div className="stat-value">{item.value}</div>
                            </div>
                        );
                    })}
                </div>

                {/* MAIN GRID — single col mobile, 2-col desktop */}
                <div className="main-grid">

                    {/* AREA CHART */}
                    <div className="chart-card">
                        <div className="chart-title">Engagement Growth</div>
                        <div className="area-wrap">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={areaData}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0B4DBB" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#0B4DBB" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} width={30} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="taps"
                                        stroke="#0B4DBB"
                                        fillOpacity={1}
                                        fill="url(#colorUv)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* DONUT CHART */}
                    <div className="chart-card">
                        <div className="chart-title">Link Click Sources</div>
                        <div className="donut-layout">
                            <div className="donut-wrap">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={donutData}
                                            innerRadius="55%"
                                            outerRadius="80%"
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {donutData.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="donut-legend">
                                {donutData.map((item, index) => (
                                    <div key={index} className="donut-legend-item">
                                        <div className="donut-legend-left">
                                            <div className="legend-dot" style={{ background: COLORS[index % COLORS.length] }} />
                                            <span className="legend-name">{item.name}</span>
                                        </div>
                                        <span className="legend-val">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* BOTTOM GRID — single col mobile, 2-col desktop */}
                <div className="bottom-grid">

                    {/* BAR CHART */}
                    <div className="chart-card">
                        <div className="chart-title">Weekly Click Activity</div>
                        <div className="bar-wrap">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} width={30} />
                                    <Tooltip />
                                    <Bar dataKey="clicks" fill="#0B4DBB" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* AUDIENCE INSIGHTS */}
                    <div className="chart-card">
                        <div className="chart-title">Audience Insights</div>
                        <div>
                            {[
                                { label: "Total Profile Views", val: analytics?.profileViews || 0 },
                                { label: "Contact Saves", val: analytics?.leads || 0 },
                                { label: "NFC Taps", val: analytics?.nfcTaps || 0 },
                                { label: "Website Clicks", val: analytics?.linkClicks?.website || 0 },
                                { label: "WhatsApp Clicks", val: analytics?.linkClicks?.whatsapp || 0 },
                            ].map((item, i) => (
                                <div key={i} className="mini-stat">
                                    <span className="mini-title">{item.label}</span>
                                    <span className="mini-value">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default Analytics;