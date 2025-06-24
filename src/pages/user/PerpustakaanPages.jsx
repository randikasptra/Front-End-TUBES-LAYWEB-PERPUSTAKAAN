import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SideNavbar from '../../component/ui/SideNavbar'
import BookCard from '../../component/ui/BookCard'
import Footer from '../../component/ui/Footer'
import Modal from '../../component/ui/Modal'
import { getAllBooks } from '../../services/bookService'
import { Search, Filter, BookOpenText } from 'lucide-react'

const PerpustakaanPages = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('Semua')
    const [allBooks, setAllBooks] = useState([])
    const [kategoriList, setKategoriList] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedBook, setSelectedBook] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const booksResponse = await getAllBooks()
            setAllBooks(booksResponse)

            const kategoriRes = await fetch(
                'https://be-perpustakaan-express-production.up.railway.app/api/category',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            const kategoriData = await kategoriRes.json()
            if (kategoriData.success) {
                setKategoriList(kategoriData.data.map((item) => item.nama))
            }
        } catch (error) {
            console.error('❌ Gagal memuat data:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch = book.judul.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === 'Semua' || book.kategori?.nama === filter
        return matchesSearch && matchesFilter
    })

    const handleOpenModal = (book) => {
        setSelectedBook(book)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedBook(null)
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white">
            <SideNavbar />

            {/* Konten dan Footer di kolom kanan */}
            <div className="flex flex-col flex-1 sm:ml-64">
                <main className="mt-24 px-6 sm:px-8 flex-1 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto"
                    >
                        {/* Header dan Filter */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                            {/* Search Input */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="relative flex-1 max-w-2xl"
                            >
                                <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                                    <Search className="w-5 h-5 text-blue-300" />
                                    <input
                                        type="text"
                                        placeholder="Cari buku berdasarkan judul..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-transparent text-white placeholder:text-slate-400 focus:outline-none text-sm md:text-base"
                                    />
                                </div>
                            </motion.div>

                            {/* Filter Dropdown */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2"
                            >
                                <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-sm border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                                    <Filter className="w-5 h-5 text-blue-300" />
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="bg-slate-800/70 text-white text-sm md:text-base px-3 py-2 rounded-lg border border-slate-700 hover:border-blue-400 focus:outline-none transition-all duration-200 cursor-pointer shadow-sm"
                                    >

                                        <option value="Semua">Semua Kategori</option>
                                        {kategoriList.map((kategori, idx) => (
                                            <option key={idx} value={kategori}>
                                                {kategori}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>
                        </div>

                        {/* Book List */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-transparent border-blue-400 animate-spin"></div>
                                    <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-blue-300 animate-spin-reverse"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BookOpenText className="text-blue-300 animate-pulse" size={28} />
                                    </div>
                                </div>
                                <div className="text-center space-y-1">
                                    <p className="text-blue-100 font-medium text-lg">Memuat Koleksi Buku</p>
                                    <p className="text-blue-300/80 text-sm">...</p>
                                </div>
                            </div>
                        ) : filteredBooks.length > 0 ? (
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {filteredBooks.map((book, index) => (
                                    <motion.div
                                        key={book.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <BookCard book={book} onReservasiClick={() => handleOpenModal(book)} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-16 text-center"
                            >
                                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                    <BookOpenText size={40} className="text-slate-500" />
                                </div>
                                <h3 className="text-xl font-medium text-slate-300 mb-2">
                                    {searchTerm ? 'Buku tidak ditemukan' : 'Belum ada buku tersedia'}
                                </h3>
                                <p className="text-slate-500 max-w-md">
                                    {searchTerm
                                        ? `Tidak ada hasil untuk "${searchTerm}"`
                                        : filter === 'Semua'
                                            ? 'Katalog buku sedang kosong'
                                            : `Tidak ada buku dalam kategori "${filter}"`}
                                </p>
                            </motion.div>
                        )}

                        {/* Modal */}
                        {isModalOpen && selectedBook && (
                            <Modal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                book={selectedBook}
                            />
                        )}
                    </motion.div>
                </main>

                {/* Footer full-width tidak tertimpa sidenav */}
                <Footer />
            </div>
        </div>
    )
}

export default PerpustakaanPages
