import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../../component/ui/SidebarAdmin'
import { Button } from '@/component/ui/buttons'
import { Input } from '@/component/ui/input'
import { Pencil, Trash2, FolderKanban, CalendarClock } from 'lucide-react'
import { toast } from 'react-toastify'
import {
  createKategori,
  deleteKategori,
  getAllKategori,
  updateKategori,
} from '../../../services/categoryService'

const CategoryPage = () => {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState([])
  const [loading, setLoading] = useState(false)
  const [namaKategori, setNamaKategori] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [kategoriTerpilih, setKategoriTerpilih] = useState(null)

  useEffect(() => {
    fetchKategori()
  }, [])

  const fetchKategori = async () => {
    setLoading(true)
    try {
      const result = await getAllKategori()
      setKategori(result)
    } catch (error) {
      console.error('Gagal memuat kategori:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateKategori(editingId, namaKategori)
        toast.success('Kategori berhasil diperbarui')
      } else {
        await createKategori(namaKategori)
        toast.success('Kategori berhasil ditambahkan')
      }

      setNamaKategori('')
      setEditingId(null)
      fetchKategori()
    } catch (error) {
      console.error('Gagal simpan kategori:', error)
      toast.error('Gagal menyimpan kategori')
    }
  }

  const handleEdit = (kategori) => {
    setNamaKategori(kategori.nama)
    setEditingId(kategori.id)
  }

  const handleDelete = async (id) => {
    try {
      await deleteKategori(id)
      toast.success('Kategori dihapus')
      fetchKategori()
    } catch (error) {
      console.error('Gagal menghapus:', error)
      toast.error('Gagal menghapus kategori')
    }
  }

  const filteredKategori = kategori.filter((k) =>
    k.nama.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white flex">
      <SidebarAdmin />
      <main className="flex-1 p-6 sm:ml-64">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Kelola Kategori</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CalendarClock size={18} />
            <span>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Form Filter & Input */}
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Nama kategori"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="rounded-lg"
              />
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {editingId ? 'Update' : '+ Tambah'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg p-6 overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Nama Kategori</th>
                <th className="p-3 text-left">Dibuat Pada</th>
                <th className="p-3 text-left">Diperbarui Pada</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-400">
                    Memuat data kategori...
                  </td>
                </tr>
              ) : filteredKategori.length > 0 ? (
                filteredKategori.map((k, index) => (
                  <tr
                    key={k.id}
                    className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 flex items-center gap-2">
                      <FolderKanban size={18} className="text-blue-400" />
                      {k.nama}
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(k.createdAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(k.updatedAt).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(k)}
                          className="bg-blue-600 hover:bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center transition"
                          title="Ubah"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setShowModal(true)
                            setKategoriTerpilih(k)
                          }}
                          className="bg-red-600 hover:bg-red-500 h-10 w-10 rounded-full flex items-center justify-center transition"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-slate-400"
                  >
                    Tidak ada kategori ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Konfirmasi Hapus */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
                Konfirmasi Hapus
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Apakah kamu yakin ingin menghapus kategori{' '}
                <span className="font-bold text-red-500 dark:text-red-400">
                  {kategoriTerpilih?.nama}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-slate-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    handleDelete(kategoriTerpilih.id)
                    setShowModal(false)
                  }}
                  className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 text-white"
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

export default CategoryPage
