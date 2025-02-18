import { useEffect, useState } from "react";
import { getFeedPosts } from "../services/api";
import { useNavigate } from "react-router-dom"; 
import Cookies from "js-cookie"; 
import "../styles/main.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 
  const [userId, setUserId] = useState(null); 
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    // Verifica que el usuario esté autenticado antes de cargar el feed
    const fetchedUserId = Cookies.get('userId');
    const fetchedUsername = Cookies.get('username');

    if (!fetchedUserId || !fetchedUsername) {
      console.log("Usuario no autenticado.");
      navigate("/login");
    } else {
      setUserId(fetchedUserId); // Establece el userId desde las cookies
      setUsername(fetchedUsername); // Establece el username desde las cookies
    }

    // Cargar las publicaciones solo si el usuario está autenticado
    if (fetchedUserId && fetchedUsername) {
      const fetchPosts = async () => {
        try {
          const feedPosts = await getFeedPosts(Cookies.get('userId')); // Pasa el userId en la solicitud
          setPosts(feedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
          console.error("Error cargando las publicaciones", error);
        }
      };
      fetchPosts();
    }
  }, [navigate]); // Ejecuta este useEffect cuando se monta el componente

  return (
    <div className="home-container">
      <h2>Feed</h2>
      {username && <p>Bienvenido, {username}!</p>} 
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
                <h4>hola codigo {Cookies.get('userId')}</h4>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay publicaciones aún.</p>
      )}
    </div>
  );
}

export default Home;
