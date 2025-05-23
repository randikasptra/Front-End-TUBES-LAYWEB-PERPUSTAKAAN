import React, { useState } from "react";
import SideNavbar from "../../component/ui/SideNavbar";
import Footer from "../../component/ui/Footer";

const historyData = [
    {
        id: 1,
        title: "Algoritma Dasar",
        status: "Dipinjam",
        tanggal: "2025-05-10",
        image: "/book-placeholder.jpg",
        waktuAmbil: "2025-05-10",
        waktuKembali: "2025-05-17",
    },
    {
        id: 2,
        title: "Manajemen Proyek",
        status: "Dikembalikan",
        tanggal: "2025-04-30",
        image: "/book-placeholder.jpg",
        waktuAmbil: "2025-04-23",
        waktuKembali: "2025-04-30",
    },
    {
        id: 3,
        title: "Hukum Siber",
        status: "Belum Dikembalikan",
        tanggal: "2025-05-01",
        image: "/book-placeholder.jpg",
        waktuAmbil: "2025-04-24",
        waktuKembali: "Seharusnya 2025-05-01",
    },
    {
        id: 4,
        title: "Database Modern",
        status: "Reservasi",
        tanggal: "2025-05-21",
        image: "/book-placeholder.jpg",
        waktuAmbil: "-",
        waktuKembali: "-",
    },
];

const statusColors = {
    Reservasi: "bg-blue-500",
    Dipinjam: "bg-yellow-500",
    "Belum Dikembalikan": "bg-red-600",
    Dikembalikan: "bg-green-500",
};

const HistoryPage = () => {
    const [filter, setFilter] = useState("Semua");

    const filteredData =
        filter === "Semua"
            ? historyData
            : historyData.filter((item) => item.status === filter);

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
            <SideNavbar />
            <main className="sm:ml-64 flex-1 p-6 md:p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Riwayat Peminjaman Buku</h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <label htmlFor="status" className="text-white">
                            Filter:
                        </label>
                        <select
                            id="status"
                            className="bg-slate-800 border border-slate-600 rounded px-4 py-2"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="Semua">Semua</option>
                            <option value="Reservasi">Reservasi</option>
                            <option value="Dipinjam">Dipinjam</option>
                            <option value="Dikembalikan">Dikembalikan</option>
                            <option value="Belum Dikembalikan">Belum Dikembalikan</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 md:items-center shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-32 object-cover rounded-md shadow mx-auto md:mx-0"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <div className="text-sm text-slate-300 mt-1">
                                    <p>📆 Tanggal Status: {item.tanggal}</p>
                                    <p>🕓 Waktu Ambil: {item.waktuAmbil}</p>
                                    <p>⏳ Waktu Pengembalian: {item.waktuKembali}</p>
                                </div>
                            </div>
                            <span
                                className={`text-white px-4 py-2 rounded-full text-sm font-medium self-start md:self-center ${statusColors[item.status]}`}
                            >
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default HistoryPage;
