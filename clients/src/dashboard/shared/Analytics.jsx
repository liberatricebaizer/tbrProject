import React, { useMemo, useState } from "react";
import {
    AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from "recharts";
import {
    FiDollarSign, FiShoppingBag, FiTag, FiPercent, FiUserPlus, FiXCircle,
    FiTrendingUp, FiTrendingDown, FiDownload,
} from "react-icons/fi";

/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635, accent #20c997, sun #e8b43a */

const CATEGORIES = [
    { key: "bookings", label: "Bookings", color: "#10654c", aov: 180, perDay: 1400 },
    { key: "rentals", label: "Rentals", color: "#20c997", aov: 420, perDay: 1000 },
    { key: "travel", label: "Travel", color: "#e8b43a", aov: 650, perDay: 700 },
];

const RANGES = [
    { id: "7d", label: "7 days", points: 7, unit: "day", scale: 1 },
    { id: "30d", label: "30 days", points: 30, unit: "day", scale: 1 },
    { id: "90d", label: "90 days", points: 13, unit: "week", scale: 7 },
    { id: "12m", label: "12 months", points: 12, unit: "month", scale: 30 },
];

const TOP_PERFORMERS = [
    { name: "Club du Lac Tanganyika", type: "Hotel", share: 0.22 },
    { name: "Kigobe family house", type: "Rental", share: 0.17 },
    { name: "Bujumbura – Gitega transfer", type: "Ride", share: 0.14 },
    { name: "Gihosha apartment", type: "Rental", share: 0.11 },
    { name: "Geto hotel", type: "Hotel", share: 0.08 },
];

const SOURCES = [
    { name: "Direct", pct: 34 },
    { name: "Search", pct: 28 },
    { name: "Social media", pct: 19 },
    { name: "Referrals", pct: 11 },
    { name: "Email", pct: 8 },
];

const WEEKDAY_WEIGHTS = [
    ["Mon", 0.12], ["Tue", 0.13], ["Wed", 0.13], ["Thu", 0.14],
    ["Fri", 0.17], ["Sat", 0.17], ["Sun", 0.14],
];

/* ---------- helpers ---------- */

// Small seeded random so the numbers stay the same between renders.
const rng = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const labelFor = (range, i) => {
    const d = new Date();
    if (range.unit === "month") {
        d.setMonth(d.getMonth() - (range.points - 1 - i), 1);
        return d.toLocaleDateString("en-US", { month: "short" });
    }
    const step = range.unit === "week" ? 7 : 1;
    d.setDate(d.getDate() - (range.points - 1 - i) * step);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Demo data. Replace this function with a call to your API.
const buildSeries = (range, seed, growth) => {
    const rand = rng(seed);
    return Array.from({ length: range.points }, (_, i) => {
        const row = { label: labelFor(range, i) };
        CATEGORIES.forEach((c) => {
            const trend = 1 + (growth * i) / range.points;
            row[c.key] = Math.round(c.perDay * range.scale * (0.75 + 0.5 * rand()) * trend);
        });
        row.total = row.bookings + row.rentals + row.travel;
        return row;
    });
};

const summarize = (series, seed) => {
    const sum = (key) => series.reduce((a, r) => a + r[key], 0);
    const byCat = Object.fromEntries(CATEGORIES.map((c) => [c.key, sum(c.key)]));
    const revenue = sum("total");
    const orders = Math.round(CATEGORIES.reduce((a, c) => a + byCat[c.key] / c.aov, 0));
    const rand = rng(seed);
    return {
        byCat,
        revenue,
        orders,
        aov: revenue / orders,
        conversion: 3 + rand() * 1.4,
        customers: Math.round(orders * 0.38),
        cancellation: 4.5 + rand() * 3,
    };
};

const money = (n) => `$${Math.round(n).toLocaleString()}`;
const axisMoney = (v) => (v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`);
const delta = (cur, prev) => ((cur - prev) / prev) * 100;

const card = "bg-white rounded-2xl border border-[#bfe9dc] shadow-sm";
const tooltipStyle = { borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(10 70 53 / 0.15)" };
const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10654c]";

/* ---------- small components ---------- */

const Kpi = ({ title, value, change, invert, icon: Icon, colorClass, bgClass }) => {
    const good = invert ? change <= 0 : change >= 0;
    const Trend = change >= 0 ? FiTrendingUp : FiTrendingDown;
    return (
        <div className={`${card} p-4`}>
            <div className="mb-3 flex items-start justify-between">
                <div className={`rounded-xl p-2.5 ${bgClass} ${colorClass}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className={`flex items-center gap-1 text-[11px] font-bold ${good ? "text-[#10654c]" : "text-rose-600"}`}>
                    <Trend className="h-3 w-3" aria-hidden="true" />
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(1)}%
                </span>
            </div>
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#4d7a6b]">{title}</h4>
            <p className="m-0 text-2xl font-bold text-[#0a4635]">{value}</p>
        </div>
    );
};

