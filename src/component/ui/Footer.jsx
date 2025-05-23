import React from "react";
import { Home, Library, History } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-slate-100 py-10 px-6 w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                {/* Kolom 1 */}
                <div>
                    <h3 className="font-semibold mb-2">
                        Perpustakaan Universitas Sariwangi
                    </h3>
                    <p>
                        Menyediakan layanan peminjaman dan reservasi buku bagi mahasiswa Universitas Sariwangi.
                    </p>
                </div>

                {/* Kolom 2 */}
                <div>
                    <h3 className="font-semibold mb-2">Kontak</h3>
                    <ul className="space-y-1">
                        <li>Jl. Sariwangi Raya No.123, Bandung</li>
                        <li>Telp: (022) 123-4567</li>
                        <li>Email: perpus@sariwangi.ac.id</li>
                    </ul>
                </div>

                {/* Kolom 3 */}
                <div>
                    <h3 className="font-semibold mb-2">Navigasi Cepat</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <Home size={16} /> Beranda
                        </li>
                        <li className="flex items-center gap-2">
                            <Library size={16} /> Perpustakaan
                        </li>
                        <li className="flex items-center gap-2">
                            <History size={16} /> History
                        </li>
                    </ul>
                </div>

                {/* Kolom 4 */}
                <div>
                    <h3 className="font-semibold mb-2">Jam Operasional</h3>
                    <ul className="space-y-1">
                        <li>Senin - Jumat: 08.00 - 16.00</li>
                        <li>Sabtu - Minggu: Libur</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
