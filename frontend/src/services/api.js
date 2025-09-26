import axios from 'axios';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../utils/apis';

const API_BASE_URL = API_ENDPOINTS.BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      toast.error('Network error. Please check your internet connection and backend server.');
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(`Connection error: ${error.message}`);
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default api;