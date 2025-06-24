import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import { createReservasi } from '@/services/reservasiService'
import { getUserProfile } from '../../services/authService'

const Modal = ({ isOpen, onClose, book }) => {
    const [catatan, setCatatan] = useState('')
    const [jamAmbil, setJamAmbil] = useState('')
    const [tanggalAmbil, setTanggalAmbil] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const profile = await getUserProfile()
            setUserId(profile.id)
        } catch (error) {
            console.error('❌ Gagal memuat profil pengguna:', error)
        }
    }

    const handleReservasi = async () => {
        const bookId = book?.bookId ?? book?.id

        if (!bookId || !userId) {
            toast.error('❌ ID Buku atau User tidak ditemukan')
            return
        }

        if (!jamAmbil || !tanggalAmbil) {
            toast.warn('⏰ Jam dan tanggal ambil wajib diisi')
            return
        }

        try {
            setLoading(true)

            const payload = {
                userId,
                bookId,
                tanggalAmbil,
                jamAmbil,
                catatan,
                status: 'Menunggu',
            }

            await createReservasi(payload)
            toast.success('✅ Reservasi berhasil dibuat')
            setCatatan('')
            setJamAmbil('')
            setTanggalAmbil('')
            onClose()
        } catch (err) {
            console.error('❌ Gagal membuat reservasi:', err)
            toast.error('❌ Gagal melakukan reservasi')
        } finally {
            setLoading(false)
        }
    }

    if (!book) return null

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

            <Dialog.Panel className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-blue-800 text-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold mb-6">Reservasi Buku</Dialog.Title>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    <div className="w-full sm:w-1/3 flex justify-center items-start">
                        <img
                            src={book.image || '/book-placeholder.jpg'}
                            alt={book.title}
                            className="w-28 h-40 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex-1 space-y-2 text-sm sm:text-base">
                        <p>
                            <span className="font-semibold text-slate-300">Judul:</span> {book.title}
                        </p>
                        <p>
                            <span className="font-semibold text-slate-300">Penulis:</span> {book.author || '-'}
                        </p>
                        <p>
                            <span className="font-semibold text-slate-300">Status:</span> {book.status || 'Reservasi'}
                        </p>
                        <div>
                            <span className="font-semibold text-slate-300 block mb-1">Deskripsi:</span>
                            <p className="text-slate-200 text-sm max-h-32 overflow-y-auto whitespace-pre-line">
                                {book.description || 'Tidak ada deskripsi'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">
                            Catatan untuk Admin
                        </label>
                        <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            placeholder="Contoh: titip ke teman, datang sore, dll"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">
                                Jam Ambil
                            </label>
                            <input
                                type="time"
                                value={jamAmbil}
                                onChange={(e) => setJamAmbil(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">
                                Tanggal Ambil
                            </label>
                            <input
                                type="date"
                                value={tanggalAmbil}
                                onChange={(e) => setTanggalAmbil(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleReservasi}
                        disabled={loading}
                        className={`bg-white text-blue-800 font-semibold px-5 py-2 rounded-lg transition duration-200 ${
                            loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-100'
                        }`}
                    >
                        {loading ? 'Memproses...' : 'Konfirmasi Reservasi'}
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default Modal
