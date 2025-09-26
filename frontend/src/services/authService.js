import api from './api';
import { API_ENDPOINTS } from '../utils/apis';

export const authService = {
  // Login user
  async login(credentials) {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register user
  async register(userData) {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
    return response.data;
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default authService;