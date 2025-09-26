import api from './api';
import { API_ENDPOINTS, API_HELPERS } from '../utils/apis';

export const studentService = {
  // Get all professors
  async getAllProfessors() {
    const response = await api.get(API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS);
    return response.data;
  },

  // Get professor slots
  async getProfessorSlots(professorId) {
    const endpoint = API_HELPERS.getProfessorSlots(professorId);
    const response = await api.get(endpoint);
    return response.data;
  },

  // Get my appointments
  async getMyAppointments() {
    const response = await api.get(API_ENDPOINTS.STUDENT.GET_MY_APPOINTMENTS);
    return response.data;
  },

  // Book appointment
  async bookAppointment(appointmentData) {
    const response = await api.post(API_ENDPOINTS.STUDENT.BOOK_APPOINTMENT, appointmentData);
    return response.data;
  },

  // Cancel appointment
  async cancelAppointment(appointmentId) {
    const endpoint = API_HELPERS.cancelStudentAppointment(appointmentId);
    const response = await api.patch(endpoint);
    return response.data;
  },

  // Get appointment status
  async getAppointmentStatus(appointmentId) {
    const endpoint = API_HELPERS.getAppointmentStatus(appointmentId);
    const response = await api.get(endpoint);
    return response.data;
  },

  // Get profile
  async getProfile() {
    const response = await api.get(API_ENDPOINTS.STUDENT.GET_PROFILE);
    return response.data;
  },

  // Update profile
  async updateProfile(profileData) {
    const response = await api.patch(API_ENDPOINTS.STUDENT.UPDATE_PROFILE, profileData);
    return response.data;
  },

  // Get dashboard statistics
  async getDashboardStats() {
    try {
      const [appointmentsResponse, professorsResponse] = await Promise.all([
        this.getMyAppointments(),
        this.getAllProfessors()
      ]);

      const appointments = appointmentsResponse.appointments || [];
      const professors = professorsResponse.professors || [];

      return {
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(apt => apt.status === 'pending').length,
        confirmedAppointments: appointments.filter(apt => apt.status === 'confirmed').length,
        cancelledAppointments: appointments.filter(apt => apt.status === 'cancelled').length,
        totalProfessors: professors.length,
        recentAppointments: appointments.slice(0, 5),
        availableProfessors: professors.slice(0, 6)
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};

export default studentService;