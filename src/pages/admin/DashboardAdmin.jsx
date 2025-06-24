import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../component/ui/SidebarAdmin'
import { 
    UserRound, 
    BookOpenText, 
    Clock4,
    ArrowUpDown,
    LibraryBig,
    History,
    UserCog,
    CalendarClock
} from 'lucide-react'
import { getTotalBuku } from '../../services/bookService'
import {
    getAllPeminjaman,
    getTotalPeminjamanDikembalikan,
    getTotalPeminjamanDipinjam,
} from '../../services/peminjamanService'
import { getTotalMahasiswaDanDosen } from '../../services/userService'

const DashboardAdmin = () => {
    const [totalUser, setTotalUser] = useState(0)
    const [totalBuku, setTotalBuku] = useState(0)
    const [totalDipinjam, setTotalDipinjam] = useState(0)
    const [totalDikembalikan, setTotalDikembalikan] = useState(0)
    const [loading, setLoading] = useState(true)
    const [recentActivities, setRecentActivities] = useState([])

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [buku, dipinjam, dikembalikan, user] = await Promise.all([
                    getTotalBuku(),
                    getTotalPeminjamanDipinjam(),
                    getTotalPeminjamanDikembalikan(),
                    getTotalMahasiswaDanDosen(),
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
            icon: (
                <div className="p-3 rounded-lg bg-blue-900/30">
                    <UserCog className='text-blue-400' size={20} />
                </div>
            ),
            color: 'bg-blue-900/10'
        },
        {
            title: 'Total Buku',
            value: loading ? 'Loading...' : totalBuku,
            icon: (
                <div className="p-3 rounded-lg bg-emerald-900/30">
                    <LibraryBig className='text-emerald-400' size={20} />
                </div>
            ),
            color: 'bg-emerald-900/10'
        },
        {
            title: 'Buku Dipinjam',
            value: loading ? 'Loading...' : totalDipinjam,
            icon: (
                <div className="p-3 rounded-lg bg-amber-900/30">
                    <Clock4 className='text-amber-400' size={20} />
                </div>
            ),
            color: 'bg-amber-900/10'
        },
        {
            title: 'Buku Dikembalikan',
            value: loading ? 'Loading...' : totalDikembalikan,
            icon: (
                <div className="p-3 rounded-lg bg-purple-900/30">
                    <ArrowUpDown className='text-purple-400' size={20} />
                </div>
            ),
            color: 'bg-purple-900/10'
        },
    ]

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const all = await getAllPeminjaman()

                // Urutkan berdasarkan tanggal pinjam terbaru
                const sorted = [...all].sort(
                    (a, b) =>
                        new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam)
                )

                // Ambil 5 data teratas
                const latestFive = sorted.slice(0, 5)

                setRecentActivities(latestFive)
            } catch (err) {
                console.error('Gagal ambil data terbaru:', err)
            }
        }

        fetchRecent()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/50 text-white flex'>
            <SidebarAdmin />
            <main className='flex-1 p-6 sm:ml-64'>
                <div className="flex items-center justify-between mb-8">
                    <h1 className='text-2xl font-bold'>Dashboard Admin</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <CalendarClock size={18} />
                        <span>
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
                
                {/* Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {statCards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`bg-slate-800/70 backdrop-blur-sm p-5 rounded-xl flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] ${card.color}`}
                        >
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-slate-400'>{card.title}</span>
                                {card.icon}
                            </div>
                            <div className='text-3xl font-bold'>
                                {card.value}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Recent Activities */}
                <div className='bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-lg p-6'>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className='text-lg font-semibold flex items-center gap-2'>
                            <History className="text-blue-400" size={18} />
                            Aktifitas Terbaru
                        </h2>
                        <span className="text-xs text-slate-400">5 transaksi terakhir</span>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-sm'>
                            <thead>
                                <tr className='text-slate-400 border-b border-slate-700'>
                                    <th className='text-left p-3'>Pengguna</th>
                                    <th className='text-left p-3'>Judul Buku</th>
                                    <th className='text-left p-3'>Status</th>
                                    <th className='text-left p-3'>Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivities.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className='border-b border-slate-700 hover:bg-slate-700/50 transition-colors'
                                    >
                                        <td className='p-3'>
                                            <div className="flex items-center gap-2">
                                                <UserRound className="text-slate-400" size={16} />
                                                {item?.reservasi?.user?.nama || 'Tidak diketahui'}
                                            </div>
                                        </td>
                                        <td className='p-3'>
                                            <div className="flex items-center gap-2">
                                                <BookOpenText className="text-slate-400" size={16} />
                                                {item?.reservasi?.book?.judul || 'Tidak diketahui'}
                                            </div>
                                        </td>
                                        <td className='p-3'>
                                            <span
                                                className={`flex items-center gap-1 font-medium px-2 py-1 rounded-full text-xs ${
                                                    item.status === 'dikembalikan'
                                                        ? 'bg-emerald-900/30 text-emerald-400'
                                                        : item.status === 'dipinjam'
                                                        ? 'bg-amber-900/30 text-amber-400'
                                                        : 'bg-slate-700 text-slate-400'
                                                }`}
                                            >
                                                {item.status === 'dikembalikan' ? (
                                                    <ArrowUpDown className="rotate-90" size={12} />
                                                ) : (
                                                    <Clock4 size={12} />
                                                )}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className='p-3 text-slate-400'>
                                            {item?.tanggalPinjam
                                                ? new Date(
                                                      item.tanggalPinjam
                                                  ).toLocaleString('id-ID', {
                                                      day: '2-digit',
                                                      month: 'short',
                                                      year: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })
                                                : '-'}
                                        </td>
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