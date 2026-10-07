


import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome, FiPieChart, FiBarChart2, FiClock,
  FiCalendar, FiBookmark, FiUsers, FiCreditCard, FiRefreshCw,
  FiTruck, FiFileText, FiCheckSquare, FiUserCheck,
  FiMap, FiNavigation, FiMapPin, FiCompass, FiBriefcase,
  FiMessageSquare, FiBell, FiStar, FiLifeBuoy,
  FiSettings, FiShield, FiLogOut, FiX, FiChevronDown,
} from "react-icons/fi";
import tbrPhoto from "../../assets/tbr-logo.png";
/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635, accent #20c997 */

const NAVIGATION = [
  {
    group: "Main",
    items: [
      { name: "Dashboard", path: "/Admin", icon: FiHome, end: true },
      { name: "Analytics", path: "/Admin/analytics", icon: FiPieChart },
      { name: "Reports", path: "/Admin/reports", icon: FiBarChart2 },
      { name: "History", path: "/Admin/history", icon: FiClock },
    ],
  },
  {
    group: "Booking Management",
    items: [
      { name: "All Bookings", path: "/Admin/booking/all", icon: FiBookmark },
      { name: "Reservations", path: "/Admin/booking/reservations", icon: FiCheckSquare },
      { name: "Booking Calendar", path: "/Admin/booking/calendar", icon: FiCalendar },
      { name: "Customers", path: "/Admin/booking/customers", icon: FiUsers },
      { name: "Refund Requests", path: "/Admin/booking/refunds", icon: FiRefreshCw },
      { name: "Booking Payments", path: "/Admin/booking/payments", icon: FiCreditCard },
    ],
  },
  {
    group: "Renting Management",
    items: [
      { name: "Properties", path: "/Admin/renting/properties", icon: FiHome },
      { name: "Vehicles", path: "/Admin/renting/vehicles", icon: FiTruck },
      { name: "Rental Requests", path: "/Admin/renting/requests", icon: FiFileText },
      { name: "Rental Contracts", path: "/Admin/renting/contracts", icon: FiBriefcase },
      { name: "Availability", path: "/Admin/renting/availability", icon: FiCalendar },
      { name: "Owners / Landlords", path: "/Admin/renting/owners", icon: FiUserCheck },
      { name: "Rental Payments", path: "/Admin/renting/payments", icon: FiCreditCard },
    ],
  },
  {
    group: "Travelling Management",
    items: [
      { name: "Travel Packages", path: "/Admin/travelling/packages", icon: FiMap },
      { name: "Destinations", path: "/Admin/travelling/destinations", icon: FiMapPin },
      { name: "Trips Schedule", path: "/Admin/travelling/schedule", icon: FiCalendar },
      { name: "Tour Guides", path: "/Admin/travelling/guides", icon: FiCompass },
      { name: "Travelers", path: "/Admin/travelling/travelers", icon: FiUsers },
      { name: "Tickets", path: "/Admin/travelling/tickets", icon: FiBookmark },
      { name: "Transport Management", path: "/Admin/travelling/transport", icon: FiNavigation },
    ],
  },
  {
    group: "Communication",
    items: [
      { name: "Messages", path: "/Admin/communication/messages", icon: FiMessageSquare, badge: "12" },
      { name: "Notifications", path: "/Admin/communication/notifications", icon: FiBell, badge: "28" },
      { name: "Reviews & Ratings", path: "/Admin/communication/reviews", icon: FiStar },
      { name: "Support Tickets", path: "/Admin/communication/support", icon: FiLifeBuoy },
    ],
  },
  {
    group: "System",
    items: [
      { name: "Settings", path: "/Admin/system/settings", icon: FiSettings },
      { name: "Admin Management", path: "/Admin/system/admins", icon: FiShield },
      { name: "Roles & Permissions", path: "/Admin/system/roles", icon: FiUserCheck },
      { name: "Security", path: "/Admin/system/security", icon: FiShield },
      { name: "Logout", path: "/Admin/logout", icon: FiLogOut, isDanger: true },
    ],
  },
];

// Thin, soft scrollbar (works in Chrome, Edge, Safari and Firefox). No extra CSS file needed.
const scrollbar =
  "[scrollbar-width:thin] [scrollbar-color:rgba(215,245,236,0.25)_transparent] " +
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d7f5ec]/25 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-[#d7f5ec]/40";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7f5ec]";

const groupOf = (pathname) =>
  NAVIGATION.find((g) =>
    g.items.some((i) => (i.end ? pathname === i.path : pathname.startsWith(i.path)))
  )?.group;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { pathname } = useLocation();
  // All groups start open. You can still fold any group with its header.
  const [open, setOpen] = useState(() =>
    Object.fromEntries(NAVIGATION.map((g) => [g.group, true]))
  );

  // Keep the group of the current page open.
  useEffect(() => {
    const g = groupOf(pathname);
    if (g) setOpen((o) => ({ ...o, [g]: true }));
  }, [pathname]);

  const toggle = (g) => setOpen((o) => ({ ...o, [g]: !o[g] }));

  return (
    <aside
      aria-label="Admin navigation"
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden bg-[#0a4635] text-[#bfe9dc] transition-transform duration-300 ease-in-out lg:static ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      {/* Brand */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-3">
          {/* <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#d7f5ec]">
            <FiNavigation className="h-4 w-4 -rotate-45 text-[#10654c]" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="m-0 text-base font-bold tracking-tight text-white">TBR Agency</p>
            <p className="m-0 text-[11px] font-medium text-[#8fc9b6]">Admin panel</p>
          </div> */}

          <NavLink to="/Home" className="logo-container">
            <img src={tbrPhoto} alt="" />
          </NavLink>
        </div>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className={`rounded-lg p-2 text-[#bfe9dc] hover:bg-white/10 lg:hidden ${focusRing}`}
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      {/* Links */}
      <nav className={`flex-1 space-y-1 overflow-y-auto px-3 py-4 ${scrollbar}`}>
        {NAVIGATION.map(({ group, items }) => {
          const isGroupOpen = !!open[group];
          return (
            <div key={group}>
              <button
                type="button"
                aria-expanded={isGroupOpen}
                aria-controls={`nav-${group.replace(/\s/g, "-")}`}
                onClick={() => toggle(group)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#8fc9b6] transition-colors hover:text-white ${focusRing}`}
              >
                {group}
                <FiChevronDown
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transition-transform ${isGroupOpen ? "" : "-rotate-90"}`}
                />
              </button>

              {isGroupOpen && (
                <div id={`nav-${group.replace(/\s/g, "-")}`} className="mb-2 space-y-0.5">
                  {items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.end}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${focusRing} ${isActive
                          ? "bg-[#d7f5ec] font-semibold text-[#0a4635]"
                          : item.isDanger
                            ? "text-rose-300 hover:bg-rose-400/10 hover:text-rose-200"
                            : "text-[#bfe9dc] hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="text-sm">{item.name}</span>
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-[#20c997] px-2 py-0.5 text-[10px] font-bold text-[#0a4635]">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;