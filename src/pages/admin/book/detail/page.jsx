import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDetailBook } from '../../../../services/bookService'
import SidebarAdmin from '@/component/ui/SidebarAdmin'
import {
    BookOpen,
    User2,
    FileText,
    Layers,
    CalendarDays,
    ScanBarcode,
    Info,
    ArrowLeft,
} from 'lucide-react'

const DetailBook = () => {
    const { id } = useParams()
    const navigate = useNavigate()
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
            <div className="flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white">
                <SidebarAdmin />
                <main className="flex-1 p-8 sm:ml-64">
                    <div className="max-w-5xl mx-auto animate-pulse space-y-6">
                        <div className="h-8 bg-slate-700 rounded w-1/3"></div>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3 h-64 bg-slate-700 rounded-xl"></div>
                            <div className="w-full md:w-2/3 space-y-4">
                                <div className="h-6 bg-slate-600 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-600 rounded w-full"></div>
                                <div className="h-4 bg-slate-600 rounded w-5/6"></div>
                                <div className="h-4 bg-slate-600 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate('/dashboard/admin/data-buku')}
                        className="flex items-center text-sm mb-6 hover:text-yellow-400 transition"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke daftar buku
                    </button>

                    <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-yellow-400" /> Detail Buku
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                        <div className="w-full md:w-1/3">
                            <img
                                src={buku.image || '/placeholder-book.jpg'}
                                alt={buku.judul}
                                className="w-full h-auto object-cover rounded-xl shadow-md border border-slate-600"
                                onError={(e) => {
                                    e.target.src = '/placeholder-book.jpg'
                                }}
                            />
                        </div>

                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-yellow-400" />
                                {buku.judul}
                            </h2>

                            <p className="text-slate-300 flex items-center gap-2">
                                <User2 className="w-4 h-4 text-slate-400" />
                                {buku.penulis} • {buku.penerbit} •{' '}
                                <CalendarDays className="w-4 h-4 inline-block ml-1 mr-1 text-slate-400" />
                                {buku.tahunTerbit}
                            </p>

                            <div>
                                <span
                                    className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                                        buku.status === 'Tersedia'
                                            ? 'bg-green-600/20 text-green-400 border border-green-500'
                                            : 'bg-red-600/20 text-red-400 border border-red-500'
                                    }`}
                                >
                                    <Info className="inline-block w-4 h-4 mr-1" />
                                    {buku.status} • Stok: {buku.stok}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-400" />
                                    Deskripsi
                                </h3>
                                <p className="text-slate-300">
                                    {buku.deskripsi || 'Tidak ada deskripsi tersedia.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                        <ScanBarcode className="w-4 h-4 text-purple-400" />
                                        ISBN
                                    </h4>
                                    <p className="text-white">{buku.isbn || '-'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                        <Layers className="w-4 h-4 text-orange-400" />
                                        Kategori
                                    </h4>
                                    <p className="text-white">
                                        {buku.kategori?.nama || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DetailBook
