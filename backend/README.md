# College Appointment System API

A robust **College Appointment Booking System** that enables students to book appointments with professors. The system provides JWT-based authentication, role-based access control, and comprehensive appointment management features. Professors can specify their availability, students can view available time slots and book appointments, and both parties can manage their appointments effectively.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based auth system for students and professors
- **Role-Based Access Control**: Separate functionalities for students and professors
- **Appointment Management**: Create, view, confirm, and cancel appointments
- **Time Slot Management**: Professors can set working hours, students can book specific time slots
- **Real-time Status Updates**: Track appointment status (pending, confirmed, canceled)
- **UI-Friendly Endpoints**: Complete set of routes designed for frontend integration
- **Professor Directory**: Students can browse all available professors
- **Dashboard Analytics**: Statistics and insights for professors
- **Profile Management**: Both students and professors can view and update their profiles
- **Appointment History**: Complete appointment tracking with filtering and pagination
- **Input Validation**: Comprehensive validation for all inputs
- **Security**: Helmet, CORS, XSS protection, password hashing with bcrypt
- **API Documentation**: Swagger/OpenAPI documentation available
- **Error Handling**: Custom error classes with proper HTTP status codes

## 🛠 Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Security**: Helmet, CORS, XSS-Clean
- **Validation**: Custom validation with Mongoose schemas
- **Documentation**: Swagger UI with YAML configuration
- **Date/Time Handling**: Moment.js

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/college-appointment-system
   JWT_SECRET=your_jwt_secret_key_here
   JWT_LIFE_TIME=30d
   PORT=4000
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   - API Base URL: `http://localhost:4000`
   - Swagger Documentation: `http://localhost:4000/api-docs`
   - Home Page: `http://localhost:4000`

## 📊 Database Schema

### Student Model
```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, min length: 7, hashed)
}
```

### Professor Model
```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, min length: 7, hashed),
  workingHour: String (format: "10:00AM-5:00PM")
}
```

### Appointment Model
```javascript
{
  status: String (enum: ["pending", "confirmed", "canceled"], default: "pending"),
  professorId: ObjectId (ref: Professor, required),
  studentId: ObjectId (ref: Student, required),
  slot: String (format: "10:00AM-11:00AM", required)
}
```

## 🔗 API Endpoints

### Authentication Routes

#### **POST** `/api/v1/register`
Register a new user (student or professor)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "professor"
}
```

**Response (201):**
```json
{
  "user": {
    "name": "John Doe",
    "id": "user_id",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

#### **POST** `/api/v1/login`
Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "professor"
}
```

**Response (200):**
```json
{
  "user": {
    "name": "John Doe",
    "id": "user_id",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Student Routes (Protected - Requires Authentication)

#### **GET** `/api/v1/student/professors`
Get list of all professors available for booking appointments

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "professors": [
    {
      "_id": "professor_id",
      "name": "Dr. John Smith",
      "email": "dr.smith@college.edu",
      "workingHour": "9:00AM-5:00PM"
    }
  ],
  "count": 1
}
```

#### **GET** `/api/v1/student/appointments`
Get all appointments for the logged-in student

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "appointments": [
    {
      "_id": "appointment_id",
      "status": "pending",
      "slot": "10:00AM-11:00AM",
      "professorId": {
        "_id": "professor_id",
        "name": "Dr. Smith",
        "email": "dr.smith@college.edu",
        "workingHour": "9:00AM-5:00PM"
      },
      "studentId": "student_id"
    }
  ],
  "count": 1
}
```

#### **GET** `/api/v1/student/appointments/slots/:professorId`
Get available time slots for a specific professor

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "professorName": "Dr. Smith",
  "slot": "9:00AM-5:00PM"
}
```

#### **POST** `/api/v1/student/appointments/book`
Book an appointment with a professor

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "professorId": "professor_object_id",
  "slot": "10:00AM-11:00AM"
}
```

**Response (200):**
```json
{
  "status": "pending",
  "professorId": "professor_object_id",
  "studentId": "student_object_id",
  "slot": "10:00AM-11:00AM",
  "_id": "appointment_id"
}
```

#### **GET** `/api/v1/student/appointments/status/:appointmentId`
Get status of a specific appointment

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "_id": "appointment_id",
  "status": "pending",
  "professorId": "professor_object_id",
  "studentId": "student_object_id",
  "slot": "10:00AM-11:00AM"
}
```

#### **PATCH** `/api/v1/student/appointments/:appointmentId/cancel`
Cancel an appointment (student can only cancel their own appointments)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "message": "Appointment canceled successfully",
  "appointment": {
    "_id": "appointment_id",
    "status": "canceled",
    "professorId": "professor_object_id",
    "studentId": "student_object_id",
    "slot": "10:00AM-11:00AM"
  }
}
```

