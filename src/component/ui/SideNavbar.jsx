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
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserProfile } from "@/services/authService";

const LibrarySidebarNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    nama: '',
    role: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setUserInfo({
          nama: res.nama || 'Pengguna',
          role: res.role || 'User'
        });
      } catch (err) {
        console.error('Gagal mengambil user profile:', err);
      }
    };
    fetchProfile();
  }, []);

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
      <nav className="fixed top-0 z-50 w-full bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-6 py-3 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-slate-300 sm:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-all active:scale-95"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg shadow-lg group-hover:rotate-6 transition-transform">
              <BookOpenText className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
              Universitas Sariwangi
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow">
              <UserRound size={18} className="text-white" />
            </div>
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-700/50 backdrop-blur-sm">
              <div className="px-4 py-3 text-sm text-slate-200 border-b border-slate-700/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                  <UserRound size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Hi, {userInfo.nama}!</p>
                  <p className="text-xs text-slate-400">Role: {userInfo.role}</p>
                </div>
              </div>

              <Link
                to="/settings"
                className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors flex items-center gap-3"
              >
                <Settings size={18} className="text-blue-400" />
                Profil Saya
              </Link>

              <div className="border-t border-slate-700/50 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
              >
                <LogOut size={18} className="text-red-400" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 pt-16 h-screen w-64 bg-slate-900/90 backdrop-blur-lg text-white transform transition-all duration-300 ease-in-out border-r border-slate-700/30 ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="px-3 py-4 mb-1">
            <h2 className="font-semibold text-blue-300/80 tracking-wider text-xs uppercase flex items-center gap-2">
              <span className="h-px w-6 bg-blue-400/50"></span>
              Main Navigation
            </h2>
          </div>

          <ul className="space-y-1 flex-1">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              label="Beranda"
              to="/dashboard/mahasiswa"
              isActive={isActive}
              hovered={hoveredItem === "beranda"}
              onHover={() => setHoveredItem("beranda")}
              onLeave={() => setHoveredItem(null)}
            />
            <NavItem
              icon={<BookOpenText size={18} />}
              label="Perpustakaan"
              to="/perpustakaan"
              isActive={isActive}
              hovered={hoveredItem === "perpustakaan"}
              onHover={() => setHoveredItem("perpustakaan")}
              onLeave={() => setHoveredItem(null)}
            />
            <NavItem
              icon={<Clock3 size={18} />}
              label="Riwayat"
              to="/sejarah"
              isActive={isActive}
              hovered={hoveredItem === "riwayat"}
              onHover={() => setHoveredItem("riwayat")}
              onLeave={() => setHoveredItem(null)}
            />
          </ul>

          <div className="pb-4 space-y-1">
            <div className="px-3 py-4 mt-2">
              <h2 className="font-semibold text-blue-300/80 tracking-wider text-xs uppercase flex items-center gap-2">
                <span className="h-px w-6 bg-blue-400/50"></span>
                Preferences
              </h2>
            </div>

            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoveredItem("logout")}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all ${hoveredItem === "logout"
                  ? "bg-gradient-to-r from-red-600/90 to-red-700/90 text-white shadow-md"
                  : "bg-red-600/20 text-red-300"
                }`}
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span>Keluar</span>
              </div>
              <ChevronRight
                size={16}
                className={`transition-transform ${hoveredItem === "logout" ? "translate-x-1" : "opacity-0"
                  }`}
              />
            </button>
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

const NavItem = ({
  icon,
  label,
  to,
  isActive,
  hovered,
  onHover,
  onLeave,
  className = "",
}) => {
  const active = isActive(to);

  return (
    <li
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative overflow-hidden"
    >
      <Link
        to={to}
        className={`cursor-pointer flex items-center justify-between px-4 py-3 text-sm rounded-lg transition-all ${active
            ? "bg-gradient-to-r from-blue-600/70 to-blue-700/70 text-white font-medium shadow-lg"
            : hovered
              ? "bg-slate-800/60 text-blue-100"
              : "text-slate-300 hover:text-blue-100"
          } ${className}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`[&>svg]:w-[18px] [&>svg]:h-[18px] transition-colors ${active
                ? "text-white"
                : hovered
                  ? "text-blue-200"
                  : "text-slate-400"
              }`}
          >
            {icon}
          </span>
          <span>{label}</span>
        </div>
        <ChevronRight
          size={16}
          className={`transition-all ${active || hovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-1"
            }`}
        />
      </Link>

      {active && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-400 rounded-l-full pointer-events-none"></div>
      )}

      {hovered && !active && (
        <div className="absolute inset-0 bg-blue-500/10 rounded-lg pointer-events-none"></div>
      )}
    </li>
  );
};

export default LibrarySidebarNavbar;
