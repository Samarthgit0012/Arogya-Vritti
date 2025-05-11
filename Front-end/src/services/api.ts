// src/services/api.ts
import axios from 'axios';
import { currentBackendUrl, initializeBackendUrl } from '../lib/backendUrls';

// Initialize the backend URL
initializeBackendUrl().then(url => {
  console.log('Using backend URL:', url);
});

const api = axios.create({
  baseURL: `${currentBackendUrl}/api`,
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
// ... existing code ...