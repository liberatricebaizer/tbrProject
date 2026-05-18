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

/* ── Brand tokens (matching home page) ── */
const C = {
  primary:    "#20c997",
  primaryDk:  "#168d6a",
  primaryLt:  "#d7f5ec",
  primaryMid: "#e6faf4",
  text:       "#343a40",
  textMuted:  "#6c757d",
  textLight:  "#adb5bd",
  bg:         "#f8fffe",
  surface:    "#ffffff",
  border:     "#e9ecef",
  borderSoft: "#f1f3f5",
};

const sidebarItems = [
  { label: "Dashboard",       icon: "⊞" },
  { label: "Users",           icon: "👥" },
  { label: "Bookings",        icon: "📅" },
  { label: "Properties",      icon: "🏠" },
  { label: "Travel Packages", icon: "🌍" },
  { label: "Payments",        icon: "💳" },
  { label: "Reviews",         icon: "⭐" },
  { label: "Messages",        icon: "💬" },
  { label: "Reports",         icon: "📊" },
  { label: "Support",         icon: "🛠️" },
  { label: "Settings",        icon: "⚙️" },
];

const AdminDashboard = () => {
  const [, setRefreshKey] = useState(0);
  const [query, setQuery]           = useState("");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  const data = useMemo(() => ({
    users:       getUsersLocal(),
    rents:       getRentsLocal(),
    rides:       getRidesLocal(),
    bookings:    getBookingsLocal(),
    hotels:      getHotelsLocal(),
    chats:       getChatLocal(),
    currentUser: getCurrentUser(),
  }), []);

  const searchText = query.trim().toLowerCase();
  const filterByQuery = (items, fields) =>
    items.filter((item) => {
      if (!searchText) return true;
      return fields.map((f) => String(item[f] ?? "")).join(" ").toLowerCase().includes(searchText);
    });

  const filtered = useMemo(() => ({
    users:    filterByQuery(data.users,    ["firstName", "lastName", "email", "phone"]),
    rents:    filterByQuery(data.rents,    ["name", "email", "location", "description"]),
    rides:    filterByQuery(data.rides,    ["leavingLocation", "destinationLocation"]),
    bookings: filterByQuery(data.bookings, ["hotelName", "ownName", "location"]),
    hotels:   filterByQuery(data.hotels,   ["hotelName", "ownName", "location", "email"]),
    chats:    filterByQuery(data.chats,    ["sender", "text"]),
  }), [data, query]);

  const totalRevenue    = useMemo(() => filtered.rents.reduce((s, i) => s + numberValue(i.price), 0), [filtered.rents]);
  const cancelledTrips  = useMemo(() => filtered.rides.filter(r => String(r.status||"").toLowerCase() === "cancelled").length, [filtered.rides]);
  const pendingPayments = useMemo(() => filtered.bookings.filter(b => String(b.paymentStatus||"pending").toLowerCase() === "pending").length, [filtered.bookings]);

  const bookingByMonth = useMemo(() => {
    const acc = {};
    filtered.bookings.forEach(item => {
      const label = new Date(item.createdAt || Date.now()).toLocaleString("default", { month: "short" });
      acc[label] = (acc[label] || 0) + 1;
    });
    return Object.entries(acc);
  }, [filtered.bookings]);

  const locationMap = useMemo(() => {
    const acc = {};
    [...filtered.rents, ...filtered.hotels].forEach(item => {
      const loc = item.location || "Unknown";
      acc[loc] = (acc[loc] || 0) + 1;
    });
    return Object.entries(acc).sort((a,b) => b[1]-a[1]).slice(0,5);
  }, [filtered.hotels, filtered.rents]);

  const renderMainSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Overview filtered={filtered} totalRevenue={totalRevenue} pendingPayments={pendingPayments} cancelledTrips={cancelledTrips} bookingByMonth={bookingByMonth} locationMap={locationMap} />;
      case "Users":           return <Users users={filtered.users} />;
      case "Bookings":        return <Bookings bookings={filtered.bookings} />;
      case "Properties":
      case "Rentals":         return <Properties hotels={filtered.hotels} rents={filtered.rents} rides={filtered.rides} />;
      case "Travel Packages": return <TravelPackages />;
      case "Payments":        return <Payments bookings={filtered.bookings} />;
      case "Reviews":         return <ReviewsAndMessages chats={filtered.chats} isReviews={true} />;
      case "Messages":        return <ReviewsAndMessages chats={filtered.chats} isReviews={false} />;
      case "Reports":         return <Reports />;
      case "Support":         return <Support />;
      case "Settings":
      default:                return <Settings />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Rubik', sans-serif", color: C.text }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(52,58,64,0.35)",
          zIndex: 40, backdropFilter: "blur(3px)",
        }} />
      )}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{
        width: 248,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "fixed",
        top: 0, bottom: 0,
        zIndex: 50,
        boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
      }}>
        {/* Logo */}
        <div style={{
          height: 64,
          display: "flex", alignItems: "center", gap: 12,
          padding: "0 20px",
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 10px ${C.primary}50`,
          }}>
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>TBR Admin</div>
            <div style={{ color: C.primary, fontSize: 11, fontWeight: 500 }}>Management Portal</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          <div style={{ color: C.textLight, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "8px 10px 4px" }}>
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
                  display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  marginBottom: 2,
                  background:   isActive ? C.primaryLt : "transparent",
                  color:        isActive ? C.primaryDk : C.textMuted,
                  fontWeight:   isActive ? 700 : 400,
                  fontSize:     14,
                  borderLeft:   isActive ? `3px solid ${C.primary}` : "3px solid transparent",
                  transition:   "all 0.15s ease",
                  textAlign:    "left",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = C.primaryMid; e.currentTarget.style.color = C.primaryDk; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; } }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                {item.label}
                {isActive && (
                  <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: C.primary, flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin profile footer */}
        <div style={{ padding: 12, borderTop: `1px solid ${C.border}` }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px",
            background: C.primaryLt,
            borderRadius: 10,
            border: `1px solid ${C.primary}30`,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: C.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>
              {(data.currentUser?.firstName?.[0] || "A").toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {data.currentUser?.firstName || "Admin"}
              </div>
              <div style={{ color: C.primary, fontSize: 11, fontWeight: 500 }}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN AREA ══════════ */}
      <div style={{ marginLeft: 248, flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top Header */}
        <header style={{
          height: 64,
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px",
          position: "sticky", top: 0, zIndex: 30,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          gap: 16,
        }}>
          {/* Page title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>{sidebarItems.find(i => i.label === activeSection)?.icon}</span>
            <div>
              <h1 style={{ color: C.text, fontWeight: 700, fontSize: 17, margin: 0, lineHeight: 1.2 }}>{activeSection}</h1>
              <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Search + Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
            <div style={{ position: "relative", maxWidth: 260, width: "100%" }}>
              <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.textLight }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  background: C.borderSoft,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: "8px 14px 8px 32px",
                  color: C.text,
                  fontSize: 13,
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primary}20`; }}
                onBlur={(e)  => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Notification bell */}
            <button type="button" style={{
              width: 38, height: 38, borderRadius: 8,
              background: C.borderSoft, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: C.textMuted, position: "relative", flexShrink: 0,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border;  e.currentTarget.style.color = C.textMuted; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span style={{
                position: "absolute", top: 7, right: 7,
                width: 7, height: 7, borderRadius: "50%",
                background: "#e03131", border: `2px solid ${C.surface}`,
              }} />
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => setRefreshKey((v) => v + 1)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 18px",
                background: C.primary,
                border: "none", borderRadius: 8, cursor: "pointer",
                color: "#fff", fontWeight: 600, fontSize: 13,
                boxShadow: `0 2px 8px ${C.primary}40`,
                transition: "background 0.2s",
                whiteSpace: "nowrap", flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = C.primaryDk}
              onMouseLeave={(e) => e.currentTarget.style.background = C.primary}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
              </svg>
              Refresh
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: C.bg }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {renderMainSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
