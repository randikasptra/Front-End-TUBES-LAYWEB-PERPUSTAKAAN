import React from "react";
// import { Card, CardContent } from "/src/component/ui/card";
// import { Button } from "/src/component/ui/button";

import { Card, CardContent } from "../component/ui/card";
import { Button } from "../component/ui/buttons";
import { Sidebar } from "lucide-react";



const books = [
    { id: 1, title: "Buku Pemrograman", author: "John Doe" },
    { id: 2, title: "Algoritma Dasar", author: "Jane Smith" },
    { id: 3, title: "React for Beginner", author: "Alex Ray" },
    { id: 4, title: "Database Modern", author: "Mira Khan" },
    { id: 5, title: "Design UI/UX", author: "Sam Lee" },
    { id: 6, title: "Sistem Informasi", author: "Rina Tan" },
    // Tambah buku lain sesuai kebutuhan
];

const BookCard = ({ title, author }) => {
    return (
        <Card className="w-full max-w-xs rounded-2xl shadow-lg bg-gradient-to-b from-blue-900 to-blue-700 text-white">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="h-32 bg-gray-300 rounded-xl mb-2 flex items-center justify-center">
                    <span className="text-sm text-gray-700">[Foto Buku Dummy]</span>
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-200">{author}</p>
                <Button className="mt-auto bg-white text-blue-700 hover:bg-blue-200 font-semibold">Pinjam</Button>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-blue-950">
            {/* Sidebar */}
         <Sidebar />

            {/* Main content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {/* Banner */}
                <div className="bg-gradient-to-r from-blue-800 to-purple-700 text-white rounded-3xl p-8 mb-10 shadow-xl">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">Pinjam Buku Tanpa Ribet. Ambil Sesuai Jadwal.</h1>
                    <p className="text-sm md:text-base text-slate-100">Temukan buku yang kamu butuhkan dan reservasi kapan mau ambil di perpus.</p>
                </div>

                {/* Book Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} title={book.title} author={book.author} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
