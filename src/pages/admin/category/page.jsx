import React, { useEffect, useState } from 'react'
import { Button } from '@/component/ui/buttons'
import { Input } from '@/component/ui/input'
import { Card } from '@/component/card'
import { Pencil, Trash2, FolderKanban } from 'lucide-react'
import SidebarAdmin from '../../../component/ui/SidebarAdmin'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getAllKategori } from '../../../services/categoryService'

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
            console.log(result)
        } catch (error) {
            console.error('Gagal memuat kategori:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token')
            if (editingId) {
                await axios.put(
                    `http://localhost:5000/api/category/${editingId}`,
                    { nama: namaKategori },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                toast.success('Kategori berhasil diperbarui')
            } else {
                await axios.post(
                    `http://localhost:5000/api/category`,
                    { nama: namaKategori },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
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
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:5000/api/category/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
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
        <>
            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white dark:bg-slate-800 p-6 rounded-xl w-[90%] max-w-md'>
                        <h2 className='text-lg font-semibold mb-4 text-slate-800 dark:text-white'>
                            Konfirmasi Hapus
                        </h2>
                        <p className='text-sm text-slate-600 dark:text-slate-300 mb-6'>
                            Apakah kamu yakin ingin menghapus kategori{' '}
                            <span className='font-bold text-red-500 dark:text-red-400'>
                                {kategoriTerpilih?.nama}
                            </span>
                            ?
                        </p>
                        <div className='flex justify-end gap-3'>
                            <button
                                onClick={() => setShowModal(false)}
                                className='px-4 py-2 text-sm rounded-md bg-gray-300 hover:bg-gray-400 text-slate-800 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(kategoriTerpilih.id)
                                    setShowModal(false)
                                }}
                                className='px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 text-white'
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='ml-64 p-8 min-h-screen bg-[#1c1f2b] text-white'>
                <SidebarAdmin />
                <div className='mb-6 flex justify-between items-center'>
                    <Input
                        placeholder='Cari kategori...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='max-w-sm rounded-lg'
                    />
                    <div className='flex gap-2'>
                        <Input
                            placeholder='Nama kategori'
                            value={namaKategori}
                            onChange={(e) => setNamaKategori(e.target.value)}
                            className='rounded-lg'
                        />
                        <Button
                            onClick={handleSubmit}
                            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg'
                        >
                            {editingId ? 'Update' : '+ Tambah'}
                        </Button>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-sm border-collapse rounded-xl overflow-hidden'>
                        <thead className='bg-blue-900 text-left text-white'>
                            <tr>
                                <th className='p-3'>No</th>
                                <th className='p-3'>Nama Kategori</th>
                                <th className='p-3'>Dibuat Pada</th>
                                <th className='p-3'>Diperbarui Pada</th>
                                <th className='p-3'>Aksi</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#2a2d3d] divide-y divide-gray-700'>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan='5'
                                        className='p-6 text-center'
                                    >
                                        Memuat data...
                                    </td>
                                </tr>
                            ) : filteredKategori.length > 0 ? (
                                filteredKategori.map((k, index) => (
                                    <tr
                                        key={k.id}
                                        className='hover:bg-[#34374a] text-white'
                                    >
                                        <td className='p-3'>{index + 1}</td>
                                        <td className='p-3 flex items-center gap-2'>
                                            <FolderKanban size={18} />
                                            {k.nama}
                                        </td>
                                        <td className='p-3'>
                                            {new Date(
                                                k.createdAt
                                            ).toLocaleString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className='p-3'>
                                            {new Date(
                                                k.updatedAt
                                            ).toLocaleString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </td>
                                        <td className='p-3'>
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() =>
                                                        handleEdit(k)
                                                    }
                                                    className='bg-blue-600 hover:bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Ubah'
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowModal(true)
                                                        setKategoriTerpilih(k)
                                                    }}
                                                    className='bg-red-600 hover:bg-red-500 h-10 w-10 rounded-full flex items-center justify-center transition'
                                                    title='Hapus'
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
                                        colSpan='5'
                                        className='p-4 text-center text-gray-400'
                                    >
                                        Tidak ada kategori ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CategoryPage
