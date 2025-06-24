/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card } from '@/component/card'
import { Input } from '@/component/ui/input'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { MoreHorizontal } from 'lucide-react'
import { getAllPeminjaman, kembalikanPeminjaman } from '../../services/peminjamanService'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react' // kamu sudah punya ini, bagus
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
    const [searchTerm, setSearchTerm] = useState('')
    const [peminjaman, setPeminjaman] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null)

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchPeminjaman = async () => {
            try {
                const result = await getAllPeminjaman()
                setPeminjaman(result)
                console.log('Data peminjaman:', result)
            } catch (error) {
                console.error('Gagal mengambil data peminjaman:', error)
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
            console.error('❌ Error dari frontend:', error) // Log lengkap

            toast.error(`❌ Gagal mengembalikan: ${error.message}`)
        }
    }



    const hitungDenda = (tanggalPinjam, tanggalKembali) => {
        const tglPinjam = new Date(tanggalPinjam)
        const tglKembali = new Date(tanggalKembali)

        const selisihMs = tglKembali - tglPinjam
        const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24))

        const hariBebasDenda = 7
        const hariTerlambat = selisihHari - hariBebasDenda

        if (hariTerlambat > 0) {
            return hariTerlambat * 1000
        } else {
            return 0
        }
    }


    return (
        <>
            {modalOpen && selectedPeminjaman && (
                <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

                    {/* Modal content */}
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md rounded-xl bg-slate-800 text-white p-6 z-50 shadow-lg border border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <Dialog.Title className="text-lg font-bold text-white">
                                    Konfirmasi Pengembalian
                                </Dialog.Title>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-2 text-sm">
                                <p>Nama Peminjam: <strong>{selectedPeminjaman?.user}</strong></p>
                                <p>Judul Buku: <strong>{selectedPeminjaman?.judul}</strong></p>
                                <p>Tanggal Pinjam: {formatDate(selectedPeminjaman?.tanggalPinjam)}</p>
                                <p>Jatuh Tempo: {formatDate(selectedPeminjaman?.tanggalJatuhTempo)}</p>

                                {/* Input Tanggal Kembali */}
                                <div className="mt-4">
                                    <label className="block mb-1 text-white">Tanggal Kembali</label>
                                    <input
                                        type="date"
                                        value={
                                            selectedPeminjaman?.tanggalKembali
                                                ? selectedPeminjaman.tanggalKembali.split("T")[0]
                                                : ''
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const dendaBaru = hitungDenda(selectedPeminjaman.tanggalPinjam, value)

                                            setSelectedPeminjaman((prev) => ({
                                                ...prev,
                                                tanggalKembali: value,
                                                denda: dendaBaru,
                                            }))
                                        }}
                                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>

                                {/* Denda */}
                                <div className="mt-2">
                                    <p className="text-sm">
                                        Denda:{' '}
                                        <strong>
                                            {selectedPeminjaman?.denda
                                                ? `Rp${selectedPeminjaman.denda.toLocaleString('id-ID')}`
                                                : 'Tidak ada'}
                                        </strong>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                                >
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
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Konfirmasi
                                </button>


                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}

            <div className='flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white'>
                <SidebarAdmin />
                <main className='flex-1 p-8 sm:ml-64'>
                    <h1 className='text-2xl font-bold mb-6'>
                        Data Peminjaman Buku
                    </h1>

                    <div className='mb-6'>
                        <Input
                            type='text'
                            placeholder='Cari berdasarkan nama atau NIM'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full max-w-md'
                        />
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full table-auto text-left text-sm'>
                            <thead>
                                <tr className='bg-blue-900 text-white border-b border-slate-700'>
                                    <th className='py-3 px-4'>No</th>
                                    <th className='py-3 px-4'>Nama Peminjam</th>
                                    <th className='py-3 px-4'>Judul Buku</th>
                                    <th className='py-3 px-4'>Tgl Pinjam</th>
                                    <th className='py-3 px-4'>Tgl Jatuh Tempo</th>
                                    <th className='py-3 px-4'>Tgl Kembali</th>
                                    <th className='py-3 px-4'>Status</th>
                                    <th className='py-3 px-4'>Denda</th>
                                    <th className='py-3 px-4'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody className='bg-slate-900 divide-y divide-slate-700'>
                                {filteredBorrowings.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`hover:bg-slate-700 ${item.status === 'Terlambat'
                                            ? 'text-red-400'
                                            : item.status ===
                                                'Sudah Dikembalikan'
                                                ? 'text-green-400'
                                                : 'text-white'
                                            }`}
                                    >
                                        <td className='py-2 px-4'>{index + 1}</td>
                                        <td className='py-2 px-4 font-medium'>
                                            {item.reservasi?.user?.nama ||
                                                'Tidak diketahui'}
                                        </td>
                                        <td className='py-2 px-4 italic'>
                                            {item.reservasi?.book?.judul ||
                                                'Tidak diketahui'}
                                        </td>
                                        <td className='py-2 px-4'>
                                            {formatDate(item.tanggalPinjam)}
                                        </td>
                                        <td className='py-2 px-4'>
                                            {formatDate(item.tanggalJatuhTempo)}
                                        </td>
                                        <td className='py-2 px-4'>
                                            <input
                                                type='date'
                                                value={
                                                    item.tanggalKembali
                                                        ? item.tanggalKembali.split(
                                                            'T'
                                                        )[0]
                                                        : ''
                                                }
                                                onChange={(e) =>
                                                    handleTanggalKembaliChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                className='border border-gray-600 bg-gray-800 text-white rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                                            />
                                        </td>
                                        <td className='py-2 px-4'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
            ${item.status.toLowerCase() === 'dikembalikan'
                                                        ? 'bg-teal-500/20 text-teal-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'}
        `}
                                            >
                                                {item.status.toLowerCase()}
                                            </span>
                                        </td>




                                        <td className='py-2 px-4'>
                                            {item.denda ? `Rp${item.denda.toLocaleString('id-ID')}` : '-'}
                                        </td>
                                        <td className='py-2 px-4'>
                                            {item.status !== 'Dikembalikan' && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedPeminjaman({
                                                            id: item.id,
                                                            user: item.reservasi?.user?.nama || 'Tidak diketahui',
                                                            judul: item.reservasi?.book?.judul || 'Tidak diketahui',
                                                            tanggalPinjam: item.tanggalPinjam,
                                                            tanggalJatuhTempo: item.tanggalJatuhTempo,
                                                            tanggalKembali: item.tanggalKembali || '', // optional
                                                        })
                                                        setModalOpen(true)
                                                    }}

                                                    className='bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition'
                                                >
                                                    Kembalikan
                                                </button>
                                            )}
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>

    )
}

export default AdminBorrowPage
