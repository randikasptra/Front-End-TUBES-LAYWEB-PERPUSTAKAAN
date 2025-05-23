import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardMahasiswa from "../pages/user/DashboardMahasiswa";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import Reservation from "../pages/user/Reservation";
import PerpustakaanPages from "../pages/user/PerpustakaanPages"; // ✅ Tambahan
import PrivateRoute from "../component/PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/mahasiswa"
          element={
            <PrivateRoute>
              <DashboardMahasiswa />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservation"
          element={
            <PrivateRoute>
              <Reservation />
            </PrivateRoute>
          }
        />
        <Route
          path="/perpustakaan"
          element={
            <PrivateRoute>
              <PerpustakaanPages />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
