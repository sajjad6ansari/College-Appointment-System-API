# API Configuration Documentation

## Overview
This document explains the centralized API configuration system implemented in `src/utils/apis.js`. This system provides a single source of truth for all API endpoints, making the codebase more maintainable and environment-friendly.

## File Structure
```
src/
├── utils/
│   ├── apis.js           # Main API configuration
│   └── apiExamples.js    # Usage examples
└── services/
    ├── api.js            # Axios instance configuration
    ├── studentService.js # Student API service layer
    └── professorService.js # Professor API service layer
```

## Key Features

### 1. Centralized Endpoint Management
All API endpoints are defined in one place:
```javascript
import { API_ENDPOINTS } from '../utils/apis';

// Use endpoints like:
API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS
API_ENDPOINTS.PROFESSOR.GET_DASHBOARD_STATS
```

### 2. Dynamic Endpoint Support
For endpoints with parameters:
```javascript
import { API_HELPERS } from '../utils/apis';

// Get appointment details for a specific ID
const endpoint = API_HELPERS.getAppointmentDetail(appointmentId);
```

### 3. Environment Configuration
Easy switching between environments:
```javascript
import { getBaseUrl, updateBaseUrl } from '../utils/apis';

// Switch to production
const prodUrl = getBaseUrl('production');
updateBaseUrl(prodUrl);
```

### 4. HTTP Method Configuration
Each endpoint includes its HTTP method:
```javascript
import { HTTP_METHODS, ENDPOINT_CONFIGS } from '../utils/apis';

const config = ENDPOINT_CONFIGS[API_ENDPOINTS.AUTH.LOGIN];
// config.method === 'POST'
// config.requiresAuth === false
```

## Available Endpoints

### Authentication
- `AUTH.LOGIN` - POST `/login`
- `AUTH.REGISTER` - POST `/register`
- `AUTH.GET_CURRENT_USER` - GET `/me` (requires auth)

### Student Endpoints
- `STUDENT.GET_ALL_PROFESSORS` - GET `/student/professors`
- `STUDENT.GET_MY_APPOINTMENTS` - GET `/student/appointments`
- `STUDENT.BOOK_APPOINTMENT` - POST `/student/appointments/book`
- `STUDENT.GET_PROFILE` - GET `/student/profile`
- `STUDENT.UPDATE_PROFILE` - PATCH `/student/profile`

### Professor Endpoints
- `PROFESSOR.GET_ALL_MY_APPOINTMENTS` - GET `/professor/appointments`
- `PROFESSOR.UPDATE_APPOINTMENT_STATUS` - PATCH `/professor/appointments/:id`
- `PROFESSOR.GET_DASHBOARD_STATS` - GET `/professor/dashboard`
- `PROFESSOR.GET_PROFILE` - GET `/professor/profile`
- `PROFESSOR.UPDATE_PROFILE` - PATCH `/professor/profile`
- `PROFESSOR.SET_AVAILABILITY` - PATCH `/professor/appointments/slots`

### Dynamic Endpoints (using helpers)
- `API_HELPERS.getProfessorSlots(professorId)`
- `API_HELPERS.getAppointmentStatus(appointmentId)`
- `API_HELPERS.getAppointmentDetail(appointmentId)`
- `API_HELPERS.updateAppointmentStatus(appointmentId)`

## Usage Examples

### Basic Usage
```javascript
import { API_ENDPOINTS } from '../utils/apis';
import api from '../services/api';

// Make a request
const response = await api.get(
  API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS.replace(API_ENDPOINTS.BASE_URL, '')
);
```

### Using Dynamic Endpoints
```javascript
import { API_HELPERS } from '../utils/apis';
import api from '../services/api';

// Get professor slots
const endpoint = API_HELPERS.getProfessorSlots('professor123');
const response = await api.get(endpoint.replace(API_ENDPOINTS.BASE_URL, ''));
```

### Environment Switching
```javascript
import { updateBaseUrl, ENVIRONMENT_URLS } from '../utils/apis';

// Switch to production
updateBaseUrl(ENVIRONMENT_URLS.production);

// Switch to staging
updateBaseUrl(ENVIRONMENT_URLS.staging);
```

## Configuration Objects

### API_ENDPOINTS
Main endpoint configuration object with nested structure:
- `BASE_URL` - Current base URL
- `AUTH` - Authentication endpoints
- `STUDENT` - Student-specific endpoints
- `PROFESSOR` - Professor-specific endpoints

### HTTP_METHODS
Standard HTTP methods:
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

### ENDPOINT_CONFIGS
Configuration for each endpoint including:
- `method` - HTTP method
- `requiresAuth` - Whether authentication is required

### API_HELPERS
Helper functions for dynamic endpoints that take parameters

### ENVIRONMENT_URLS
Pre-configured URLs for different environments:
- `development` - Local development server
- `production` - Production server URL
- `staging` - Staging server URL

## Benefits

1. **Single Source of Truth**: All endpoints defined in one place
2. **Easy Maintenance**: Update endpoints in one location
3. **Environment Management**: Easy switching between dev/staging/prod
4. **Type Safety**: Consistent endpoint naming and structure
5. **Error Prevention**: Reduces hardcoded URL errors
6. **Documentation**: Self-documenting API structure

## Migration from Old System

The old system used hardcoded URLs in service files:
```javascript
// OLD WAY ❌
const response = await api.get('/student/professors');
```

The new system uses centralized configuration:
```javascript
// NEW WAY ✅
const response = await api.get(
  API_ENDPOINTS.STUDENT.GET_ALL_PROFESSORS.replace(API_ENDPOINTS.BASE_URL, '')
);
```

## Best Practices

1. Always use `API_ENDPOINTS` for static endpoints
2. Use `API_HELPERS` for dynamic endpoints with parameters
3. Check `ENDPOINT_CONFIGS` for HTTP method validation
4. Use environment switching for deployment
5. Keep the base URL replacement pattern consistent

## Future Enhancements

1. Add request/response type definitions
2. Implement automatic retry logic
3. Add endpoint versioning support
4. Include rate limiting configuration
5. Add request caching options