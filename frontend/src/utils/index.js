// Utils index file for easy imports
// Export all API-related utilities

export {
  API_ENDPOINTS,
  HTTP_METHODS,
  ENDPOINT_CONFIGS,
  API_HELPERS,
  ENVIRONMENT_URLS,
  getBaseUrl,
  updateBaseUrl,
} from './apis';

// Export API examples for reference
export * from './apiExamples';

// Re-export default as named export for convenience
export { default as ApiEndpoints } from './apis';