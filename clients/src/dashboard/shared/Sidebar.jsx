import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FiHome, FiPieChart, FiBarChart2, FiClock,
  FiCalendar, FiBookmark, FiUsers, FiCreditCard, FiRefreshCw,
  FiTruck, FiFileText, FiCheckSquare, FiUserCheck,
  FiMap, FiNavigation, FiMapPin, FiCompass, FiBriefcase,
  FiMessageSquare, FiBell, FiStar, FiLifeBuoy,
  FiSettings, FiShield, FiLogOut, FiX
} from "react-icons/fi";

const NAVIGATION = [
  {
    group: "Main",
    items: [
      { name: "Dashboard", path: "/Admin", icon: FiHome, end: true },
      { name: "Analytics", path: "/Admin/analytics", icon: FiPieChart },
      { name: "Reports", path: "/Admin/reports", icon: FiBarChart2 },
      { name: "History", path: "/Admin/history", icon: FiClock },
    ]
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
    ]
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
    ]
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
    ]
  },
  {
    group: "Communication",
    items: [
      { name: "Messages", path: "/Admin/communication/messages", icon: FiMessageSquare, badge: "12", badgeColor: "bg-indigo-600" },
      { name: "Notifications", path: "/Admin/communication/notifications", icon: FiBell, badge: "28", badgeColor: "bg-indigo-600" },
      { name: "Reviews & Ratings", path: "/Admin/communication/reviews", icon: FiStar },
      { name: "Support Tickets", path: "/Admin/communication/support", icon: FiLifeBuoy },
    ]
  },
  {
    group: "System",
    items: [
      { name: "Settings", path: "/Admin/system/settings", icon: FiSettings },
      { name: "Admin Management", path: "/Admin/system/admins", icon: FiShield },
      { name: "Roles & Permissions", path: "/Admin/system/roles", icon: FiUserCheck },
      { name: "Security", path: "/Admin/system/security", icon: FiShield },
      { name: "Logout", path: "/Admin/logout", icon: FiLogOut, isDanger: true },
    ]
  }
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#111827] text-slate-300
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-screen overflow-hidden
      `}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-6 shrink-0 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <FiNavigation className="w-5 h-5 text-white transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white tracking-tight">TBR Agency Admin</h1>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-2 px-4 custom-scrollbar">
        <nav className="space-y-6">
          {NAVIGATION.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {group.group}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" 
                        : item.isDanger 
                          ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-4 h-4 transition-colors ${
                            isActive ? "text-white" : item.isDanger ? "text-rose-400" : "text-slate-400 group-hover:text-slate-300"
                          }`} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
