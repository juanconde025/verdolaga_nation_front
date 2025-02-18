import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true 
});

// Registrar usuario
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Iniciar sesión
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Obtener publicaciones del feed
export const getFeedPosts = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/publications/find', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Obtener perfil del usuario autenticado
export const getUserProfile = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/users/find', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Obtener publicaciones de un usuario específico usando su ID
export const getUserPosts = async (userId) => {  // Acepta el ID como parámetro
  if (!userId) {
    throw new Error("No se recibió un userId válido.");
  }

  const token = Cookies.get('token');
  const response = await api.get(`/publications/publications-user/${userId}`, { 
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Crear una nueva publicación
export const createPost = async (postData) => {
  const token = Cookies.get('token');
  const response = await api.post('/publications/post', postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Obtener notificaciones
export const getNotifications = async () => {
  const token = Cookies.get('token');
  const userId = Cookies.get('userId'); 
  const response = await api.get(`/notifications/user/${userId}`, { 
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
