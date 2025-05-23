// src/components/admin/SidebarAdmin.jsx
import React from "react";
import { Home, Book, Users, LogOut, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-slate-900 to-blue-800 shadow-lg z-40">
            <div className="p-6 text-white text-2xl font-bold border-b border-slate-700">
                Admin Panel
            </div>
            <nav className="p-4 space-y-4">
                <Link to="/dashboard/admin" className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors">
                    <Home size={20} /> Dashboard
                </Link>
                <Link to="/adminbookpage" className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors">
                    <Book size={20} /> Data Buku
                </Link>
                <Link to="adminborrowpage" className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors">
                    <Layers size={20} /> Data Peminjaman
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors">
                    <Users size={20} /> Data Pengguna
                </Link>
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
                <button className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </aside>
    );
};

export default SidebarAdmin;
