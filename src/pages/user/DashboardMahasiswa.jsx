import React from "react";
import SideNavbar from "../../component/ui/SideNavbar";
import BookCard from "../../component/ui/BookCard";
import Footer from "../../component/ui/Footer";
import HeaderDashboard from "../../component/ui/HeaderDashboard";

const books = [
    { id: 1, title: "Buku Pemrograman", author: "John Doe" },
    { id: 2, title: "Algoritma Dasar", author: "Jane Smith" },
    { id: 3, title: "React for Beginner", author: "Alex Ray" },
    { id: 4, title: "Database Modern", author: "Mira Khan" },
    { id: 5, title: "Design UI/UX", author: "Sam Lee" },
    { id: 6, title: "Sistem Informasi", author: "Rina Tan" },
];

const DashboardMahasiswa = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
            <div className="flex flex-1">
                <SideNavbar />

                <main className="sm:ml-64 flex-1 p-8 overflow-y-auto">
                  <HeaderDashboard />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {books.map((book) => (
                            <BookCard key={book.id} title={book.title} author={book.author} />
                        ))}
                    </div>
                </main>
            </div>

            <Footer className="ml-64 z-10" />

        </div>
    );
};

export default DashboardMahasiswa;
