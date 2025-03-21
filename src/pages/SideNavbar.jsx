import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarNavbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-400 rounded-lg sm:hidden hover:bg-gray-700"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-white">Perpustakaan</h1>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-900 transform transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:fixed md:block`}
            >
                <div className="p-4 text-white">
                    <h2 className="mb-4 text-lg font-semibold">Menu</h2>
                    <ul>
                        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/")}>
                            Home
                        </li>
                        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/profile")}>
                            Profile
                        </li>
                        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/settings")}>
                            Settings
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Overlay untuk sidebar saat dibuka di mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default SidebarNavbar;
