import React, { useState } from "react";
import SideNavbar from "../../component/ui/SideNavbar";
import BookCard from "../../component/ui/BookCard";

const allBooks = [
    { id: 1, title: "Algoritma Python", author: "Sundar", category: "Informatika" },
    { id: 2, title: "Manajemen Proyek", author: "Rina", category: "Manajemen" },
    { id: 3, title: "Hukum Siber", author: "Doni", category: "Hukum" },
    { id: 4, title: "React Developer", author: "Alex", category: "Informatika" },
    { id: 5, title: "Ekonomi Digital", author: "Lina", category: "Manajemen" },
    { id: 6, title: "Hukum Dagang", author: "Mira", category: "Hukum" },
];

const PerpustakaanPages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Semua");

    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "Semua" || book.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
            <SideNavbar />

            <main className="sm:ml-64 flex-1 p-8 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex flex-1 items-center gap-2">
                        <input
                            type="text"
                            placeholder="Cari Buku..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 rounded-xl bg-slate-800 text-white placeholder:text-slate-400 focus:outline-none"
                        />
                        <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition">Cari</button>
                    </div>

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-slate-800 px-4 py-2 rounded-xl text-white focus:outline-none"
                    >
                        <option value="Semua">Filter</option>
                        <option value="Informatika">Informatika</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Hukum">Hukum</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} title={book.title} author={book.author} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PerpustakaanPages;
