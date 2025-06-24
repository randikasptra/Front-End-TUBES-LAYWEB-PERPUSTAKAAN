import React, { useState, useEffect } from 'react'
import SideNavbar from '../../component/ui/SideNavbar'
import BookCard from '../../component/ui/BookCard'
import Modal from '../../component/ui/Modal'
import { getAllBooks } from '../../services/bookService'
import { Search, Filter } from 'lucide-react'

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
      // Ambil semua buku
      const booksResponse = await getAllBooks()
      setAllBooks(booksResponse)

      // Ambil semua kategori secara langsung pakai fetch (tanpa import service)
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
    const matchesSearch = book.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      filter === 'Semua' || book.kategori?.nama === filter
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
    <div className='min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white'>
      <SideNavbar />
      <main className='mt-24 sm:ml-64 flex-1 p-6 sm:p-10 overflow-y-auto'>

        {/* Header dan Filter */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10'>
          {/* Search Input */}
          <div className='flex flex-1 items-center gap-2 bg-slate-800 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500'>
            <Search className='w-5 h-5 text-slate-400' />
            <input
              type='text'
              placeholder='Cari Buku...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-transparent text-white placeholder:text-slate-400 focus:outline-none'
            />
          </div>

          {/* Filter Dropdown */}
          <div className='flex items-center gap-2'>
            <Filter className='w-5 h-5 text-slate-300' />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='bg-slate-800 px-4 py-2 rounded-xl text-white focus:outline-none shadow-sm'
            >
              <option value='Semua'>Semua Kategori</option>
              {kategoriList.map((kategori, idx) => (
                <option key={idx} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Book List */}
        {loading ? (
          <p className='text-white'>🔄 Loading buku...</p>
        ) : filteredBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onReservasiClick={() => handleOpenModal(book)}
              />
            ))}
          </div>
        ) : (
          <p className='text-white'>📭 Tidak ada buku ditemukan.</p>
        )}

        {/* Modal */}
        {isModalOpen && selectedBook && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            book={selectedBook}
          />
        )}
      </main>
    </div>
  )
}

export default PerpustakaanPages
