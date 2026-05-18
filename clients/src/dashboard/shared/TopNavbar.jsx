import React from "react";
import { FiSearch, FiBell, FiMenu, FiGlobe, FiMessageSquare } from "react-icons/fi";

const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-100 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shrink-0">
      
      {/* Left section */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center relative max-w-md w-full">
          <FiSearch className="absolute left-4 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 border-r border-slate-100 pr-4 md:pr-6">
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
          </button>
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors relative">
            <FiMessageSquare className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 border-2 border-white" />
          </button>
          <button className="hidden md:flex p-2 rounded-full text-slate-500 hover:bg-slate-50 transition-colors">
            <FiGlobe className="w-5 h-5" />
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-xs font-medium text-slate-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default TopNavbar;
