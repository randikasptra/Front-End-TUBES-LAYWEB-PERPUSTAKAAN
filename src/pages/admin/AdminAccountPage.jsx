import React, { useState, useEffect } from 'react'
import { Card } from '@/component/card'
import { Input } from '@/component/ui/input'
import { Button } from '@/component/ui/buttons'
import SidebarAdmin from '@/component/ui/SidebarAdmin'
import { Plus, X, Eye, Edit, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { getAllUsers, createUser } from '@/services/userService'
import { deleteUser, updateUser } from '../../services/userService'

const AdminAccountPage = () => {
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    // Tambahkan setelah state untuk Modal Tambah dan Delete
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editFormData, setEditFormData] = useState({})

    // Fungsi buka modal edit
    const openEditModal = (user) => {
        setEditFormData({
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            status: user.status,
            nim: user.nim || '',
            nid: user.nid || '',
        })
        setIsEditModalOpen(true)
    }

    const handleEditUser = async (e) => {
        e.preventDefault()
        try {
            await updateUser(editFormData.id, editFormData) // Pastikan ada di userService
            toast.success('✅ Akun berhasil diperbarui')
            setIsEditModalOpen(false)
            fetchUsers()
        } catch (error) {
            toast.error('❌ Gagal memperbarui akun')
            console.error(error)
        }
    }

    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        role: 'mahasiswa',
        status: 'aktif',
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const result = await getAllUsers()
            setUsers(result)
            console.log(result)
        } catch (err) {
            console.error('Gagal memuat pengguna:', err)
            toast.error('❌ Gagal memuat data user')
        } finally {
            setLoading(false)
        }
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        try {
            await createUser(formData)
            toast.success('✅ Akun berhasil ditambahkan')
            setFormData({
                nama: '',
                email: '',
                role: 'mahasiswa',
                status: 'aktif',
            })
            setIsModalOpen(false)
            fetchUsers()
        } catch (err) {
            console.error('Gagal menambahkan user:', err)
            toast.error('❌ Gagal menambahkan user')
        }
    }

    const filteredUsers = users.filter(
        (user) =>
            user.nama.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            {isDeleteModalOpen && selectedUser && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                    <div className='bg-blue-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md border border-blue-600 relative'>
                        <button
                            className='absolute top-4 right-4 text-blue-300 hover:text-white'
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className='text-lg font-semibold mb-4'>
                            Konfirmasi Penghapusan
                        </h2>
                        <p className='mb-6'>
                            Apakah kamu yakin ingin menghapus akun{' '}
                            <span className='font-semibold'>
                                {selectedUser.nama}
                            </span>
                            ?
                        </p>
                        <div className='flex justify-end gap-2'>
                            <Button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className='bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg'
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={async () => {
                                    try {
                                        await deleteUser(selectedUser.id)
                                        toast.success(
                                            '✅ Akun berhasil dihapus'
                                        )
                                        fetchUsers()
                                    } catch (error) {
                                        toast.error('❌ Gagal menghapus akun')
                                        console.error(error)
                                    } finally {
                                        setIsDeleteModalOpen(false)
                                    }
                                }}
                                className='bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg'
                            >
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedUser && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                    <div className='bg-blue-900 rounded-xl shadow-lg w-full max-w-lg relative border border-blue-600 text-white p-6'>
                        <button
                            className='absolute top-4 right-4 text-blue-300 hover:text-white'
                            onClick={() => {
                                setIsEditModalOpen(false)
                                setEditFormData(null)
                            }}
                        >
                            <X size={20} />
                        </button>
                        <h2 className='text-xl font-semibold mb-4'>
                            Edit Akun Pengguna
                        </h2>
                        <form
                            onSubmit={handleEditUser}
                            className='space-y-4'
                        >
                            <div>
                                <label className='block text-sm mb-1'>
                                    Nama
                                </label>
                                <Input
                                    name='nama'
                                    value={editFormData.nama}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            nama: e.target.value,
                                        })
                                    }
                                    required
                                    className='bg-blue-800 border-blue-600 text-white'
                                />
                            </div>

                            <div>
                                <label className='block text-sm mb-1'>
                                    Email
                                </label>
                                <Input
                                    name='email'
                                    type='email'
                                    value={editFormData.email}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                    className='bg-blue-800 border-blue-600 text-white'
                                />
                            </div>

                            <div>
                                <label className='block text-sm mb-1'>
                                    Password (Kosongkan jika tidak diubah)
                                </label>
                                <Input
                                    name='password'
                                    type='password'
                                    value={editFormData.password || ''}
                                    onChange={(e) =>
                                        setEditFormData({
                                            ...editFormData,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder='Minimal 6 karakter atau kosongkan'
                                    className='bg-blue-800 border-blue-600 text-white'
                                />
                            </div>

                            {/* NIM / NID */}
                            {editFormData.role === 'mahasiswa' && (
                                <div>
                                    <label className='block text-sm mb-1'>
                                        NIM
                                    </label>
                                    <Input
                                        name='nim'
                                        value={editFormData.nim || ''}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                nim: e.target.value,
                                            })
                                        }
                                        required
                                        className='bg-blue-800 border-blue-600 text-white'
                                    />
                                </div>
                            )}
                            {editFormData.role === 'dosen' && (
                                <div>
                                    <label className='block text-sm mb-1'>
                                        NID
                                    </label>
                                    <Input
                                        name='nid'
                                        value={editFormData.nid || ''}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                nid: e.target.value,
                                            })
                                        }
                                        required
                                        className='bg-blue-800 border-blue-600 text-white'
                                    />
                                </div>
                            )}

                            {/* Role & Status */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm mb-1'>
                                        Role
                                    </label>
                                    <select
                                        name='role'
                                        value={editFormData.role}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                role: e.target.value,
                                                nim: '',
                                                nid: '',
                                            })
                                        }
                                        className='w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600'
                                    >
                                        <option value='mahasiswa'>
                                            Mahasiswa
                                        </option>
                                        <option value='dosen'>Dosen</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm mb-1'>
                                        Status
                                    </label>
                                    <select
                                        name='status'
                                        value={editFormData.status}
                                        onChange={(e) =>
                                            setEditFormData({
                                                ...editFormData,
                                                status: e.target.value,
                                            })
                                        }
                                        className='w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600'
                                    >
                                        <option value='aktif'>Aktif</option>
                                        <option value='nonaktif'>
                                            Nonaktif
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Tombol Simpan */}
                            <div className='flex justify-end'>
                                <Button
                                    type='submit'
                                    className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg'
                                >
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className='flex bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white'>
                <SidebarAdmin />
                <main className='flex-1 p-8 sm:ml-64'>
                    <h1 className='text-2xl font-bold mb-6'>
                        Data Akun Pengguna
                    </h1>

                    {/* Search + Button */}
                    <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <Input
                            type='text'
                            placeholder='Cari berdasarkan nama atau email'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full max-w-md bg-blue-800 border-blue-600 text-white placeholder-blue-300'
                        />
                        <Button
                            className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2'
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} /> Tambah Akun
                        </Button>
                    </div>

                    {/* Tabel Akun */}
                    <div className='overflow-x-auto rounded-lg border border-blue-600 shadow-lg'>
                        <table className='w-full text-sm border-collapse rounded-xl overflow-hidden'>
                            <thead className='bg-blue-900 text-left text-white'>
                                <tr>
                                    <th className='px-4 py-2'>No</th>
                                    <th className='px-4 py-2'>Nama</th>
                                    <th className='px-4 py-2'>Email</th>
                                    <th className='px-4 py-2'>Role</th>
                                    <th className='px-4 py-2'>Status</th>
                                    <th className='px-4 py-2 text-center'>
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-[#2a2d3d] divide-y divide-gray-700 text-white'>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan='6'
                                            className='px-4 py-4 text-center'
                                        >
                                            Memuat data pengguna...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className='hover:bg-[#34374a] transition'
                                        >
                                            <td className='px-4 py-2'>
                                                {index + 1}
                                            </td>
                                            <td className='px-4 py-2 font-medium'>
                                                {user.nama}
                                            </td>
                                            <td className='px-4 py-2 text-gray-300'>
                                                {user.email}
                                            </td>
                                            <td className='px-4 py-2 capitalize text-gray-300'>
                                                {user.role}
                                            </td>
                                            <td className='px-4 py-2 capitalize'>
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        user.status.toLowerCase() ===
                                                        'aktif'
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-red-600 text-white'
                                                    }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex justify-center gap-2'>
                                                    <button
                                                        onClick={() =>
                                                            openEditModal(user)
                                                        }
                                                        className='bg-yellow-500 hover:bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center transition'
                                                        title='Ubah'
                                                    >
                                                        <Edit
                                                            size={16}
                                                            className='text-white'
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(
                                                                user
                                                            )
                                                            setIsDeleteModalOpen(
                                                                true
                                                            )
                                                        }}
                                                        className='bg-red-600 hover:bg-red-500 h-8 w-8 rounded-full flex items-center justify-center transition'
                                                        title='Hapus'
                                                    >
                                                        <Trash2
                                                            size={16}
                                                            className='text-white'
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan='6'
                                            className='px-4 py-4 text-center text-gray-400'
                                        >
                                            Tidak ada data pengguna ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>

                {/* Modal Tambah Akun */}
                {isModalOpen && (
                    <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                        <div className='bg-blue-900 rounded-xl shadow-lg w-full max-w-lg relative border border-blue-600 text-white p-6'>
                            <button
                                className='absolute top-4 right-4 text-blue-300 hover:text-white'
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X size={20} />
                            </button>
                            <h2 className='text-xl font-semibold mb-4'>
                                Tambah Akun Pengguna
                            </h2>
                            <form
                                onSubmit={handleAddUser}
                                className='space-y-4'
                            >
                                <div>
                                    <label className='block text-sm mb-1'>
                                        Nama
                                    </label>
                                    <Input
                                        name='nama'
                                        value={formData.nama}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nama: e.target.value,
                                            })
                                        }
                                        placeholder='Nama lengkap'
                                        required
                                        className='bg-blue-800 border-blue-600 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm mb-1'>
                                        Email
                                    </label>
                                    <Input
                                        name='email'
                                        type='email'
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder='Alamat email @sariwangi.ac.id'
                                        required
                                        className='bg-blue-800 border-blue-600 text-white'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm mb-1'>
                                        Password
                                    </label>
                                    <Input
                                        name='password'
                                        type='password'
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder='Minimal 6 karakter'
                                        required
                                        className='bg-blue-800 border-blue-600 text-white'
                                    />
                                </div>

                                {/* NIM / NID */}
                                {formData.role === 'mahasiswa' && (
                                    <div>
                                        <label className='block text-sm mb-1'>
                                            NIM
                                        </label>
                                        <Input
                                            name='nim'
                                            value={formData.nim}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nim: e.target.value,
                                                })
                                            }
                                            placeholder='NIM Mahasiswa'
                                            required
                                            className='bg-blue-800 border-blue-600 text-white'
                                        />
                                    </div>
                                )}
                                {formData.role === 'dosen' && (
                                    <div>
                                        <label className='block text-sm mb-1'>
                                            NID
                                        </label>
                                        <Input
                                            name='nid'
                                            value={formData.nid}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    nid: e.target.value,
                                                })
                                            }
                                            placeholder='NID Dosen'
                                            required
                                            className='bg-blue-800 border-blue-600 text-white'
                                        />
                                    </div>
                                )}

                                {/* Role & Status */}
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm mb-1'>
                                            Role
                                        </label>
                                        <select
                                            name='role'
                                            value={formData.role}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    role: e.target.value,
                                                    nim: '',
                                                    nid: '',
                                                })
                                            }
                                            className='w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600'
                                        >
                                            <option value='mahasiswa'>
                                                Mahasiswa
                                            </option>
                                            <option value='dosen'>Dosen</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='block text-sm mb-1'>
                                            Status
                                        </label>
                                        <select
                                            name='status'
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                })
                                            }
                                            className='w-full bg-blue-800 text-white rounded-lg p-2 border border-blue-600'
                                        >
                                            <option value='aktif'>Aktif</option>
                                            <option value='nonaktif'>
                                                Nonaktif
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className='flex justify-end'>
                                    <Button
                                        type='submit'
                                        className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg'
                                    >
                                        Simpan Akun
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminAccountPage
