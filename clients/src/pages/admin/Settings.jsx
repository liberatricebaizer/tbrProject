import React, { useState } from "react";

const panelStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 24,
};

const Toggle = ({ label, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 500 }}>{label}</span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        style={{
          width: 44, height: 24, borderRadius: 100, border: "none", cursor: "pointer",
          background: on ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)",
          position: "relative", transition: "background 0.25s",
        }}
      >
        <span style={{
          position: "absolute", top: 3, left: on ? 23 : 3,
          width: 18, height: 18, borderRadius: "50%", background: "#fff",
          transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }} />
      </button>
    </div>
  );
};

const SettingBtn = ({ label, icon, color, hoverBg }) => (
  <button type="button" style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, cursor: "pointer",
    color: "#cbd5e1", fontWeight: 600, fontSize: 14,
    textAlign: "left",
    transition: "background 0.15s, color 0.15s, border-color 0.15s",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + "40"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
  >
    <span style={{ fontSize: 22 }}>{icon}</span>
    {label}
    <svg style={{ marginLeft: "auto", opacity: 0.4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>
);

const Settings = () => (
  <div>
    <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: "0 0 20px" }}>
      ⚙️ Admin Settings
    </h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

      {/* General Settings */}
      <div style={panelStyle}>
        <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
          General
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SettingBtn label="Currency Settings" icon="💱" color="#4ade80" hoverBg="rgba(16,185,129,0.1)" />
          <SettingBtn label="Language & Locale" icon="🌐" color="#67e8f9" hoverBg="rgba(6,182,212,0.1)" />
          <SettingBtn label="Tax Configuration" icon="🧾" color="#fbbf24" hoverBg="rgba(245,158,11,0.1)" />
          <SettingBtn label="Notification Settings" icon="🔔" color="#a5b4fc" hoverBg="rgba(99,102,241,0.1)" />
          <SettingBtn label="Backup & Restore" icon="🗄️" color="#f472b6" hoverBg="rgba(236,72,153,0.1)" />
        </div>
      </div>

      {/* Security */}
      <div style={panelStyle}>
        <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
          Security
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SettingBtn label="Two-Factor Auth (2FA)" icon="🔐" color="#4ade80" hoverBg="rgba(16,185,129,0.1)" />
          <SettingBtn label="Session Management" icon="🕐" color="#67e8f9" hoverBg="rgba(6,182,212,0.1)" />
          <SettingBtn label="API Keys" icon="🔑" color="#fbbf24" hoverBg="rgba(245,158,11,0.1)" />
          <SettingBtn label="Audit Logs" icon="📋" color="#a5b4fc" hoverBg="rgba(99,102,241,0.1)" />
          <SettingBtn label="Change Password" icon="🔒" color="#f87171" hoverBg="rgba(244,63,94,0.1)" />
        </div>
      </div>

      {/* Preferences toggles */}
      <div style={panelStyle}>
        <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>
          Preferences
        </h3>
        <Toggle label="Email notifications" defaultOn={true} />
        <Toggle label="SMS alerts for new bookings" defaultOn={false} />
        <Toggle label="Auto-approve verified users" defaultOn={true} />
        <Toggle label="Show analytics on dashboard" defaultOn={true} />
        <Toggle label="Maintenance mode" defaultOn={false} />
      </div>

      {/* Danger Zone */}
      <div style={{ ...panelStyle, borderColor: "rgba(244,63,94,0.25)", background: "rgba(244,63,94,0.04)" }}>
        <h3 style={{ color: "#f87171", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
          ⚠️ Danger Zone
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Clear All Cache", desc: "Flush cached data immediately" },
            { label: "Reset All Settings", desc: "Restore factory defaults" },
            { label: "Purge Test Data", desc: "Remove all demo / test records" },
          ].map((d) => (
            <div key={d.label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px",
              background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.15)",
              borderRadius: 12,
            }}>
              <div>
                <div style={{ color: "#fca5a5", fontWeight: 600, fontSize: 13 }}>{d.label}</div>
                <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{d.desc}</div>
              </div>
              <button type="button" style={{
                padding: "7px 14px",
                background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)",
                borderRadius: 8, color: "#f87171", fontWeight: 700, fontSize: 12, cursor: "pointer",
              }}>
                Run
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
