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
  AlertCircle
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

  const filteredData = filter === 'Semua' 
    ? reservasi 
    : reservasi.filter((r) => r.status === filter)

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white">
      <SideNavbar />

      <main className="flex-1 sm:ml-64 px-4 py-6 md:px-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                Riwayat Reservasi
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Daftar lengkap riwayat peminjaman buku Anda
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border border-slate-700/50 hover:border-slate-600 transition-colors">
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

          {/* Content Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-transparent border-blue-400 animate-spin"></div>
                <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-blue-300 animate-spin-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpenText 
                    className="text-blue-300 animate-pulse" 
                    size={24}
                  />
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="text-blue-100 font-medium text-lg">Memuat Reservasi</p>
                <p className="text-blue-300/80 text-sm">
                  <span className="inline-block animate-typing">...</span>
                </p>
              </div>
            </div>
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
                        alt={item.book?.judul || 'Buku'}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <h2 className="text-lg md:text-xl font-semibold text-white line-clamp-1">
                        {item.book?.judul || 'Judul tidak tersedia'}
                      </h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-300" />
                          <span>Ambil: <span className="text-white ml-1">{item.tanggalAmbil || '-'}</span></span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-300" />
                          <span>Kembali: <span className="text-white ml-1">{item.tanggalKembali || '-'}</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 min-w-[120px]">
                      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[item.status]?.color || 'bg-gray-500'} shadow-sm`}>
                        {statusConfig[item.status]?.icon}
                        {item.status}
                      </div>

                      {item.status === 'Ditolak' && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 bg-red-600/90 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                        >
                          <Trash2 size={16} />
                          Hapus
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                    <BookOpenText size={32} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-300 mb-1">
                    Belum ada riwayat reservasi
                  </h3>
                  <p className="text-slate-500 max-w-md">
                    {filter === 'Semua' 
                      ? 'Anda belum melakukan reservasi buku apapun.'
                      : `Tidak ada reservasi dengan status "${filter}".`}
                  </p>
                </motion.div>
              )}
            </div>
          )}

          <Footer />
        </motion.div>
      </main>
    </div>
  )
}

export default HistoryPage