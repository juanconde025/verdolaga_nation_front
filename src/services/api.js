import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true 
});

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getFeedPosts = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/publications', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserProfile = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
juanconde025

export const getUserPosts = async (userId) => {
  const token = Cookies.get('token');
  const response = await api.get(`/publications/publications-user/${userId}`, { 
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createPost = async (postData) => {
  const token = Cookies.get('token');
  const response = await api.post('/publications', postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getNotifications = async () => {
  const token = Cookies.get('token');
  const response = await api.get('/notifications', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
