// Example Usage of Centralized API Configuration
// File: src/utils/apiExamples.js

import { API_ENDPOINTS, API_HELPERS, HTTP_METHODS, ENDPOINT_CONFIGS } from './apis';
import api from '../services/api';

// Examples of how to use the centralized API configuration

// 1. Basic usage with static endpoints
const loginExample = async (credentials) => {
  try {
    const response = await api.post(
      API_ENDPOINTS.AUTH.LOGIN.replace(API_ENDPOINTS.BASE_URL, ''),
      credentials
    );
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// 2. Using helper functions for dynamic endpoints
const getAppointmentDetailsExample = async (appointmentId) => {
  try {
    const endpoint = API_HELPERS.getAppointmentDetail(appointmentId).replace(API_ENDPOINTS.BASE_URL, '');
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Failed to get appointment details:', error);
    throw error;
  }
};

// 3. Using endpoint configurations to check HTTP methods
const makeApiCall = async (endpointUrl, data = null) => {
  const config = ENDPOINT_CONFIGS[endpointUrl];
  if (!config) {
    throw new Error('Endpoint configuration not found');
  }

  const endpoint = endpointUrl.replace(API_ENDPOINTS.BASE_URL, '');
  
  switch (config.method) {
    case HTTP_METHODS.GET:
      return await api.get(endpoint);
    case HTTP_METHODS.POST:
      return await api.post(endpoint, data);
    case HTTP_METHODS.PATCH:
      return await api.patch(endpoint, data);
    case HTTP_METHODS.DELETE:
      return await api.delete(endpoint);
    default:
      throw new Error('Unsupported HTTP method');
  }
};

// 4. Environment-specific usage
import { getBaseUrl, updateBaseUrl } from './apis';

const switchToProductionExample = () => {
  const prodUrl = getBaseUrl('production');
  updateBaseUrl(prodUrl);
  console.log('Switched to production API:', prodUrl);
};

// 5. Batch API calls using the centralized configuration
const getBatchStudentData = async () => {
  try {
    const [appointments, professors, profile] = await Promise.all([
      api.get(API_ENDPOINTS.STUDENT.GET_MY_APPOINTMENTS.replace(API_ENDPOINTS.BASE_URL, '')),
      api.get(API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS.replace(API_ENDPOINTS.BASE_URL, '')),
      api.get(API_ENDPOINTS.STUDENT.GET_PROFILE.replace(API_ENDPOINTS.BASE_URL, ''))
    ]);

    return {
      appointments: appointments.data,
      professors: professors.data,
      profile: profile.data
    };
  } catch (error) {
    console.error('Failed to fetch batch student data:', error);
    throw error;
  }
};

// 6. Generic API caller with endpoint validation
const callAPI = async (endpointKey, params = {}, data = null) => {
  // Parse nested endpoint keys like 'STUDENT.GET_ALL_PROFESSORS'
  const keys = endpointKey.split('.');
  let endpoint = API_ENDPOINTS;
  
  for (const key of keys) {
    endpoint = endpoint[key];
    if (!endpoint) {
      throw new Error(`Invalid endpoint key: ${endpointKey}`);
    }
  }

  // Handle dynamic endpoints
  if (typeof endpoint === 'function') {
    endpoint = endpoint(...Object.values(params));
  }

  const config = ENDPOINT_CONFIGS[endpoint];
  if (!config) {
    throw new Error(`No configuration found for endpoint: ${endpoint}`);
  }

  const relativeEndpoint = endpoint.replace(API_ENDPOINTS.BASE_URL, '');
  
  switch (config.method) {
    case HTTP_METHODS.GET:
      return await api.get(relativeEndpoint);
    case HTTP_METHODS.POST:
      return await api.post(relativeEndpoint, data);
    case HTTP_METHODS.PATCH:
      return await api.patch(relativeEndpoint, data);
    case HTTP_METHODS.DELETE:
      return await api.delete(relativeEndpoint);
    default:
      throw new Error(`Unsupported HTTP method: ${config.method}`);
  }
};

// Usage examples:
// await callAPI('AUTH.LOGIN', {}, { email: 'user@email.com', password: 'password' });
// await callAPI('STUDENT.GET_ALL_PROFESSORS');
// await callAPI('PROFESSOR.GET_APPOINTMENT_DETAIL', { appointmentId: '123' });

export {
  loginExample,
  getAppointmentDetailsExample,
  makeApiCall,
  switchToProductionExample,
  getBatchStudentData,
  callAPI
};