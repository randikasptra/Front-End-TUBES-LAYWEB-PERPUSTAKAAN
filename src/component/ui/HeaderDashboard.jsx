import React from "react";
import bgPerpus from "../../assets/bg-perpus.jpeg";
import ilustrasiBuku from "../../assets/fotoBukuPerpus.jpg";

const HeaderDashboard = () => {
    return (
        <div
            className="relative rounded-3xl overflow-hidden shadow-2xl h-72 flex mt-8 mb-16 items-center justify-between p-8 bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%), url(${bgPerpus})`,
                backgroundBlendMode: 'multiply'
            }}
        >
            {/* Content container */}
            <div className="relative z-10 flex flex-col md:flex-row w-full items-center justify-between">
                {/* Text content */}
                <div className="text-white max-w-2xl mb-6 md:mb-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Pinjam Buku Lebih Mudah dengan Sistem Digital
                    </h1>
                    <p className="text-base sm:text-lg text-blue-100">
                        Temukan koleksi buku terbaik, reservasi online, dan ambil sesuai jadwal yang kamu tentukan.
                    </p>
                    <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        Jelajahi Koleksi
                    </button>
                </div>

                {/* Book illustration */}
                <div className="relative z-10 hidden lg:block transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 shadow-lg">
                        <img
                            src={ilustrasiBuku}
                            alt="Ilustrasi Buku"
                            className="h-48 w-auto object-contain drop-shadow-lg"
                        />
                        <div className="absolute -bottom-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            New!
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-900/30 to-transparent z-0"></div>
        </div>
    );
};

export default HeaderDashboard;