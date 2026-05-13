import React, { useState } from "react";

const panelStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 24,
};

const samplePackages = [
  {
    id: 1,
    name: "Bujumbura City Tour",
    destination: "Bujumbura, Burundi",
    duration: "2 Days",
    price: "85,000 BIF",
    seats: 12,
    status: "Active",
    icon: "🏙️",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
  },
  {
    id: 2,
    name: "Lake Tanganyika Escape",
    destination: "Tanganyika Lakeside",
    duration: "3 Days",
    price: "140,000 BIF",
    seats: 8,
    status: "Active",
    icon: "🌊",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.12)",
  },
  {
    id: 3,
    name: "Kibira Forest Trek",
    destination: "Kibira National Park",
    duration: "1 Day",
    price: "50,000 BIF",
    seats: 20,
    status: "Upcoming",
    icon: "🌿",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
  {
    id: 4,
    name: "Gitega Cultural Heritage",
    destination: "Gitega, Burundi",
    duration: "2 Days",
    price: "95,000 BIF",
    seats: 15,
    status: "Draft",
    icon: "🏛️",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
];

const statusColor = {
  Active: { color: "#4ade80", bg: "rgba(16,185,129,0.15)", border: "rgba(74,222,128,0.2)" },
  Upcoming: { color: "#67e8f9", bg: "rgba(6,182,212,0.15)", border: "rgba(103,232,249,0.2)" },
  Draft: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.2)" },
};

const TravelPackages = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: 0 }}>
            🌍 Travel & Tour Management
          </h2>
          <p style={{ color: "#64748b", fontSize: 13, margin: "4px 0 0" }}>
            Create and manage all travel packages and destinations
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            border: "none", borderRadius: 12, cursor: "pointer",
            color: "#fff", fontWeight: 700, fontSize: 14,
            boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showForm ? "Cancel" : "Add New Package"}
        </button>
      </div>

      {/* Add Package form */}
      {showForm && (
        <div style={{ ...panelStyle, marginBottom: 24, borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.05)" }}>
          <h3 style={{ color: "#a5b4fc", fontWeight: 700, fontSize: 15, margin: "0 0 18px" }}>New Travel Package</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Package Name", placeholder: "e.g. Kibira Forest Trek" },
              { label: "Destination", placeholder: "e.g. Kibira National Park" },
              { label: "Duration", placeholder: "e.g. 2 Days / 1 Night" },
              { label: "Price (BIF)", placeholder: "e.g. 85000" },
              { label: "Available Seats", placeholder: "e.g. 15" },
              { label: "Departure Date", placeholder: "YYYY-MM-DD" },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ color: "#64748b", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10, padding: "10px 14px",
                    color: "#e2e8f0", fontSize: 13, outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <label style={{ color: "#64748b", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>
              Description
            </label>
            <textarea
              placeholder="Describe the package highlights, inclusions, and itinerary…"
              rows={3}
              style={{
                width: "100%", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 14px",
                color: "#e2e8f0", fontSize: 13, outline: "none",
                resize: "vertical", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button type="button" style={{
              padding: "10px 24px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none", borderRadius: 10, color: "#fff",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>
              Save Package
            </button>
            <button type="button" style={{
              padding: "10px 24px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#94a3b8",
              fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}>
              Save as Draft
            </button>
          </div>
        </div>
      )}

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Packages", val: samplePackages.length, icon: "📦", color: "#818cf8" },
          { label: "Active", val: samplePackages.filter((p) => p.status === "Active").length, icon: "✅", color: "#4ade80" },
          { label: "Upcoming", val: samplePackages.filter((p) => p.status === "Upcoming").length, icon: "📅", color: "#67e8f9" },
          { label: "Drafts", val: samplePackages.filter((p) => p.status === "Draft").length, icon: "📝", color: "#94a3b8" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, padding: "16px 18px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Package cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {samplePackages.map((pkg) => {
          const st = statusColor[pkg.status] || statusColor.Draft;
          return (
            <div
              key={pkg.id}
              style={{
                background: pkg.bg,
                border: `1px solid ${pkg.color}25`,
                borderRadius: 16,
                padding: 20,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${pkg.color}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${pkg.color}20`, border: `1px solid ${pkg.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>
                  {pkg.icon}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: "4px 10px", borderRadius: 20,
                  background: st.bg, color: st.color,
                  border: `1px solid ${st.border}`,
                }}>
                  {pkg.status}
                </span>
              </div>

              {/* Info */}
              <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>{pkg.name}</h3>
              <p style={{ color: "#64748b", fontSize: 12, margin: "0 0 14px" }}>📍 {pkg.destination}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  { label: "Duration", val: pkg.duration },
                  { label: "Seats", val: pkg.seats },
                  { label: "Price", val: pkg.price },
                ].map((m) => (
                  <div key={m.label} style={{
                    background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 10px",
                  }}>
                    <div style={{ color: "#64748b", fontSize: 10, fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ color: pkg.color, fontWeight: 700, fontSize: 12 }}>{m.val}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" style={{
                  flex: 1, padding: "8px", borderRadius: 10, border: `1px solid ${pkg.color}40`,
                  background: `${pkg.color}15`, color: pkg.color,
                  fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}>
                  Edit
                </button>
                <button type="button" style={{
                  flex: 1, padding: "8px", borderRadius: 10, border: "1px solid rgba(244,63,94,0.3)",
                  background: "rgba(244,63,94,0.08)", color: "#f87171",
                  fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TravelPackages;
