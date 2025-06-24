import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllUsers, editUser } from "@/services/userService"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/buttons"
import SidebarAdmin from "@/component/ui/SidebarAdmin"
import LoadingScreen from "@/component/ui/LoadingScreen"

const EditUserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const allUsers = await getAllUsers()
                const user = allUsers.find((u) => u.id === id)
                if (!user) {
                    toast.error("❌ Pengguna tidak ditemukan")
                    return navigate("/dashboard/admin/data-pengguna")
                }

                setFormData({
                    nama: user.nama || "",
                    email: user.email || "",
                    password: "",
                    role: user.role || "mahasiswa",
                    status: user.status || "aktif",
                    nim: user.nim || "",
                    nid: user.nid || "",
                })
            } catch (err) {
                console.error(err)
                toast.error("❌ Gagal mengambil data pengguna")
            } finally {
                setLoading(false)
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

    if (loading || !formData) {
        return <LoadingScreen />
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <h1 className="text-2xl font-bold mb-6">Edit Akun Pengguna</h1>
                <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
                    <InputGroup label="Nama" value={formData.nama} onChange={(v) => setFormData({ ...formData, nama: v })} />
                    <InputGroup label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                    <InputGroup label="Password Baru (opsional)" type="password" value={formData.password} placeholder="Kosongkan jika tidak ingin mengubah" onChange={(v) => setFormData({ ...formData, password: v })} />

                    {formData.role === "mahasiswa" && (
                        <InputGroup label="NIM" value={formData.nim} onChange={(v) => setFormData({ ...formData, nim: v })} />
                    )}
                    {formData.role === "dosen" && (
                        <InputGroup label="NID" value={formData.nid} onChange={(v) => setFormData({ ...formData, nid: v })} />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value, nim: "", nid: "" })}
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
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
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

// ✅ Reusable input group
const InputGroup = ({ label, value, onChange, type = "text", placeholder = "" }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <Input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="bg-blue-800 border-blue-600 text-white"
        />
    </div>
)
