/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card } from '@/component/card'
import { Input } from '@/component/ui/input'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { MoreHorizontal } from 'lucide-react'
import { getAllPeminjaman } from '../../services/peminjamanService'

const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const AdminBorrowPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [peminjaman, setPeminjaman] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchPeminjaman = async () => {
            try {
                const result = await getAllPeminjaman()
                setPeminjaman(result)
                console.log('Data peminjaman:', result)
            } catch (error) {
                console.error('Gagal mengambil data peminjaman:', error)
            }
        }

        fetchPeminjaman()
    }, [])

    const filteredBorrowings = peminjaman.filter((item) => {
        const nama = item.reservasi?.user?.nama?.toLowerCase() || ''
        const nim = item.reservasi?.user?.nim || ''
        return (
            nama.includes(searchTerm.toLowerCase()) || nim.includes(searchTerm)
        )
    })

    const handleTanggalKembaliChange = (id, value) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, tanggalKembali: value } : item
            )
        )
    }

    return (
        <div className='flex bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 min-h-screen text-white'>
            <SidebarAdmin />
            <main className='flex-1 p-8 sm:ml-64'>
                <h1 className='text-2xl font-bold mb-6'>
                    Data Peminjaman Buku
                </h1>

                <div className='mb-6'>
                    <Input
                        type='text'
                        placeholder='Cari berdasarkan nama atau NIM'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full max-w-md'
                    />
                </div>

                <div className='overflow-x-auto'>
                    <table className='min-w-full table-auto text-left text-sm'>
                        <thead>
                            <tr className='bg-blue-900 text-white border-b border-slate-700'>
                                <th className='py-3 px-4'>No</th>
                                <th className='py-3 px-4'>Nama Peminjam</th>
                                <th className='py-3 px-4'>Judul Buku</th>
                                <th className='py-3 px-4'>Tgl Pinjam</th>
                                <th className='py-3 px-4'>Tgl Jatuh Tempo</th>
                                <th className='py-3 px-4'>Tgl Kembali</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-900 divide-y divide-slate-700'>
                            {filteredBorrowings.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-slate-700 ${
                                        item.status === 'Terlambat'
                                            ? 'text-red-400'
                                            : item.status ===
                                              'Sudah Dikembalikan'
                                            ? 'text-green-400'
                                            : 'text-white'
                                    }`}
                                >
                                    <td className='py-2 px-4'>{index + 1}</td>
                                    <td className='py-2 px-4 font-medium'>
                                        {item.reservasi?.user?.nama ||
                                            'Tidak diketahui'}
                                    </td>
                                    <td className='py-2 px-4 italic'>
                                        {item.reservasi?.book?.judul ||
                                            'Tidak diketahui'}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {formatDate(item.tanggalPinjam)}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {formatDate(item.tanggalJatuhTempo)}
                                    </td>
                                    <td className='py-2 px-4'>
                                        <input
                                            type='date'
                                            value={
                                                item.tanggalKembali
                                                    ? item.tanggalKembali.split(
                                                          'T'
                                                      )[0]
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                handleTanggalKembaliChange(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                            className='border border-gray-600 bg-gray-800 text-white rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                                        />
                                    </td>

                                    <td className='py-2 px-4'>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                item.status ===
                                                'Sudah Dikembalikan'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : item.status ===
                                                      'Terlambat'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default AdminBorrowPage
