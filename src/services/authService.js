// src/services/authService.js
import axios from 'axios'
import { API_BASE_URL } from '../config'

// Login user dan simpan token
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        })

        const data = response.data
        const token = data.token || data.data?.token
        const role = data.user?.role || data.data?.user?.role

        if (!token || !role) {
            throw new Error('Data login tidak lengkap')
        }

        localStorage.setItem('token', token)
        localStorage.setItem('role', role)

        return role 
    } catch (error) {
        throw error.response?.data?.message || 'Login gagal'
    }
}

// 🔽 Tambahan fungsi untuk ambil profil user
export const getUserProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token tidak tersedia')

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data.user || response.data.data?.user
}
