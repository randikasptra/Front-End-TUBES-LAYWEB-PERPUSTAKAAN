import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import DashboardMahasiswa from '../pages/user/DashboardMahasiswa'
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import Reservation from '../pages/user/Reservation'
import PerpustakaanPages from '../pages/user/PerpustakaanPages' 
import PrivateRoute from '../component/PrivateRoute'
import HistoryPage from '../pages/user/HistoryPage'
import SettingsPage from '../pages/user/SettingsPage'
import AdminBookPage from '../pages/admin/AdminBookPage'
import AdminBorrowPage from '../pages/admin/AdminBorrowPage'
import AdminAccountPage from '../pages/admin/AdminAccountPage'
import AdminReservationPage from '../pages/admin/AdminReservationPage'
import CategoryPage from '../pages/admin/category/page'
import DetailBook from '../pages/admin/book/detail/page'
import EditUserPage from '../pages/admin/EditUserPage'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />

                <Route path='/dashboard/mahasiswa' element={<PrivateRoute><DashboardMahasiswa /></PrivateRoute>} />
                <Route path='/reservation' element={<PrivateRoute><Reservation /></PrivateRoute>} />
                <Route path='/perpustakaan' element={<PrivateRoute><PerpustakaanPages /></PrivateRoute>} />
                <Route path='/sejarah' element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
                <Route path='/settings' element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

                <Route path='/dashboard/admin' element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
                <Route path='/dashboard/admin/data-buku' element={<PrivateRoute><AdminBookPage /></PrivateRoute>} />
                <Route path='/dashboard/admin/data-peminjaman' element={<PrivateRoute><AdminBorrowPage /></PrivateRoute>} />
                <Route path='/dashboard/admin/data-pengguna' element={<PrivateRoute><AdminAccountPage /></PrivateRoute>} />

                <Route path='/dashboard/admin/data-pengguna/edit/:id' element={<PrivateRoute><EditUserPage /></PrivateRoute>} />

                <Route path='/dashboard/admin/data-reservasi' element={<PrivateRoute><AdminReservationPage /></PrivateRoute>} />
                <Route path='/dashboard/admin/data-kategori' element={<PrivateRoute><CategoryPage /></PrivateRoute>} />
                <Route path='/dashboard/admin/data-buku/:id' element={<PrivateRoute><DetailBook /></PrivateRoute>} />
            </Routes>
        </Router>
    )
}

export default AppRouter
