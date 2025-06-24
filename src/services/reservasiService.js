import api from "@/utils/api";

export const createReservasi = async (data) => {
    const response = await api.post("/reservasi/tambah", data);
    return response.data.data;
};
export const getReservasiByUserId = async (userId) => {
  const res = await api.get(`/reservasi/user/${userId}`)
  return res.data.data || []
}

export const deleteReservasi = async (id) => {
  return api.delete(`/reservasi/hapus/${id}`)
}