#### **GET** `/api/v1/student/profile`
Get student profile with appointment statistics

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "profile": {
    "_id": "student_id",
    "name": "Alice Johnson",
    "email": "alice@student.edu"
  },
  "appointmentStats": [
    { "_id": "pending", "count": 2 },
    { "_id": "confirmed", "count": 3 },
    { "_id": "canceled", "count": 1 }
  ]
}
```

#### **PATCH** `/api/v1/student/profile`
Update student profile information

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Alice Updated",
  "email": "alice.updated@student.edu"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "profile": {
    "_id": "student_id",
    "name": "Alice Updated",
    "email": "alice.updated@student.edu"
  }
}
```

### Professor Routes (Protected - Requires Authentication)

#### **GET** `/api/v1/professor/appointments`
Get all appointments for the logged-in professor with pagination and filtering

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `status` (optional): Filter by appointment status (pending, confirmed, canceled)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of appointments per page (default: 50)

**Response (200):**
```json
{
  "appointments": [
    {
      "_id": "appointment_id",
      "status": "pending",
      "slot": "10:00AM-11:00AM",
      "professorId": "professor_id",
      "studentId": {
        "_id": "student_id",
        "name": "Alice Johnson",
        "email": "alice@student.edu"
      }
    }
  ],
  "totalAppointments": 25,
  "currentPage": 1,
  "totalPages": 1
}
```

#### **GET** `/api/v1/professor/appointments/:appointmentId`
Get detailed information about a specific appointment

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "_id": "appointment_id",
  "status": "pending",
  "slot": "10:00AM-11:00AM",
  "professorId": "professor_id",
  "studentId": {
    "_id": "student_id",
    "name": "Alice Johnson",
    "email": "alice@student.edu"
  }
}
```

#### **GET** `/api/v1/professor/dashboard`
Get dashboard statistics and recent appointments for professor

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "appointmentStats": [
    { "_id": "pending", "count": 5 },
    { "_id": "confirmed", "count": 12 },
    { "_id": "canceled", "count": 3 }
  ],
  "totalAppointments": 20,
  "recentAppointments": [
    {
      "_id": "appointment_id",
      "status": "pending",
      "slot": "2:00PM-3:00PM",
      "studentId": {
        "name": "John Doe",
        "email": "john@student.edu"
      }
    }
  ],
  "todayAppointments": [],
  "todayCount": 0
}
```

#### **PATCH** `/api/v1/professor/appointments/slots`
Set or update working hours/availability

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "workingHour": "9:00AM-5:00PM"
}
```

**Response (200):**
```json
{
  "message": "Working hours updated successfully",
  "name": "Dr. Smith",
  "updatedWorkingHour": "9:00AM-5:00PM"
}
```

#### **PATCH** `/api/v1/professor/appointments/:appointmentId`
Confirm or cancel an appointment

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "confirmed" // or "canceled"
}
```

**Response (200):**
```json
{
  "_id": "appointment_id",
  "status": "confirmed",
  "professorId": "professor_object_id",
  "studentId": "student_object_id",
  "slot": "10:00AM-11:00AM"
}
```

#### **GET** `/api/v1/professor/profile`
Get professor profile with appointment statistics

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "profile": {
    "_id": "professor_id",
    "name": "Dr. John Smith",
    "email": "dr.smith@college.edu",
    "workingHour": "9:00AM-5:00PM"
  },
  "appointmentStats": [
    { "_id": "pending", "count": 5 },
    { "_id": "confirmed", "count": 12 },
    { "_id": "canceled", "count": 3 }
  ]
}
```

#### **PATCH** `/api/v1/professor/profile`
Update professor profile information

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Dr. John Smith Updated",
  "email": "dr.smith.updated@college.edu",
  "workingHour": "8:00AM-6:00PM"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "profile": {
    "_id": "professor_id",
    "name": "Dr. John Smith Updated",
    "email": "dr.smith.updated@college.edu",
    "workingHour": "8:00AM-6:00PM"
  }
}
```

