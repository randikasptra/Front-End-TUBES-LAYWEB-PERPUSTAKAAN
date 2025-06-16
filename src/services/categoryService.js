import axios from 'axios'
import { API_BASE_URL } from '../config'

const token = () => localStorage.getItem('token')

export const getAllKategori = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_BASE_URL}/category`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data.data || []
}

export const createKategori = async (nama) => {
    return axios.post(
        `${API_BASE_URL}/category`,
        { nama },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
}

export const updateKategori = async (id, nama) => {
    return axios.put(
        `${API_BASE_URL}/category/${id}`,
        { nama },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
}

export const deleteKategori = async (id) => {
    return axios.delete(`${API_BASE_URL}/category/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
}
