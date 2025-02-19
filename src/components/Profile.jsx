import { useEffect, useState } from "react";
import { getUserProfile, getUserPosts } from "../services/api";
import Cookies from "js-cookie";
import "../styles/main.css";
import Post from "./Post";
import PostForm from "./PostForm";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      if (!token || !userId) {
        setError("No hay token o userId, redirigiendo a login...");
        setLoading(false);
        return;
      }

      try {
        const users = await getUserProfile();
        console.log("Datos de la API:", users);

        if (!Array.isArray(users) || users.length === 0) {
          setError("No se encontraron usuarios.");
          setLoading(false);
          return;
        }

        const currentUser = users.find((u) => u.id === Number(userId));
        if (!currentUser) {
          setError("Usuario no encontrado en la base de datos.");
          setLoading(false);
          return;
        }

        console.log("Usuario encontrado:", currentUser);
        setUser(currentUser);

        const userPosts = await getUserPosts(currentUser.id);
        console.log("Publicaciones del usuario:", userPosts);
        setPosts(userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        setError("Error al cargar los datos.");
        console.error("Error en fetchProfile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  // Construcción de la URL de la imagen de perfil
  const profileImageUrl = user?.imageUrl?.startsWith("http")
    ? user.imageUrl
    : `http://localhost:8080/uploads/${user?.imageUrl}`;

  console.log("Imagen de perfil:", profileImageUrl); // 🔍 Verificar en la consola

  return (
    <div className="profile-container">
      {user ? (
        <>
          {/* Imagen de perfil */}
          <img
            src={profileImageUrl}
            alt="Foto de perfil"
            className="profile-image"
            onError={(e) => (e.target.src = "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg")}
          />

          <h2>{user.username}</h2>
          <p>{user.bio || "Sin biografía."}</p>

          {/* Formulario para crear post */}
          <PostForm />

          <h3>Publicaciones</h3>
          {posts.length > 0 ? (
            <ul className="post-list">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </ul>
          ) : (
            <p>No hay publicaciones aún.</p>
          )}
        </>
      ) : (
        <p>Esperando los datos del usuario...</p>
      )}
    </div>
  );
}

export default Profile;
