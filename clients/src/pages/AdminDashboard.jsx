import React, { useMemo, useState } from "react";
import {
  getBookingsLocal,
  getChatLocal,
  getCurrentUser,
  getHotelsLocal,
  getRentsLocal,
  getRidesLocal,
  getUsersLocal,
} from "../utility/localDb";

import { numberValue } from "./admin/utils";

import Overview from "./admin/Overview";
import Users from "./admin/Users";
import Bookings from "./admin/Bookings";
import Properties from "./admin/Properties";
import Payments from "./admin/Payments";
import ReviewsAndMessages from "./admin/ReviewsAndMessages";
import Reports from "./admin/Reports";
import Support from "./admin/Support";
import Settings from "./admin/Settings";
import TravelPackages from "./admin/TravelPackages";

/* ─── Sidebar nav items with SVG icons ─── */
const sidebarItems = [
  {
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Users",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Bookings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Properties",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Travel Packages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    label: "Payments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "Reviews",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: "Reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "Support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

const AdminDashboard = () => {
  const [, setRefreshKey] = useState(0);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = useMemo(() => ({
    users: getUsersLocal(),
    rents: getRentsLocal(),
    rides: getRidesLocal(),
    bookings: getBookingsLocal(),
    hotels: getHotelsLocal(),
    chats: getChatLocal(),
    currentUser: getCurrentUser(),
  }), []);

  const searchText = query.trim().toLowerCase();
  const filterByQuery = (items, fields) =>
    items.filter((item) => {
      if (!searchText) return true;
      const searchable = fields
        .map((field) => String(item[field] ?? ""))
        .join(" ")
        .toLowerCase();
      return searchable.includes(searchText);
    });

  const filtered = useMemo(() => ({
    users: filterByQuery(data.users, ["firstName", "lastName", "email", "phone"]),
    rents: filterByQuery(data.rents, ["name", "email", "location", "description"]),
    rides: filterByQuery(data.rides, ["leavingLocation", "destinationLocation"]),
    bookings: filterByQuery(data.bookings, ["hotelName", "ownName", "location"]),
    hotels: filterByQuery(data.hotels, ["hotelName", "ownName", "location", "email"]),
    chats: filterByQuery(data.chats, ["sender", "text"]),
  }), [data, query]);

  const totalRevenue = useMemo(() => filtered.rents.reduce((sum, item) => sum + numberValue(item.price), 0), [filtered.rents]);
  const cancelledTrips = useMemo(() => filtered.rides.filter(
    (ride) => String(ride.status || "").toLowerCase() === "cancelled"
  ).length, [filtered.rides]);
  const pendingPayments = useMemo(() => filtered.bookings.filter(
    (booking) => String(booking.paymentStatus || "pending").toLowerCase() === "pending"
  ).length, [filtered.bookings]);

  const bookingByMonth = useMemo(() => {
    const accumulator = {};
    filtered.bookings.forEach((item) => {
      const label = new Date(item.createdAt || Date.now()).toLocaleString("default", { month: "short" });
      accumulator[label] = (accumulator[label] || 0) + 1;
    });
    return Object.entries(accumulator);
  }, [filtered.bookings]);

  const locationMap = useMemo(() => {
    const accumulator = {};
    [...filtered.rents, ...filtered.hotels].forEach((item) => {
      const location = item.location || "Unknown";
      accumulator[location] = (accumulator[location] || 0) + 1;
    });
    return Object.entries(accumulator).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [filtered.hotels, filtered.rents]);

  const renderMainSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <Overview
            filtered={filtered}
            totalRevenue={totalRevenue}
            pendingPayments={pendingPayments}
            cancelledTrips={cancelledTrips}
            bookingByMonth={bookingByMonth}
            locationMap={locationMap}
          />
        );
      case "Users": return <Users users={filtered.users} />;
      case "Bookings": return <Bookings bookings={filtered.bookings} />;
      case "Properties":
      case "Rentals":
        return <Properties hotels={filtered.hotels} rents={filtered.rents} rides={filtered.rides} />;
      case "Travel Packages": return <TravelPackages />;
      case "Payments": return <Payments bookings={filtered.bookings} />;
      case "Reviews": return <ReviewsAndMessages chats={filtered.chats} isReviews={true} />;
      case "Messages": return <ReviewsAndMessages chats={filtered.chats} isReviews={false} />;
      case "Reports": return <Reports />;
      case "Support": return <Support />;
      case "Settings":
      default:
        return <Settings />;
    }
  };

  const activeItem = sidebarItems.find((i) => i.label === activeSection);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", fontFamily: "'Inter', 'Rubik', sans-serif" }}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
            zIndex: 40, backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ══════════════════════════════
          SIDEBAR
      ══════════════════════════════ */}
      <aside
        style={{
          width: 256,
          background: "linear-gradient(180deg,#1e1b4b 0%,#0f172a 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : undefined,
          bottom: 0,
          zIndex: 50,
          transition: "transform 0.3s ease",
        }}
      >
        {/* Logo */}
        <div style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
          }}>
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>TBR Admin</div>
            <div style={{ color: "#a78bfa", fontSize: 11, fontWeight: 500 }}>Management Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 12px" }}>
          <div style={{ color: "#64748b", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 12px 4px" }}>
            Main Menu
          </div>
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => { setActiveSection(item.label); setSidebarOpen(false); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 2,
                  background: isActive
                    ? "linear-gradient(135deg,rgba(99,102,241,0.25),rgba(139,92,246,0.15))"
                    : "transparent",
                  color: isActive ? "#c4b5fd" : "#94a3b8",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  transition: "all 0.18s ease",
                  position: "relative",
                  textAlign: "left",
                  boxShadow: isActive ? "inset 1px 0 0 #6366f1" : "none",
                  borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#e2e8f0"; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; } }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7, color: isActive ? "#818cf8" : "inherit" }}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span style={{
                    marginLeft: "auto",
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#6366f1",
                    boxShadow: "0 0 6px #6366f1",
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "16px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>
              {(data.currentUser?.firstName?.[0] || "A").toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {data.currentUser?.firstName || "Admin"}
              </div>
              <div style={{ color: "#64748b", fontSize: 11 }}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════
          MAIN AREA
      ══════════════════════════════ */}
      <div style={{ marginLeft: 256, flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top Header */}
        <header style={{
          height: 68,
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "sticky",
          top: 0,
          zIndex: 30,
          gap: 16,
        }}>
          {/* Hamburger (mobile) */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              color: "#94a3b8", padding: 4,
            }}
            aria-label="Open sidebar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Page title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#4f46e5" }}>{activeItem?.icon}</span>
            <div>
              <h1 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, margin: 0, lineHeight: 1.2 }}>{activeSection}</h1>
              <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Search + Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, justifyContent: "flex-end" }}>
            <div style={{ position: "relative", maxWidth: 280, width: "100%" }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b" }}
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "9px 14px 9px 36px",
                  color: "#e2e8f0",
                  fontSize: 13,
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>

            {/* Notification bell */}
            <button type="button" style={{
              width: 38, height: 38, borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#94a3b8", position: "relative",
              flexShrink: 0,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span style={{
                position: "absolute", top: 7, right: 7,
                width: 7, height: 7, borderRadius: "50%",
                background: "#f43f5e", border: "1.5px solid #0f172a",
              }} />
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => setRefreshKey((v) => v + 1)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 18px",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                border: "none", borderRadius: 10, cursor: "pointer",
                color: "#fff", fontWeight: 600, fontSize: 13,
                boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
                transition: "opacity 0.2s",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
              </svg>
              Refresh
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 32px",
          background: "#0f172a",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {renderMainSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
