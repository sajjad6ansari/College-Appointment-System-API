// Base URL for the API - Use environment variable if available, fallback to production URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://college-appointment-backend.onrender.com/api/v1';

// API Endpoints Configuration with both full URLs and relative paths
const API_ENDPOINTS = {
  // Base URL
  BASE_URL,

  // Authentication Endpoints
  AUTH: {
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
    GET_CURRENT_USER: `/auth/me`,
  },

  // Student Endpoints
  STUDENT: {
    // Professor-related endpoints
    GET_ALL_PROFESSORS: `/student/professors`,
    GET_PROFESSOR_SLOTS: (professorId) => `/student/appointments/slots/${professorId}`,

    // Appointment management endpoints
    GET_MY_APPOINTMENTS: `/student/appointments`,
    GET_APPOINTMENT_STATUS: (appointmentId) => `/student/appointments/status/${appointmentId}`,
    BOOK_APPOINTMENT: `/student/appointments/book`,
    CANCEL_APPOINTMENT: (appointmentId) => `/student/appointments/${appointmentId}/cancel`,

    // Profile endpoints
    GET_PROFILE: `/student/profile`,
    UPDATE_PROFILE: `/student/profile`,
  },

  // Professor Endpoints
  PROFESSOR: {
    // Availability management
    SET_AVAILABILITY: `/professor/appointments/slots`,

    // Appointment management endpoints
    GET_ALL_MY_APPOINTMENTS: `/professor/appointments`,
    GET_APPOINTMENT_DETAIL: (appointmentId) => `/professor/appointments/${appointmentId}`,
    UPDATE_APPOINTMENT_STATUS: (appointmentId) => `/professor/appointments/${appointmentId}`,

    // Dashboard and analytics
    GET_DASHBOARD_STATS: `/professor/dashboard`,

    // Profile endpoints  
    GET_PROFILE: `/professor/profile`,
    UPDATE_PROFILE: `/professor/profile`,

    // Schedule endpoints (for future implementation)
    GET_SCHEDULE: `/professor/schedule`,
    SAVE_SCHEDULE: `/professor/schedule`,
  },
};

// HTTP Methods
const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Endpoint configurations with HTTP methods
const ENDPOINT_CONFIGS = {
  // Authentication
  [API_ENDPOINTS.AUTH.LOGIN]: { method: HTTP_METHODS.POST },
  [API_ENDPOINTS.AUTH.REGISTER]: { method: HTTP_METHODS.POST },
  [API_ENDPOINTS.AUTH.GET_CURRENT_USER]: { method: HTTP_METHODS.GET, requiresAuth: true },

  // Student endpoints
  [API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.STUDENT.GET_MY_APPOINTMENTS]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.STUDENT.BOOK_APPOINTMENT]: { method: HTTP_METHODS.POST, requiresAuth: true },
  [API_ENDPOINTS.STUDENT.GET_PROFILE]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.STUDENT.UPDATE_PROFILE]: { method: HTTP_METHODS.PATCH, requiresAuth: true },

  // Professor endpoints
  [API_ENDPOINTS.PROFESSOR.SET_AVAILABILITY]: { method: HTTP_METHODS.PATCH, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.GET_ALL_MY_APPOINTMENTS]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.GET_DASHBOARD_STATS]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.GET_PROFILE]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.UPDATE_PROFILE]: { method: HTTP_METHODS.PATCH, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.GET_SCHEDULE]: { method: HTTP_METHODS.GET, requiresAuth: true },
  [API_ENDPOINTS.PROFESSOR.SAVE_SCHEDULE]: { method: HTTP_METHODS.POST, requiresAuth: true },
};

// Helper functions for dynamic endpoints
const API_HELPERS = {
  // Student helpers
  getProfessorSlots: (professorId) => API_ENDPOINTS.STUDENT.GET_PROFESSOR_SLOTS(professorId),
  getAppointmentStatus: (appointmentId) => API_ENDPOINTS.STUDENT.GET_APPOINTMENT_STATUS(appointmentId),
  cancelStudentAppointment: (appointmentId) => API_ENDPOINTS.STUDENT.CANCEL_APPOINTMENT(appointmentId),

  // Professor helpers
  getAppointmentDetail: (appointmentId) => API_ENDPOINTS.PROFESSOR.GET_APPOINTMENT_DETAIL(appointmentId),
  updateAppointmentStatus: (appointmentId) => API_ENDPOINTS.PROFESSOR.UPDATE_APPOINTMENT_STATUS(appointmentId),
};

// Environment-specific base URLs
const ENVIRONMENT_URLS = {
  development: 'http://localhost:4000/api/v1',
  production: 'https://college-appointment-backend.onrender.com/api/v1',
  staging: 'https://college-appointment-backend.onrender.com/api/v1',
};

// Get base URL based on environment
const getBaseUrl = (environment = 'development') => {
  return ENVIRONMENT_URLS[environment] || ENVIRONMENT_URLS.development;
};

// Update base URL for different environments
const updateBaseUrl = (newBaseUrl) => {
  Object.keys(API_ENDPOINTS).forEach(category => {
    if (typeof API_ENDPOINTS[category] === 'object' && category !== 'BASE_URL') {
      Object.keys(API_ENDPOINTS[category]).forEach(endpoint => {
        if (typeof API_ENDPOINTS[category][endpoint] === 'string') {
          API_ENDPOINTS[category][endpoint] = API_ENDPOINTS[category][endpoint].replace(BASE_URL, newBaseUrl);
        }
      });
    }
  });
  API_ENDPOINTS.BASE_URL = newBaseUrl;
};

export {
  API_ENDPOINTS,
  HTTP_METHODS,
  ENDPOINT_CONFIGS,
  API_HELPERS,
  ENVIRONMENT_URLS,
  getBaseUrl,
  updateBaseUrl,
};

export default API_ENDPOINTS;