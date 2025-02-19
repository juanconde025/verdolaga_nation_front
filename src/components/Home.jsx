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
        const feedPosts = await getFeedPosts();
        console.log("Publicaciones obtenidas:", feedPosts);
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
      {username && <p>Bienvenid@, {username}!</p>}

      {posts.length > 0 ? (
        <ul className="post-list">
          {posts.map((post) => {
            const imageUrl = post.imageUrl?.startsWith("http")
              ? post.imageUrl
              : `http://localhost:8080/uploads/${post.imageUrl}`;

            return (
              <li key={post.id} className="post-item">
                <h4>{post.title || "Sin título"}</h4>
                <p>{post.description || "Sin descripción"}</p>
                {post.imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Imagen del post"
                    className="post-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      console.error("Error cargando la imagen:", imageUrl);
                    }}
                  />
                )}
                <small>
                  Publicado el:{" "}
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : "Fecha desconocida"}
                </small>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay publicaciones aún.</p>
      )}
    </div>
  );
}

export default Home;
