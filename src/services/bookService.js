import api from '../utils/api'

export const getAllBooks = async () => {
    const response = await api.get('/book')
    return response.data.data || []
}

export const addBook = async (bookData) => {
    const formData = new FormData()

    formData.append('judul', bookData.judul_buku)
    formData.append('isbn', bookData.isbn)
    formData.append('tahunTerbit', bookData.tahun_terbit)
    formData.append('kategoriId', bookData.id_kategory)
    formData.append('deskripsi', bookData.deskripsi || '')
    formData.append('penerbit', bookData.penerbit || '')
    formData.append('penulis', bookData.pengarang || '')
    formData.append('stok', bookData.jumlah_stok || 1)
    formData.append('status', bookData.status || 'tersedia')

    if (bookData.cover instanceof File) {
        formData.append('image', bookData.cover)
    } else {
        console.warn('❗ File cover tidak valid atau tidak ditemukan')
    }

    return await api.post('/book/tambah', formData)
}

export const getDetailBook = async (id, data) => {
    return await api.get(`/book/detail/${id}`, data)
}

export const updateBook = async (id, data) => {
    return await api.put(`/book/edit/${id}`, data)
}

export const deleteBook = async (id) => {
    return await api.delete(`/book/hapus/${id}`)
}
