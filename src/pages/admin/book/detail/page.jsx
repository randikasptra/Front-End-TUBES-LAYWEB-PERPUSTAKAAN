import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
const DetailBook = () => {
    const { id } = useParams()
    const [buku, setBuku] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuku = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/book/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBuku(response.data.data);
                console.log('Data buku:', response.data.data);

            } catch (error) {
                console.error('Gagal mengambil data buku:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuku();
    }, [id]);

    return (
        <div className='p-6 bg-white rounded-lg shadow text-gray-800'>
            <h1 className='text-2xl font-bold mb-4'>Detail Buku</h1>
            {buku ? (
                <div className='space-y-2'>
                    <img
                        src={buku.image}
                        alt={buku.judul}
                        className='w-48 h-64 object-cover rounded'
                    />
                    <h2><strong>Judul:</strong> {buku.judul}</h2>
                    <h2><strong>Deskripsi:</strong> {buku.deskripsi}</h2>
                    <h2><strong>ISBN:</strong> {buku.isbn}</h2>
                    <h2><strong>Penulis:</strong> {buku.penulis}</h2>
                    <h2><strong>Penerbit:</strong> {buku.penerbit}</h2>
                    <h2><strong>Tahun Terbit:</strong> {buku.tahunTerbit}</h2>
                    <h2><strong>Status:</strong> {buku.status}</h2>
                    <h2><strong>Stok:</strong> {buku.stok}</h2>
                    <h2><strong>Kategori:</strong> {buku.kategori?.nama}</h2>
                </div>
            ) : (
                <p>Memuat detail buku...</p>
            )}
        </div>

    )
}

export default DetailBook
