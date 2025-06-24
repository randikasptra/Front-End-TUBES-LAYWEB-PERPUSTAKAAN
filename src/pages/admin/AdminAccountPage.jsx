import React, { useState, useEffect } from 'react'
import { Input } from '@/component/ui/input'
import { Button } from '@/component/ui/buttons'
import SidebarAdmin from '@/component/ui/SidebarAdmin'
import { Eye, Edit, Trash2, Plus, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { getAllUsers, createUser } from '@/services/userService'
import { useNavigate } from 'react-router-dom'

const statusColor = {
    Aktif: 'bg-emerald-500',
    Nonaktif: 'bg-rose-500',
}

const capitalize = (text) => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

const AdminAccountPage = () => {
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        role: 'mahasiswa',
        status: 'aktif',
        nim: '',
        nid: '',
    })

    const navigate = useNavigate()

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
                password: '',
                role: 'mahasiswa',
                status: 'aktif',
                nim: '',
                nid: '',
            })
            setIsModalOpen(false)
            fetchUsers()
        } catch (err) {
            console.error('Gagal menambahkan user:', err)
            toast.error('❌ Gagal menambahkan user')
        }
    }

    const handleShowDetail = (user) => {
        setSelectedUser(user)
        setIsDetailOpen(true)
    }

    const filteredUsers = users.filter(
        (user) =>
            user.nama.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='flex bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 min-h-screen text-white'>
            <SidebarAdmin />
            <main className='flex-1 p-8 sm:ml-64'>
                <h1 className='text-2xl font-bold mb-6'>Data Akun Pengguna</h1>

                {/* Search & Add */}
                <div className='mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <Input
                        type='text'
                        placeholder='Cari berdasarkan nama atau email'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full max-w-md bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400'
                    />
                    <Button
                        className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={18} /> Tambah Akun
                    </Button>
                </div>

                {/* Table */}
                <div className='overflow-x-auto rounded-lg border border-slate-700 shadow-lg'>
                    <table className='min-w-full bg-slate-800/70 backdrop-blur-sm'>
                        <thead className='bg-slate-700/50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300'>
                                    Nama
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300'>
                                    Email
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300'>
                                    Role
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300'>
                                    Status
                                </th>
                                <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-300'>
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-700'>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan='5'
                                        className='p-8 text-center'
                                    >
                                        <div className='flex flex-col items-center justify-center space-y-3'>
                                            <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                                            <p className='text-slate-400 font-medium'>
                                                Memuat data pengguna...
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className='hover:bg-slate-700/30 transition-colors'
                                    >
                                        <td className='px-6 py-4'>
                                            {user.nama}
                                        </td>
                                        <td className='px-6 py-4 text-slate-300'>
                                            {user.email}
                                        </td>
                                        <td className='px-6 py-4 text-slate-300'>
                                            {capitalize(user.role)}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    statusColor[
                                                        capitalize(user.status)
                                                    ] || 'bg-slate-500'
                                                } text-white`}
                                            >
                                                {capitalize(user.status)}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <div className='flex justify-end space-x-2'>
                                                <button
                                                    onClick={() =>
                                                        handleShowDetail(user)
                                                    }
                                                    className='text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-slate-700 transition-colors'
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/admin/data-pengguna/edit/${user.id}`
                                                        )
                                                    }
                                                    className='text-amber-400 hover:text-amber-300 p-1 rounded hover:bg-slate-700 transition-colors'
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button className='text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-700 transition-colors'>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan='5'
                                        className='px-6 py-4 text-center text-slate-400'
                                    >
                                        Tidak ada data pengguna ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal Tambah */}
            {isModalOpen && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                    <div className='bg-slate-800 rounded-xl shadow-lg w-full max-w-lg relative border border-slate-700 text-white p-6'>
                        <button
                            className='absolute top-4 right-4 text-slate-400 hover:text-white transition-colors'
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
                                <label className='block text-sm mb-1 text-slate-300'>
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
                                    required
                                    className='bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400'
                                />
                            </div>
                            <div>
                                <label className='block text-sm mb-1 text-slate-300'>
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
                                    required
                                    className='bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400'
                                />
                            </div>
                            <div>
                                <label className='block text-sm mb-1 text-slate-300'>
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
                                    required
                                    className='bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400'
                                />
                            </div>
                            {formData.role === 'mahasiswa' && (
                                <div>
                                    <label className='block text-sm mb-1 text-slate-300'>
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
                                        required
                                        className='bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400'
                                    />
                                </div>
                            )}
                            {formData.role === 'dosen' && (
                                <div>
                                    <label className='block text-sm mb-1 text-slate-300'>
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
                                        required
                                        className='bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400'
                                    />
                                </div>
                            )}
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm mb-1 text-slate-300'>
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
                                        className='w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:border-blue-400 focus:ring-blue-400'
                                    >
                                        <option value='mahasiswa'>
                                            Mahasiswa
                                        </option>
                                        <option value='dosen'>Dosen</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm mb-1 text-slate-300'>
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
                                        className='w-full bg-slate-700 text-white rounded-lg p-2 border border-slate-600 focus:border-blue-400 focus:ring-blue-400'
                                    >
                                        <option value='aktif'>Aktif</option>
                                        <option value='nonaktif'>
                                            Nonaktif
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <Button
                                    type='submit'
                                    className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors'
                                >
                                    Simpan Akun
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Detail */}
            {isDetailOpen && selectedUser && (
                <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4'>
                    <div className='bg-slate-800 rounded-xl shadow-lg w-full max-w-md relative border border-slate-700 text-white p-6'>
                        <button
                            className='absolute top-4 right-4 text-slate-400 hover:text-white transition-colors'
                            onClick={() => setIsDetailOpen(false)}
                        >
                            <X size={20} />
                        </button>
                        <h2 className='text-xl font-semibold mb-4'>
                            Detail Pengguna
                        </h2>
                        <div className='space-y-3 text-sm'>
                            <div>
                                <span className='text-blue-400'>Nama:</span>{' '}
                                <span className='text-slate-200'>{selectedUser.nama}</span>
                            </div>
                            <div>
                                <span className='text-blue-400'>Email:</span>{' '}
                                <span className='text-slate-200'>{selectedUser.email}</span>
                            </div>
                            <div>
                                <span className='text-blue-400'>Role:</span>{' '}
                                <span className='text-slate-200'>{capitalize(selectedUser.role)}</span>
                            </div>
                            <div>
                                <span className='text-blue-400'>Status:</span>{' '}
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    statusColor[capitalize(selectedUser.status)] || 'bg-slate-500'
                                }`}>
                                    {capitalize(selectedUser.status)}
                                </span>
                            </div>
                            {selectedUser.role === 'mahasiswa' && (
                                <div>
                                    <span className='text-blue-400'>NIM:</span>{' '}
                                    <span className='text-slate-200'>{selectedUser.nim || '-'}</span>
                                </div>
                            )}
                            {selectedUser.role === 'dosen' && (
                                <div>
                                    <span className='text-blue-400'>NID:</span>{' '}
                                    <span className='text-slate-200'>{selectedUser.nid || '-'}</span>
                                </div>
                            )}
                            <div>
                                <span className='text-blue-400'>ID:</span>{' '}
                                <span className='text-slate-200'>{selectedUser.id}</span>
                            </div>
                        </div>
                        <div className='mt-6 flex justify-end'>
                            <Button
                                className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors'
                                onClick={() => setIsDetailOpen(false)}
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAccountPage