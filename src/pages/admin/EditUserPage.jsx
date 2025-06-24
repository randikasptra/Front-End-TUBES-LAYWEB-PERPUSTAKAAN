import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllUsers, editUser } from "@/services/userService"
import { Input } from "@/component/ui/input"
import { Button } from "@/component/ui/buttons"
import SidebarAdmin from "@/component/ui/SidebarAdmin"
import { User2, Mail, KeyRound, BadgeCheck, ShieldCheck } from "lucide-react"

const EditUserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
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

    if (!formData) return null

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 text-white">
            <SidebarAdmin />
            <main className="flex-1 p-8 sm:ml-64">
                <div className="max-w-xl mx-auto bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Akun Pengguna</h1>
                    <form onSubmit={handleUpdate} className="space-y-5">
                        <InputGroup
                            label="Nama"
                            icon={<User2 className="w-4 h-4" />}
                            value={formData.nama}
                            onChange={(v) => setFormData({ ...formData, nama: v })}
                        />
                        <InputGroup
                            label="Email"
                            type="email"
                            icon={<Mail className="w-4 h-4" />}
                            value={formData.email}
                            onChange={(v) => setFormData({ ...formData, email: v })}
                        />
                        <InputGroup
                            label="Password Baru (Opsional)"
                            type="password"
                            icon={<KeyRound className="w-4 h-4" />}
                            value={formData.password}
                            placeholder="Kosongkan jika tidak ingin mengubah"
                            onChange={(v) => setFormData({ ...formData, password: v })}
                        />

                        {formData.role === "mahasiswa" && (
                            <InputGroup
                                label="NIM"
                                icon={<BadgeCheck className="w-4 h-4" />}
                                value={formData.nim}
                                onChange={(v) => setFormData({ ...formData, nim: v })}
                            />
                        )}
                        {formData.role === "dosen" && (
                            <InputGroup
                                label="NID"
                                icon={<BadgeCheck className="w-4 h-4" />}
                                value={formData.nid}
                                onChange={(v) => setFormData({ ...formData, nid: v })}
                            />
                        )}

                        <div className="space-y-4">
                            <SelectGroup
                                label="Role"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        role: e.target.value,
                                        nim: "",
                                        nid: "",
                                    })
                                }
                                options={[
                                    { label: "Mahasiswa", value: "mahasiswa" },
                                    { label: "Dosen", value: "dosen" },
                                ]}
                            />
                            <SelectGroup
                                label="Status"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                                options={[
                                    { label: "Aktif", value: "aktif" },
                                    { label: "Nonaktif", value: "nonaktif" },
                                ]}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-2 rounded-lg shadow transition"
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default EditUserPage

// ✅ InputGroup modern dengan icon support
const InputGroup = ({ label, value, onChange, type = "text", placeholder = "", icon = null }) => (
    <div>
        <label className="block text-sm mb-1 font-medium text-slate-300">{label}</label>
        <div className="flex items-center bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            {icon && <div className="mr-2 text-slate-400">{icon}</div>}
            <Input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-white w-full"
            />
        </div>
    </div>
)

// ✅ Select group modern
const SelectGroup = ({ label, value, onChange, options }) => (
    <div>
        <label className="block text-sm mb-1 font-medium text-slate-300">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full bg-slate-700 border border-slate-600 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
)
