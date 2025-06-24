import React, { useEffect, useState } from 'react'
import SidebarAdmin from '@/component/ui/SidebarAdmin'
import { Button } from '@/component/ui/buttons'
import { toast } from 'react-toastify'
import {
    deleteReservasi,
    getAllReservasi,
    updateReservasiStatus,
} from '../../services/reservationService'
import { Check, Trash2, X } from 'lucide-react'


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
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (id, action) => {
        try {
            await updateReservasiStatus(id, action)

            setReservasi((prev) =>
                prev.map((res) =>
                    res.id === id ? { ...res, status: action } : res
                )
            )

            toast.success('Status reservasi berhasil diperbarui')
        } catch (error) {
            console.error('Gagal memperbarui status reservasi:', error)
            alert('Terjadi kesalahan saat mengupdate status.')
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

            setReservasi((prev) =>
                prev.filter((item) => item.id !== selectedIdToDelete)
            )
        } catch (error) {
            toast.error('Gagal menghapus reservasi')
            console.error('❌ Error hapus:', error)
        }
    }

    return (
        <>
            {showDeleteModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                    <div className='bg-slate-800 border border-slate-600 text-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-semibold'>
                                Konfirmasi Hapus
                            </h2>
                            <button onClick={() => setShowDeleteModal(false)}>
                                <X className='w-5 h-5 text-gray-400 hover:text-white' />
                            </button>
                        </div>
                        <p className='text-sm mb-6'>
                            Apakah kamu yakin ingin menghapus reservasi ini?
                        </p>
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

            <div className='ml-64 p-8 text-white min-h-screen bg-[#1c1f2b]'>
                <SidebarAdmin />
                <h1 className='text-2xl font-semibold mb-6'>
                    Permintaan Reservasi Buku
                </h1>

                {loading ? (
                    <p>Memuat data...</p>
                ) : error ? (
                    <p className='text-red-500'>Error: {error}</p>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse rounded-xl overflow-hidden text-sm'>
                            <thead className='bg-blue-900 text-left'>
                                <tr>
                                    <th className='px-4 py-3'>No</th>
                                    <th className='px-4 py-3'>Nama Pengguna</th>
                                    <th className='px-4 py-3'>Judul Buku</th>
                                    <th className='px-4 py-3'>Tanggal Ambil</th>
                                    <th className='px-4 py-3'>Jam Ambil</th>
                                    <th className='px-4 py-3'>Catatan</th>
                                    <th className='px-4 py-3'>Status</th>
                                    <th className='px-4 py-3'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#2a2d3d] divide-y divide-gray-700'>
                                {reservasi.length > 0 ? (
                                    reservasi.map((res, index) => (
                                        <tr key={res.id}>
                                            <td className='px-4 py-2'>
                                                {index + 1}
                                            </td>
                                            <td className='px-4 py-2'>
                                                {res.user?.nama || '-'}
                                            </td>
                                            <td className='px-4 py-2'>
                                                {res.book?.judul || '-'}
                                            </td>
                                            <td className='px-4 py-2'>
                                                {res.tanggalAmbil?.slice(0, 10)}
                                            </td>
                                            <td className='px-4 py-2'>
                                                {res.jamAmbil || '-'}
                                            </td>
                                            <td className='px-4 py-2 text-slate-300'>
                                                {res.catatan || '-'}
                                            </td>
                                            <td className='px-4 py-2'>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                        res.status ===
                                                        'Disetujui'
                                                            ? 'bg-green-600 text-white'
                                                            : res.status ===
                                                              'Ditolak'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-yellow-500 text-black'
                                                    }`}
                                                >
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td className='px-4 py-2 space-x-2'>
                                                <Button
                                                    onClick={() =>
                                                        handleAction(
                                                            res.id,
                                                            'Disetujui'
                                                        )
                                                    }
                                                    disabled={
                                                        res.status ===
                                                            'Disetujui' ||
                                                        res.status === 'Ditolak'
                                                    }
                                                    className={`px-3 py-1 text-sm font-bold text-white ${
                                                        res.status ===
                                                            'Disetujui' ||
                                                        res.status === 'Ditolak'
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-green-600 hover:bg-green-700'
                                                    }`}
                                                    title={
                                                        res.status ===
                                                        'Disetujui'
                                                            ? 'Sudah disetujui'
                                                            : res.status ===
                                                              'Ditolak'
                                                            ? 'Reservasi sudah ditolak'
                                                            : 'Setujui'
                                                    }
                                                >
                                                    <Check className='w-4 h-4' />
                                                </Button>

                                                <Button
                                                    onClick={() =>
                                                        handleAction(
                                                            res.id,
                                                            'Ditolak'
                                                        )
                                                    }
                                                    disabled={
                                                        res.status ===
                                                            'Disetujui' ||
                                                        res.status === 'Ditolak'
                                                    }
                                                    className={`px-3 py-1 text-sm font-bold text-white ${
                                                        res.status ===
                                                            'Disetujui' ||
                                                        res.status === 'Ditolak'
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                                    title={
                                                        res.status ===
                                                        'Disetujui'
                                                            ? 'Reservasi sudah disetujui'
                                                            : res.status ===
                                                              'Ditolak'
                                                            ? 'Sudah ditolak'
                                                            : 'Tolak'
                                                    }
                                                >
                                                    <X className='w-4 h-4' />
                                                </Button>

                                                <Button
                                                    onClick={() =>
                                                        handleHapusClick(res.id)
                                                    }
                                                    className='bg-red-500 hover:bg-red-600 text-red-400 hover:text-red-300 px-3 py-1 text-sm font-bold'
                                                    title='Hapus Reservasi'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan='8'
                                            className='text-center text-gray-400 py-6'
                                        >
                                            Tidak ada reservasi ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminReservationPage
