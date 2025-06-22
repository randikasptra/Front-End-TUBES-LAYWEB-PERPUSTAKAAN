// src/component/ui/BookCard.jsx
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
    const rating = 4.5 // static, bisa random kalau mau
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

    const renderRatingStars = () => (
        <div className='flex items-center'>
            <div className='flex mr-1'>
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${
                            i < Math.floor(rating)
                                ? 'text-blue-300 fill-current'
                                : 'text-gray-300/70 fill-current'
                        }`}
                        viewBox='0 0 20 20'
                    >
                        <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                    </svg>
                ))}
            </div>
            <span className='text-xs text-blue-100'>{rating.toFixed(1)}</span>
        </div>
    )

    return (
        <>
            <Card
                className={`w-full max-w-xs rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 transition-all duration-300 ease-in-out ${
                    isHovered ? 'transform -translate-y-2 shadow-xl' : ''
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='relative h-56 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden'>
                    {image ? (
                        <>
                            <img
                                src={image}
                                alt={title}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                                    isHovered
                                        ? 'scale-110 opacity-90'
                                        : 'scale-100 opacity-80'
                                }`}
                            />
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/40 to-transparent transition-opacity duration-300 ${
                                    isHovered ? 'opacity-100' : 'opacity-90'
                                }`}
                            ></div>
                        </>
                    ) : (
                        <div className='h-full flex items-center justify-center bg-blue-400/20'>
                            <span className='text-blue-100/70 text-sm'>
                                No cover available
                            </span>
                        </div>
                    )}

                    <div className='absolute top-3 left-3 flex gap-2'>
                        {!availability && (
                            <span className='bg-red-400/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm'>
                                Borrowed
                            </span>
                        )}
                        <span className='bg-blue-900/70 text-blue-100 text-xs px-2 py-1 rounded-full backdrop-blur-sm'>
                            {category}
                        </span>
                    </div>
                </div>

                <CardContent className='p-4'>
                    <div className='mb-4'>
                        <h3
                            className='text-lg font-bold text-white line-clamp-2 mb-1 leading-tight'
                            title={title}
                        >
                            {title}
                        </h3>
                        <p
                            className='text-sm text-blue-100/90 mb-2'
                            title={author}
                        >
                            by {author}
                        </p>

                        <div className='flex justify-between items-center'>
                            {renderRatingStars()}
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    availability
                                        ? 'bg-blue-500/20 text-blue-100'
                                        : 'bg-blue-900/30 text-blue-200/70'
                                }`}
                            >
                                {availability ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={() => setModalOpen(true)}
                        disabled={!availability}
                        className={`w-full font-medium transition-all duration-200 ${
                            availability
                                ? 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg'
                                : 'bg-blue-900/40 text-blue-200/50 cursor-not-allowed'
                        }`}
                    >
                        {availability ? (
                            <span className='flex items-center justify-center gap-1'>
                                <svg
                                    className='w-4 h-4'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                    />
                                </svg>
                                Borrow Now
                            </span>
                        ) : (
                            'Unavailable'
                        )}
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
