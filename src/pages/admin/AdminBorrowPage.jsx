import React, { useState } from "react";
import { Card } from "@/component/card";
import { Input } from "@/component/ui/input";
import SidebarAdmin from "../../component/ui/SidebarAdmin";
import { MoreHorizontal } from "lucide-react";

const dummyBorrowings = [
    {
        id: 1,
        nama: "Rizki Maulana",
        nim: "123456789",
        buku: "Pemrograman Web Dasar",
        tanggalPinjam: "2025-05-10",
        tanggalKembali: "2025-05-17",
        status: "Dipinjam",
    },
    {
        id: 2,
        nama: "Dewi Andini",
        nim: "987654321",
        buku: "Sistem Operasi Lanjut",
        tanggalPinjam: "2025-04-28",
        tanggalKembali: "2025-05-05",
        status: "Sudah Dikembalikan",
    },
    {
        id: 3,
        nama: "Ucup Surcup",
        nim: "1122334455",
        buku: "Computer Systems Architecture",
        tanggalPinjam: "2025-03-01",
        tanggalKembali: "2025-03-07",
        status: "Terlambat",
    },
];

const statusColor = {
    Dipinjam: "bg-yellow-500",
    "Sudah Dikembalikan": "bg-green-500",
    Terlambat: "bg-red-500",
};

const AdminBorrowPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBorrowings = dummyBorrowings.filter(
        (item) =>
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nim.includes(searchTerm)
    );

    return (
        <div className="flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <h1 className="text-2xl font-bold mb-6">Data Peminjaman Buku</h1>

                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan nama atau NIM"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-left">
                        <thead>
                            <tr className="border-b border-slate-600 text-slate-300">
                                <th className="py-2 px-4">No</th>
                                <th className="py-2 px-4">Nama Peminjam</th>
                                <th className="py-2 px-4">Judul Buku</th>
                                <th className="py-2 px-4">Tgl Pinjam</th>
                                <th className="py-2 px-4">Tgl Kembali</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBorrowings.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`border-b border-slate-700 hover:bg-slate-600 ${item.status === "Terlambat"
                                            ? "text-red-400"
                                            : item.status === "Sudah Dikembalikan"
                                                ? "text-green-400"
                                                : "text-white"
                                        }`}
                                >
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4 font-semibold">{item.nama}</td>
                                    <td className="py-2 px-4 italic text-sm">{item.buku}</td>
                                    <td className="py-2 px-4">{item.tanggalPinjam}</td>
                                    <td className="py-2 px-4">{item.tanggalKembali}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[item.status]}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button>
                                            <MoreHorizontal className="text-white hover:text-blue-300" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminBorrowPage;
