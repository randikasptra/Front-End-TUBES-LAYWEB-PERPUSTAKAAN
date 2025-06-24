import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllUsers, editUser } from "@/services/userService"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/buttons"
import SidebarAdmin from "@/component/ui/SidebarAdmin"

const EditUserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        password: "",
        role: "mahasiswa",
        status: "aktif",
        nim: "",
        nid: "",
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const allUsers = await getAllUsers()
                const user = allUsers.find((u) => u.id === id)
                if (!user) {
                    toast.error("❌ Pengguna tidak ditemukan")
                    navigate("/admin/accounts")
                    return
                }

                setUserData(user)
                setFormData({
                    nama: user.nama,
                    email: user.email,
                    password: "", // Kosongkan untuk jaga-jaga
                    role: user.role,
                    status: user.status,
                    nim: user.nim || "",
                    nid: user.nid || "",
                })
            } catch (err) {
                console.error(err)
                toast.error("❌ Gagal mengambil data pengguna")
            }
        }

        fetchUser()
    }, [id, navigate])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await editUser(id, formData)
            toast.success("✅ Pengguna berhasil diperbarui")
            navigate("/dashboard/admin/data-pengguna")
        } catch (err) {
            console.error(err)
            toast.error("❌ Gagal memperbarui pengguna")
        }
    }

    if (!userData) {
        return <div className="text-white p-8">Memuat data pengguna...</div>
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <h1 className="text-2xl font-bold mb-6">Edit Akun Pengguna</h1>
                <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
                    <div>
                        <label className="block text-sm mb-1">Nama</label>
                        <Input
                            name="nama"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            required
                            className="bg-blue-800 border-blue-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-blue-800 border-blue-600 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password Baru (opsional)</label>
                        <Input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Kosongkan jika tidak ingin mengubah"
                            className="bg-blue-800 border-blue-600 text-white"
                        />
                    </div>

                    {/* NIM / NID */}
                    {formData.role === "mahasiswa" && (
                        <div>
                            <label className="block text-sm mb-1">NIM</label>
                            <Input
                                name="nim"
                                value={formData.nim}
                                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                                className="bg-blue-800 border-blue-600 text-white"
                            />
                        </div>
                    )}
                    {formData.role === "dosen" && (
                        <div>
                            <label className="block text-sm mb-1">NID</label>
                            <Input
                                name="nid"
                                value={formData.nid}
                                onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                                className="bg-blue-800 border-blue-600 text-white"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value, nim: "", nid: "" })
                                }
                                className="w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600"
                            >
                                <option value="mahasiswa">Mahasiswa</option>
                                <option value="dosen">Dosen</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                                className="w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600"
                            >
                                <option value="aktif">Aktif</option>
                                <option value="nonaktif">Nonaktif</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default EditUserPage
