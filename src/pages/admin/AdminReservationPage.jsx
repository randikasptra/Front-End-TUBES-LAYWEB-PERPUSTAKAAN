import React, { useState } from "react";
import SidebarAdmin from "@/component/ui/SidebarAdmin";
import { Button } from "@/component/ui/buttons";

const dummyReservations = [
    {
        id: 1,
        user: "Andi Saputra",
        book: "Belajar React untuk Pemula",
        tanggalAmbil: "2025-05-21",
        jamAmbil: "10:00",
        catatan: "Mohon disiapkan ya min",
        status: "Menunggu",
    },
    {
        id: 2,
        user: "Siti Rahma",
        book: "Mengenal AI dengan Mudah",
        tanggalAmbil: "2025-05-22",
        jamAmbil: "13:00",
        catatan: "Saya akan datang lebih awal",
        status: "Menunggu",
    },
];

const AdminReservationPage = () => {
    const [reservations, setReservations] = useState(dummyReservations);

    const handleAction = (id, action) => {
        const updated = reservations.map((res) =>
            res.id === id ? { ...res, status: action } : res
        );
        setReservations(updated);
    };

    return (
        <div className="ml-64 p-8 text-white min-h-screen bg-[#1c1f2b]">
            <SidebarAdmin />
            <h1 className="text-2xl font-semibold mb-6">Permintaan Reservasi Buku</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden text-sm">
                    <thead className="bg-blue-900 text-left">
                        <tr>
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">Nama Pengguna</th>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Tanggal Ambil</th>
                            <th className="px-4 py-3">Jam Ambil</th>
                            <th className="px-4 py-3">Catatan</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#2a2d3d] divide-y divide-gray-700">
                        {reservations.map((res, index) => (
                            <tr key={res.id}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{res.user}</td>
                                <td className="px-4 py-2">{res.book}</td>
                                <td className="px-4 py-2">{res.tanggalAmbil}</td>
                                <td className="px-4 py-2">{res.jamAmbil}</td>
                                <td className="px-4 py-2 text-slate-300">{res.catatan}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${res.status === "Disetujui"
                                                ? "bg-green-600 text-white"
                                                : res.status === "Ditolak"
                                                    ? "bg-red-600 text-white"
                                                    : "bg-yellow-500 text-black"
                                            }`}
                                    >
                                        {res.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    <Button
                                        onClick={() => handleAction(res.id, "Disetujui")}
                                        className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm"
                                    >
                                        Setujui
                                    </Button>
                                    <Button
                                        onClick={() => handleAction(res.id, "Ditolak")}
                                        className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm"
                                    >
                                        Tolak
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {reservations.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-400 py-6">
                                    Tidak ada reservasi ditemukan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReservationPage;
