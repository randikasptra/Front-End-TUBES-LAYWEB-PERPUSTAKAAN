import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailBook } from '../../../../services/bookService'

const DetailBook = () => {
    const { id } = useParams()
    const [buku, setBuku] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBuku = async () => {
            try {
                const response = await getDetailBook(id)
                setBuku(response.data.data)
            } catch (error) {
                console.error('Gagal mengambil data buku:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBuku()
    }, [id])

    if (loading) {
        return (
            <div className='max-w-4xl mx-auto p-6'>
                <div className='animate-pulse space-y-6'>
                    <div className='h-8 bg-gray-200 rounded w-1/3'></div>

                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='w-full md:w-1/3'>
                            <div className='h-64 bg-gray-200 rounded-lg'></div>
                        </div>

                        <div className='w-full md:w-2/3 space-y-4'>
                            <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                            <div className='h-4 bg-gray-200 rounded w-full'></div>
                            <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                            <div className='h-4 bg-gray-200 rounded w-4/5'></div>

                            <div className='pt-4 space-y-3'>
                                <div className='h-5 bg-gray-200 rounded w-1/2'></div>
                                <div className='h-5 bg-gray-200 rounded w-1/3'></div>
                                <div className='h-5 bg-gray-200 rounded w-2/5'></div>
                                <div className='h-5 bg-gray-200 rounded w-1/4'></div>
                                <div className='h-5 bg-gray-200 rounded w-1/3'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                Detail Buku
            </h1>

            <div className='flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6'>
                <div className='w-full md:w-1/3'>
                    <img
                        src={buku.image || '/placeholder-book.jpg'}
                        alt={buku.judul}
                        className='w-full h-auto object-cover rounded-lg shadow-md'
                        onError={(e) => {
                            e.target.src = '/placeholder-book.jpg'
                        }}
                    />
                </div>

                <div className='w-full md:w-2/3'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                        {buku.judul}
                    </h2>
                    <p className='text-gray-600 mb-4'>
                        {buku.penulis} • {buku.penerbit} • {buku.tahunTerbit}
                    </p>

                    <div className='mb-4'>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                buku.status === 'Tersedia'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {buku.status} • Stok: {buku.stok}
                        </span>
                    </div>

                    <div className='mb-6'>
                        <h3 className='text-lg font-medium text-gray-800 mb-2'>
                            Deskripsi
                        </h3>
                        <p className='text-gray-600'>
                            {buku.deskripsi || 'Tidak ada deskripsi tersedia.'}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <h4 className='text-sm font-medium text-gray-500'>
                                ISBN
                            </h4>
                            <p className='text-gray-800'>{buku.isbn}</p>
                        </div>

                        <div>
                            <h4 className='text-sm font-medium text-gray-500'>
                                Kategori
                            </h4>
                            <p className='text-gray-800'>
                                {buku.kategori?.nama || '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailBook
