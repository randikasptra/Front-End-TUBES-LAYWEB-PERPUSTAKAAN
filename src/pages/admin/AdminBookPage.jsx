import React, { useState, useEffect } from 'react'
import { Button } from '@/component/ui/buttons' // pastikan plural "buttons"
import { Input } from '@/component/ui/input'
import { Card } from '@/component/card'
import { Pencil, Trash2, Eye } from 'lucide-react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import AddBookModal from '@/component/ui/AddBookModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminBookPage = () => {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(
                    'http://localhost:5000/api/book/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setBooks(response.data.data || [])
                console.log('Books fetched successfully:', response.data.data)
            } catch (error) {
                console.error('Error fetching books:', error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
    }, [])

    const handleAddBook = async (bookData) => {
        console.log('Data Buku Baru:', bookData)

        try {
            const token = localStorage.getItem('token')
            const formData = new FormData()

            // Masukkan semua data ke FormData
            formData.append('image', bookData.image)
            formData.append('judul', bookData.judul)
            formData.append('deskripsi', bookData.deskripsi)
            formData.append('isbn', bookData.isbn)
            formData.append('penulis', bookData.penulis)
            formData.append('penerbit', bookData.penerbit)
            formData.append('tahunTerbit', bookData.tahunTerbit)
            formData.append('kategoriId', bookData.kategoriId)
            formData.append('stok', bookData.stok)
            formData.append('status', bookData.status)

            const response = await axios.post(
                'http://localhost:5000/api/book/tambah',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            console.log('Buku berhasil ditambahkan:', response.data)
        } catch (error) {
            console.error('Gagal menambahkan buku:', error)
        }
    }

    const filteredBooks = books.filter((book) =>
        book.judul?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDeleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(
                `http://localhost:5000/api/book/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))

            toast.success('Buku berhasil dihapus')
        } catch (error) {
            console.error('Gagal menghapus buku:', error)
            toast.error('Gagal menghapus buku')
        }
    }

    return (
        <>
            {showDeleteModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white dark:bg-slate-800 p-6 rounded-xl w-[90%] max-w-md'>
                        <h2 className='text-lg font-semibold text-slate-800 dark:text-white mb-4'>
                            Konfirmasi Hapus
                        </h2>
                        <p className='text-sm text-slate-600 dark:text-slate-300 mb-6'>
                            Apakah kamu yakin ingin menghapus buku ini? Tindakan
                            ini tidak bisa dibatalkan.
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
                        onClick={() => setIsModalOpen(true)}
                        className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg'
                    >
                        + Tambah Buku
                    </Button>

                    <AddBookModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleAddBook}
                    />
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full border-collapse rounded-xl overflow-hidden text-sm'>
                        <thead className='bg-blue-900 text-left'>
                            <tr>
                                <th className='p-3'>No</th>
                                <th className='p-3'>Cover</th>
                                <th className='p-3'>Judul Buku</th>
                                <th className='p-3'>Penulis</th>
                                <th className='p-3'>Penerbit</th>
                                <th className='p-3'>Tahun</th>
                                <th className='p-3'>Stok</th>
                                <th className='p-3'>Status</th>
                                <th className='p-3'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#2a2d3d] divide-y divide-gray-700'>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan='9'
                                        className='p-8 text-center'
                                    >
                                        <div className='flex justify-center items-center'>
                                            <svg
                                                className='animate-spin h-5 w-5 mr-3 text-white'
                                                viewBox='0 0 24 24'
                                            >
                                                <circle
                                                    className='opacity-25'
                                                    cx='12'
                                                    cy='12'
                                                    r='10'
                                                    stroke='currentColor'
                                                    strokeWidth='4'
                                                />
                                                <path
                                                    className='opacity-75'
                                                    fill='currentColor'
                                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                                />
                                            </svg>
                                            Memuat data...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr
                                        key={book.id}
                                        className='hover:bg-[#34374a]'
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
                                        colSpan='9'
                                        className='p-4 text-center text-gray-400'
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
