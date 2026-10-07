// import React from "react";
// import { FiSearch, FiBell, FiMenu, FiGlobe, FiMessageSquare } from "react-icons/fi";

// const TopNavbar = ({ onMenuClick }) => {
//   return (
//     <header className="h-14 bg-white border-b border-slate-100 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shrink-0">

//       {/* Left section */}
//       <div className="flex items-center gap-4 flex-1">
//         <button 
//           onClick={onMenuClick}
//           className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
//         >
//           <FiMenu className="w-6 h-6" />
//         </button>

//         {/* Search Bar */}
//         <div className="hidden sm:flex items-center relative max-w-md w-full">
//           <FiSearch className="absolute left-4 w-4 h-4 text-slate-400" />
//           <input 
//             type="text" 
//             placeholder="Search anything..." 
//             className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//           />
//         </div>
//       </div>

//       {/* Right section */}
//       <div className="flex items-center gap-4 md:gap-6">

//         {/* Actions */}
//         <div className="flex items-center gap-2 md:gap-3 border-r border-slate-100 pr-4 md:pr-6">
//           <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors relative">
//             <FiBell className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
//           </button>
//           <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors relative">
//             <FiMessageSquare className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 border-2 border-white" />
//           </button>
//           <button className="hidden md:flex p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
//             <FiGlobe className="w-5 h-5" />
//           </button>
//         </div>

//         {/* User */}
//         <div className="flex items-center gap-3">
//           <div className="text-right hidden sm:block">
//             <p className="text-sm font-bold text-slate-800">Admin User</p>
//             <p className="text-xs font-medium text-slate-500">Super Admin</p>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-indigo-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
//             <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-full h-full object-cover" />
//           </div>
//         </div>

//       </div>
//     </header>
//   );
// };

// export default TopNavbar;


import React from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiExternalLink,
  FiMessageSquare,
} from "react-icons/fi";

/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635 */

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10654c]";
const iconBtn = `relative rounded-full p-2 text-[#3f6f5f] transition-colors hover:bg-[#d7f5ec] hover:text-[#0a4635] ${focusRing}`;

const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-[#bfe9dc] bg-white px-4 md:px-6">
      {/* Left */}
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className={`-ml-2 rounded-lg p-2 text-[#3f6f5f] hover:bg-[#d7f5ec] lg:hidden ${focusRing}`}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        <label className="relative hidden w-full max-w-md sm:block">
          <span className="sr-only">Search</span>
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4d7a6b]"
          />
          <input
            type="search"
            placeholder="Search anything..."
            className="w-full rounded-full border border-[#bfe9dc] bg-[#f3fcf9] py-2 pl-11 pr-4 text-sm text-[#0a4635] transition-all placeholder:text-[#4d7a6b] focus:border-[#10654c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10654c]/20"
          />
        </label>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="flex items-center gap-1 border-r border-[#bfe9dc] pr-3 md:pr-5">
          <button type="button" aria-label="Notifications" className={iconBtn}>
            <FiBell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
          </button>
          <button type="button" aria-label="Messages" className={iconBtn}>
            <FiMessageSquare className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#20c997]" />
          </button>
          <Link
            to="/"
            title="View website"
            aria-label="View website"
            className={`hidden md:inline-flex ${iconBtn}`}
          >
            <FiExternalLink className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right leading-tight sm:block">
            <p className="m-0 text-sm font-bold text-[#0a4635]">Admin User</p>
            <p className="m-0 text-xs font-medium text-[#4d7a6b]">Super Admin</p>
          </div>
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#bfe9dc] bg-[#d7f5ec]">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Admin"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;