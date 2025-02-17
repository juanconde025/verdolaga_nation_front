import { useEffect, useState } from "react";
import { getFeedPosts } from "../services/api";
import "../styles/main.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const feedPosts = await getFeedPosts();
        setPosts(feedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error cargando las publicaciones", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h2>Feed</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
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
