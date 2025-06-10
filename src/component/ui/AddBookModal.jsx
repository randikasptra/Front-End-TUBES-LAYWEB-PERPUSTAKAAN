import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/buttons";

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        cover: null,
        judul_buku: "",
        pengarang: "",
        penerbit: "",
        tahun_terbit: "",
        jumlah_stok: "",
        status: "Tersedia",
        id_kategory: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cover") {
            setFormData({ ...formData, cover: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-lg rounded-xl bg-slate-800 p-6 text-white shadow-lg">
                    <Dialog.Title className="text-xl font-bold mb-4">Tambah Buku</Dialog.Title>
                    <div className="space-y-4">
                        <input
                            type="file"
                            name="cover"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        <Input name="judul_buku" placeholder="Judul Buku" value={formData.judul_buku} onChange={handleChange} />
                        <Input name="pengarang" placeholder="Pengarang" value={formData.pengarang} onChange={handleChange} />
                        <Input name="penerbit" placeholder="Penerbit" value={formData.penerbit} onChange={handleChange} />
                        <Input name="tahun_terbit" placeholder="Tahun Terbit" value={formData.tahun_terbit} onChange={handleChange} />
                        <Input name="jumlah_stok" placeholder="Jumlah Stok" type="number" value={formData.jumlah_stok} onChange={handleChange} />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-slate-700 p-2 rounded text-white"
                        >
                            <option value="Tersedia">Tersedia</option>
                            <option value="Dipinjam">Dipinjam</option>
                        </select>
                        <Input name="id_kategory" placeholder="ID Kategori" value={formData.id_kategory} onChange={handleChange} />
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                        <Button onClick={onClose} variant="ghost" className="text-red-400">Batal</Button>
                        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default AddBookModal;
