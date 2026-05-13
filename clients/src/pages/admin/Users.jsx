import React from "react";
import TableComponent from "./components/TableComponent";
import { formatDate } from "./utils";

const tdStyle = { padding: "14px 20px", color: "#cbd5e1", fontSize: 13, borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" };
const tdBold = { ...tdStyle, color: "#f1f5f9", fontWeight: 600 };

const Users = ({ users }) => {
  const rows = users.map((user) => (
    <tr key={user._id} style={{ transition: "background 0.15s" }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={tdStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
          }}>
            {(user.firstName?.[0] || "?").toUpperCase()}
          </div>
          <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 13 }}>
            {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "—"}
          </span>
        </div>
      </td>
      <td style={tdStyle}>{user.email || "—"}</td>
      <td style={tdStyle}>{user.phone || "—"}</td>
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: "rgba(99,102,241,0.15)", color: "#a5b4fc",
          border: "1px solid rgba(99,102,241,0.2)",
        }}>
          {user.role || "Customer"}
        </span>
      </td>
      <td style={tdStyle}>
        <span style={{
          padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
          background: user.verified ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
          color: user.verified ? "#4ade80" : "#fbbf24",
          border: user.verified ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(251,191,36,0.2)",
        }}>
          {user.verified ? "✓ Verified" : "⏳ Pending"}
        </span>
      </td>
      <td style={tdBold}>{formatDate(user.createdAt)}</td>
    </tr>
  ));

  return (
    <TableComponent
      title="👥 User Management"
      headers={["Name", "Email", "Phone", "Role", "Status", "Joined"]}
      rows={rows}
      emptyText="No users found."
      badge={`${users.length} users`}
    />
  );
};

export default Users;
