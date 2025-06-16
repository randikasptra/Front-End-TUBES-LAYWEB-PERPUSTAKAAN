import api from '../utils/api'

export const getAllBooks = async () => {
    const response = await api.get('/book')
    return response.data.data || []
}

export const createBook = async (data) => {
    return await api.post('/book/tambah', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateBook = async (id, data) => {
    return await api.put(`/book/edit/${id}`, data)
}

export const deleteBook = async (id) => {
    return await api.delete(`/book/hapus/${id}`)
}
