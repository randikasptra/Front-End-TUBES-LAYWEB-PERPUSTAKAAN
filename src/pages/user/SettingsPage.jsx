import React, { useState } from "react";
import SideNavbar from "../../component/ui/SideNavbar";
import Footer from "../../component/ui/Footer";

const SettingsPage = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        nim: "1234567890",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Simulasi validasi password baru
        if (profile.newPassword !== profile.confirmPassword) {
            alert("Password baru tidak cocok!");
            return;
        }
        // Simulasi penyimpanan
        alert("Data profil berhasil disimpan!");
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#60a5fa] text-white">
            <SideNavbar />
            <main className="sm:ml-64 flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Pengaturan Akun</h1>

                <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block mb-1 text-sm text-slate-300">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-slate-300">NIM</label>
                        <input
                            type="text"
                            name="nim"
                            value={profile.nim}
                            disabled
                            className="w-full p-3 rounded-lg bg-slate-700 text-gray-400 border border-slate-600"
                        />
                    </div>

                    <div className="border-t border-slate-600 pt-6">
                        <h2 className="text-lg font-semibold mb-4">Ubah Password</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm text-slate-300">Password Lama</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={profile.password}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm text-slate-300">Password Baru</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={profile.newPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm text-slate-300">Konfirmasi Password Baru</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={profile.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-lg hover:bg-blue-200 transition duration-200"
                    >
                        Simpan Perubahan
                    </button>
                </form>

                <div className="mt-10">
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
