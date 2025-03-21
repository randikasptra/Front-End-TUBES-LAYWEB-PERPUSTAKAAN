import { BookOpenText, House, LogOut, Search, Settings, ShoppingCart, SquareLibrary, Star } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const LibrarySidebarNavbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const location = useLocation();

    // Function buat cek halaman aktif
    const isActive = (path) => location.pathname === path ? "border-b-2 border-white font-bold" : "";

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-700">
                <div className="flex items-center justify-between p-4">
                    {/* Nama Perpustakaan di Kiri */}
                    <h1 className="text-xl font-semibold text-white">Perpustakaan Digital</h1>

                    {/* Tombol Menu untuk Mobile */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-white rounded-lg sm:hidden hover:bg-blue-700"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                    </button>

                    {/* Ikon Profil di Kanan */}
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/40" // Ganti dengan foto profil user
                            alt="Profile"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 transform transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:fixed md:block`}
            >
                <div className="p-4 text-white flex flex-col h-full">
                    <h2 className="mb-4 text-lg font-semibold">Menu</h2>

                    {/* Menu utama */}
                    <ul className="flex-1">
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer mt-8 ${isActive("/dashboard")}`}>
                            <Link to="/dashboard" className="flex"><House className="mr-2" /> Beranda</Link>
                        </li>
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer ${isActive("/search")}`}>
                            <Link to="/search" className="flex"><SquareLibrary className="mr-2" /> Library</Link>
                        </li>
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer ${isActive("/my-books")}`}>
                            <Link to="/my-books" className="flex"><BookOpenText className="mr-2" /> Koleksi Saya</Link>
                        </li>
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer ${isActive("/settings")}`}>
                            <Link to="/settings" className="flex"><ShoppingCart className="mr-2" /> Pinjam</Link>
                        </li>
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer ${isActive("/categories")}`}>
                            <Link to="/categories" className="flex"><Star className="mr-2" /> Favorit</Link>
                        </li>
                    </ul>

                    {/* Bagian bawah */}
                    <ul>
                        <li className={`p-2 hover:bg-blue-700 cursor-pointer ${isActive("/settings")}`}>
                            <Link to="/settings" className="flex"><Settings className="mr-2" /> Pengaturan</Link>
                        </li>
                        <li className={`p-2 text-red-500 hover:bg-blue-700 cursor-pointer ${isActive("/logout")}`}>
                            <Link to="/logout" className="flex"><LogOut className="mr-2" /> Logout</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Overlay Saat Sidebar Dibuka */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default LibrarySidebarNavbar;
