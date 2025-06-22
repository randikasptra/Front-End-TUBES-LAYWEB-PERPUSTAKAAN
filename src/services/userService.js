// src/services/userService.js
import api from '../utils/api'

// Ambil semua pengguna
export const getAllUsers = async () => {
    const response = await api.get('/user') // Pastikan endpoint ini tersedia
    return response.data.users || []
}

// Tambah pengguna baru
export const createUser = async (userData) => {
    const response = await api.post('/user', userData)
    return response.data
}
