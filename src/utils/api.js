// src/utils/api.js
import axios from 'axios'
import { API_BASE_URL } from '../config'

const api = axios.create({
    baseURL: API_BASE_URL,
})

// Interceptor untuk otomatis menyisipkan token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api
