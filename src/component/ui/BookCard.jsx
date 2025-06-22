// src/component/ui/BookCard.jsx
import React from "react";

const BookCard = ({ book }) => {
    const { judul, penulis, kategori, cover } = book;

    return (
        <div className="bg-slate-800 rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <img
                src={cover ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${cover}` : "/no-image.png"}
                alt={judul}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-white mb-1">{judul}</h3>
            <p className="text-sm text-slate-300 mb-1">Penulis: {penulis}</p>
            <p className="text-sm text-slate-400">Kategori: {kategori?.nama || '-'}</p>
        </div>
    );
};

export default BookCard;
