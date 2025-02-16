import { useState } from "react";
import { createPost } from "../services/api";
import "../styles/main.css";

function Post() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost(formData);
      alert("Post creado con éxito");
    } catch (error) {
      console.error("Error al crear el post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Nuevo Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
        <textarea name="content" placeholder="Escribe aquí..." value={formData.content} onChange={handleChange} required></textarea>
        <button type="submit" disabled={loading}>{loading ? "Publicando..." : "Publicar"}</button>
      </form>
    </div>
  );
}

export default Post;