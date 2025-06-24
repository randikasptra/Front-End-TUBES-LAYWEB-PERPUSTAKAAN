import React, { useEffect, useState } from 'react'
import SideNavbar from '../../component/ui/SideNavbar'
import BookCard from '../../component/ui/BookCard'
import Footer from '../../component/ui/Footer'
import HeaderDashboard from '../../component/ui/HeaderDashboard'
import { getAllBooks } from '../../services/bookService'

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
            console.log(result)
        } catch (error) {
            console.error('Gagal memuat buku:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white'>
            <div className='flex flex-1'>
                <SideNavbar />

                <main className='sm:ml-64 flex-1 p-8 overflow-y-auto'>
                    <HeaderDashboard />

                    {loading ? (
                        <div className='text-white'>Loading buku...</div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
                            {books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book} 
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            <Footer className='ml-64 z-10' />
        </div>
    )
}

export default DashboardMahasiswa