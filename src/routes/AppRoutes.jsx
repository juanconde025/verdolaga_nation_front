import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Post from "../components/Post";
import Notifications from "../components/Notifications";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const token = Cookies.get("token");
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default AppRoutes;
