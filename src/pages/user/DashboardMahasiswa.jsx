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
        <div className='min-h-screen flex flex-col bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa]'>
            <div className='flex flex-1'>
                <SideNavbar />
                
                <div className='flex-1 flex flex-col'>
                    <main className='flex-1 sm:ml-64 p-6 md:p-8 overflow-y-auto pt-24 sm:pt-8'>
                        <HeaderDashboard />

                        {loading ? (
                            <div className='flex justify-center items-center h-64'>
                                <div className='text-white text-lg'>Memuat buku...</div>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {books.map((book) => (
                                    <BookCard
                                        key={book.id}
                                        book={book} 
                                    />
                                ))}
                            </div>
                        )}
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