import axios from 'axios';

// Base API configuration with environment variable fallback for production hosting
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jerseyai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
