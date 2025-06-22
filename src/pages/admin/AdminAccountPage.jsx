import React, { useState, useEffect } from "react"
import { Card } from "@/component/card"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/buttons"
import SidebarAdmin from "@/component/ui/SidebarAdmin"
import { MoreVertical, Plus, X, Eye, Edit, Trash2 } from "lucide-react"
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
        role: "mahasiswa",
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
        <div className="flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white">
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
                        className="w-full max-w-md bg-blue-800 border-blue-600 text-white placeholder-blue-300"
                    />
                    <Button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} /> Tambah Akun
                    </Button>
                </div>

                {/* Tabel Akun */}
                <div className="overflow-x-auto rounded-lg border border-blue-600 shadow-lg">
                    <table className="min-w-full bg-blue-900">
                        <thead className="bg-blue-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">Memuat data pengguna...</td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-800">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium">{user.nama}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-blue-100">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-blue-100">
                                            {capitalize(user.role)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[capitalize(user.status)] || "bg-gray-500"
                                                    }`}
                                            >
                                                {capitalize(user.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button className="text-blue-300 hover:text-blue-100 p-1 rounded hover:bg-blue-700">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="text-yellow-400 hover:text-yellow-300 p-1 rounded hover:bg-blue-700">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-blue-700">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">Tidak ada data pengguna ditemukan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal Tambah Akun */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-blue-900 rounded-xl shadow-lg w-full max-w-lg relative border border-blue-600 text-white p-6">
                        <button
                            className="absolute top-4 right-4 text-blue-300 hover:text-white"
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
                                    className="bg-blue-800 border-blue-600 text-white"
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
                                    placeholder="Alamat email @sariwangi.ac.id"
                                    required
                                    className="bg-blue-800 border-blue-600 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    placeholder="Minimal 6 karakter"
                                    required
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
                                        onChange={(e) =>
                                            setFormData({ ...formData, nim: e.target.value })
                                        }
                                        placeholder="NIM Mahasiswa"
                                        required
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
                                        onChange={(e) =>
                                            setFormData({ ...formData, nid: e.target.value })
                                        }
                                        placeholder="NID Dosen"
                                        required
                                        className="bg-blue-800 border-blue-600 text-white"
                                    />
                                </div>
                            )}

                            {/* Role & Status */}
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

                            {/* Submit */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
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