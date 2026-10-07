
// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "./shared/Sidebar";
// import TopNavbar from "./shared/TopNavbar";

// // Thin green scrollbar for the main content area.
// const scrollbar =
//   "[scrollbar-width:thin] [scrollbar-color:rgba(16,101,76,0.35)_transparent] " +
//   "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent " +
//   "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#10654c]/30 " +
//   "hover:[&::-webkit-scrollbar-thumb]:bg-[#10654c]/50";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   // Close sidebar on mobile when route changes
//   useEffect(() => {
//     setSidebarOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#d7f5ec] font-sans text-[#0a4635] selection:bg-[#10654c] selection:text-white">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-[#0a4635]/50 backdrop-blur-sm transition-opacity lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//       <div className="relative flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
//         <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

//         <main className={`flex-1 overflow-y-auto bg-[#d7f5ec] ${scrollbar}`}>
//           <div className="w-full p-3 md:p-4 lg:p-5">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./shared/Sidebar";
import TopNavbar from "./shared/TopNavbar";

// Thin green scrollbar for the main content area.
const scrollbar =
  "[scrollbar-width:thin] [scrollbar-color:rgba(16,101,76,0.35)_transparent] " +
  "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent " +
  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#10654c]/30 " +
  "hover:[&::-webkit-scrollbar-thumb]:bg-[#10654c]/50";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Remove the browser's page scrollbar. Only <main> below scrolls.
  useEffect(() => {
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#d7f5ec] font-sans text-[#0a4635] selection:bg-[#10654c] selection:text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0a4635]/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className={`flex-1 overflow-y-auto bg-[#d7f5ec] ${scrollbar}`}>
          <div className="w-full p-3 md:p-4 lg:p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;