import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, book }) => {
    if (!book) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

            <Dialog.Panel className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-blue-800 text-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
                >
                    <X size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold mb-4">Reservasi Buku</Dialog.Title>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    <div className="w-full sm:w-1/3 flex justify-center items-start">
                        <img
                            src={book.image || "/book-placeholder.jpg"}
                            alt={book.title}
                            className="w-28 h-40 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex-1 space-y-2 text-sm sm:text-base">
                        <p><span className="font-semibold text-slate-300">Judul:</span> {book.title}</p>
                        <p><span className="font-semibold text-slate-300">Penulis:</span> {book.author || "-"}</p>
                        <p><span className="font-semibold text-slate-300">Status:</span> {book.status || "Reservasi"}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">
                            Catatan untuk Admin
                        </label>
                        <textarea
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            placeholder="Contoh: titip ke temen saya, datang sore, dll"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">
                                Jam Ambil
                            </label>
                            <input
                                type="time"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-300">
                                Tanggal Ambil
                            </label>
                            <input
                                type="date"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-white text-blue-800 font-semibold px-5 py-2 rounded-lg hover:bg-blue-100 transition duration-200"
                    >
                        Konfirmasi Reservasi
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};

export default Modal;
