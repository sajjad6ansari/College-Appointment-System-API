# College Appointment System API Documentation

## 📚 Available Documentation Endpoints

### 1. Interactive Swagger UI
**URL**: https://college-appointment-backend.onrender.com/api-docs
**Description**: Full interactive API documentation where you can test endpoints directly
**Features**: 
- Complete API specification
- Try-it-out functionality 
- Request/response examples
- Authentication testing

### 2. Raw Swagger JSON (Coming Soon)
**URL**: https://college-appointment-backend.onrender.com/api/v1/docs
**Description**: Raw OpenAPI 3.0 specification in JSON format
**Use Cases**:
- API client generation
- Integration with tools like Postman
- Custom documentation generation

### 3. API Information (Coming Soon)
**URL**: https://college-appointment-backend.onrender.com/api/v1/docs/info
**Description**: API metadata and quick reference
**Contains**:
- API title and version
- Available endpoint categories
- Documentation links
- GitHub and Postman collection links

## 🔗 Quick Links

- **Live Backend**: https://college-appointment-backend.onrender.com
- **Health Check**: https://college-appointment-backend.onrender.com/health  
- **Test Endpoint**: https://college-appointment-backend.onrender.com/api/v1/test
- **GitHub Repository**: https://github.com/sajjad6ansari/College-Appointment-System-API
- **Postman Collection**: https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system

## 📋 API Endpoints Summary

### Authentication (`/api/v1/auth/`)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user profile

### Student Endpoints (`/api/v1/student/`)
- `GET /api/v1/student/professors` - Get all professors
- `GET /api/v1/student/appointments` - Get student appointments
- `POST /api/v1/student/appointments/book` - Book new appointment
- `GET /api/v1/student/appointments/status/{id}` - Check appointment status

### Professor Endpoints (`/api/v1/professor/`)
- `GET /api/v1/professor/appointments` - Get professor appointments
- `PATCH /api/v1/professor/appointments/{id}` - Update appointment status
- `GET /api/v1/professor/appointments/slots` - Get available slots

### System Endpoints
- `GET /health` - Health check
- `GET /api/v1/test` - Test connectivity
- `GET /api-docs` - Swagger UI documentation

## 🔐 Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- Development: `http://localhost:5173`, `http://localhost:3000`  
- Production: Any origin (for testing - can be restricted later)

## 📊 Response Format

All API responses follow this standard format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```