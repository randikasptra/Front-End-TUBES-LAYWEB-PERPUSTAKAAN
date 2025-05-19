import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    console.log("Data dikirim:", formData);

    // TODO: Kirim data ke backend di sini
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-300">
      <div className="flex flex-col w-full max-w-lg bg-gray-800 rounded-lg shadow-lg md:flex-row md:max-w-4xl">
        <div className="w-full p-6 md:w-1/2 md:px-8 lg:px-12">
          <h2 className="mb-4 text-xl font-bold text-center text-white">Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="idNumber"
              placeholder="NIM/NID"
              className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password"
              className="w-full p-2 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full p-2 text-sm font-semibold text-white transition bg-orange-600 rounded-lg hover:bg-orange-700"
            >
              Daftar
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Sudah punya akun?{" "}
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </p>

        </div>
        <div className="hidden w-full p-6 md:block md:w-1/2">
          <img
            src="../assets/fotoBukuPerpus.jpg"
            alt="Ilustrasi Login"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>

  );
};

export default RegisterPage;
