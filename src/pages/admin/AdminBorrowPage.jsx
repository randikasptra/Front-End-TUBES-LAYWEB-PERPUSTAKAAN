import { useEffect, useState } from 'react'
import { Input } from '@/component/ui/input'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { RotateCcw, Trash2, X } from 'lucide-react'
import {
    deletePeminjaman,
    getAllPeminjaman,
    kembalikanPeminjaman,
} from '../../services/peminjamanService'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'

const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const AdminBorrowPage = () => {
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [peminjaman, setPeminjaman] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        setLoading(true)
        const fetchPeminjaman = async () => {
            try {
                const result = await getAllPeminjaman()
                setPeminjaman(result)
            } catch (error) {
                console.error('Gagal mengambil data peminjaman:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPeminjaman()
    }, [])

    const filteredBorrowings = peminjaman.filter((item) => {
        const nama = item.reservasi?.user?.nama?.toLowerCase() || ''
        const nim = item.reservasi?.user?.nim || ''
        return (
            nama.includes(searchTerm.toLowerCase()) || nim.includes(searchTerm)
        )
    })

    const handleKembalikan = async (id, tanggalKembali) => {
        try {
            await kembalikanPeminjaman(id, tanggalKembali)
            toast.success('Buku berhasil dikembalikan')
            const updated = await getAllPeminjaman()
            setPeminjaman(updated)
        } catch (error) {
            toast.error(`❌ Gagal mengembalikan: ${error.message}`)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePeminjaman(id)
            setPeminjaman((prev) => prev.filter((item) => item.id !== id))
            toast.success('Peminjaman berhasil dihapus')
            setShowModal(false)
        } catch (err) {
            toast.error('Gagal menghapus peminjaman')
        }
    }

    const hitungDenda = (tanggalPinjam, tanggalKembali) => {
        const tglPinjam = new Date(tanggalPinjam)
        const tglKembali = new Date(tanggalKembali)
        const selisihMs = tglKembali - tglPinjam
        const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24))
        const hariBebasDenda = 7
        const hariTerlambat = selisihHari - hariBebasDenda
        return hariTerlambat > 0 ? hariTerlambat * 1000 : 0
    }

    return (
        <>
            {/* Modal Konfirmasi Pengembalian */}
            {modalOpen && selectedPeminjaman && (
                <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className='relative z-50'>
                    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm' aria-hidden='true' />
                    <div className='fixed inset-0 flex items-center justify-center p-4'>
                        <Dialog.Panel className='w-full max-w-md rounded-xl bg-slate-800 text-white p-6 z-50 shadow-lg border border-slate-700'>
                            <div className='flex justify-between items-center mb-4'>
                                <Dialog.Title className='text-lg font-bold'>Konfirmasi Pengembalian</Dialog.Title>
                                <button onClick={() => setModalOpen(false)} className='text-gray-400 hover:text-white'>
                                    <X className='w-5 h-5' />
                                </button>
                            </div>
                            <div className='space-y-2 text-sm'>
                                <p>Nama Peminjam: <strong>{selectedPeminjaman?.user}</strong></p>
                                <p>Judul Buku: <strong>{selectedPeminjaman?.judul}</strong></p>
                                <p>Tanggal Pinjam: {formatDate(selectedPeminjaman?.tanggalPinjam)}</p>
                                <p>Jatuh Tempo: {formatDate(selectedPeminjaman?.tanggalJatuhTempo)}</p>

                                <div className='mt-4'>
                                    <label className='block mb-1'>Tanggal Kembali</label>
                                    <input
                                        type='date'
                                        value={
                                            selectedPeminjaman?.tanggalKembali
                                                ? selectedPeminjaman.tanggalKembali.split('T')[0]
                                                : ''
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const dendaBaru = hitungDenda(
                                                selectedPeminjaman.tanggalPinjam,
                                                value
                                            )
                                            setSelectedPeminjaman((prev) => ({
                                                ...prev,
                                                tanggalKembali: value,
                                                denda: dendaBaru,
                                            }))
                                        }}
                                        className='w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    />
                                </div>
                                <div className='mt-2'>
                                    Denda:{' '}
                                    <strong>
                                        {selectedPeminjaman?.denda
                                            ? `Rp${selectedPeminjaman.denda.toLocaleString('id-ID')}`
                                            : 'Tidak ada'}
                                    </strong>
                                </div>
                            </div>
                            <div className='mt-6 flex justify-end space-x-3'>
                                <button onClick={() => setModalOpen(false)} className='bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded'>
                                    Batal
                                </button>
                                <button
                                    onClick={() => {
                                        handleKembalikan(
                                            selectedPeminjaman.id,
                                            selectedPeminjaman.tanggalKembali
                                        )
                                        setModalOpen(false)
                                    }}
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
                                >
                                    Konfirmasi
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}

            {/* Modernized Alert Hapus */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm border border-slate-700 transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Konfirmasi Hapus</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm mb-6 text-slate-300">
                            Yakin ingin menghapus peminjaman ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md text-sm transition">
                                Batal
                            </button>
                            <button onClick={() => handleDelete(selectedId)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Layout */}
            <div className='flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white'>
                <SidebarAdmin />
                <main className='flex-1 p-8 sm:ml-64'>
                    <h1 className='text-2xl font-bold mb-6'>Data Peminjaman Buku</h1>

                    <div className='mb-6'>
                        <Input
                            type='text'
                            placeholder='Cari Nama Peminjam'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full max-w-md'
                        />
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-left text-sm border-separate border-spacing-y-2'>
                            <thead className='bg-slate-700/70'>
                                <tr>
                                    <th className='py-3 px-4 text-slate-300'>No</th>
                                    <th className='py-3 px-4 text-slate-300'>Nama</th>
                                    <th className='py-3 px-4 text-slate-300'>Judul Buku</th>
                                    <th className='py-3 px-4 text-slate-300'>Tgl Pinjam</th>
                                    <th className='py-3 px-4 text-slate-300'>Jatuh Tempo</th>
                                    <th className='py-3 px-4 text-slate-300'>Tgl Kembali</th>
                                    <th className='py-3 px-4 text-slate-300'>Status</th>
                                    <th className='py-3 px-4 text-slate-300'>Denda</th>
                                    <th className='py-3 px-4 text-slate-300'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='text-white'>
                                {loading ? (
                                    <tr>
                                        <td colSpan='9' className='text-center py-8'>
                                            <div className='flex flex-col items-center space-y-3'>
                                                <div className='w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                                                <p className='text-slate-400 font-medium'>Memuat data peminjaman...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredBorrowings.length > 0 ? (
                                    filteredBorrowings.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`bg-slate-800/60 hover:bg-slate-700 transition rounded-lg`}
                                        >
                                            <td className='py-3 px-4'>{index + 1}</td>
                                            <td className='py-3 px-4'>{item.reservasi?.user?.nama || '-'}</td>
                                            <td className='py-3 px-4 italic'>{item.reservasi?.book?.judul || '-'}</td>
                                            <td className='py-3 px-4'>{formatDate(item.tanggalPinjam)}</td>
                                            <td className='py-3 px-4'>{formatDate(item.tanggalJatuhTempo)}</td>
                                            <td className='py-3 px-4'>{formatDate(item.tanggalKembali)}</td>
                                            <td className='py-3 px-4'>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                        item.status === 'Sudah Dikembalikan'
                                                            ? 'bg-green-500/20 text-green-400'
                                                            : item.status === 'Terlambat'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className='py-3 px-4'>
                                                {item.denda ? `Rp${item.denda.toLocaleString('id-ID')}` : '-'}
                                            </td>
                                            <td className='py-3 px-4 flex gap-2'>
                                                {!item.tanggalKembali && (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPeminjaman({
                                                                id: item.id,
                                                                user: item.reservasi?.user?.nama,
                                                                judul: item.reservasi?.book?.judul,
                                                                tanggalPinjam: item.tanggalPinjam,
                                                                tanggalJatuhTempo: item.tanggalJatuhTempo,
                                                                tanggalKembali: item.tanggalKembali || '',
                                                            })
                                                            setModalOpen(true)
                                                        }}
                                                        className='bg-emerald-600/20 hover:bg-emerald-600/30 h-10 w-10 rounded-full flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition'
                                                        title='Kembalikan Buku'
                                                    >
                                                        <RotateCcw className='w-5 h-5' />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedId(item.id)
                                                        setShowModal(true)
                                                    }}
                                                    className='bg-red-600/20 hover:bg-red-600/30 h-10 w-10 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition'
                                                    title='Hapus Peminjaman'
                                                >
                                                    <Trash2 className='w-5 h-5' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='9' className='text-center py-6 text-slate-400 italic'>
                                            Tidak ada data peminjaman ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminBorrowPage
