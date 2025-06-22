import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { BarChart2, BookOpen, Users, Clock } from 'lucide-react'
import { getTotalBuku } from '../../services/bookService'

const recentActivities = [
    {
        nama: 'Ichi Caroline',
        judul: 'Jaringan Komputer',
        status: 'Di Kembalikan',
        tanggal: '23 - 03 - 2025',
    },
    {
        nama: 'Ucup Surcup',
        judul: 'Sistem Informasi',
        status: 'Sedang di Pinjam',
        tanggal: '23 - 03 - 2025',
    },
]

const DashboardAdmin = () => {
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTotalBuku = async () => {
            try {
                const total = await getTotalBuku()
                setTotal(total)
            } catch (error) {
                console.error('Gagal mengambil total buku:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTotalBuku()
    }, [])

    const statCards = [
        {
            title: 'Total Buku',
            value: loading ? 'Loading...' : total,
            icon: <BookOpen size={20} />,
        },
        { title: 'Buku di Pinjam', value: 57, icon: <Clock size={20} /> },
        {
            title: 'Buku di Kembalikan',
            value: 76,
            icon: <BarChart2 size={20} />,
        },
        { title: 'Belum Kembali', value: 11, icon: <Clock size={20} /> },
    ]

    return (
        <div className='min-h-screen bg-[#0f172a] text-white flex'>
            <SidebarAdmin />
            <main className='flex-1 p-6 ml-64'>
                {' '}
                {/* Tambah ml-64 agar tidak ketutup sidebar */}
                <h1 className='text-2xl font-bold mb-6'>Dashboard Admin</h1>
                {/* Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {statCards.map((card, idx) => (
                        <div
                            key={idx}
                            className='bg-slate-800 p-5 rounded-xl flex flex-col gap-2 shadow hover:shadow-lg transition'
                        >
                            <div className='flex justify-between items-center text-sm text-slate-400'>
                                <span>{card.title}</span>
                                {card.icon}
                            </div>
                            <div className='text-3xl font-bold'>
                                {card.value}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Recent Activities */}
                <div className='bg-slate-800 rounded-xl shadow p-6'>
                    <h2 className='text-lg font-semibold mb-4'>
                        Aktifitas Terbaru
                    </h2>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-sm'>
                            <thead>
                                <tr className='text-slate-400 border-b border-slate-700'>
                                    <th className='text-left p-2'>Nama</th>
                                    <th className='text-left p-2'>
                                        Judul Buku
                                    </th>
                                    <th className='text-left p-2'>Status</th>
                                    <th className='text-left p-2'>Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivities.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className='border-b border-slate-700'
                                    >
                                        <td className='p-2'>{item.nama}</td>
                                        <td className='p-2'>{item.judul}</td>
                                        <td className='p-2'>
                                            <span
                                                className={`font-semibold ${
                                                    item.status ===
                                                    'Di Kembalikan'
                                                        ? 'text-green-400'
                                                        : 'text-yellow-400'
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='p-2'>{item.tanggal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardAdmin
