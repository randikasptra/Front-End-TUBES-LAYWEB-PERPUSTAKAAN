import {
  LayoutDashboard,
  BookOpenText,
  Clock3,
  Settings,
  LogOut,
  Menu,
  UserRound,
  ChevronRight
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LibrarySidebarNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-blue-950 border-b border-blue-800 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <BookOpenText className="text-blue-300 hover:text-blue-100 transition-colors" size={22} />
          <h1 className="text-xl font-bold text-white hover:text-blue-100 transition-colors">
            Perpustakaan Digital
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="text-white sm:hidden p-2 rounded-lg hover:bg-blue-700/50 transition-all active:scale-95"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Profile */}
        <div className="hidden sm:flex items-center">
          <div className="w-9 h-9 rounded-full bg-blue-800/60 flex items-center justify-center border border-blue-600 hover:border-blue-400 transition-colors cursor-pointer group">
            <UserRound size={18} className="text-blue-200 group-hover:text-white" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 pt-16 h-screen w-64 bg-slate-900/95 backdrop-blur-sm text-white transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex flex-col h-full p-3">
          {/* Navigation Header */}
          <div className="px-3 py-4 mb-2 border-b border-blue-800/50">
            <h2 className="font-semibold text-blue-100/90 tracking-wider text-sm">
              MAIN MENU
            </h2>
          </div>
          
          {/* Navigation Items */}
          <ul className="space-y-1.5 flex-1">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Beranda" 
              to="/dashboard/mahasiswa" 
              isActive={isActive}
              hovered={hoveredItem === 'beranda'}
              onHover={() => setHoveredItem('beranda')}
              onLeave={() => setHoveredItem(null)}
            />
            <NavItem
              icon={<BookOpenText size={18} />}
              label="Perpustakaan"
              to="/perpustakaan"
              isActive={isActive}
              hovered={hoveredItem === 'perpustakaan'}
              onHover={() => setHoveredItem('perpustakaan')}
              onLeave={() => setHoveredItem(null)}
            />
            <NavItem 
              icon={<Clock3 size={18} />} 
              label="Riwayat" 
              to="/sejarah" 
              isActive={isActive}
              hovered={hoveredItem === 'riwayat'}
              onHover={() => setHoveredItem('riwayat')}
              onLeave={() => setHoveredItem(null)}
            />
          </ul>
          
          {/* Bottom Section */}
          <div className="pb-4 space-y-1.5">
            <NavItem 
              icon={<Settings size={18} />} 
              label="Pengaturan" 
              to="/settings" 
              isActive={isActive}
              hovered={hoveredItem === 'pengaturan'}
              onHover={() => setHoveredItem('pengaturan')}
              onLeave={() => setHoveredItem(null)}
            />
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all ${
                hoveredItem === 'logout' 
                  ? 'bg-red-600/90 text-white shadow-md' 
                  : 'bg-red-600/70 text-red-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span>Keluar</span>
              </div>
              <ChevronRight size={16} className={`transition-transform ${
                hoveredItem === 'logout' ? 'translate-x-1' : 'opacity-0'
              }`} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay with Blur Effect */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

// Enhanced NavItem Component
const NavItem = ({ icon, label, to, isActive, hovered, onHover, onLeave, className = "" }) => {
  const active = isActive(to);
  
  return (
    <li 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative"
    >
      <Link
        to={to}
        className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all ${
          active
            ? 'bg-blue-700 text-white font-medium shadow-md'
            : hovered
              ? 'bg-blue-800/60 text-blue-100'
              : 'text-slate-300 hover:text-blue-100'
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          <span className={`[&>svg]:w-[18px] [&>svg]:h-[18px] transition-colors ${
            active ? 'text-white' : hovered ? 'text-blue-200' : 'text-slate-400'
          }`}>
            {icon}
          </span>
          <span>{label}</span>
        </div>
        <ChevronRight 
          size={16} 
          className={`transition-all ${
            (active || hovered) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
          }`} 
        />
      </Link>
      
      {/* Animated underline effect */}
      {(active || hovered) && (
        <div className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
          hovered && !active ? 'w-full' : 'w-3/4'
        }`}></div>
      )}
    </li>
  );
};

export default LibrarySidebarNavbar;