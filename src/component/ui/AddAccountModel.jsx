import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./buttons";

const AddAccountModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        nim: "",
        password: "",
        role: "Mahasiswa",
        status: "Aktif",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kirim data ke parent
        onSubmit({ ...formData, id: Date.now() }); // ID dummy
        onClose(); // Tutup modal
        setFormData({
            nama: "",
            email: "",
            nim: "",
            password: "",
            role: "Mahasiswa",
            status: "Aktif",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#1f2937] rounded-xl shadow-lg w-full max-w-lg relative border border-slate-600 text-white p-6">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-semibold mb-4">Tambah Akun Pengguna</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Masukkan email"
                        required
                    />
                    <Input
                        label="NIM"
                        name="nim"
                        value={formData.nim}
                        onChange={handleChange}
                        placeholder="Masukkan NIM"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-slate-800 text-white rounded-lg p-2 border border-slate-600 focus:outline-none"
                            >
                                <option value="Mahasiswa">Mahasiswa</option>
                                <option value="Dosen">Dosen</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full bg-slate-800 text-white rounded-lg p-2 border border-slate-600 focus:outline-none"
                            >
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Simpan Akun
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAccountModal;
