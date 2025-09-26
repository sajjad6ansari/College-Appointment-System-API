import api from './api';

export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await api.get('/test');
    console.log('Backend connection successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Backend connection failed:', error);
    return { success: false, error: error.message };
  }
};

export const testHealthEndpoint = async () => {
  try {
    console.log('Testing health endpoint...');
    const response = await fetch('https://college-appointment-backend.onrender.com/health');
    const data = await response.json();
    console.log('Health check successful:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Health check failed:', error);
    return { success: false, error: error.message };
  }
};