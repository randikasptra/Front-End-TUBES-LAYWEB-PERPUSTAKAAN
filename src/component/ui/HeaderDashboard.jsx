import React from "react";
import bgPerpus from "../../assets/bg-perpus.jpeg";
import ilustrasiBuku from "../../assets/fotoBukuPerpus.jpg";



const HeaderDashboard = () => {
    return (
        <div
            className="relative rounded-3xl overflow-hidden shadow-xl h-64 flex mt-32 mb-24 items-center justify-between p-8 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bgPerpus})`,
            }}
        >
            {/* Overlay hitam transparan */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Teks judul dan deskripsi */}
            <div className="relative z-10 text-white max-w-md">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-snug">
                    Pinjam Buku Tanpa Ribet, Ambil Sesuai Jadwal.
                </h1>
                <p className="text-sm sm:text-base">
                    Temukan buku yang kamu butuhkan dan reservasi kapan mau kamu ambil!
                </p>
            </div>

            {/* Ilustrasi buku */}
            <div className="relative z-10 hidden md:block">
                <div className="bg-[#1e293b] rounded-tl-[100px] rounded-br-[60px] px-6 py-4">
                    <img
                        src={ilustrasiBuku}
                        alt="Ilustrasi Buku"
                        className="h-40 w-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderDashboard;
