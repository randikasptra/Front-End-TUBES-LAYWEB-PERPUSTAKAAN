import React, { useState } from 'react'
import { Card, CardContent } from './card'
import { Button } from './buttons'
import ReserveModal from './Modal'
import { motion } from 'framer-motion'

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
    const description = deskripsi || ''

    const bookData = {
        bookId,
        title,
        author,
        image,
        category,
        description,
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="h-full"
            >
                <Card
                    className={`w-full h-full max-w-sm rounded-xl overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#172554] border border-blue-800/30 transition-all duration-300 ${
                        isHovered ? 'shadow-lg' : 'shadow'
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative h-48 group overflow-hidden">
                        {image ? (
                            <>
                                <motion.img
                                    src={image}
                                    alt={title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: isHovered ? 1.04 : 1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-t from-[#172554]/90 via-[#1e3a8a]/40 to-transparent"
                                    initial={{ opacity: 0.6 }}
                                    animate={{ opacity: isHovered ? 0.75 : 0.6 }}
                                />
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center bg-[#1e3a8a]/30">
                                <span className="text-blue-200/50 text-sm">
                                    No cover available
                                </span>
                            </div>
                        )}

                        <motion.div 
                            className="absolute top-3 left-3 flex flex-wrap gap-2"
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="bg-[#172554]/80 text-blue-100 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-blue-700/50">
                                {category}
                            </span>
                            {!availability && (
                                <span className="bg-red-500/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-red-400/20">
                                    Borrowed
                                </span>
                            )}
                        </motion.div>
                    </div>

                    <CardContent className="p-4 space-y-3">
                        <motion.div 
                            className="space-y-1"
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? -3 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3
                                className="text-lg font-semibold text-white line-clamp-2 leading-snug"
                                title={title}
                            >
                                {title}
                            </h3>
                            <p className="text-sm text-blue-200 italic">by {author}</p>
                        </motion.div>

                        <motion.div
                            className="flex justify-between items-center"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isHovered ? 0.95 : 1 }}
                        >
                            <span
                                className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                    availability
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                        : 'bg-blue-900/60 text-blue-300 border border-blue-700/50'
                                }`}
                            >
                                {availability ? 'Available' : 'Unavailable'}
                            </span>
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.015 }}
                        >
                            <Button
                                onClick={() => setModalOpen(true)}
                                disabled={!availability}
                                className={`w-full font-medium rounded-lg text-sm py-2.5 transition-all duration-200 ${
                                    availability
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-sm hover:shadow'
                                        : 'bg-blue-900/50 text-blue-300/50 cursor-not-allowed border border-blue-700/50'
                                }`}
                            >
                                {availability ? 'Borrow Now' : 'Unavailable'}
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>

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
