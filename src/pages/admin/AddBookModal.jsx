import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/buttons";

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newBook = {
            id_buku: form.id_buku.value,
            judul_buku: form.judul_buku.value,
            pengarang: form.pengarang.value,
            penerbit: form.penerbit.value,
            tahun_terbit: form.tahun_terbit.value,
            jumlah_stok: form.jumlah_stok.value,
            status: form.status.value,
            id_kategory: form.id_kategory.value,
        };
        onSubmit(newBook);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Tambah Buku Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="ID Buku" name="id_buku" required />
                        <Input label="Judul Buku" name="judul_buku" required />
                        <Input label="Pengarang" name="pengarang" required />
                        <Input label="Penerbit" name="penerbit" required />
                        <Input label="Tahun Terbit" name="tahun_terbit" type="number" required />
                        <Input label="Jumlah Stok" name="jumlah_stok" type="number" required />
                        <Input label="Status" name="status" required placeholder="Tersedia / Tidak tersedia" />
                        <Input label="ID Kategori" name="id_kategory" required />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;
