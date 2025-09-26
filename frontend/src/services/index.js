// Central export point for all services
// This file provides a single import point for all service modules

// Export individual services
export { default as api } from './api';
export { authService } from './authService';
export { studentService } from './studentService';
export { professorService } from './professorService';

// Export API configuration from utils
export { API_ENDPOINTS, API_HELPERS } from '../utils/apis';

// Convenience aliases
export { authService as auth } from './authService';
export { studentService as student } from './studentService';
export { professorService as professor } from './professorService';