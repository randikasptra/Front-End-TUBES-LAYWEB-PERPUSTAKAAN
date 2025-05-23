import {
  House,
  Library,
  History,
  Settings,
  LogOut
} from "lucide-react";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";



const LibrarySidebarNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // redirect ke halaman login
  };
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-700 text-white font-semibold"
      : "text-slate-300";

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-slate-900 to-blue-950 border-b border-blue-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">📚 Perpustakaan Digital</h1>

        {/* Toggle Sidebar (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="text-white sm:hidden p-2 rounded hover:bg-blue-700"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        {/* Profile */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full hidden sm:block"
        />
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 pt-16 h-screen w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:block`}
      >

        <div className="p-4 flex flex-col h-full">
          <h2 className="mb-6 text-lg font-bold text-white">Navigasi</h2>
          <ul className="space-y-2 flex-1">
            <NavItem icon={<House />} label="Beranda" to="/dashboard" isActive={isActive} />
            <NavItem icon={<Library />} label="Perpustakaan" to="/Library" isActive={isActive} />
            <NavItem icon={<History />} label="Sejarah" to="/my-books" isActive={isActive} />
          </ul>
          <div className="space-y-2">
            <NavItem icon={<Settings />} label="Pengaturan" to="/settings" isActive={isActive} />
            <button

              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2"
            >
              
              <LogOut/> Logout
            </button>
          </div>
        </div>

      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

// Komponen item navigasi terpisah buat rapi
const NavItem = ({ icon, label, to, isActive, className = "" }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition ${isActive(to)} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

export default LibrarySidebarNavbar;
