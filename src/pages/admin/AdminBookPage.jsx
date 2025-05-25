import React, { useState } from "react";
import { Button } from "@/component/ui/buttons"; // <- plural "buttons" sesuai file kamu
import { Input } from "@/component/ui/input";
import { Card } from "@/component/card";
import { Pencil, Trash2, Eye } from "lucide-react";
import SidebarAdmin from "../../component/ui/SidebarAdmin";
import AddBookModal from "@/component/ui/AddBookModal";

const dummyBooks = [
    {
        id: "5132",
        title: "Python Programming",
        author: "Eko",
        publisher: "Tani Para",
        year: "2015-10-11",
    },
    {
        id: "4864",
        title: "Artificial Intelligence",
        author: "Anton",
        publisher: "Asep Hidan",
        year: "2019-02-19",
    },
    {
        id: "9536",
        title: "Java",
        author: "Samuel",
        publisher: "Mumun Amin",
        year: "2011-05-02",
    },
];

const AdminBookPage = () => {
    const [search, setSearch] = useState("");

    const filteredBooks = dummyBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddBook = (bookData) => {
        console.log("Data Buku Baru:", bookData);
        // Simpan ke backend nanti di sini
    };

    return (
        <div className="ml-64 p-8 text-white min-h-screen bg-[#1c1f2b]">
            <SidebarAdmin />
            <div className="flex items-center justify-between mb-6">
                <Input
                    className="max-w-sm rounded-lg"
                    placeholder="Cari judul buku..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    + Tambah Buku
                </Button>

                <AddBookModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddBook}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden text-sm">
                    <thead className="bg-blue-900 text-left">
                        <tr>
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">ID Buku</th>
                            <th className="px-4 py-3">Judul Buku</th>
                            <th className="px-4 py-3">Pengarang</th>
                            <th className="px-4 py-3">Penerbit</th>
                            <th className="px-4 py-3">Tahun</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#2a2d3d] divide-y divide-gray-700">
                        {filteredBooks.map((book, index) => (
                            <tr key={book.id}>
                                <td className="px-4 py-2">{String(index + 1).padStart(3, "0")}</td>
                                <td className="px-4 py-2">{book.id}</td>
                                <td className="px-4 py-2">{book.title}</td>
                                <td className="px-4 py-2">{book.author}</td>
                                <td className="px-4 py-2">{book.publisher}</td>
                                <td className="px-4 py-2">{book.year}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Button className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded-full">
                                        <Eye size={16} />
                                    </Button>
                                    <Button className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full">
                                        <Pencil size={16} />
                                    </Button>
                                    <Button className="bg-red-600 hover:bg-red-500 p-2 rounded-full">
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredBooks.length === 0 && (
                    <p className="text-center text-gray-400 mt-4">Tidak ada buku ditemukan.</p>
                )}
            </div>
        </div>
    );
};

export default AdminBookPage;
