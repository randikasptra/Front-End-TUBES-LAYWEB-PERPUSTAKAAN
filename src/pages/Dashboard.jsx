import React from "react";
import { Card, CardContent } from "../component/ui/card";
import { Button } from "../component/ui/buttons";
import SideNavbar from "../component/ui/SideNavbar"; // asumsi nama component & path-nya bener

const books = [
    { id: 1, title: "Buku Pemrograman", author: "John Doe" },
    { id: 2, title: "Algoritma Dasar", author: "Jane Smith" },
    { id: 3, title: "React for Beginner", author: "Alex Ray" },
    { id: 4, title: "Database Modern", author: "Mira Khan" },
    { id: 5, title: "Design UI/UX", author: "Sam Lee" },
    { id: 6, title: "Sistem Informasi", author: "Rina Tan" },
];

const BookCard = ({ title, author }) => {
    return (
        <Card className="w-full max-w-xs rounded-3xl shadow-xl bg-gradient-to-tr from-indigo-800 via-blue-800 to-blue-900 text-white hover:scale-[1.02] transition-transform duration-300 ease-in-out">
            <CardContent className="p-5 flex flex-col gap-3">
                <div className="h-36 bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
                    <span className="text-sm text-gray-700">[Foto Buku Dummy]</span>
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-200">{author}</p>
                <Button className="mt-auto bg-white text-blue-700 hover:bg-blue-200 font-semibold transition duration-200">
                    Pinjam
                </Button>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
            {/* Sidebar */}
            <SideNavbar />


            {/* Main content */}
            <main className="ml-64 flex-1 p-8 overflow-y-auto">
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
