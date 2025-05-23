import React from "react";
import { Book, Users, Undo2, FileClock } from "lucide-react";
import AdminSidebar from "../../components/ui/AdminSidebar";

const stats = [
    {
        title: "Total Buku",
        count: 239,
        icon: <Book className="text-white w-6 h-6" />,
        color: "bg-gradient-to-r from-purple-600 to-indigo-600",
    },
    {
        title: "Buku di Pinjam",
        count: 57,
        icon: <FileClock className="text-white w-6 h-6" />,
        color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
        title: "Buku di Kembalikan",
        count: 76,
        icon: <Undo2 className="text-white w-6 h-6" />,
        color: "bg-gradient-to-r from-green-500 to-lime-500",
    },
    {
        title: "Buku Belum Kembali",
        count: 11,
        icon: <Book className="text-white w-6 h-6" />,
        color: "bg-gradient-to-r from-red-500 to-pink-500",
    },
];

const activity = [
    {
        name: "Ichi Caroline",
        book: "Jaringan Komputer",
        status: "Dikembalikan",
        date: "2025-03-23",
        color: "text-green-500",
    },
    {
        name: "Ucup Surecup",
        book: "Sistem Informasi",
        status: "Sedang Dipinjam",
        date: "2025-03-23",
        color: "text-yellow-400",
    },
];

const DashboardAdmin = () => {
    return (
        <div className="min-h-screen flex bg-slate-950 text-white">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`p-5 rounded-2xl shadow-md text-white flex items-center gap-4 ${stat.color}`}
                        >
                            <div className="p-3 rounded-full bg-white bg-opacity-20">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm opacity-80">{stat.title}</p>
                                <h3 className="text-2xl font-bold">{stat.count}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-slate-400 border-b border-slate-600">
                                    <th className="py-2">Nama</th>
                                    <th className="py-2">Judul Buku</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activity.map((act, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-slate-700 hover:bg-slate-700/40"
                                    >
                                        <td className="py-2">{act.name}</td>
                                        <td className="py-2">{act.book}</td>
                                        <td className={`py-2 font-semibold ${act.color}`}>
                                            {act.status}
                                        </td>
                                        <td className="py-2">{act.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;
