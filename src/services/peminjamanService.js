import api from '../utils/api'

export const getAllPeminjaman = async () => {
    const response = await api.get('/peminjaman')
    return response.data.data || []
}