import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    


    try {
      const response = await loginUser(credentials);
      console.log(response);
      alert(`Bienvenido, ${response.username}!`)
      Cookies.set("token", response.token, { expires: 1});
      Cookies.set("userId", response.userId, { expires: 1});
      Cookies.set("username", response.username, { expires: 1});
      navigate("/home");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Sección de imagen */}
      <div className="auth-image" style={{ backgroundImage: "url('src/images/Campeones.jpg')" }}>
        <p>Bienvenido de nuevo Verdolaga!</p>
      </div>

      {/* Sección de formulario */}
      <div className="auth-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Usuario" value={credentials.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={credentials.password} onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Cargando..." : "Iniciar Sesión"}</button>
        </form>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}

export default Login;
