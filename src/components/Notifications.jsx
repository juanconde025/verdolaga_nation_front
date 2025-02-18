import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import "../styles/main.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error al obtener notificaciones", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="page-container">
      <h2>Notificaciones</h2>
      {loading ? (
        <p>Cargando notificaciones...</p>
      ) : notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li key={notif.id} className="notification-item">
              <p>{notif.content}</p> {/* Ahora usa content en lugar de message */}
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes notificaciones nuevas.</p>
      )}
    </div>
  );
}

export default Notifications;
