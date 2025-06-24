import React, { useEffect, useState } from 'react'
import Footer from '../../component/ui/Footer'
import SideNavbar from '../../component/ui/SideNavbar'
import { getPeminjamanByUserId } from '@/services/peminjamanService'
import { getUserProfile } from '@/services/authService'
import { toast } from 'react-toastify'
import {
  Filter,
  BookOpenText,
  Calendar,
  Clock,
  AlertCircle,
  Bookmark,
  DollarSign
} from 'lucide-react'
import { motion } from 'framer-motion'

const statusConfig = {
  dipinjam: {
    color: 'bg-yellow-500/90',
    icon: <BookOpenText size={14} className="mr-1" />
  },
  dikembalikan: {
    color: 'bg-green-500/90',
    icon: <Calendar size={14} className="mr-1" />
  }
}

const HistoryPage = () => {
  const [peminjaman, setPeminjaman] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile()
        const data = await getPeminjamanByUserId(profile.id)
        console.log('📦 Data Peminjaman:', data)
        setPeminjaman(data)
      } catch (err) {
        console.error('Gagal memuat data peminjaman:', err)
        toast.error('Gagal memuat data peminjaman')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData =
    filter === 'Semua' ? peminjaman : peminjaman.filter((r) => r.status === filter.toLowerCase())

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Riwayat Peminjaman
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Daftar lengkap peminjaman buku Anda
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/70 rounded-xl px-4 py-2 border border-slate-700/50">
                <Filter className="w-5 h-5 text-blue-300" />
                <select
                  className="bg-slate-800/70 text-white outline-none text-sm md:text-base cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="dipinjam">Dipinjam</option>
                  <option value="dikembalikan">Dikembalikan</option>
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
                          src={item.reservasi?.book?.image || '/book-placeholder.jpg'}
                          alt={item.reservasi?.book?.judul}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h2 className="text-lg font-semibold">{item.reservasi?.book?.judul}</h2>
                        <div className="text-sm text-slate-400">
                          Tanggal Pinjam:{' '}
                          <span className="text-white">
                            {item.tanggalPinjam ? new Date(item.tanggalPinjam).toLocaleDateString() : '-'}
                          </span>
                          <br />
                          Jatuh Tempo:{' '}
                          <span className="text-white">
                            {item.tanggalJatuhTempo ? new Date(item.tanggalJatuhTempo).toLocaleDateString() : '-'}
                          </span>
                          <br />
                          Tanggal Kembali:{' '}
                          <span className="text-white">
                            {item.tanggalKembali ? new Date(item.tanggalKembali).toLocaleDateString() : '-'}
                          </span>
                        </div>
                        {item.denda > 0 && (
                          <div className="text-sm text-red-400 flex items-center gap-1 mt-2">
                            <DollarSign size={14} /> Denda: <span className="text-white">Rp{item.denda}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        {item.status && (
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                              statusConfig[item.status]?.color || 'bg-gray-600'
                            }`}
                          >
                            {statusConfig[item.status]?.icon || <Bookmark size={14} className="mr-1" />}
                            {item.status}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-slate-400 py-10">📭 Tidak ada data peminjaman.</p>
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