## 🔒 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Here's how it works:

1. **Registration/Login**: Users receive a JWT token upon successful registration or login
2. **Token Structure**: Token contains user ID and role (student/professor)
3. **Protected Routes**: All `/api/v1/student/*` and `/api/v1/professor/*` routes require authentication
4. **Token Usage**: Include token in Authorization header: `Bearer <token>`
5. **Token Expiration**: Tokens expire based on `JWT_LIFE_TIME` environment variable

## ⚠️ Error Handling

The API uses custom error classes for different scenarios:

- **BadRequestError (400)**: Invalid request data
- **UnauthenticatedError (401)**: Authentication required or invalid credentials
- **NotFoundError (404)**: Resource not found
- **Custom Errors**: Specific business logic errors

## 🔍 Business Logic

### Appointment Booking Logic
1. **Time Validation**: Requested slot must be within professor's working hours
2. **Conflict Detection**: System checks for overlapping appointments
3. **Status Management**: Appointments start as "pending" and can be "confirmed" or "canceled"
4. **User Authorization**: Students can only view their appointments, professors can manage all their appointments

### Time Slot Format
- Working Hours: `"9:00AM-5:00PM"`
- Appointment Slots: `"10:00AM-11:00AM"`
- Uses Moment.js for time parsing and validation

## 🎨 Frontend Integration Patterns

### Student UI Workflow
1. **Login/Register**: Student authenticates and receives JWT token
2. **Professor Discovery**: View all professors with `/api/v1/student/professors`
3. **Slot Selection**: Check professor availability with `/api/v1/student/appointments/slots/:professorId`
4. **Booking**: Book appointment with `/api/v1/student/appointments/book`
5. **Management**: View appointments with `/api/v1/student/appointments`
6. **Profile**: Manage profile with `/api/v1/student/profile`

### Professor UI Workflow
1. **Login/Register**: Professor authenticates and receives JWT token
2. **Dashboard**: View statistics and overview with `/api/v1/professor/dashboard`
3. **Appointment Management**: View all appointments with `/api/v1/professor/appointments`
4. **Status Updates**: Confirm/cancel appointments with `/api/v1/professor/appointments/:id`
5. **Availability**: Set working hours with `/api/v1/professor/appointments/slots`
6. **Profile**: Manage profile with `/api/v1/professor/profile`

### Key UI Features Supported
- **Pagination**: Professor appointments support pagination for large datasets
- **Filtering**: Filter appointments by status (pending, confirmed, canceled)
- **Search**: Professor directory for student selection
- **Real-time Updates**: Appointment status changes reflected immediately
- **Statistics**: Dashboard with appointment counts and trends
- **Profile Management**: Complete CRUD operations for user profiles

## 📝 Usage Examples

### Complete Workflow Example

1. **Register a Professor:**
```bash
curl -X POST http://localhost:4000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. John Smith",
    "email": "dr.smith@college.edu",
    "password": "password123",
    "role": "professor"
  }'
```

2. **Register a Student:**
```bash
curl -X POST http://localhost:4000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@student.edu",
    "password": "password123",
    "role": "student"
  }'
```

3. **Professor Login and Set Working Hours:**
```bash
# Login
curl -X POST http://localhost:4000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dr.smith@college.edu",
    "password": "password123",
    "role": "professor"
  }'

# Set working hours (use token from login response)
curl -X PATCH http://localhost:4000/api/v1/professor/appointments/slots \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN" \
  -d '{
    "workingHour": "9:00AM-5:00PM"
  }'
```

