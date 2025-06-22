import api from "@/utils/api";

export const createReservasi = async (data) => {
    const response = await api.post("/auth/reservasi/tambah", data);
    return response.data.data;
};

export const getAllReservasiByUser = async (userId) => {
    const response = await api.get("/auth/reservasi");
    return response.data.data.filter((r) => r.userId === userId);
};
