import React, { useState } from 'react'
import { Card, CardContent } from './card'
import { Button } from './buttons'
import ReserveModal from './Modal'

const BookCard = ({ book }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        id: bookId,
        judul,
        penulis,
        image,
        kategori,
        status,
        deskripsi,
    } = book

    const title = judul
    const author = penulis || 'Unknown Author'
    const category = kategori?.nama || 'Uncategorized'
    const availability = status?.toLowerCase() === 'tersedia'
    const rating = 4.5 // static
    const description = deskripsi || ''

    const bookData = {
        bookId,
        title,
        author,
        image,
        category,
        rating,
        description,
    }

    // Tetap dipertahankan sesuai permintaan
    const renderRatingStars = () => (
        <></> // kosong, karena rating diminta dihapus dari tampilan
    )

    return (
        <>
           <Card
    className={`w-full max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border border-blue-700 transition-all duration-300 ${
        isHovered ? 'scale-[1.02] shadow-2xl' : 'shadow-md'
    }`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
>
    <div className="relative h-56">
        {image ? (
            <>
                <img
                    src={image}
                    alt={title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-105 opacity-95' : 'scale-100 opacity-80'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/40 to-transparent" />
            </>
        ) : (
            <div className="h-full flex items-center justify-center bg-blue-400/20">
                <span className="text-blue-100/70 text-sm">
                    No cover available
                </span>
            </div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {!availability && (
                <span className="bg-red-500/90 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                    Borrowed
                </span>
            )}
            <span className="bg-blue-950/60 text-blue-100 text-xs px-2 py-0.5 rounded-full shadow-sm">
                {category}
            </span>
        </div>
    </div>

    <CardContent className="p-4 space-y-4">
        <div className="space-y-1">
            <h3
                className="text-lg font-semibold text-white line-clamp-2 leading-tight"
                title={title}
            >
                {title}
            </h3>
            <p className="text-sm text-blue-200/80 italic">by {author}</p>
        </div>

        <div className="flex justify-between items-center">
            <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                    availability
                        ? 'bg-blue-600/20 text-blue-100'
                        : 'bg-blue-900/40 text-blue-200/70'
                }`}
            >
                {availability ? 'Available' : 'Unavailable'}
            </span>
        </div>

        <Button
            onClick={() => setModalOpen(true)}
            disabled={!availability}
            className={`w-full font-medium rounded-md text-sm py-2 transition-all duration-200 ${
                availability
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                    : 'bg-blue-900/40 text-blue-200/50 cursor-not-allowed'
            }`}
        >
            {availability ? 'Borrow Now' : 'Unavailable'}
        </Button>
    </CardContent>
</Card>


            <ReserveModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                book={bookData}
                isAvailable={availability}
            />
        </>
    )
}

export default BookCard