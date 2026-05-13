import React from "react";
import TableComponent from "./components/TableComponent";
import { formatDate } from "./utils";

const tdStyle = { padding: "14px 20px", color: "#cbd5e1", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" };
const tdBold = { ...tdStyle, color: "#f1f5f9", fontWeight: 600 };

const Properties = ({ hotels, rents, rides }) => {
  const propertyRows = [...hotels, ...rents].map((item) => (
    <tr key={item._id} style={{ transition: "background 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={tdBold}>{item.hotelName || `${item.name || "Owner"}'s Property`}</td>
      <td style={tdStyle}>{item.ownName || item.name || "—"}</td>
      <td style={tdStyle}>{item.location || "—"}</td>
      <td style={{ ...tdBold, color: "#4ade80" }}>
        {item.price ? `${Number(item.price).toLocaleString()} BIF` : "—"}
      </td>
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: "rgba(6,182,212,0.15)", color: "#67e8f9",
          border: "1px solid rgba(6,182,212,0.2)",
        }}>
          {item.availability || "Available"}
        </span>
      </td>
    </tr>
  ));

  const rideRows = rides.map((ride) => (
    <tr key={ride._id} style={{ transition: "background 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={tdBold}>{ride.leavingLocation || "—"}</td>
      <td style={tdStyle}>{ride.destinationLocation || "—"}</td>
      <td style={tdStyle}>{formatDate(ride.departTime)}</td>
      <td style={tdStyle}>{formatDate(ride.returnTime)}</td>
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: String(ride.status).toLowerCase() === "cancelled"
            ? "rgba(244,63,94,0.15)" : "rgba(99,102,241,0.15)",
          color: String(ride.status).toLowerCase() === "cancelled" ? "#f87171" : "#a5b4fc",
          border: String(ride.status).toLowerCase() === "cancelled"
            ? "1px solid rgba(244,63,94,0.2)" : "1px solid rgba(99,102,241,0.2)",
        }}>
          {ride.status || "Scheduled"}
        </span>
      </td>
    </tr>
  ));

  return (
    <div>
      <TableComponent
        title="🏠 Property & Rental Listings"
        headers={["Title", "Owner", "Location", "Price / Night", "Availability"]}
        rows={propertyRows}
        emptyText="No properties listed."
        badge={`${hotels.length + rents.length} listed`}
      />
      <TableComponent
        title="🚗 Travel & Ride Activity"
        headers={["From", "To", "Depart", "Return", "Status"]}
        rows={rideRows}
        emptyText="No rides found."
        badge={`${rides.length} rides`}
      />
    </div>
  );
};

export default Properties;
