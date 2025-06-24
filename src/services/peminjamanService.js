import api from '../utils/api'

export const getAllPeminjaman = async () => {
    const response = await api.get('/peminjaman')
    return response.data.data || []
}


export const getTotalPeminjamanDipinjam = async () => {
    try {
        const response = await api.get('/peminjaman/total-dipinjam')
        return response.data.total || 0
    } catch (error) {
        console.error('Gagal mengambil total peminjaman:', error)
        return 0
    }
}

export const getTotalPeminjamanDikembalikan = async () => {
    const response = await api.get('/peminjaman/total-dikembalikan')
    return response.data.total || 0
}


export const kembalikanPeminjaman = async (id, tanggalKembali) => {
    try {
        const response = await api.patch(`/peminjaman/kembalikan/${id}`, {
            tanggalKembali,
        })
        return response.data
    } catch (error) {
        console.error('❌ Gagal mengembalikan peminjaman:', error)
        throw error.response?.data || { message: 'Terjadi kesalahan pada server' }
    }
}
