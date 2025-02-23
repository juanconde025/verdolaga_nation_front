import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Profile from "../components/Profile";
import PostForm from "../components/PostForm"; // Importamos el formulario de creación de posts
import Post from "../components/Post";
import Notifications from "../components/Notifications";

function ProtectedRoute({ children }) {
  return Cookies.get("token") ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/post/new" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
      <Route path="/post/:id" element={<ProtectedRoute><Post /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={Cookies.get("token") ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default AppRoutes;
