import React, { useState, useEffect } from "react"
import { Card } from "@/component/card"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/buttons"
import SidebarAdmin from "@/component/ui/SidebarAdmin"
import { MoreVertical, Plus, X } from "lucide-react"
import { toast } from "react-toastify"
import { getAllUsers, createUser } from "@/services/userService"

const statusColor = {
    Aktif: "bg-green-500",
    Nonaktif: "bg-red-500",
}

const capitalize = (text) => {
    if (!text) return ""
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const AdminAccountPage = () => {
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        role: "mahasiswa", // lowercase sesuai backend
        status: "aktif",
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const result = await getAllUsers()
            setUsers(result)
        } catch (err) {
            console.error("Gagal memuat pengguna:", err)
            toast.error("❌ Gagal memuat data user")
        } finally {
            setLoading(false)
        }
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        try {
            await createUser(formData)
            toast.success("✅ Akun berhasil ditambahkan")
            setFormData({
                nama: "",
                email: "",
                role: "mahasiswa",
                status: "aktif",
            })
            setIsModalOpen(false)
            fetchUsers()
        } catch (err) {
            console.error("Gagal menambahkan user:", err)
            toast.error("❌ Gagal menambahkan user")
        }
    }

    const filteredUsers = users.filter(
        (user) =>
            user.nama.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <h1 className="text-2xl font-bold mb-6">Data Akun Pengguna</h1>

                {/* Search + Button */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <Input
                        type="text"
                        placeholder="Cari berdasarkan nama atau email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} /> Tambah Akun
                    </Button>
                </div>

                {/* Kartu Akun */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading ? (
                        <p>Memuat data pengguna...</p>
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <Card
                                key={user.id}
                                className="p-4 bg-slate-800 text-white border border-slate-600 shadow-md rounded-xl relative"
                            >
                                <div className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-white">
                                    <MoreVertical size={18} />
                                </div>
                                <h2 className="text-lg font-semibold mb-1">{user.nama}</h2>
                                <p className="text-sm text-slate-300 mb-1">
                                    Email: {user.email}
                                </p>
                                <p className="text-sm text-slate-300 mb-3">
                                    Role: {capitalize(user.role)}
                                </p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        statusColor[capitalize(user.status)] || "bg-gray-500"
                                    }`}
                                >
                                    {capitalize(user.status)}
                                </span>
                            </Card>
                        ))
                    ) : (
                        <p>Tidak ada data pengguna ditemukan</p>
                    )}
                </div>
            </main>

            {/* Modal Tambah Akun */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-xl shadow-lg w-full max-w-lg relative border border-slate-600 text-white p-6">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Tambah Akun Pengguna</h2>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Nama</label>
                                <Input
                                    name="nama"
                                    value={formData.nama}
                                    onChange={(e) =>
                                        setFormData({ ...formData, nama: e.target.value })
                                    }
                                    placeholder="Nama lengkap"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    placeholder="Alamat email"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Role</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({ ...formData, role: e.target.value })
                                        }
                                        className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600"
                                    >
                                        <option value="mahasiswa">Mahasiswa</option>
                                        <option value="dosen">Dosen</option>
                                        <option value="admin">Admin</option>
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
                                        className="w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600"
                                    >
                                        <option value="aktif">Aktif</option>
                                        <option value="nonaktif">Nonaktif</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Simpan Akun
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAccountPage
