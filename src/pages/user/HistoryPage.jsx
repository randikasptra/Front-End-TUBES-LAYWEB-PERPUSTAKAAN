import React, { useEffect, useState } from 'react'
import Footer from '../../component/ui/Footer'
import SideNavbar from '../../component/ui/SideNavbar'
import {
  getReservasiByUserId,
  deleteReservasi
} from '@/services/reservasiService'
import { getUserProfile } from '@/services/authService'
import { toast } from 'react-toastify'
import {
  Filter,
  BookOpenText,
  Calendar,
  Clock,
  Trash2,
  AlertCircle,
  Bookmark,
  PenTool,
  Building2,
  FileText
} from 'lucide-react'
import { motion } from 'framer-motion'

const statusConfig = {
  Reservasi: {
    color: 'bg-blue-500/90',
    icon: <Clock size={14} className="mr-1" />
  },
  Dipinjam: {
    color: 'bg-yellow-500/90',
    icon: <BookOpenText size={14} className="mr-1" />
  },
  'Belum Dikembalikan': {
    color: 'bg-red-600/90',
    icon: <AlertCircle size={14} className="mr-1" />
  },
  Dikembalikan: {
    color: 'bg-green-500/90',
    icon: <Calendar size={14} className="mr-1" />
  },
  Ditolak: {
    color: 'bg-red-700/90',
    icon: <AlertCircle size={14} className="mr-1" />
  }
}

const HistoryPage = () => {
  const [reservasi, setReservasi] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile()
        const data = await getReservasiByUserId(profile.id)
        setReservasi(data)
      } catch (err) {
        console.error('Gagal memuat data reservasi:', err)
        toast.error('Gagal memuat data reservasi')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus reservasi ini?')) return
    try {
      await deleteReservasi(id)
      setReservasi((prev) => prev.filter((r) => r.id !== id))
      toast.success('Reservasi berhasil dihapus')
    } catch (err) {
      console.error('Gagal menghapus reservasi:', err)
      toast.error('Gagal menghapus reservasi')
    }
  }

  const filteredData =
    filter === 'Semua' ? reservasi : reservasi.filter((r) => r.status === filter)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white">
      <SideNavbar />
      <div className="mt-24 flex flex-col flex-1 sm:ml-64">
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Riwayat Reservasi
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Daftar lengkap riwayat peminjaman buku Anda
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/70 rounded-xl px-4 py-2 border border-slate-700/50">
                <Filter className="w-5 h-5 text-blue-300" />
                <select
                  className="bg-transparent text-white outline-none text-sm md:text-base cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Reservasi">Reservasi</option>
                  <option value="Dipinjam">Dipinjam</option>
                  <option value="Dikembalikan">Dikembalikan</option>
                  <option value="Belum Dikembalikan">Belum Dikembalikan</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">Loading...</div>
            ) : (
              <div className="space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-4 border border-slate-700/50 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-lg"
                    >
                      <div className="min-w-[100px] h-[140px] relative overflow-hidden rounded-lg">
                        <img
                          src={item.book?.image || '/book-placeholder.jpg'}
                          alt={item.book?.judul}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h2 className="text-lg font-semibold">{item.book?.judul}</h2>
                        <div className="text-sm text-slate-400">
                          Penulis: <span className="text-white">{item.book?.penulis || '-'}</span><br />
                          Penerbit: <span className="text-white">{item.book?.penerbit || '-'}</span><br />
                          Tahun: <span className="text-white">{item.book?.tahunTerbit || '-'}</span>
                        </div>
                        <div className="text-sm text-slate-400 mt-2">
                          Ambil: <span className="text-white">{item.tanggalAmbil || '-'}</span><br />
                          Kembali: <span className="text-white">{item.tanggalKembali || '-'}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${statusConfig[item.status]?.color}`}>
                          {statusConfig[item.status]?.icon} {item.status}
                        </div>
                        {item.status === 'Ditolak' && (
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="mt-4 flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                          >
                            <Trash2 size={16} /> Hapus
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 py-10">📭 Tidak ada data reservasi.</p>
                )}
              </div>
            )}
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default HistoryPage
