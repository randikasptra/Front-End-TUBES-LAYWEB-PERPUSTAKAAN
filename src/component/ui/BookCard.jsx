import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./buttons";
import ReserveModal from "./Modal";

const BookCard = ({ title, author, image }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const bookData = {
    title,
    author,
    image,
    category: "Teknologi" // bisa dynamic kalau ada
  };

  return (
    <>
      <Card className="w-full max-w-xs rounded-3xl shadow-xl bg-gradient-to-tr from-indigo-800 via-blue-800 to-blue-900 text-white hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="h-36 bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
            <span className="text-sm text-gray-700">[Foto Buku Dummy]</span>
          </div>
          <h3 className="text-lg font-semibold truncate" title={title}>{title}</h3>
          <p className="text-sm text-gray-200 truncate" title={author}>{author}</p>
          <Button onClick={() => setModalOpen(true)} className="mt-auto bg-white text-blue-700 hover:bg-blue-200 font-semibold transition duration-200">
            Pinjam
          </Button>
        </CardContent>
      </Card>

      <ReserveModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        book={bookData}
      />
    </>
  );
};

export default BookCard;
