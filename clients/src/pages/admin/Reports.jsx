import React from "react";

const panelStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 24,
};

const reportItems = [
  { icon: "💰", label: "Revenue Report", desc: "Monthly & yearly income breakdown", color: "#4ade80", bg: "rgba(16,185,129,0.12)" },
  { icon: "📅", label: "Booking Conversion", desc: "Inquiries → confirmed bookings", color: "#818cf8", bg: "rgba(99,102,241,0.12)" },
  { icon: "👥", label: "User Activity", desc: "Registrations, logins, retention", color: "#67e8f9", bg: "rgba(6,182,212,0.12)" },
  { icon: "🏠", label: "Property Performance", desc: "Views, bookings, occupancy rate", color: "#fbbf24", bg: "rgba(245,158,11,0.12)" },
  { icon: "🌍", label: "Travel Packages", desc: "Package popularity & revenue", color: "#f472b6", bg: "rgba(236,72,153,0.12)" },
];

const exportItems = [
  { label: "Export as PDF", icon: "📄", color: "#f87171", hoverBg: "rgba(244,63,94,0.15)" },
  { label: "Export as Excel", icon: "📊", color: "#4ade80", hoverBg: "rgba(16,185,129,0.15)" },
  { label: "Export as CSV", icon: "📑", color: "#67e8f9", hoverBg: "rgba(6,182,212,0.15)" },
];

const Reports = () => (
  <div>
    <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: "0 0 20px" }}>
      📊 Reports & Analytics
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

      {/* Report types */}
      <div style={panelStyle}>
        <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
          Available Reports
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {reportItems.map((r) => (
            <button
              key={r.label}
              type="button"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px",
                background: r.bg,
                border: `1px solid ${r.color}25`,
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
            >
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <div>
                <div style={{ color: r.color, fontWeight: 700, fontSize: 14 }}>{r.label}</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{r.desc}</div>
              </div>
              <svg style={{ marginLeft: "auto", color: "#475569" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Export + Quick Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={panelStyle}>
          <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
            Export Data
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exportItems.map((e) => (
              <button
                key={e.label}
                type="button"
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, cursor: "pointer",
                  color: "#cbd5e1", fontWeight: 600, fontSize: 14,
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(ev) => { ev.currentTarget.style.background = e.hoverBg; ev.currentTarget.style.color = e.color; }}
                onMouseLeave={(ev) => { ev.currentTarget.style.background = "rgba(255,255,255,0.03)"; ev.currentTarget.style.color = "#cbd5e1"; }}
              >
                <span style={{ fontSize: 20 }}>{e.icon}</span>
                {e.label}
                <svg style={{ marginLeft: "auto", opacity: 0.4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div style={{ ...panelStyle, background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.08))", borderColor: "rgba(99,102,241,0.2)" }}>
          <h3 style={{ color: "#a5b4fc", fontSize: 13, fontWeight: 700, margin: "0 0 8px" }}>📈 Automated Scheduling</h3>
          <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>
            Set up automatic weekly or monthly report delivery to your email.
          </p>
          <button type="button" style={{
            padding: "9px 18px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: 10, color: "#fff",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>
            Configure Schedule
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Reports;
