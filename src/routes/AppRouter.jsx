import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import DashboardMahasiswa from "../pages/user/DashboardMahasiswa";
import DashboardAdmin from "../pages/admin/DashboardAdmin"; // pastikan file ini ada
import Reservation from "../pages/user/Reservation";
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
