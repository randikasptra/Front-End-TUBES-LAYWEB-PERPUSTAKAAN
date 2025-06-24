import React, { useEffect, useState } from 'react'
import SideNavbar from '@/component/ui/SideNavbar'
import Footer from '@/component/ui/Footer'
import { getReservasiByUserId, deleteReservasi } from '@/services/reservasiService'
import { getUserProfile } from '@/services/authService'
import { toast } from 'react-toastify'

const statusColors = {
  Reservasi: 'bg-blue-500',
  Dipinjam: 'bg-yellow-500',
  'Belum Dikembalikan': 'bg-red-600',
  Dikembalikan: 'bg-green-500',
  Ditolak: 'bg-red-700',
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
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus reservasi ini?')) return
    try {
      await deleteReservasi(id)
      setReservasi((prev) => prev.filter((r) => r.id !== id))
      toast.success('Reservasi berhasil dihapus.')
    } catch (err) {
      console.error('Gagal menghapus reservasi:', err)
      toast.error('Gagal menghapus reservasi.')
    }
  }

  const filteredData =
    filter === 'Semua' ? reservasi : reservasi.filter((r) => r.status === filter)

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
      <SideNavbar />
      <main className="sm:ml-64 flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Riwayat Reservasi</h1>

        <div className="mb-4">
          <label className="mr-2">Filter:</label>
          <select
            className="bg-slate-800 px-4 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Reservasi">Reservasi</option>
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
            <option value="Belum Dikembalikan">Belum Dikembalikan</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 md:items-center shadow-md hover:shadow-lg"
                >
                  <img
                    src={item.book?.image || '/book-placeholder.jpg'}
                    alt={item.book?.judul || 'Buku'}
                    className="w-24 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.book?.judul || '-'}</h2>
                    <p className="text-sm text-slate-300">Tanggal Ambil: {item.tanggalAmbil || '-'}</p>
                    <p className="text-sm text-slate-300">Tanggal Kembali: {item.tanggalKembali || '-'}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-4 py-2 rounded-full font-medium text-sm ${statusColors[item.status]}`}
                    >
                      {item.status}
                    </span>

                    {item.status === 'Ditolak' && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">Belum ada riwayat.</p>
            )}
          </div>
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default HistoryPage
