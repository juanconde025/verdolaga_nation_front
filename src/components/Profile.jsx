import { useEffect, useState } from "react";
import { getUserProfile, getUserPosts } from "../services/api";
import Cookies from "js-cookie";
import "../styles/main.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No hay token, redirigir a login");
      return;
    }
    
    const fetchData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setLoadingProfile(false);
        
        const userPosts = await getUserPosts(userData.id);
        setPosts(userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error cargando perfil o publicaciones", error);
        setLoadingProfile(false);
        setLoadingPosts(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-container">
      {loadingProfile ? (
        <p>Cargando perfil...</p>
      ) : user ? (
        <>
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
          <h3>Publicaciones</h3>
          {loadingPosts ? (
            <p>Cargando publicaciones...</p>
          ) : posts.length > 0 ? (
            <ul className="post-list">
              {posts.map(post => (
                <li key={post.id} className="post-item">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <small>{new Date(post.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay publicaciones aún.</p>
          )}
        </>
      ) : (
        <p>Error cargando perfil.</p>
      )}
    </div>
  );
}

export default Profile;
