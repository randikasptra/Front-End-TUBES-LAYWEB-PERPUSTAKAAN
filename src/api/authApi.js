// src/api/authApi.js
import axios from 'axios';

const BASE_URL = "http://localhost:5000"; // Ganti sesuai backend kamu

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
            email,
            password
        });

        // console.log("Full Response:", response);
        console.log("Data:", response.data.user.role); // ✅ log data

        return response.data; // ini yang kamu pakai di halaman LoginPage
    } catch (error) {
        console.error("Login error:", error);

        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("Login gagal. Coba lagi.");
    }
};