4. **Student Complete Workflow:**
```bash
# Login
curl -X POST http://localhost:4000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@student.edu",
    "password": "password123",
    "role": "student"
  }'

# Get all professors
curl -X GET http://localhost:4000/api/v1/student/professors \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"

# Book appointment (use token from login response)
curl -X POST http://localhost:4000/api/v1/student/appointments/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN" \
  -d '{
    "professorId": "PROFESSOR_OBJECT_ID",
    "slot": "10:00AM-11:00AM"
  }'

# View all my appointments
curl -X GET http://localhost:4000/api/v1/student/appointments \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"

# Cancel an appointment
curl -X PATCH http://localhost:4000/api/v1/student/appointments/APPOINTMENT_ID/cancel \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"

# View profile
curl -X GET http://localhost:4000/api/v1/student/profile \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN"
```

5. **Professor Complete Workflow:**
```bash
# Login as professor
curl -X POST http://localhost:4000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dr.smith@college.edu",
    "password": "password123",
    "role": "professor"
  }'

# View dashboard stats
curl -X GET http://localhost:4000/api/v1/professor/dashboard \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN"

# View all appointments
curl -X GET http://localhost:4000/api/v1/professor/appointments \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN"

# View pending appointments only
curl -X GET "http://localhost:4000/api/v1/professor/appointments?status=pending" \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN"

# Confirm an appointment
curl -X PATCH http://localhost:4000/api/v1/professor/appointments/APPOINTMENT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN" \
  -d '{"status": "confirmed"}'

# Update profile
curl -X PATCH http://localhost:4000/api/v1/professor/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_PROFESSOR_TOKEN" \
  -d '{
    "name": "Dr. Smith Updated",
    "workingHour": "8:00AM-6:00PM"
  }'
```

## 🏗️ Project Structure

```
backend/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── swagger.yaml          # API documentation
├── controllers/          # Request handlers
│   ├── auth.js           # Authentication logic
│   ├── professor.js      # Professor-specific operations
│   └── student.js        # Student-specific operations
├── db/
│   └── connect.js        # MongoDB connection
├── errors/               # Custom error classes
│   ├── badRequest.js
│   ├── customError.js
│   ├── index.js
│   ├── notFound.js
│   └── unauthenticated.js
├── middlewares/          # Express middlewares
│   ├── authentication.js # JWT authentication
│   └── notFound.js       # 404 handler
├── models/               # Mongoose schemas
│   ├── Appointment.js
│   ├── Professor.js
│   └── Student.js
├── public/               # Static files
│   ├── favicon.ico
│   └── home.html
└── routes/               # Route definitions
    ├── auth.js
    ├── professor.js
    └── student.js
```

## 🚦 Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created (Registration successful) |
| 400 | Bad Request (Invalid input, validation errors) |
| 401 | Unauthorized (Authentication required/failed) |
| 404 | Not Found (Resource doesn't exist) |
| 500 | Internal Server Error |

## 🧪 Testing

The API can be tested using:

1. **Swagger UI**: Visit `http://localhost:4000/api-docs` for interactive testing
2. **Postman**: Import the provided Postman collection
3. **cURL**: Use the command-line examples provided above
4. **Frontend Integration**: Connect with any frontend framework

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Mongoose schema validation
- **XSS Protection**: XSS-Clean middleware
- **CORS**: Cross-Origin Resource Sharing enabled
- **Helmet**: Security headers for production
- **Environment Variables**: Sensitive data stored in .env files

## 🚀 Deployment

### Environment Variables for Production
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_production_jwt_secret_key
JWT_LIFE_TIME=7d
PORT=80
NODE_ENV=production
```

### Deployment Platforms
- **Render**: Configured for deployment
- **Heroku**: Add Procfile: `web: node app.js`
- **Railway**: Direct deployment from GitHub
- **DigitalOcean**: App Platform compatible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Useful Links

- **Live API**: [https://college-appointment-system-api-80t3.onrender.com](https://college-appointment-system-api-80t3.onrender.com)
- **Swagger Documentation**: [Live API Docs](https://college-appointment-system-api-80t3.onrender.com/api-docs)
- **GitHub Repository**: [College-Appointment-System-API](https://github.com/sajjad6ansari/College-Appointment-System-API)
- **Postman Collection**: [API Testing Collection](https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system)

## 📞 Support

For support, email sajjad6ansari@gmail.com or create an issue in the GitHub repository.

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**







