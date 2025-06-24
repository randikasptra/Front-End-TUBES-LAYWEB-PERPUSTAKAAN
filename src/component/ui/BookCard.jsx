import React, { useState } from 'react'
import { Card, CardContent } from './card'
import { Button } from './buttons'
import ReserveModal from './Modal'
import { motion } from 'framer-motion'
import { BookOpenText, User, Clock } from 'lucide-react'

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
    const author = penulis || 'Penulis Tidak Diketahui'
    const category = kategori?.nama || 'Umum'
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
                whileHover={{ y: -5 }}
                className="h-full"
            >
                <Card
                    className={`w-full h-full max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950/80 border border-slate-700/50 transition-all duration-300 ${
                        isHovered ? 'shadow-xl' : 'shadow-lg'
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Book Cover with Gradient Overlay */}
                    <div className="relative h-56 group overflow-hidden">
                        {image ? (
                            <>
                                <motion.img
                                    src={image}
                                    alt={title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    animate={{ 
                                        scale: isHovered ? 1.05 : 1,
                                        opacity: isHovered ? 0.9 : 0.85
                                    }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"
                                    initial={{ opacity: 0.7 }}
                                    animate={{ opacity: isHovered ? 0.8 : 0.7 }}
                                />
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center bg-slate-800/50">
                                <BookOpenText className="text-slate-500" size={40} />
                            </div>
                        )}

                        {/* Status Badges */}
                        <motion.div 
                            className="absolute top-3 left-3 flex flex-wrap gap-2"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ 
                                y: isHovered ? 0 : -10, 
                                opacity: isHovered ? 1 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="bg-slate-800/80 text-slate-200 text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-slate-700/50 flex items-center">
                                <BookOpenText size={12} className="mr-1" />
                                {category}
                            </span>
                            {!availability && (
                                <span className="bg-red-500/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm border border-red-400/20 flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    Dipinjam
                                </span>
                            )}
                        </motion.div>
                    </div>

                    {/* Book Details */}
                    <CardContent className="p-5 space-y-4">
                        <motion.div 
                            className="space-y-2"
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? -3 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3
                                className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors"
                                title={title}
                            >
                                {title}
                            </h3>
                            <p className="text-sm text-slate-400 italic flex items-center">
                                <User size={14} className="mr-2" />
                                {author}
                            </p>
                        </motion.div>

                        {/* Availability Status */}
                        <motion.div
                            className="flex justify-between items-center"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isHovered ? 0.9 : 1 }}
                        >
                            <span
                                className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                                    availability
                                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                        : 'bg-slate-800/60 text-slate-400 border border-slate-700/50'
                                }`}
                            >
                                {availability ? 'Tersedia' : 'Tidak Tersedia'}
                            </span>
                        </motion.div>

                        {/* Action Button */}
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Button
                                onClick={() => setModalOpen(true)}
                                disabled={!availability}
                                className={`w-full font-medium rounded-xl text-sm py-3 transition-all duration-200 ${
                                    availability
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md hover:shadow-lg'
                                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                                }`}
                            >
                                {availability ? 'Reservasi Sekarang' : 'Sedang Dipinjam'}
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