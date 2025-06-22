// src/services/userService.js
import api from '../utils/api'

// Ambil semua pengguna mahasiswa & dosen
export const getAllUsers = async () => {
    // BENAR
    const response = await api.get('/auth/get-users')

    return response.data.data || [] // ⬅️ ubah dari `.users` ke `.data`
}

// Tambah pengguna baru (kalau ada logic untuk POST /user)
export const createUser = async (userData) => {
    const response = await api.post('/user', userData)
    return response.data
}
