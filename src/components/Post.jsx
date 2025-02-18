import React from "react";
import "../styles/main.css";

function Post({ post }) {
  return (
    <div className="post">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      {post.imageUrl ? (
        <img src={post.imageUrl} alt="Imagen del post" onError={(e) => e.target.style.display = "none"} />
        ) : (
        <p>Sin imagen</p>
        )}
      <small>Publicado el: {new Date(post.createdAt).toLocaleDateString()}</small>
    </div>
  );
}

export default Post;
