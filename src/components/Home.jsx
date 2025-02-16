import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import "../styles/main.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar los posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="page-container">
      <h2>Inicio</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