const Card = ({ title, className = "", children, action }) => (
    <section className={`${card} flex flex-col p-4 ${className}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="m-0 text-sm font-bold text-[#0a4635]">{title}</h3>
            {action}
        </div>
        {children}
    </section>
);

/* ---------- page ---------- */

const Analytics = () => {
    const [rangeId, setRangeId] = useState("30d");
    const [visible, setVisible] = useState(["bookings", "rentals", "travel"]);
    const range = RANGES.find((r) => r.id === rangeId);

    const { series, cur, prev } = useMemo(() => {
        const s = buildSeries(range, range.points * 11, 0.18);
        const p = buildSeries(range, range.points * 17, 0.05);
        const pSummary = summarize(p, 5);
        // Make the previous period a little smaller so growth is realistic.
        return {
            series: s,
            cur: summarize(s, 3),
            prev: { ...pSummary, revenue: pSummary.revenue * 0.9, orders: Math.round(pSummary.orders * 0.92) },
        };
    }, [range]);

    const prevAov = prev.revenue / prev.orders;
    const visitors = Math.round(cur.orders / (cur.conversion / 100));
    const funnel = [
        { name: "Visitors", value: visitors },
        { name: "Viewed a listing", value: Math.round(visitors * 0.58) },
        { name: "Started booking", value: Math.round(visitors * 0.21) },
        { name: "Paid", value: cur.orders },
    ];
    const weekdays = WEEKDAY_WEIGHTS.map(([day, w]) => ({ day, orders: Math.round(cur.orders * w) }));
    const maxDay = Math.max(...weekdays.map((d) => d.orders));
    const pie = CATEGORIES.map((c) => ({ name: c.label, value: cur.byCat[c.key], color: c.color }));

    const toggle = (key) =>
        setVisible((v) =>
            v.includes(key) ? (v.length > 1 ? v.filter((k) => k !== key) : v) : [...v, key]
        );

    const exportCsv = () => {
        const rows = [
            ["Period", "Bookings", "Rentals", "Travel", "Total"],
            ...series.map((r) => [r.label, r.bookings, r.rentals, r.travel, r.total]),
        ];
        const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `analytics-${rangeId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-[#0a4635]">Analytics</h1>
                    <p className="mt-0.5 text-[11px] text-[#3f6f5f]">
                        See how bookings, rentals, and travel perform over time.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div role="group" aria-label="Date range" className="flex rounded-lg border border-[#bfe9dc] bg-white p-1 shadow-sm">
                        {RANGES.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                aria-pressed={rangeId === r.id}
                                onClick={() => setRangeId(r.id)}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${focusRing} ${rangeId === r.id ? "bg-[#10654c] text-white" : "text-[#3f6f5f] hover:bg-[#d7f5ec]"
                                    }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={exportCsv}
                        className={`flex items-center gap-2 rounded-lg border border-[#bfe9dc] bg-white px-3 py-2 text-xs font-medium text-[#0a4635] shadow-sm hover:bg-[#f3fcf9] ${focusRing}`}
                    >
                        <FiDownload className="h-3.5 w-3.5" aria-hidden="true" /> Export CSV
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                <Kpi title="Revenue" value={money(cur.revenue)} change={delta(cur.revenue, prev.revenue)} icon={FiDollarSign} colorClass="text-[#10654c]" bgClass="bg-[#d7f5ec]" />
                <Kpi title="Orders" value={cur.orders.toLocaleString()} change={delta(cur.orders, prev.orders)} icon={FiShoppingBag} colorClass="text-[#168d6a]" bgClass="bg-[#e2fff6]" />
                <Kpi title="Avg. order" value={money(cur.aov)} change={delta(cur.aov, prevAov)} icon={FiTag} colorClass="text-amber-600" bgClass="bg-amber-50" />
                <Kpi title="Conversion" value={`${cur.conversion.toFixed(1)}%`} change={delta(cur.conversion, prev.conversion)} icon={FiPercent} colorClass="text-[#0a4635]" bgClass="bg-[#bfe9dc]" />
                <Kpi title="New customers" value={cur.customers.toLocaleString()} change={delta(cur.customers, prev.customers)} icon={FiUserPlus} colorClass="text-teal-600" bgClass="bg-teal-50" />
                <Kpi title="Cancellations" value={`${cur.cancellation.toFixed(1)}%`} change={delta(cur.cancellation, prev.cancellation)} invert icon={FiXCircle} colorClass="text-rose-500" bgClass="bg-rose-50" />
            </div>

            {/* Trend + split */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card
                    title="Revenue trend"
                    className="h-[340px] xl:col-span-2"
                    action={
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((c) => {
                                const on = visible.includes(c.key);
                                return (
                                    <button
                                        key={c.key}
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => toggle(c.key)}
                                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors ${focusRing} ${on ? "border-[#10654c] bg-[#d7f5ec] text-[#0a4635]" : "border-[#bfe9dc] text-[#4d7a6b]"
                                            }`}
                                    >
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color, opacity: on ? 1 : 0.35 }} />
                                        {c.label}
                                    </button>
                                );
                            })}
                        </div>
                    }
                >
                    <div className="min-h-0 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={series} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <defs>
                                    {CATEGORIES.map((c) => (
                                        <linearGradient key={c.key} id={`fill-${c.key}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={c.color} stopOpacity={0.25} />
                                            <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3f6ef" />
                                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#4d7a6b", fontSize: 11 }} dy={8} interval="preserveStartEnd" minTickGap={24} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4d7a6b", fontSize: 11 }} tickFormatter={axisMoney} />
                                <RechartsTooltip contentStyle={tooltipStyle} formatter={(v) => money(v)} />
                                {CATEGORIES.filter((c) => visible.includes(c.key)).map((c) => (
                                    <Area key={c.key} type="monotone" dataKey={c.key} name={c.label} stroke={c.color} strokeWidth={2.5} fill={`url(#fill-${c.key})`} />
                                ))}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Revenue by category" className="h-[340px]">
                    <div className="relative min-h-0 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pie} innerRadius={60} outerRadius={88} paddingAngle={3} dataKey="value" stroke="none">
                                    {pie.map((e) => <Cell key={e.name} fill={e.color} />)}
                                </Pie>
                                <RechartsTooltip contentStyle={tooltipStyle} formatter={(v) => money(v)} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-medium text-[#4d7a6b]">Total</span>
                            <span className="text-xl font-bold text-[#0a4635]">{money(cur.revenue)}</span>
                        </div>
                    </div>
                    <ul className="m-0 mt-3 list-none space-y-2 p-0">
                        {pie.map((p) => (
                            <li key={p.name} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#3f6f5f]">
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                                    {p.name}
                                </span>
                                <span className="font-bold text-[#0a4635]">
                                    {money(p.value)}{" "}
                                    <span className="text-[11px] font-medium text-[#4d7a6b]">({((p.value / cur.revenue) * 100).toFixed(1)}%)</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Funnel, weekday, sources */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card title="Booking funnel">
                    <ul className="m-0 list-none space-y-4 p-0">
                        {funnel.map((s, i) => (
                            <li key={s.name}>
                                <div className="mb-1.5 flex justify-between text-sm">
                                    <span className="font-semibold text-[#0a4635]">{s.name}</span>
                                    <span className="text-xs font-medium text-[#4d7a6b]">
                                        {s.value.toLocaleString()}
                                        {i > 0 && ` · ${((s.value / funnel[0].value) * 100).toFixed(1)}%`}
                                    </span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-[#d7f5ec]">
                                    <div
                                        className="h-2.5 rounded-full bg-[#10654c]"
                                        style={{ width: `${Math.max((s.value / funnel[0].value) * 100, 2)}%`, opacity: 1 - i * 0.18 }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card title="Orders by weekday" className="min-h-[300px]">
                    <div className="min-h-0 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weekdays} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3f6ef" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#4d7a6b", fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4d7a6b", fontSize: 11 }} />
                                <RechartsTooltip contentStyle={tooltipStyle} cursor={{ fill: "#d7f5ec" }} />
                                <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                                    {weekdays.map((d) => (
                                        <Cell key={d.day} fill={d.orders === maxDay ? "#10654c" : "#bfe9dc"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Where visitors come from">
                    <ul className="m-0 list-none space-y-4 p-0">
                        {SOURCES.map((s) => (
                            <li key={s.name}>
                                <div className="mb-1.5 flex justify-between text-sm">
                                    <span className="font-semibold text-[#0a4635]">{s.name}</span>
                                    <span className="text-xs font-medium text-[#4d7a6b]">
                                        {Math.round(visitors * (s.pct / 100)).toLocaleString()} · {s.pct}%
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-[#d7f5ec]">
                                    <div className="h-2 rounded-full bg-[#20c997]" style={{ width: `${s.pct * 2.5}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Top performers */}
            <Card title="Top performers">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-[#bfe9dc] text-[11px] uppercase tracking-wider text-[#4d7a6b]">
                                <th className="pb-2 pr-3 font-semibold">#</th>
                                <th className="pb-2 pr-3 font-semibold">Name</th>
                                <th className="pb-2 pr-3 font-semibold">Type</th>
                                <th className="pb-2 pr-3 font-semibold">Share</th>
                                <th className="pb-2 text-right font-semibold">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TOP_PERFORMERS.map((t, i) => (
                                <tr key={t.name} className="border-b border-[#e3f6ef] last:border-0">
                                    <td className="py-3 pr-3 text-xs font-bold text-[#4d7a6b]">{i + 1}</td>
                                    <td className="py-3 pr-3 font-semibold text-[#0a4635]">{t.name}</td>
                                    <td className="py-3 pr-3">
                                        <span className="rounded-md bg-[#d7f5ec] px-2 py-0.5 text-[11px] font-bold text-[#10654c]">{t.type}</span>
                                    </td>
                                    <td className="w-1/3 py-3 pr-3">
                                        <div className="h-2 w-full rounded-full bg-[#d7f5ec]">
                                            <div className="h-2 rounded-full bg-[#10654c]" style={{ width: `${t.share * 100 * 3}%` }} />
                                        </div>
                                    </td>
                                    <td className="py-3 text-right font-bold text-[#0a4635]">{money(cur.revenue * t.share)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Analytics;