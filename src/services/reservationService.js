import api from '../utils/api'

export const getAllReservasi = async () => {
    const response = await api.get('/reservasi')
    return response.data.data || []
}

export const deleteReservasi = async (id) => {
    return api.delete(`/reservasi/hapus/${id}`)
}

export const updateReservasiStatus = async (id, status) => {
    return api.patch(`/reservasi/status/${id}`, { status })
}

export const getReservasiByUserId = async (userId) => {
  const response = await api.get(`/reservasi/user/${userId}`)
  return response.data || []
}
