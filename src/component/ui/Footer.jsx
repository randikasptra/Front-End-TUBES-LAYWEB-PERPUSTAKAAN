import React from "react";
import { 
  Home, 
  Library, 
  History, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 w-full border-t border-slate-700/50">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Column 1 - Brand Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
                            <Library size={22} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                            UNSAR
                        </h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Sistem perpustakaan digital modern Universitas Sariwangi yang memberikan kemudahan akses bagi seluruh civitas akademika.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Column 2 - Contact */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-teal-400"></span>
                        Kontak Kami
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                            <span>Jl. Sariwangi Raya No.123, Bandung, Jawa Barat</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-blue-400" />
                            <span>(022) 123-4567</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-blue-400" />
                            <span>perpus@sariwangi.ac.id</span>
                        </li>
                    </ul>
                </div>

                {/* Column 3 - Quick Links */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-teal-400"></span>
                        Navigasi Cepat
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/dashboard/mahasiswa" className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors">
                                <Home size={16} className="text-blue-400" />
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link to="/perpustakaan" className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors">
                                <Library size={16} className="text-blue-400" />
                                Perpustakaan
                            </Link>
                        </li>
                        <li>
                            <Link to="/sejarah" className="flex items-center gap-3 text-slate-300 hover:text-teal-300 transition-colors">
                                <History size={16} className="text-blue-400" />
                                Riwayat Peminjaman
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4 - Opening Hours */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-teal-400"></span>
                        Jam Operasional
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li className="flex items-center gap-3">
                            <Calendar size={16} className="text-blue-400" />
                            <div>
                                <p className="font-medium">Senin - Jumat</p>
                                <p>08.00 - 16.00 WIB</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Clock size={16} className="text-blue-400" />
                            <div>
                                <p className="font-medium">Sabtu - Minggu</p>
                                <p>Libur</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-700/50 py-6">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-xs md:text-sm">
                    <p>© {new Date().getFullYear()} Perpustakaan Digital Universitas Sariwangi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;