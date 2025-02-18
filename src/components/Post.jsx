import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Importar js-cookie para obtener el userId
import "../styles/main.css";

function Post() {
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
    
    // Obtener el userId de las cookies
    const userId = Cookies.get('userId'); 

    // Si no hay un userId, no podemos crear el post
    if (!userId) {
      setError("No se pudo obtener el ID del usuario.");
      setLoading(false);
      return;
    }

    try {
      // Crear el objeto postData incluyendo el userId
      const postData = {
        user: { id: userId }, // Se espera que el backend reciba el objeto user con el id
        description: formData.content, // El campo description es lo mismo que content en el frontend
        imageUrl: formData.image // El campo imageUrl es lo mismo que image en el frontend
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
    <div className="page-container">
      <h2>Nuevo Post</h2>
      {error && <p className="error-message">{error}</p>}
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
