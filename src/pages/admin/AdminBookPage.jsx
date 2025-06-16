import React, { useState, useEffect } from 'react'
import { Button } from '@/component/ui/buttons'
import { Input } from '@/component/ui/input'
import { Pencil, Trash2, Eye } from 'lucide-react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import AddBookModal from '@/component/ui/AddBookModal'
import EditBookModal from '@/component/ui/EditBookModal'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config'
import {
    createBook,
    deleteBook,
    getAllBooks,
    updateBook,
} from '../../services/bookService'
import { upload } from '@vercel/blob/client'
import axios from 'axios'

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
            const token = localStorage.getItem('token')
            const formData = new FormData()

            // Mapping nama field FE ke yang dibutuhkan BE
            formData.append('judul', bookData.judul_buku)
            formData.append('isbn', bookData.isbn || 'ISBN-DEFAULT') // dummy ISBN jika kosong
            formData.append('tahunTerbit', bookData.tahun_terbit)
            formData.append('kategoriId', bookData.id_kategory)
            formData.append('deskripsi', bookData.deskripsi || '')
            formData.append('penerbit', bookData.penerbit || '')
            formData.append('penulis', bookData.pengarang || '')
            formData.append('stok', bookData.jumlah_stok || 1)
            formData.append('status', bookData.status || 'tersedia')

            // 🔍 Perbaiki pengiriman file
            if (bookData.cover instanceof File) {
                formData.append('image', bookData.cover)
            } else {
                console.warn('❗ File cover tidak valid atau tidak ditemukan')
            }

            // Debug log
            for (const [key, value] of formData.entries()) {
                console.log(`formData: ${key} =>`, value)
            }

            // Kirim request
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/book/tambah`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // ⛔ Jangan set Content-Type!
                    },
                }
            )

            toast.success('Buku berhasil ditambahkan')
            setIsModalOpenAdd(false)
            fetchBooks()
        } catch (error) {
            console.error('🔥 ERROR Full:', error)

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
            Object.entries(bookData).forEach(([key, value]) => {
                formData.append(key, value)
            })

            await updateBook(bookData.id, formData)
            toast.success('Buku berhasil diperbarui')
            setIsModalOpenEdit(false)
            fetchBooks()
        } catch (error) {
            console.error('Gagal mengedit buku:', error)
            toast.error('Gagal mengedit buku')
        }
    }

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id)
            toast.success('Buku berhasil dihapus')
            setBooks((prev) => prev.filter((book) => book.id !== id))
        } catch (error) {
            console.error('Gagal menghapus buku:', error)
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
        <>
            {/* Delete Modal */}
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
                                className='px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-slate-800'
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

            {/* Add & Edit Modals */}
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

            <div className='ml-64 p-8 text-white min-h-screen bg-[#1c1f2b]'>
                <SidebarAdmin />
                <div className='flex items-center justify-between mb-6'>
                    <Input
                        className='max-w-sm rounded-lg'
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

                <div className='overflow-x-auto rounded-xl shadow-md'>
                    <table className='w-full text-sm border-collapse'>
                        <thead className='bg-blue-900 text-white'>
                            <tr>
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
                        <tbody className='bg-[#2a2d3d] text-white divide-y divide-gray-700'>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan='10'
                                        className='p-6 text-center'
                                    >
                                        Memuat data...
                                    </td>
                                </tr>
                            ) : filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr
                                        key={book.id}
                                        className='hover:bg-[#34374a] transition'
                                    >
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3'>
                                            {book.image ? (
                                                <img
                                                    src={book.image}
                                                    alt={`Cover ${book.judul}`}
                                                    className='w-12 h-16 object-cover rounded'
                                                />
                                            ) : (
                                                <span className='text-gray-400'>
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className='p-3'>{book.judul}</td>
                                        <td className='p-3'>
                                            {book.kategori?.nama || '-'}
                                        </td>
                                        <td className='p-3'>
                                            {book.penulis || '-'}
                                        </td>
                                        <td className='p-3'>
                                            {book.penerbit || '-'}
                                        </td>
                                        <td className='p-3'>
                                            {book.tahunTerbit || '-'}
                                        </td>
                                        <td className='p-3'>{book.stok}</td>
                                        <td className='p-3'>
                                            <span
                                                className={`px-2 py-1 rounded-full capitalize text-xs font-medium ${
                                                    book.status === 'tersedia'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}
                                            >
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
                                                    onClick={() =>
                                                        handleEditClick(book)
                                                    }
                                                    className='bg-blue-600 hover:bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Edit Buku'
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBookId(
                                                            book.id
                                                        )
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
                                    <td
                                        colSpan='10'
                                        className='p-6 text-center text-gray-400'
                                    >
                                        Tidak ada data buku yang ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminBookPage
