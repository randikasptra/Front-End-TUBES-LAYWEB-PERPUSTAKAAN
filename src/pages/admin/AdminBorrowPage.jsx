import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/buttons";
import AdminSidebar from "@/components/ui/AdminSidebar";

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
];

const statusColor = {
    Dipinjam: "bg-yellow-500",
    "Sudah Dikembalikan": "bg-green-500",
    "Belum Dikembalikan": "bg-red-500",
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
            <AdminSidebar />
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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredBorrowings.map((item) => (
                        <Card key={item.id} className="p-4 bg-slate-700 text-white">
                            <h2 className="text-lg font-semibold mb-2">{item.nama}</h2>
                            <p className="text-sm text-slate-300 mb-1">NIM: {item.nim}</p>
                            <p className="text-sm text-slate-300 mb-1">
                                Judul Buku: <span className="text-white">{item.buku}</span>
                            </p>
                            <p className="text-sm text-slate-300 mb-1">
                                Tgl Pinjam: {item.tanggalPinjam}
                            </p>
                            <p className="text-sm text-slate-300 mb-3">
                                Tgl Kembali: {item.tanggalKembali}
                            </p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor[item.status]}`}
                            >
                                {item.status}
                            </span>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminBorrowPage;
