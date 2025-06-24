import React, { useState, useEffect } from "react"
import SideNavbar from "../../component/ui/SideNavbar"
import Footer from "../../component/ui/Footer"
import { getAllReservasiByUser } from "@/services/reservasiService"
import { getUserProfile } from "@/services/authService"

const statusColors = {
  Reservasi: "bg-blue-500",
  Dipinjam: "bg-yellow-500",
  "Belum Dikembalikan": "bg-red-600",
  Dikembalikan: "bg-green-500",
  Ditolak: "bg-red-700",
  Disetujui: "bg-green-600",
}

const HistoryPage = () => {
  const [filter, setFilter] = useState("Semua")
  const [reservasiData, setReservasiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile()
        const all = await getAllReservasiByUser(profile.id)
        setReservasiData(all)
      } catch (err) {
        console.error("Gagal memuat data riwayat:", err)
        setError("Gagal memuat data riwayat.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData =
    filter === "Semua"
      ? reservasiData
      : reservasiData.filter((item) => item.status === filter)

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
      <SideNavbar />
      <main className="sm:ml-64 flex-1 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Riwayat Peminjaman Buku</h1>
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="status" className="text-white">
              Filter:
            </label>
            <select
              id="status"
              className="bg-slate-800 border border-slate-600 rounded px-4 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Reservasi">Reservasi</option>
              <option value="Dipinjam">Dipinjam</option>
              <option value="Dikembalikan">Dikembalikan</option>
              <option value="Belum Dikembalikan">Belum Dikembalikan</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        {/* Loading/Error/Empty */}
        {loading ? (
          <p className="text-slate-300">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredData.length === 0 ? (
          <p className="text-slate-300">Tidak ada riwayat ditemukan.</p>
        ) : (
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 md:items-center shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.book?.image || "/book-placeholder.jpg"}
                  alt={item.book?.judul || "Judul Buku"}
                  className="w-24 h-32 object-cover rounded-md shadow mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.book?.judul || "-"}
                  </h2>
                  <div className="text-sm text-slate-300 mt-1">
                    <p>
                      📆 Tanggal Status:{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p>🕓 Waktu Ambil: {item.tanggalAmbil || "-"}</p>
                    <p>⏳ Waktu Pengembalian: {item.tanggalKembali || "-"}</p>
                    <p>📝 Catatan: {item.catatan || "-"}</p>
                  </div>
                </div>
                <span
                  className={`text-white px-4 py-2 rounded-full text-sm font-medium self-start md:self-center ${
                    statusColors[item.status] || "bg-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
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
