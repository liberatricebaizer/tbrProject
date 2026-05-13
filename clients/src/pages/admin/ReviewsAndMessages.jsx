import React from "react";
import { formatDate } from "./utils";

const ReviewsAndMessages = ({ chats, isReviews }) => {
  const items = [...chats].reverse();

  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 20,
      }}>
        <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: 0 }}>
          {isReviews ? "⭐ Reviews & Ratings" : "💬 Messages & Notifications"}
        </h2>
        <span style={{
          fontSize: 12, fontWeight: 700, padding: "4px 12px",
          background: "rgba(99,102,241,0.15)", color: "#a5b4fc",
          borderRadius: 20, border: "1px solid rgba(99,102,241,0.25)",
        }}>
          {chats.length} {isReviews ? "reviews" : "messages"}
        </span>
      </div>

      {items.length === 0 ? (
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "56px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{isReviews ? "⭐" : "📭"}</div>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
            {isReviews ? "No reviews yet." : "No messages yet."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((msg) => (
            <div key={msg._id} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "16px 20px",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 13,
                  }}>
                    {(msg.sender?.[0] || "?").toUpperCase()}
                  </div>
                  <strong style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>
                    {msg.sender || "Guest"}
                  </strong>
                </div>
                <span style={{ color: "#64748b", fontSize: 11 }}>{formatDate(msg.createdAt)}</span>
              </div>
              <p style={{
                color: "#94a3b8", fontSize: 13, lineHeight: 1.6,
                margin: 0, paddingLeft: 46,
              }}>
                {msg.text || "—"}
              </p>
              {isReviews && (
                <div style={{ paddingLeft: 46, marginTop: 8 }}>
                  {"★★★★☆".split("").map((s, i) => (
                    <span key={i} style={{ color: "#fbbf24", fontSize: 14 }}>{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsAndMessages;
