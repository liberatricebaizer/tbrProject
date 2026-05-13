import React from "react";

const card = (bg, shadow) => ({
  background: bg,
  borderRadius: 16,
  padding: "22px 24px",
  boxShadow: shadow,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "transform 0.2s, box-shadow 0.2s",
});

const StatCard = ({ label, value, icon, gradient, glow, trend }) => (
  <article
    style={card(gradient, `0 4px 24px ${glow}`)}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${glow}`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 24px ${glow}`; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: "rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 20,
      }}>
        {icon}
      </div>
      {trend !== undefined && (
        <span style={{
          fontSize: 11, fontWeight: 600, color: trend >= 0 ? "#4ade80" : "#f87171",
          background: trend >= 0 ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
          padding: "3px 8px", borderRadius: 20,
        }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, margin: 0, marginBottom: 4 }}>{label}</p>
      <p style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{value}</p>
    </div>
  </article>
);

const BarRow = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ width: 36, color: "#94a3b8", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 100, height: 8, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min((value / (max || 1)) * 100, 100)}%`,
        height: "100%", borderRadius: 100, background: color,
        transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
    <strong style={{ width: 24, textAlign: "right", color: "#e2e8f0", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{value}</strong>
  </div>
);

const Overview = ({ filtered, totalRevenue, pendingPayments, cancelledTrips, bookingByMonth, locationMap }) => {
  const maxBookings = Math.max(...bookingByMonth.map(([, v]) => v), 1);
  const maxLocation = Math.max(...locationMap.map(([, v]) => v), 1);

  const stats = [
    {
      label: "Total Users", value: filtered.users.length, icon: "👥",
      gradient: "linear-gradient(135deg,#6366f1,#4338ca)",
      glow: "rgba(99,102,241,0.3)", trend: 12,
    },
    {
      label: "Total Bookings", value: filtered.bookings.length, icon: "📅",
      gradient: "linear-gradient(135deg,#0ea5e9,#0369a1)",
      glow: "rgba(14,165,233,0.3)", trend: 8,
    },
    {
      label: "Active Rentals", value: filtered.rents.length, icon: "🏠",
      gradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
      glow: "rgba(139,92,246,0.3)", trend: 5,
    },
    {
      label: "Total Revenue", value: `${totalRevenue.toLocaleString()} BIF`, icon: "💰",
      gradient: "linear-gradient(135deg,#10b981,#047857)",
      glow: "rgba(16,185,129,0.3)", trend: 18,
    },
    {
      label: "Pending Payments", value: pendingPayments, icon: "⏳",
      gradient: "linear-gradient(135deg,#f59e0b,#b45309)",
      glow: "rgba(245,158,11,0.3)", trend: -3,
    },
    {
      label: "Cancelled Trips", value: cancelledTrips, icon: "✕",
      gradient: "linear-gradient(135deg,#f43f5e,#be123c)",
      glow: "rgba(244,63,94,0.3)", trend: -7,
    },
    {
      label: "Properties Listed", value: filtered.hotels.length + filtered.rents.length, icon: "🏗️",
      gradient: "linear-gradient(135deg,#06b6d4,#0e7490)",
      glow: "rgba(6,182,212,0.3)", trend: 2,
    },
    {
      label: "Support Messages", value: Math.max(filtered.chats.length - 1, 0), icon: "💬",
      gradient: "linear-gradient(135deg,#ec4899,#9d174d)",
      glow: "rgba(236,72,153,0.3)", trend: 0,
    },
  ];

  const panelStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding: 24,
  };

  return (
    <>
      {/* Stat Cards */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: 16,
        marginBottom: 28,
      }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* Charts row */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

        {/* Monthly Bookings */}
        <div style={panelStyle}>
          <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, margin: "0 0 20px" }}>
            📊 Monthly Bookings
          </h2>
          {bookingByMonth.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "24px 0" }}>No booking data yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bookingByMonth.map(([month, value]) => (
                <BarRow key={month} label={month} value={value} max={maxBookings}
                  color="linear-gradient(90deg,#6366f1,#8b5cf6)" />
              ))}
            </div>
          )}
        </div>

        {/* Top Locations */}
        <div style={panelStyle}>
          <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, margin: "0 0 20px" }}>
            📍 Top Locations
          </h2>
          {locationMap.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "24px 0" }}>No location data yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {locationMap.map(([location, value]) => (
                <BarRow key={location} label={location.slice(0, 6)} value={value} max={maxLocation}
                  color="linear-gradient(90deg,#10b981,#06b6d4)" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Bookings */}
        <div style={panelStyle}>
          <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>
            🕐 Recent Bookings
          </h2>
          {filtered.bookings.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "24px 0" }}>No bookings yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.bookings.slice(-5).reverse().map((b) => (
                <div key={b._id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", background: "rgba(255,255,255,0.04)",
                  borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div>
                    <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{b.ownName || "Guest"}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>{b.hotelName || "Booking"}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                    background: String(b.paymentStatus).toLowerCase() === "paid" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                    color: String(b.paymentStatus).toLowerCase() === "paid" ? "#4ade80" : "#fbbf24",
                  }}>
                    {b.paymentStatus || "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div style={panelStyle}>
          <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, margin: "0 0 16px" }}>
            👤 New Users
          </h2>
          {filtered.users.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "24px 0" }}>No users yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.users.slice(-5).reverse().map((u) => (
                <div key={u._id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", background: "rgba(255,255,255,0.04)",
                  borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                  }}>
                    {(u.firstName?.[0] || "?").toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {`${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown"}
                    </div>
                    <div style={{ color: "#64748b", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {u.email || "—"}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                    background: u.verified ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                    color: u.verified ? "#4ade80" : "#fbbf24", flexShrink: 0,
                  }}>
                    {u.verified ? "Verified" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Overview;
