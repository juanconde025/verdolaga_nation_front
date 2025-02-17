import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Asegúrate de que el componente esté definido y exportado
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/post">Crear Post</Link>
        <Link to="/notifications">Notificaciones</Link>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

// Asegúrate de exportar el componente
export default Navbar;
