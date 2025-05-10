// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => api.post('/auth/register', userData),

  login: (credentials: {
    email: string;
    password: string;
  }) => api.post('/auth/login', credentials)
};