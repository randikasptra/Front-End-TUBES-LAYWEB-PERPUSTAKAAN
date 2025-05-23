const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
};
const DashboardAdmin = () => {


    return (
        <>
            <div className="p-10 bg-gray-900 text-white min-h-screen">
                <h1 className="text-3xl font-bold">Dashboard Admin nih bos</h1>
                <p>Selamat datang di halaman admin!</p>
            </div>
            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
                Logout
            </button></>
    );
};

export default DashboardAdmin;
