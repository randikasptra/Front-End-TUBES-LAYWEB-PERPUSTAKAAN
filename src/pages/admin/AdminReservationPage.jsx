import React, { useEffect, useState } from 'react'
import SidebarAdmin from '@/component/ui/SidebarAdmin'
import { Button } from '@/component/ui/buttons'
import { toast } from 'react-toastify'
import {
    deleteReservasi,
    getAllReservasi,
    updateReservasiStatus,
} from '../../services/reservationService'
import { Check, Trash2, X, CalendarClock } from 'lucide-react'

const AdminReservationPage = () => {
    const [reservasi, setReservasi] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedIdToDelete, setSelectedIdToDelete] = useState(null)

    useEffect(() => {
        fetchReservasi()
    }, [])

    const fetchReservasi = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getAllReservasi()
            setReservasi(result)
        } catch (error) {
            console.error('Gagal memuat reservasi:', error)
            setError('Gagal memuat data reservasi.')
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id, action) => {
        try {
            await updateReservasiStatus(id, action)
            setReservasi((prev) =>
                prev.map((res) => (res.id === id ? { ...res, status: action } : res))
            )
            toast.success('Status reservasi berhasil diperbarui')
        } catch (error) {
            console.error('Gagal memperbarui status:', error)
            toast.error('Terjadi kesalahan saat memperbarui status.')
        }
    }

    const handleHapusClick = (id) => {
        setSelectedIdToDelete(id)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteReservasi(selectedIdToDelete)
            toast.success('Reservasi berhasil dihapus')
            setShowDeleteModal(false)
            setReservasi((prev) => prev.filter((item) => item.id !== selectedIdToDelete))
        } catch (error) {
            const backendMessage = error?.response?.data?.message
            if (backendMessage) {
                toast.error(backendMessage)
            } else {
                toast.error('Terjadi kesalahan saat menghapus reservasi.')
            }
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white flex'>
            <SidebarAdmin />
            <main className='flex-1 p-6 sm:ml-64'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-2xl font-bold'>Permintaan Reservasi Buku</h1>
                    <div className='flex items-center gap-2 text-sm text-slate-400'>
                        <CalendarClock size={18} />
                        <span>
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                {/* Table Card */}
                <div className='bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead className='border-b border-slate-700'>
                            <tr>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>No</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Nama Pengguna</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Judul Buku</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Tanggal Ambil</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Jam Ambil</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Catatan</th>
                                <th className='px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-slate-400'>Status</th>
                                <th className='px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-300'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-700'>
                            {loading ? (
                                <tr>
                                    <td colSpan='8' className='p-8 text-center'>
                                        <div className='flex flex-col items-center justify-center space-y-3'>
                                            <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
                                            <p className='text-slate-400 font-medium'>Memuat data reservasi...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan='8' className='text-center text-red-400 py-6'>{error}</td>
                                </tr>
                            ) : reservasi.length > 0 ? (
                                reservasi.map((res, index) => (
                                    <tr key={res.id} className='hover:bg-slate-700/30 transition-colors text-sm'>
                                        <td className='px-6 py-4'>{index + 1}</td>
                                        <td className='px-6 py-4'>{res.user?.nama || '-'}</td>
                                        <td className='px-6 py-4'>{res.book?.judul || '-'}</td>
                                        <td className='px-6 py-4'>{res.tanggalAmbil?.slice(0, 10)}</td>
                                        <td className='px-6 py-4'>{res.jamAmbil || '-'}</td>
                                        <td className='px-6 py-4 text-slate-300'>{res.catatan || '-'}</td>
                                        <td className='px-6 py-4'>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                                ${res.status === 'Disetujui' ? 'bg-green-500/20 text-green-300'
                                                    : res.status === 'Ditolak' ? 'bg-red-500/20 text-red-300'
                                                        : 'bg-yellow-500/20 text-yellow-300'}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <div className='flex justify-end space-x-2'>
                                                <Button
                                                    onClick={() => handleAction(res.id, 'Disetujui')}
                                                    disabled={res.status !== 'Menunggu'}
                                                    className={`text-white px-3 py-1 text-sm font-bold rounded 
                                        ${res.status !== 'Menunggu' ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                                                    title='Setujui'
                                                >
                                                    <Check size={16} />
                                                </Button>
                                                <Button
                                                    onClick={() => handleAction(res.id, 'Ditolak')}
                                                    disabled={res.status !== 'Menunggu'}
                                                    className={`text-white px-3 py-1 text-sm font-bold rounded 
                                        ${res.status !== 'Menunggu' ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                                                    title='Tolak'
                                                >
                                                    <X size={16} />
                                                </Button>
                                                <Button
                                                    onClick={() => handleHapusClick(res.id)}
                                                    className='text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-700 transition-colors'
                                                    title='Hapus Reservasi'
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='8' className='px-6 py-4 text-center text-slate-400'>
                                        Tidak ada reservasi ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                        <div className='bg-slate-800 border border-slate-600 text-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='text-lg font-semibold'>Konfirmasi Hapus</h2>
                                <button onClick={() => setShowDeleteModal(false)}>
                                    <X className='w-5 h-5 text-gray-400 hover:text-white' />
                                </button>
                            </div>
                            <p className='text-sm mb-6'>Apakah kamu yakin ingin menghapus reservasi ini?</p>
                            <div className='flex justify-end space-x-3'>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className='px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded text-sm'
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm'
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default AdminReservationPage
