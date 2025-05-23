import React, { useState } from "react";
import { Card } from "@/component/card";
import { Input } from "@/component/ui/input";
import SidebarAdmin from "@/component/ui/SidebarAdmin";
import { MoreVertical } from "lucide-react";

const dummyUsers = [
    {
        id: 1,
        nama: "Rizky Maulana",
        email: "rizky@mail.com",
        role: "Mahasiswa",
        status: "Aktif",
    },
    {
        id: 2,
        nama: "Dewi Andini",
        email: "dewi@mail.com",
        role: "Dosen",
        status: "Nonaktif",
    },
    {
        id: 3,
        nama: "Ahmad Fauzan",
        email: "ahmad@mail.com",
        role: "Mahasiswa",
        status: "Aktif",
    },
];

const statusColor = {
    Aktif: "bg-green-500",
    Nonaktif: "bg-red-500",
};

const AdminAccountPage = () => {
    const [search, setSearch] = useState("");

    const filteredUsers = dummyUsers.filter(
        (user) =>
            user.nama.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <h1 className="text-2xl font-bold mb-6">Data Akun Pengguna</h1>

                <div className="mb-6">
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan nama atau email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="p-4 bg-slate-700 text-white relative">
                            <div className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-white">
                                <MoreVertical size={18} />
                            </div>
                            <h2 className="text-lg font-semibold mb-1">{user.nama}</h2>
                            <p className="text-sm text-slate-300 mb-1">Email: {user.email}</p>
                            <p className="text-sm text-slate-300 mb-3">Role: {user.role}</p>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor[user.status]}`}
                            >
                                {user.status}
                            </span>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminAccountPage;
