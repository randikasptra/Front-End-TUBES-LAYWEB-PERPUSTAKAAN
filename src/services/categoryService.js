import axios from 'axios'
import { API_BASE_URL } from '../config'

export const getAllKategori = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_BASE_URL}/category`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data.data || []
}
