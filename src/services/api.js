import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Asegura que se envían cookies si es necesario
});

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const getUserProfile = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};

export const createPost = async (postData) => {
  const token = Cookies.get('token');
  const response = await api.post('/posts', postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
