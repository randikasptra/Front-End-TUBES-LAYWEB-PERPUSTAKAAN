import { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulasi fetch dari API (nanti diganti dengan API backend)
    const fetchHistory = async () => {
      const response = await fetch("https://api.example.com/history"); // Ganti dengan endpoint asli
      const data = await response.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Riwayat Peminjaman</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Judul Buku</th>
            <th className="border p-2">Tanggal Pinjam</th>
            <th className="border p-2">Tanggal Kembali</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">{item.borrow_date}</td>
                <td className="border p-2">{item.return_date || "Belum dikembalikan"}</td>
                <td
                  className={`border p-2 font-semibold ${
                    item.return_date ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.return_date ? "Dikembalikan" : "Dipinjam"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-4 text-center text-gray-500">
                Tidak ada riwayat peminjaman
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
