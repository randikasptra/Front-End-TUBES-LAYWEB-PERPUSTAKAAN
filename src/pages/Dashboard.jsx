import React from "react";
import SideNavbar from "../component/ui/SideNavbar";
import BookCard from "../component/ui/BookCard";


const books = [
    { id: 1, title: "Buku Pemrograman", author: "John Doe" },
    { id: 2, title: "Algoritma Dasar", author: "Jane Smith" },
    { id: 3, title: "React for Beginner", author: "Alex Ray" },
    { id: 4, title: "Database Modern", author: "Mira Khan" },
    { id: 5, title: "Design UI/UX", author: "Sam Lee" },
    { id: 6, title: "Sistem Informasi", author: "Rina Tan" },
];



const Dashboard = () => {
    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa]
 text-white">
            <SideNavbar />


            <main className="sm:ml-64 flex-1 p-8 overflow-y-auto">

                {/* Banner */}
                <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white rounded-3xl p-8 mb-10 shadow-xl">
                    <h1 className="text-3xl font-bold mb-2">Pinjam Buku Tanpa Ribet. Ambil Sesuai Jadwal.</h1>
                    <p className="text-base text-slate-100">Temukan buku yang kamu butuhkan dan reservasi kapan mau ambil di perpus.</p>
                </div>

                {/* Book Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <BookCard key={book.id} title={book.title} author={book.author} />
                    ))}
                </div>
            </main>
        </div>
    );
};




export default Dashboard;
