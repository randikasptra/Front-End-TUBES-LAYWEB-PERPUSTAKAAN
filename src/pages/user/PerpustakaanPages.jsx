// src/pages/perpustakaan/PerpustakaanPages.jsx
import React, { useState, useEffect } from "react";
import SideNavbar from "../../component/ui/SideNavbar";
import BookCard from "../../component/ui/BookCard";
import Modal from "../../component/ui/Modal";
import { getAllBooks } from "../../services/bookService";
import { getUserProfile } from "../../services/authService";

const PerpustakaanPages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Semua");
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchBooks();
        fetchUser();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const result = await getAllBooks();
            console.log("📚 Data buku:", result);
            setAllBooks(result);
        } catch (error) {
            console.error("❌ Gagal memuat buku:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const profile = await getUserProfile();
            console.log("👤 User profile:", profile);
            setUserId(profile.id);
        } catch (error) {
            console.error("❌ Gagal memuat profil pengguna:", error);
        }
    };

    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch = book.judul.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "Semua" || book.kategori?.nama === filter;
        return matchesSearch && matchesFilter;
    });

    const handleOpenModal = (book) => {
        if (!book?.id) {
            console.warn("⚠️ Buku tidak valid");
            return;
        }
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
            <SideNavbar />
            <main className="sm:ml-64 flex-1 p-8 overflow-y-auto my-24">
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

                {loading ? (
                    <p className="text-white">Loading buku...</p>
                ) : filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onReservasiClick={() => handleOpenModal(book)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-white">Tidak ada buku ditemukan.</p>
                )}

                {/* Modal Reservasi */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    book={selectedBook}
                    userId={userId}
                />
            </main>
        </div>
    );
};

export default PerpustakaanPages;
