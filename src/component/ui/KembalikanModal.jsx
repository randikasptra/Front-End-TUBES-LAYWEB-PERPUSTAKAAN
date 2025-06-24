import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
import { format } from 'date-fns'

const KembalikanModal = ({ isOpen, onClose, data, onConfirm }) => {
    const [tanggalKembali, setTanggalKembali] = useState('')
    const [denda, setDenda] = useState(0)

    useEffect(() => {
        if (data?.tanggalJatuhTempo && tanggalKembali) {
            const jatuhTempo = new Date(data.tanggalJatuhTempo)
            const kembali = new Date(`${tanggalKembali}T00:00:00`)
            const selisihHari = Math.ceil((kembali - jatuhTempo) / (1000 * 60 * 60 * 24))
            setDenda(selisihHari > 0 ? selisihHari * 1000 : 0)
        } else {
            setDenda(0)
        }
    }, [tanggalKembali, data])

    const handleSubmit = () => {
        if (!tanggalKembali) return alert('Tanggal kembali belum diisi')
        onConfirm(data.id, tanggalKembali)
        onClose()
    }

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-xl bg-slate-800 text-white shadow-xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <Dialog.Title className="text-lg font-semibold">Konfirmasi Pengembalian</Dialog.Title>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p><strong>Nama:</strong> {data?.user}</p>
                        <p><strong>Judul Buku:</strong> {data?.judul}</p>
                        <p><strong>Tanggal Pinjam:</strong> {format(new Date(data?.tanggalPinjam), 'dd-MM-yyyy')}</p>
                        <p><strong>Jatuh Tempo:</strong> {format(new Date(data?.tanggalJatuhTempo), 'dd-MM-yyyy')}</p>

                        <label className="block text-sm mt-4">
                            Tanggal Kembali:
                            <input
                                type="date"
                                value={tanggalKembali}
                                onChange={(e) => setTanggalKembali(e.target.value)}
                                className="w-full mt-1 px-3 py-1 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </label>

                        <p className="mt-2">
                            <strong>Denda:</strong>{' '}
                            {denda > 0 ? `Rp${denda.toLocaleString('id-ID')}` : 'Tidak ada'}
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-1 text-sm rounded bg-gray-600 hover:bg-gray-700"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Konfirmasi
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )

}

export default KembalikanModal
