import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/LogIn/Login";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home/Home";
import Archive from "./pages/Archive/Archive";
import Trash from "./pages/Trash/Trash";

const App = () => {
  const { user } = useAuth();

  const ProtectedRoute = () => {
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/home" : "/login"} replace />}
        />

        {/* Public Routes */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" replace />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
