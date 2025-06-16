import api from '../utils/api'

export const getAllKategori = async () => {
    const response = await api.get('/category')
    return response.data.data || []
}

export const createKategori = async (nama) => {
    return api.post('/category', { nama })
}

export const updateKategori = async (id, nama) => {
    return api.put(`/category/${id}`, { nama })
}

export const deleteKategori = async (id) => {
    return api.delete(`/category/${id}`)
}
