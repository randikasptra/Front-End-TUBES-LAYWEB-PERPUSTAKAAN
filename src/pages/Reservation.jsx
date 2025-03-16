import { useState } from "react";

const Reservation = () => {
  const [formData, setFormData] = useState({
    book: "",
    pickupDate: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.quantity > 3) {
      alert("Maksimal peminjaman adalah 3 buku!");
      return;
    }

    console.log("Reservasi dikirim:", formData);

    // TODO: Kirim data ke backend di sini
    alert("Reservasi berhasil!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reservasi Buku</h2>
        <form onSubmit={handleSubmit}>
          {/* Pilih Buku */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Pilih Buku
          </label>
          <select
            name="book"
            value={formData.book}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          >
            <option value="">Pilih Buku</option>
            <option value="Buku 1">Buku 1</option>
            <option value="Buku 2">Buku 2</option>
            <option value="Buku 3">Buku 3</option>
          </select>

          {/* Tanggal Pengambilan */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tanggal Pengambilan
          </label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />

          {/* Jumlah Buku */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Jumlah Buku (Max 3)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            max="3"
            className="w-full p-2 border rounded mb-4"
            required
          />

          {/* Tombol Reservasi */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Reservasi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
