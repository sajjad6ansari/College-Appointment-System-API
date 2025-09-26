import api from './api';
import { API_ENDPOINTS, API_HELPERS } from '../utils/apis';

export const professorService = {
  // Get all my appointments
  async getAllMyAppointments() {
    const response = await api.get(API_ENDPOINTS.PROFESSOR.GET_ALL_MY_APPOINTMENTS);
    return response.data;
  },

  // Get appointment details
  async getAppointmentDetail(appointmentId) {
    const endpoint = API_HELPERS.getAppointmentDetail(appointmentId);
    const response = await api.get(endpoint);
    return response.data;
  },

  // Confirm or cancel appointment
  async updateAppointmentStatus(appointmentId, status) {
    const endpoint = API_HELPERS.updateAppointmentStatus(appointmentId);
    const response = await api.patch(endpoint, { status });
    return response.data;
  },

  // Set availability slots
  async setAvailability(slots) {
    const response = await api.patch(API_ENDPOINTS.PROFESSOR.SET_AVAILABILITY, { slots });
    return response.data;
  },

  // Get dashboard statistics
  async getDashboardStats() {
    const response = await api.get(API_ENDPOINTS.PROFESSOR.GET_DASHBOARD_STATS);
    return response.data;
  },

  // Get profile
  async getProfile() {
    const response = await api.get(API_ENDPOINTS.PROFESSOR.GET_PROFILE);
    return response.data;
  },

  // Update profile
  async updateProfile(profileData) {
    const response = await api.patch(API_ENDPOINTS.PROFESSOR.UPDATE_PROFILE, profileData);
    return response.data;
  },

  // Get schedule (if supported by backend)
  async getSchedule() {
    const response = await api.get(API_ENDPOINTS.PROFESSOR.GET_SCHEDULE);
    return response.data;
  },

  // Save schedule (if supported by backend)
  async saveSchedule(scheduleData) {
    const response = await api.post(API_ENDPOINTS.PROFESSOR.SAVE_SCHEDULE, scheduleData);
    return response.data;
  },
};

export default professorService;