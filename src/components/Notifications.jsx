import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import "../styles/main.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Error al obtener notificaciones", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="page-container">
      <h2>Notificaciones</h2>
      <ul className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <li key={notif.id} className="notification-item">{notif.message}</li>
          ))
        ) : (
          <p>No tienes notificaciones nuevas.</p>
        )}
      </ul>
    </div>
  );
}

export default Notifications;
