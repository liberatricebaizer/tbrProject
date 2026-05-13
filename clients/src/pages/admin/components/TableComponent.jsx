import React from "react";

const TableComponent = ({ title, headers, rows, emptyText, badge }) => (
  <div style={{
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  }}>
    {/* Header */}
    <div style={{
      padding: "18px 24px",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, margin: 0 }}>{title}</h2>
      {badge && (
        <span style={{
          fontSize: 12, fontWeight: 700, padding: "4px 12px",
          background: "rgba(99,102,241,0.18)", color: "#a5b4fc",
          borderRadius: 20, border: "1px solid rgba(99,102,241,0.3)",
        }}>{badge}</span>
      )}
    </div>

    {/* Table */}
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "12px 20px", textAlign: "left",
                color: "#64748b", fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{
                padding: "48px 24px", textAlign: "center",
                color: "#475569", fontSize: 14,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                {emptyText}
              </td>
            </tr>
          ) : rows}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableComponent;
