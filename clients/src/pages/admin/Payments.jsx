import React from "react";
import TableComponent from "./components/TableComponent";
import { formatDate } from "./utils";

const tdStyle = { padding: "14px 20px", color: "#cbd5e1", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" };
const tdBold = { ...tdStyle, color: "#f1f5f9", fontWeight: 600 };

const Payments = ({ bookings }) => {
  const total = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);
  const paid = bookings.filter((b) => String(b.paymentStatus).toLowerCase() === "paid").length;

  const rows = bookings.map((booking) => (
    <tr key={booking._id} style={{ transition: "background 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={tdBold}>{`TRX-${booking._id?.slice(-6) || "000000"}`}</td>
      <td style={tdStyle}>{booking.ownName || "Guest"}</td>
      <td style={tdStyle}>{booking.method || "Mobile Money"}</td>
      <td style={{ ...tdBold, color: "#4ade80" }}>
        {booking.price ? `${Number(booking.price).toLocaleString()} BIF` : "—"}
      </td>
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: String(booking.paymentStatus).toLowerCase() === "paid"
            ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
          color: String(booking.paymentStatus).toLowerCase() === "paid" ? "#4ade80" : "#fbbf24",
          border: String(booking.paymentStatus).toLowerCase() === "paid"
            ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(251,191,36,0.2)",
        }}>
          {booking.paymentStatus || "Pending"}
        </span>
      </td>
      <td style={tdStyle}>{formatDate(booking.createdAt)}</td>
    </tr>
  ));

  return (
    <div>
      {/* Summary strip */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20,
      }}>
        {[
          { label: "Total Transactions", val: bookings.length, color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
          { label: "Paid", val: paid, color: "#4ade80", bg: "rgba(16,185,129,0.12)" },
          { label: "Total Volume", val: `${total.toLocaleString()} BIF`, color: "#fbbf24", bg: "rgba(245,158,11,0.12)" },
        ].map((s) => (
          <div key={s.label} style={{
            background: s.bg, border: `1px solid ${s.color}30`,
            borderRadius: 12, padding: "16px 20px",
          }}>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.val}</div>
          </div>
        ))}
      </div>
      <TableComponent
        title="💳 Payment Transactions"
        headers={["Transaction ID", "Customer", "Method", "Amount", "Status", "Date"]}
        rows={rows}
        emptyText="No transactions yet."
        badge={`${bookings.length} records`}
      />
    </div>
  );
};

export default Payments;
