import React, { useEffect, useState } from 'react'
import SideNavbar from '../../component/ui/SideNavbar'
import BookCard from '../../component/ui/BookCard'
import Footer from '../../component/ui/Footer'
import HeaderDashboard from '../../component/ui/HeaderDashboard'
import { getAllBooks } from '../../services/bookService'
import { BookOpenText } from 'lucide-react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const DashboardMahasiswa = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setLoading(true)
        try {
            const result = await getAllBooks()
            setBooks(result)
        } catch (error) {
            console.error('Gagal memuat buku:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50'>
            <div className='flex flex-1'>
                <SideNavbar />

                <div className='flex-1 flex flex-col'>
                    <main className='flex-1 sm:ml-64 p-6 md:p-8 overflow-y-auto pt-24 sm:pt-8'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <HeaderDashboard />

                            {loading ? (
                                <div className='flex flex-col items-center justify-center min-h-[400px] space-y-6'>
                                    <div className='relative w-20 h-20'>
                                        {/* Animated gradient spinner */}
                                        <div className='absolute inset-0 rounded-full border-4 border-blue-500/30'></div>
                                        <div className='absolute inset-0 rounded-full border-4 border-t-transparent border-l-transparent border-blue-400 animate-spin'></div>
                                        <div className='absolute inset-1 rounded-full border-4 border-transparent border-t-blue-300 animate-spin-reverse'></div>

                                        {/* Book icon in center */}
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <BookOpenText
                                                className='text-blue-300 animate-pulse'
                                                size={28}
                                            />
                                        </div>
                                    </div>

                                    {/* Loading text with typing animation */}
                                    <div className='text-center space-y-1'>
                                        <p className='text-blue-100 font-medium text-lg'>
                                            Memuat Koleksi Buku
                                        </p>
                                        <p className='text-blue-300/80 text-sm'>
                                            <span className='inline-block animate-typing'>
                                                ...
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {books.map((book, index) => (
                                        <motion.div
                                            key={book.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.05,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            <BookCard book={book} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    </main>

                    <div className='sm:ml-64'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardMahasiswa
