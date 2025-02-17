import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Post() {
  const [formData, setFormData] = useState({ title: "", content: "", image: "" }); // Añadí un campo de imagen por si lo necesitas
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
    try {
      await createPost(formData);  
      alert("Post creado con éxito");
      setFormData({ title: "", content: "", image: "" }); 
      navigate("/home"); 
    } catch (error) {
      setError("Ocurrió un error al crear el post. Inténtalo de nuevo."); // Mensaje de error
      console.error("Error al crear el post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Nuevo Post</h2>
      {error && <p className="error-message">{error}</p>} {/* Mensaje de error */}
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
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

export default Post;
