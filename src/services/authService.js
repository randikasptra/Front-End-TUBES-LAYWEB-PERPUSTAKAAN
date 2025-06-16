// src/services/authService.js
import axios from 'axios'
import { API_BASE_URL } from '../config'

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
