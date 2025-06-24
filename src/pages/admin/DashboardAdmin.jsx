import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { BarChart2, BookOpen, Users, Clock } from 'lucide-react'
import { getTotalBuku } from '../../services/bookService'
import { getTotalPeminjamanDikembalikan, getTotalPeminjamanDipinjam } from '../../services/peminjamanService'
import { getTotalMahasiswaDanDosen } from '../../services/userService'


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
    const [totalUser, setTotalUser] = useState(0)
    const [totalBuku, setTotalBuku] = useState(0)
    const [totalDipinjam, setTotalDipinjam] = useState(0)
    const [totalDikembalikan, setTotalDikembalikan] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [buku, dipinjam, dikembalikan, user] = await Promise.all([
                    getTotalBuku(),
                    getTotalPeminjamanDipinjam(),
                    getTotalPeminjamanDikembalikan(),
                    getTotalMahasiswaDanDosen()
                ])
                setTotalBuku(buku)
                setTotalDipinjam(dipinjam)
                setTotalDikembalikan(dikembalikan)
                setTotalUser(user)
            } catch (error) {
                console.error('Gagal mengambil data total:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTotals()
    }, [])


    const statCards = [
        {
            title: 'Total Pengguna',
            value: loading ? 'Loading...' : totalUser,
            icon: <Users size={20} className="text-blue-400" />,
        },
        {
            title: 'Total Buku',
            value: loading ? 'Loading...' : totalBuku,
            icon: <BookOpen size={20} className="text-green-400" />,
        },
        {
            title: 'Buku Dipinjam',
            value: loading ? 'Loading...' : totalDipinjam,
            icon: <Clock size={20} className="text-yellow-400" />,
        },
        {
            title: 'Buku Dikembalikan',
            value: loading ? 'Loading...' : totalDikembalikan,
            icon: <BarChart2 size={20} className="text-purple-400" />,
        },
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
                                                className={`font-semibold ${item.status ===
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
