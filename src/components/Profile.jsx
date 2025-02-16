import { useEffect, useState } from "react";
import { getUserProfile } from "../services/api";
import "../styles/main.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener el perfil", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="page-container">
      <h2>Perfil</h2>
      {user ? (
        <div className="profile-card">
          <img src={user.photo} alt="Foto de perfil" className="profile-pic" />
          <h3>{user.name} {user.lastname}</h3>
          <p>@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}

export default Profile;