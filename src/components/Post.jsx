import React from "react";
import "../styles/main.css";

function Post({ post }) {
  // Construir la URL de la imagen correctamente
  const imageUrl = post.imageUrl?.startsWith("http")
    ? post.imageUrl
    : `http://localhost:8080/uploads/${post.imageUrl}`;

  return (
    <div className="post">
      <h4>{post.title || "Sin título"}</h4>
      <p>{post.description || post.content || "Sin descripción"}</p>

      {post.imageUrl ? (
        <img
          src={imageUrl}
          alt="Imagen del post"
          onError={(e) => {
            e.target.style.display = "none";
            console.error("Error cargando la imagen:", imageUrl);
          }}
        />
      ) : (
        <p>Sin imagen</p>
      )}

      <small>
        Publicado el:{" "}
        {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Fecha desconocida"}
      </small>
    </div>
  );
}

export default Post;
