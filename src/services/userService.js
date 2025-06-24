import api from '../utils/api'

export const getAllUsers = async () => {
    const response = await api.get('/user')
    return response.data.data || [] 
}

export const createUser = async (userData) => {
    const payload = {
        nama: userData.nama,
        email: userData.email,
        password: userData.password,
        nim: userData.role === 'mahasiswa' ? userData.nim || '' : '',
        nid: userData.role === 'dosen' ? userData.nid || '' : '',
    }

    const response = await api.post('/auth/register', payload)
    return response.data
}


export const editUser = async (id, userData) => {
    const payload = {
        nama: userData.nama,
        email: userData.email,
        password: userData.password?.trim() || '', 
        role: userData.role,
        status: userData.status,
        nim: userData.role === 'mahasiswa' ? userData.nim || '' : '',
        nid: userData.role === 'dosen' ? userData.nid || '' : '',
    }

    const response = await api.put(`/user/edit/${id}`, payload)
    return response.data
}


export const deleteUser = async (id) => {
    const response = await api.delete(`/user/hapus/${id}`)
    return response.data
}

export const updateUser = async (id, payload) => {
  const response = await api.put(`/user/edit/${id}`, payload)
  return response.data
}

