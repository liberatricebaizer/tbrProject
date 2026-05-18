import React from "react";

const C = {
  primary:   "#20c997",
  primaryDk: "#168d6a",
  primaryLt: "#d7f5ec",
  text:      "#343a40",
  textMuted: "#6c757d",
  textLight: "#adb5bd",
  surface:   "#ffffff",
  border:    "#e9ecef",
  borderSoft:"#f8f9fa",
};

const TableComponent = ({ title, headers, rows, emptyText, badge }) => (
  <div style={{
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  }}>
    {/* Header bar */}
    <div style={{
      padding: "16px 20px",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: C.surface,
    }}>
      <h2 style={{ color: C.text, fontWeight: 700, fontSize: 15, margin: 0 }}>{title}</h2>
      {badge && (
        <span style={{
          fontSize: 12, fontWeight: 700, padding: "3px 12px",
          background: C.primaryLt, color: C.primaryDk,
          borderRadius: 20, border: `1px solid ${C.primary}40`,
        }}>
          {badge}
        </span>
      )}
    </div>

    {/* Table */}
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.borderSoft }}>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "11px 18px", textAlign: "left",
                color: C.textMuted, fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.07em",
                borderBottom: `1px solid ${C.border}`,
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
                color: C.textLight, fontSize: 14,
              }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>📭</div>
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
