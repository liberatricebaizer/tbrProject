import React from "react";

/* Brand tokens */
const C = {
  primary:   "#20c997",
  primaryDk: "#168d6a",
  primaryLt: "#d7f5ec",
  primaryMid:"#e6faf4",
  text:      "#343a40",
  textMuted: "#6c757d",
  textLight: "#adb5bd",
  surface:   "#ffffff",
  border:    "#e9ecef",
  borderSoft:"#f1f3f5",
};

const statCards = (filtered, totalRevenue, pendingPayments, cancelledTrips) => [
  { label: "Total Users",       value: filtered.users.length,                           icon: "👥", accent: C.primary,   bg: C.primaryLt,    trend: "+12%" },
  { label: "Total Bookings",    value: filtered.bookings.length,                        icon: "📅", accent: "#339af0",   bg: "#e7f5ff",       trend: "+8%"  },
  { label: "Active Rentals",    value: filtered.rents.length,                           icon: "🏠", accent: "#7950f2",   bg: "#f3f0ff",       trend: "+5%"  },
  { label: "Total Revenue",     value: `${totalRevenue.toLocaleString()} BIF`,          icon: "💰", accent: C.primaryDk, bg: C.primaryLt,    trend: "+18%" },
  { label: "Pending Payments",  value: pendingPayments,                                 icon: "⏳", accent: "#f59f00",   bg: "#fff9db",       trend: "-3%"  },
  { label: "Cancelled Trips",   value: cancelledTrips,                                  icon: "✕",  accent: "#f03e3e",   bg: "#fff5f5",       trend: "-7%"  },
  { label: "Properties Listed", value: filtered.hotels.length + filtered.rents.length,  icon: "🏗️", accent: "#0ca678",   bg: C.primaryLt,    trend: "+2%"  },
  { label: "Messages",          value: Math.max(filtered.chats.length - 1, 0),          icon: "💬", accent: "#e64980",   bg: "#fff0f6",       trend: "0%"   },
];

const StatCard = ({ label, value, icon, accent, bg, trend }) => (
  <article
    style={{
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 10,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 6px 20px rgba(0,0,0,0.09)`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none";             e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: bg, border: `1px solid ${accent}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>
        {icon}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 700,
        color: trend.startsWith("+") ? C.primaryDk : trend === "0%" ? C.textMuted : "#c92a2a",
        background: trend.startsWith("+") ? C.primaryLt : trend === "0%" ? C.borderSoft : "#fff5f5",
        padding: "3px 8px", borderRadius: 20,
      }}>
        {trend}
      </span>
    </div>
    <div>
      <p style={{ color: C.textMuted, fontSize: 12, fontWeight: 500, margin: "0 0 4px" }}>{label}</p>
      <p style={{ color: C.text, fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{value}</p>
    </div>
    <div style={{ height: 3, borderRadius: 100, background: C.borderSoft, overflow: "hidden" }}>
      <div style={{ width: "65%", height: "100%", background: accent, borderRadius: 100 }} />
    </div>
  </article>
);

const BarRow = ({ label, value, max, accent }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ width: 36, color: C.textMuted, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, background: C.borderSoft, borderRadius: 100, height: 8, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min((value / (max || 1)) * 100, 100)}%`,
        height: "100%", borderRadius: 100, background: accent,
        transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
    <strong style={{ width: 24, textAlign: "right", color: C.text, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{value}</strong>
  </div>
);

const panel = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
};

const Overview = ({ filtered, totalRevenue, pendingPayments, cancelledTrips, bookingByMonth, locationMap }) => {
  const cards = statCards(filtered, totalRevenue, pendingPayments, cancelledTrips);
  const maxBookings = Math.max(...bookingByMonth.map(([,v]) => v), 1);
  const maxLocation = Math.max(...locationMap.map(([,v]) => v), 1);

  return (
    <>
      {/* Stat Cards */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </section>

      {/* Charts */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={panel}>
          <h2 style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.primary }}>📊</span> Monthly Bookings
          </h2>
          {bookingByMonth.length === 0
            ? <p style={{ color: C.textLight, textAlign: "center", padding: "24px 0", fontSize: 13 }}>No booking data yet.</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {bookingByMonth.map(([month, value]) => (
                  <BarRow key={month} label={month} value={value} max={maxBookings} accent={C.primary} />
                ))}
              </div>
          }
        </div>
        <div style={panel}>
          <h2 style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: "0 0 18px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.primary }}>📍</span> Top Locations
          </h2>
          {locationMap.length === 0
            ? <p style={{ color: C.textLight, textAlign: "center", padding: "24px 0", fontSize: 13 }}>No location data yet.</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {locationMap.map(([location, value]) => (
                  <BarRow key={location} label={location.slice(0,6)} value={value} max={maxLocation} accent={C.primaryDk} />
                ))}
              </div>
          }
        </div>
      </section>

      {/* Recent Activity */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent Bookings */}
        <div style={panel}>
          <h2 style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.primary }}>🕐</span> Recent Bookings
          </h2>
          {filtered.bookings.length === 0
            ? <p style={{ color: C.textLight, textAlign: "center", padding: "24px 0", fontSize: 13 }}>No bookings yet.</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filtered.bookings.slice(-5).reverse().map((b) => (
                  <div key={b._id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", background: C.borderSoft,
                    borderRadius: 8, border: `1px solid ${C.border}`,
                  }}>
                    <div>
                      <div style={{ color: C.text, fontWeight: 600, fontSize: 13 }}>{b.ownName || "Guest"}</div>
                      <div style={{ color: C.textMuted, fontSize: 11 }}>{b.hotelName || "Booking"}</div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                      background: String(b.paymentStatus).toLowerCase() === "paid" ? C.primaryLt : "#fff9db",
                      color:      String(b.paymentStatus).toLowerCase() === "paid" ? C.primaryDk : "#e67700",
                      border: `1px solid ${String(b.paymentStatus).toLowerCase() === "paid" ? C.primary+"40" : "#f59f0040"}`,
                    }}>
                      {b.paymentStatus || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
          }
        </div>

        {/* Recent Users */}
        <div style={panel}>
          <h2 style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: C.primary }}>👤</span> New Users
          </h2>
          {filtered.users.length === 0
            ? <p style={{ color: C.textLight, textAlign: "center", padding: "24px 0", fontSize: 13 }}>No users yet.</p>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filtered.users.slice(-5).reverse().map((u) => (
                  <div key={u._id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", background: C.borderSoft,
                    borderRadius: 8, border: `1px solid ${C.border}`,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: C.primary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }}>
                      {(u.firstName?.[0] || "?").toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.text, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {`${u.firstName||""} ${u.lastName||""}`.trim() || "Unknown"}
                      </div>
                      <div style={{ color: C.textMuted, fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {u.email || "—"}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, flexShrink: 0,
                      background: u.verified ? C.primaryLt : "#fff9db",
                      color:      u.verified ? C.primaryDk : "#e67700",
                      border: `1px solid ${u.verified ? C.primary+"40" : "#f59f0040"}`,
                    }}>
                      {u.verified ? "✓ Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
          }
        </div>
      </section>
    </>
  );
};

export default Overview;
