import React, { useEffect, useState } from 'react'
import SideNavbar from '@/component/ui/SideNavbar'
import Footer from '@/component/ui/Footer'
import { getUserProfile } from '@/services/authService'
import { updateUser } from '@/services/userService'
import { toast } from 'react-toastify'

const SettingsPage = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    role: '',
    status: '',
    nim: '',
    nid: '',
  })

  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const profile = await getUserProfile()
      setUserId(profile.id)
      setForm({
        nama: profile.nama || '',
        email: profile.email || '',
        password: '',
        role: profile.role || '',
        status: profile.status || '',
        nim: profile.nim || '',
        nid: profile.nid || '',
      })
    } catch (err) {
      toast.error('Gagal memuat profil pengguna.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { nama, email, password, role, nim, nid } = form
      const payload = {
        nama,
        email,
        password,
        ...(role === 'mahasiswa' ? { nim } : {}),
        ...(role === 'dosen' ? { nid } : {})
      }

      await updateUser(userId, payload)
      toast.success('Akun berhasil diperbarui.')
      await fetchProfile()
    } catch (err) {
      console.error('Gagal update user:', err)
      toast.error('Gagal memperbarui akun.')
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
      <SideNavbar />
      <main className="sm:ml-64 flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Akun</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full bg-slate-800 px-4 py-2 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-800 px-4 py-2 rounded text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Password (Kosongkan jika tidak ingin diganti)</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-800 px-4 py-2 rounded text-white"
              />
            </div>

            {form.role === 'mahasiswa' && (
              <div>
                <label className="block mb-1">NIM</label>
                <input
                  type="text"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  className="w-full bg-slate-800 px-4 py-2 rounded text-white"
                />
              </div>
            )}

            {form.role === 'dosen' && (
              <div>
                <label className="block mb-1">NID</label>
                <input
                  type="text"
                  name="nid"
                  value={form.nid}
                  onChange={handleChange}
                  className="w-full bg-slate-800 px-4 py-2 rounded text-white"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium"
            >
              Simpan Perubahan
            </button>
          </form>
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
