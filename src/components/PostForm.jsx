import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "../styles/main.css";

function PostForm() {
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const userId = Cookies.get('userId'); 
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      setLoading(false);
      return;
    }

    try {
      const postData = {
        user: { id: userId },
        description: formData.content,
        imageUrl: formData.image
      };
      
      await createPost(postData);
      alert("Post creado con éxito");
      setFormData({ title: "", content: "", image: "" });
      navigate("/home");
    } catch (error) {
      setError("Ocurrió un error al crear el post. Inténtalo de nuevo.");
      console.error("Error al crear el post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <h2>Nuevo Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Escribe aquí..."
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen (opcional)"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
