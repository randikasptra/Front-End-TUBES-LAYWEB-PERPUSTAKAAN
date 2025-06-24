import React, { useState, useEffect } from 'react'
import { Button } from '@/component/ui/buttons'
import { Input } from '@/component/ui/input'
import { Pencil, Trash2, Eye, CalendarClock } from 'lucide-react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import AddBookModal from '@/component/ui/AddBookModal'
import EditBookModal from '@/component/ui/EditBookModal'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import {
    addBook,
    deleteBook,
    getAllBooks,
    updateBook,
} from '../../services/bookService'

const AdminBookPage = () => {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false)
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

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

    const handleAddBook = async (bookData) => {
        try {
            await addBook(bookData)
            toast.success('Buku berhasil ditambahkan')
            setIsModalOpenAdd(false)
            fetchBooks()
        } catch (error) {
            if (error.response?.data?.message?.includes('Unexpected field')) {
                toast.error('❌ Field `image` tidak dikenali backend')
            } else if (error.response?.data?.message) {
                toast.error(`❌ ${error.response.data.message}`)
            } else {
                toast.error('❌ Gagal menambahkan buku')
            }
        }
    }

    const handleUpdateBook = async (bookData) => {
        try {
            const formData = new FormData()
            formData.append('judul', bookData.judul)
            formData.append('isbn', bookData.isbn)
            formData.append('tahunTerbit', bookData.tahunTerbit)
            formData.append('kategoriId', bookData.kategoriId)
            formData.append('deskripsi', bookData.deskripsi || '')
            formData.append('penerbit', bookData.penerbit || '')
            formData.append('penulis', bookData.penulis || '')
            formData.append('stok', bookData.stok || 1)
            formData.append('status', bookData.status || 'tersedia')

            if (bookData.image instanceof File) {
                formData.append('image', bookData.image)
            } else if (bookData.coverLama) {
                formData.append('image', bookData.coverLama)
            }

            await updateBook(bookData.id, formData)
            toast.success('Buku berhasil diperbarui')
            setIsModalOpenEdit(false)
            fetchBooks()
        } catch (error) {
            if (error.response?.data?.message?.includes('Unexpected field')) {
                toast.error('❌ Field tidak dikenali backend')
            } else if (error.response?.data?.message) {
                toast.error(`❌ ${error.response.data.message}`)
            } else {
                toast.error('❌ Gagal mengedit buku')
            }
        }
    }

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id)
            toast.success('Buku berhasil dihapus')
            setBooks((prev) => prev.filter((book) => book.id !== id))
        } catch (error) {
            toast.error('Gagal menghapus buku')
        }
    }

    const handleEditClick = (book) => {
        setSelectedBook(book)
        setIsModalOpenEdit(true)
    }

    const filteredBooks = books.filter((book) =>
        book.judul.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white flex'>
            <SidebarAdmin />
            <main className='flex-1 p-6 sm:ml-64'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-2xl font-bold'>Data Buku</h1>
                    <div className='flex items-center gap-2 text-sm text-slate-400'>
                        <CalendarClock size={18} />
                        <span>
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                {/* Filter & Tambah */}
                <div className='bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg'>
                    <div className='flex flex-col md:flex-row justify-between gap-4'>
                        <Input
                            className='rounded-lg w-full md:max-w-sm'
                            placeholder='Cari judul buku...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => setIsModalOpenAdd(true)}
                            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg'
                        >
                            + Tambah Buku
                        </Button>
                    </div>
                </div>

                {/* Tabel Buku */}
                <div className='bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg p-6 overflow-x-auto'>
                    <table className='w-full text-sm text-white'>
                        <thead>
                            <tr className='text-slate-400 border-b border-slate-700'>
                                <th className='p-3 text-left'>No</th>
                                <th className='p-3 text-left'>Cover</th>
                                <th className='p-3 text-left'>Judul Buku</th>
                                <th className='p-3 text-left'>Kategori</th>
                                <th className='p-3 text-left'>Penulis</th>
                                <th className='p-3 text-left'>Penerbit</th>
                                <th className='p-3 text-left'>Tahun</th>
                                <th className='p-3 text-left'>Stok</th>
                                <th className='p-3 text-left'>Status</th>
                                <th className='p-3 text-left'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan='10' className='p-6 text-center text-slate-400'>
                                        Memuat data buku...
                                    </td>
                                </tr>
                            ) : filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr key={book.id} className='border-b border-slate-700 hover:bg-slate-700/50 transition-colors'>
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3'>
                                            {book.image ? (
                                                <img src={book.image} alt={book.judul} className='w-12 h-16 object-cover rounded' />
                                            ) : (
                                                <span className='text-slate-400'>-</span>
                                            )}
                                        </td>
                                        <td className='p-3'>{book.judul}</td>
                                        <td className='p-3'>{book.kategori?.nama || '-'}</td>
                                        <td className='p-3'>{book.penulis || '-'}</td>
                                        <td className='p-3'>{book.penerbit || '-'}</td>
                                        <td className='p-3'>{book.tahunTerbit || '-'}</td>
                                        <td className='p-3'>{book.stok}</td>
                                        <td className='p-3'>
                                            <span className={`px-2 py-1 rounded-full capitalize text-xs font-medium ${
                                                book.status === 'tersedia'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td className='p-3'>
                                            <div className='flex gap-2'>
                                                <Link
                                                    to={`/dashboard/admin/data-buku/${book.id}`}
                                                    className='bg-yellow-500 hover:bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Lihat Detail'
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleEditClick(book)}
                                                    className='bg-blue-600 hover:bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Edit Buku'
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBookId(book.id)
                                                        setShowDeleteModal(true)
                                                    }}
                                                    className='bg-red-600 hover:bg-red-500 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Hapus Buku'
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='10' className='p-6 text-center text-slate-400'>
                                        Tidak ada data buku yang ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modals */}
                {showDeleteModal && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                        <div className='bg-white dark:bg-slate-800 p-6 rounded-xl w-[90%] max-w-md'>
                            <h2 className='text-lg font-semibold mb-4 text-slate-800 dark:text-white'>
                                Konfirmasi Hapus
                            </h2>
                            <p className='text-sm text-slate-600 dark:text-slate-300 mb-6'>
                                Apakah kamu yakin ingin menghapus buku ini?
                            </p>
                            <div className='flex justify-end gap-3'>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className='px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-slate-800 dark:bg-gray-700 dark:text-white'
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={async () => {
                                        await handleDeleteBook(selectedBookId)
                                        setShowDeleteModal(false)
                                        setSelectedBookId(null)
                                    }}
                                    className='px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 text-white'
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <AddBookModal
                    isOpen={isModalOpenAdd}
                    onClose={() => setIsModalOpenAdd(false)}
                    onSubmit={handleAddBook}
                />
                <EditBookModal
                    isOpen={isModalOpenEdit}
                    onClose={() => setIsModalOpenEdit(false)}
                    onSubmit={handleUpdateBook}
                    initialData={selectedBook}
                />
            </main>
        </div>
    )
}

export default AdminBookPage
