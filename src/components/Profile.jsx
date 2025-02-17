import { useEffect, useState } from "react";
import { getUserProfile, getUserPosts } from "../services/api";
import Cookies from "js-cookie";
import "../styles/main.css";
import Post from "./Post";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("No hay token, redirigiendo a login...");
        setLoading(false);
        return; 
      }

      try {
        const userData = await getUserProfile(token); 
        setUser(userData);

        const userPosts = await getUserPosts(userData.id, token);  
        setPosts(userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        setError("Error al cargar los datos. Inténtalo de nuevo.");
        console.error("Error cargando perfil o publicaciones", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); 

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h2>{user.username}</h2>
      <p>{user.bio || "Sin biografía."}</p>

      <h3>Publicaciones</h3>
      {posts.length > 0 ? (
        <ul className="post-list">
          {posts.map((post) => <Post key={post.id} post={post} />)}  {/* Aquí se usa el componente 'Post' */}
        </ul>
      ) : (
        <p>No hay publicaciones aún.</p>
      )}
    </div>
  );
}

export default Profile;
