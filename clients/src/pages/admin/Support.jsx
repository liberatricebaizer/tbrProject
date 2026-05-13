import React, { useState } from "react";

const panelStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 24,
};

const tickets = [
  { label: "Open Tickets", count: 0, icon: "🎫", color: "#818cf8", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.25)" },
  { label: "Pending", count: 0, icon: "⏳", color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  { label: "Resolved", count: 0, icon: "✅", color: "#4ade80", bg: "rgba(16,185,129,0.12)", border: "rgba(74,222,128,0.25)" },
];

const faqItems = [
  { q: "How do I reset a user's password?", a: "Go to Users → select user → click Reset Password." },
  { q: "How do I view payment history?", a: "Navigate to Payments section to see all transactions." },
  { q: "How do I add a new property?", a: "Go to Properties → click Add New Listing at the top." },
  { q: "How do I export a report?", a: "Go to Reports → select type → click Export." },
];

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: "0 0 20px" }}>
        🛠️ Support & Help Center
      </h2>

      {/* Ticket Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {tickets.map((t) => (
          <div key={t.label} style={{
            background: t.bg,
            border: `1px solid ${t.border}`,
            borderRadius: 14,
            padding: "20px 24px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 28 }}>{t.icon}</span>
            <div>
              <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
              <div style={{ color: t.color, fontSize: 28, fontWeight: 800 }}>{t.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Create Ticket */}
        <div style={panelStyle}>
          <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 18px" }}>
            Create Support Ticket
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ color: "#64748b", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Subject</label>
              <input type="text" placeholder="Describe the issue…" style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 13,
                outline: "none", boxSizing: "border-box",
              }}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
            <div>
              <label style={{ color: "#64748b", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Priority</label>
              <select style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 13, outline: "none",
              }}>
                <option value="low" style={{ background: "#1e293b" }}>Low</option>
                <option value="medium" style={{ background: "#1e293b" }}>Medium</option>
                <option value="high" style={{ background: "#1e293b" }}>High</option>
                <option value="critical" style={{ background: "#1e293b" }}>Critical</option>
              </select>
            </div>
            <div>
              <label style={{ color: "#64748b", fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Details</label>
              <textarea placeholder="Provide more details…" rows={4} style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "10px 14px", color: "#e2e8f0", fontSize: 13,
                outline: "none", resize: "vertical", boxSizing: "border-box",
              }}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
            <button type="button" style={{
              padding: "11px 20px",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              border: "none", borderRadius: 10, color: "#fff",
              fontWeight: 700, fontSize: 14, cursor: "pointer",
              boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
            }}>
              Submit Ticket
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div style={panelStyle}>
          <h3 style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 18px" }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqItems.map((faq, idx) => (
              <div key={idx} style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, overflow: "hidden",
              }}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 16px", background: openFaq === idx ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
                    border: "none", cursor: "pointer",
                    color: openFaq === idx ? "#a5b4fc" : "#cbd5e1",
                    fontWeight: 600, fontSize: 13, textAlign: "left",
                    transition: "background 0.2s",
                  }}
                >
                  {faq.q}
                  <span style={{ fontSize: 18, flexShrink: 0, marginLeft: 8, transition: "transform 0.2s", transform: openFaq === idx ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === idx && (
                  <div style={{
                    padding: "12px 16px",
                    background: "rgba(99,102,241,0.05)",
                    color: "#94a3b8", fontSize: 13, lineHeight: 1.6,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: "14px 16px",
            background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.08))",
            border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12,
          }}>
            <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💡 Need more help?</div>
            <div style={{ color: "#64748b", fontSize: 12 }}>Contact the development team at support@tbr.bi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
