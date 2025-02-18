import { useEffect, useState } from "react";
import { getFeedPosts } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/main.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchedUsername = Cookies.get("username");

    if (!Cookies.get("token")) {
      console.log("Usuario no autenticado.");
      navigate("/login");
      return;
    }

    setUsername(fetchedUsername || "Usuario");

    const fetchPosts = async () => {
      try {
        const feedPosts = await getFeedPosts(); // Obtener todas las publicaciones sin filtrar por userId
        setPosts(feedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error cargando las publicaciones", error);
      }
    };

    fetchPosts();
  }, [navigate]);

  return (
    <div className="home-container">
      <h2>Feed</h2>
      {username && <p>Bienvenido, {username}!</p>}

      {posts.length > 0 ? (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="Imagen del post" className="post-image" />}
              <small>Publicado el {new Date(post.createdAt).toLocaleString()}</small>
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
