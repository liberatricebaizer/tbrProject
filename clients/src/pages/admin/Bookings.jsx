import React from "react";
import TableComponent from "./components/TableComponent";
import { formatDate } from "./utils";

const tdStyle = { padding: "14px 20px", color: "#cbd5e1", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" };
const tdBold = { ...tdStyle, color: "#f1f5f9", fontWeight: 600 };

const Bookings = ({ bookings }) => {
  const rows = bookings.map((booking) => (
    <tr key={booking._id} style={{ transition: "background 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={tdBold}>{booking._id?.slice(-8) || "—"}</td>
      <td style={tdStyle}>{booking.ownName || "Guest"}</td>
      <td style={tdStyle}>{booking.hotelName || booking.type || "—"}</td>
      <td style={tdStyle}>{formatDate(booking.createdAt)}</td>
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
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: "rgba(99,102,241,0.15)", color: "#a5b4fc",
          border: "1px solid rgba(99,102,241,0.2)",
        }}>
          {booking.status || "Confirmed"}
        </span>
      </td>
    </tr>
  ));

  return (
    <TableComponent
      title="📅 Booking Management"
      headers={["Booking ID", "Customer", "Property / Trip", "Date", "Payment", "Status"]}
      rows={rows}
      emptyText="No bookings found."
      badge={`${bookings.length} total`}
    />
  );
};

export default Bookings;
