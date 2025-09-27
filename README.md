# 🎓 College Appointment System

A modern, full-stack web application for managing appointments between students and professors, built with React 19, Node.js, Express, and MongoDB. Features Docker support, comprehensive API documentation, and cloud deployment ready configuration.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green)](https://mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://college-appointment-system-api.vercel.app/)
[![API Docs](https://img.shields.io/badge/API-Documentation-orange)](https://college-appointment-backend.onrender.com/api-docs)

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo & Links](#live-demo--links)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Flow Diagrams](#system-flow-diagrams)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Usage Guide](#usage-guide)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The College Appointment System is a comprehensive solution designed to streamline the appointment booking process between students and professors. It provides role-based access control, real-time notifications, and an intuitive interface for managing academic consultations.

### Key Benefits
- 📅 **Streamlined Scheduling**: Easy appointment booking and management
- 👥 **Role-Based Access**: Separate interfaces for students and professors
- 🔒 **Secure Authentication**: JWT-based authentication with Redux state management
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-Time Updates**: Live notifications and status updates
- 🐳 **Docker Ready**: Complete containerization support for easy deployment
- 🌐 **Cloud Deployed**: Production-ready deployment on Vercel and Render

## 🌟 Live Demo & Links

### 🚀 **Live Application**
- **Frontend**: [https://college-appointment-system-api.vercel.app/](https://college-appointment-system-api.vercel.app/)
- **Backend API**: [https://college-appointment-backend.onrender.com/](https://college-appointment-backend.onrender.com/)

### 📚 **API Documentation**
- **Interactive Docs**: [https://college-appointment-backend.onrender.com/api-docs](https://college-appointment-backend.onrender.com/api-docs)
- **Beautiful Docs**: [https://college-appointment-backend.onrender.com/api/v1/docs](https://college-appointment-backend.onrender.com/api/v1/docs)
- **API Info**: [https://college-appointment-backend.onrender.com/api/v1/docs/info](https://college-appointment-backend.onrender.com/api/v1/docs/info)

### 🔍 **Health Check**
- **Backend Status**: [https://college-appointment-backend.onrender.com/health](https://college-appointment-backend.onrender.com/health)

### 📦 **Docker Images**
- **Backend Image**: `sajjad6ansari/college-appointment-backend:latest`

### 🎯 **Test Credentials**
```
Student Login:
Email: student@test.com
Password: password123

Professor Login:
Email: professor@test.com  
Password: password123
```

## 🏗️ Architecture

```mermaid
graph TB
    A[Client Browser] --> B[React 19 Frontend]
    B --> C[Redux Store]
    B --> D[Express.js Backend]
    D --> E[JWT Authentication]
    D --> F[MongoDB Database]
    D --> G[REST API Routes]
    
    subgraph "Frontend Layer"
        B
        C
        H[Tailwind CSS]
        I[React Router]
    end
    
    subgraph "Backend Layer"
        D
        E
        G
        J[Middleware]
    end
    
    subgraph "Database Layer"
        F
        K[Students Collection]
        L[Professors Collection]
        M[Appointments Collection]
    end
```

### System Architecture Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 + Vite | User interface and client-side logic |
| **State Management** | Redux Toolkit | Centralized state management |
| **Styling** | Tailwind CSS | Responsive and modern UI design |
| **Backend** | Node.js + Express | Server-side logic and API endpoints |
| **Authentication** | JWT + bcryptjs | Secure user authentication |
| **Database** | MongoDB + Mongoose | Data persistence and management |

## ✨ Features

### 👨‍🎓 Student Features
- ✅ Register and login with role-based authentication
- ✅ View available professors and their specializations
- ✅ Book appointments with preferred time slots
- ✅ View and manage upcoming appointments
- ✅ Update comprehensive profile information (contact details, academic info, emergency contacts)
- ✅ Dashboard with appointment statistics and quick actions
- ✅ Receive appointment confirmations and status updates
- ✅ Enhanced error handling with detailed feedback

### 👨‍🏫 Professor Features
- ✅ Register and login with professor credentials
- ✅ Set available time slots and working hours
- ✅ View and manage student appointment requests
- ✅ Accept or decline appointment requests
- ✅ Update extensive profile information (office location, specializations, experience)
- ✅ Dashboard with appointment analytics and insights
- ✅ Schedule management with availability settings
- ✅ Professional profile with qualifications and bio

### 🔧 System Features
- ✅ Role-based access control with JWT authentication
- ✅ Real-time data synchronization and auto-refresh dashboards
- ✅ Responsive design for all devices
- ✅ Professional dark-themed footer with social links
- ✅ Enhanced error handling and user feedback
- ✅ Modern UI/UX with Tailwind CSS styling
- ✅ API documentation with Swagger integration
- ✅ Custom hooks for dashboard refresh functionality

## 🛠️ Technology Stack

### Frontend
```json
{
  "framework": "React 19",
  "build_tool": "Vite",
  "state_management": "Redux Toolkit",
  "routing": "React Router DOM",
  "styling": "Tailwind CSS",
  "forms": "React Hook Form",
  "notifications": "React Hot Toast",
  "http_client": "Axios"
}
```

### Backend
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js",
  "database": "MongoDB with Mongoose",
  "authentication": "JWT + bcryptjs",
  "validation": "express-validator",
  "security": "Helmet, CORS, XSS protection",
  "documentation": "Swagger/OpenAPI",
  "containerization": "Docker",
  "orchestration": "Docker Compose"
}
```

### DevOps & Deployment
```json
{
  "containerization": "Docker",
  "frontend_hosting": "Vercel",
  "backend_hosting": "Render",
  "database_hosting": "MongoDB Atlas",
  "image_registry": "Docker Hub",
  "ci_cd": "GitHub Actions",
  "version_control": "Git & GitHub"
}
```

### Development Tools
```json
{
  "api_testing": "Custom testing scripts",
  "documentation": "Swagger UI + Custom docs",
  "environment_management": "dotenv",
  "code_quality": "ESLint + Prettier",
  "debugging": "Custom debug utilities",
  "health_monitoring": "Health check endpoints"
}
```

## 📊 System Flow Diagrams

### 1. Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant R as Redux Store
    participant B as Backend
    participant DB as Database
    
    U->>F: Enter credentials
    F->>R: Dispatch login action
    R->>B: POST /api/v1/auth/login
    B->>DB: Validate credentials
    DB-->>B: User data
    B-->>R: JWT token + user data
    R->>F: Update auth state
    F->>U: Redirect to dashboard
```

### 2. Appointment Booking Flow

```mermaid
sequenceDiagram
    participant S as Student
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant P as Professor
    
    S->>F: Browse professors
    F->>B: GET /api/v1/professors
    B->>DB: Fetch professors
    DB-->>B: Professor list
    B-->>F: Professor data
    F-->>S: Display professors
    
    S->>F: Select professor & time
    F->>B: POST /api/v1/appointments
    B->>DB: Create appointment
    DB-->>B: Appointment created
    B-->>F: Success response
    F-->>S: Booking confirmation
    
    Note over P: Professor receives notification
```

### 3. Application Data Flow

```mermaid
flowchart TD
    A[User Action] --> B{Authentication Required?}
    B -->|Yes| C[Check JWT Token]
    B -->|No| D[Process Request]
    C --> E{Token Valid?}
    E -->|Yes| D
    E -->|No| F[Redirect to Login]
    D --> G[Redux Action]
    G --> H[API Call]
    H --> I[Backend Processing]
    I --> J[Database Operation]
    J --> K[Response to Frontend]
    K --> L[Update Redux State]
    L --> M[Re-render UI]
```

### 4. Component Architecture

```mermaid
graph TD
    A[App.jsx] --> B[Router]
    B --> C[Public Routes]
    B --> D[Protected Routes]
    
    C --> E[Login Component]
    C --> F[Register Component]
    
    D --> G[Layout Component]
    G --> H[Student Dashboard]
    G --> I[Professor Dashboard]
    
    H --> J[Student Components]
    I --> K[Professor Components]
    
    J --> L[Professors List]
    J --> M[Appointments]
    J --> N[Profile]
    
    K --> O[Schedule Management]
    K --> P[Appointment Requests]
    K --> Q[Analytics]
```

## 📁 Project Structure

```
College-Appointment-System/
├── 📁 backend/                          # Backend API server
│   ├── 📄 app.js                       # Express application entry point
│   ├── 📄 package.json                 # Backend dependencies
│   ├── 📄 README.md                    # Backend documentation
│   ├── 📄 swagger.yaml                 # API documentation
│   ├── 📁 controllers/                 # Request handlers
│   │   ├── auth.js                     # Authentication logic
│   │   ├── professor.js                # Professor-related operations
│   │   └── student.js                  # Student-related operations
│   ├── 📁 db/                         # Database configuration
│   │   └── connect.js                  # MongoDB connection
│   ├── 📁 errors/                     # Custom error handlers
│   │   ├── badRequest.js
│   │   ├── customError.js
│   │   ├── index.js
│   │   ├── notFound.js
│   │   └── unauthenticated.js
│   ├── 📁 middlewares/                # Express middlewares
│   │   ├── authentication.js          # JWT verification
│   │   └── notFound.js                # 404 handler
│   ├── 📁 models/                     # MongoDB schemas
│   │   ├── Appointment.js             # Appointment model
│   │   ├── Professor.js               # Professor model
│   │   └── Student.js                 # Student model
│   ├── 📁 public/                     # Static files
│   │   ├── favicon.ico
│   │   └── home.html
│   └── 📁 routes/                     # API route definitions
│       ├── auth.js                    # Authentication routes
│       ├── professor.js               # Professor routes
│       └── student.js                 # Student routes
│
├── 📁 frontend/                        # React frontend application
│   ├── 📄 index.html                  # HTML template
│   ├── 📄 package.json                # Frontend dependencies
│   ├── 📄 vite.config.js              # Vite configuration
│   ├── 📄 tailwind.config.js          # Tailwind CSS config
│   ├── 📄 postcss.config.js           # PostCSS configuration
│   ├── 📁 public/                     # Static assets
│   │   ├── appointment-icon.svg        # Custom favicon
│   │   └── favicon.ico
│   └── 📁 src/                        # Source code
│       ├── 📄 main.jsx                # Application entry point
│       ├── 📄 App.jsx                 # Main App component
│       ├── 📄 index.css               # Global styles
│       ├── 📁 components/             # Reusable components
│       │   ├── 📄 Layout.jsx          # Main layout wrapper with sidebar
│       │   ├── 📄 Footer.jsx          # Professional footer component
│       │   ├── 📄 BookingModal.jsx    # Appointment booking modal
│       │   ├── 📁 auth/               # Authentication components
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   └── ProtectedRoute.jsx
│       │   ├── 📁 ui/                 # UI component library
│       │   │   ├── index.jsx          # Component exports
│       │   │   ├── Button.jsx
│       │   │   ├── Input.jsx
│       │   │   ├── Card.jsx
│       │   │   └── LoadingSpinner.jsx
│       │   ├── 📁 professor/          # Professor-specific components
│       │   └── 📁 student/            # Student-specific components
│       ├── 📁 context/                # React Context (legacy)
│       │   └── AuthContext.jsx
│       ├── 📁 hooks/                  # Custom React hooks
│       │   └── useDashboardRefresh.js # Dashboard auto-refresh hook
│       ├── 📁 pages/                  # Page components
│       │   ├── 📁 student/            # Student pages
│       │   │   ├── Dashboard.jsx
│       │   │   ├── Professors.jsx
│       │   │   ├── Appointments.jsx
│       │   │   └── Profile.jsx
│       │   └── 📁 professor/          # Professor pages
│       │       ├── Dashboard.jsx
│       │       ├── Appointments.jsx
│       │       ├── Schedule.jsx
│       │       └── Profile.jsx
│       ├── 📁 services/               # API service layer
│       │   ├── api.js                 # Axios configuration
│       │   ├── authService.js         # Authentication services
│       │   ├── studentService.js      # Student-specific API calls
│       │   ├── professorService.js    # Professor-specific API calls
│       │   └── index.js               # Service exports
│       ├── 📁 store/                  # Redux store configuration
│       │   ├── store.js               # Store setup
│       │   └── authSlice.js           # Authentication slice
│       └── 📁 utils/                  # Utility functions
│           ├── apis.js                # API endpoints configuration
│           └── index.js               # Utility exports
│
├── 📄 README.md                       # This file
├── 📄 .gitignore                      # Git ignore rules
└── 📄 LICENSE                         # MIT License
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB 6.0+ running locally or cloud instance
- Git for version control

### 1. Clone the Repository
```bash
git clone https://github.com/sajjad6ansari/College-Appointment-System-API.git
cd College-Appointment-System-API
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/college-appointment-system
JWT_SECRET=your_jwt_secret_key_here
JWT_LIFETIME=7d
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application

#### **Development (Local):**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api-docs
- **Health Check**: http://localhost:4000/health

#### **Production (Deployed):**
- **Backend API**: https://college-appointment-backend.onrender.com
- **API Documentation**: https://college-appointment-backend.onrender.com/api-docs
- **Health Check**: https://college-appointment-backend.onrender.com/health

## 🐳 Docker Deployment

### Quick Start with Docker

1. **Build and run using Docker Compose:**
```bash
# Copy environment file
cp backend/.env.example backend/.env
# Edit .env with your configuration

# Build and start services
docker-compose up -d
```

2. **Or build manually:**
```bash
# Build the backend image
cd backend
docker build -t college-appointment-backend .

# Run the container
docker run -p 4000:4000 --env-file .env college-appointment-backend
```

3. **Using build scripts:**
```bash
# For Linux/Mac
./docker-build.sh

# For Windows
docker-build.bat
```

### Docker Configuration

The application includes:
- **Dockerfile** for backend containerization
- **docker-compose.yml** for multi-service orchestration
- **Health checks** for container monitoring
- **Security best practices** with non-root user
- **Production-ready** Alpine Linux base image

## ☁️ Cloud Deployment

### Current Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Vercel      │    │     Render      │    │    MongoDB      │
│   (Frontend)    │◄───┤   (Backend)     │◄───┤    Atlas        │
│                 │    │                 │    │   (Database)    │
│  React 19 App   │    │  Node.js API    │    │   Cloud DB      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend Deployment (Vercel)

**Automatic deployment from GitHub main branch**

1. **Environment Variables on Vercel:**
```env
VITE_API_BASE_URL=https://college-appointment-backend.onrender.com/api/v1
VITE_API_DOCS_URL=https://college-appointment-backend.onrender.com/api-docs
VITE_NODE_ENV=production
```

2. **Build Settings:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Backend Deployment (Render)

**Automatic deployment from Docker Hub**

1. **Environment Variables on Render:**
```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_production_jwt_secret
JWT_LIFETIME=7d
NODE_ENV=production
```

2. **Service Configuration:**
- Runtime: `Docker`
- Docker Image: `sajjad6ansari/college-appointment-backend:latest`
- Health Check Path: `/health`
- Auto-deploy: `Yes`

### Database (MongoDB Atlas)

**Cloud MongoDB cluster with:**
- **High Availability**: Multi-region replication
- **Security**: Network access lists and authentication
- **Performance**: Optimized indexes and connection pooling
- **Monitoring**: Real-time performance metrics

## 📚 API Documentation
The API documentation is available through Swagger at `/api-docs` when the server is running. The system includes comprehensive API endpoints for:

- **Authentication**: Registration, login, password reset with JWT token management
- **Profile Management**: Extended student and professor profiles with academic and professional information
- **Appointment System**: Comprehensive scheduling, management, and tracking capabilities
- **Dashboard Services**: Data aggregation, analytics, and system-wide statistics

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/v1/auth/register` | Register new user | `{ name, email, password, role }` |
| POST | `/api/v1/auth/login` | User login | `{ email, password, role }` |
| GET | `/api/v1/auth/me` | Get current user | Headers: `Authorization: Bearer <token>` |

### Student Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/student/profile` | Get student profile | Student |
| PATCH | `/api/v1/student/profile` | Update student profile | Student |
| GET | `/api/v1/student/professors` | Get all professors | Student |
| GET | `/api/v1/student/appointments` | Get student appointments | Student |
| POST | `/api/v1/student/appointments` | Book appointment | Student |
| PATCH | `/api/v1/student/appointments/:id` | Update appointment | Student |
| DELETE | `/api/v1/student/appointments/:id` | Cancel appointment | Student |
| GET | `/api/v1/student/dashboard` | Get dashboard data | Student |

### Professor Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/v1/professor/profile` | Get professor profile | Professor |
| PATCH | `/api/v1/professor/profile` | Update professor profile | Professor |
| GET | `/api/v1/professor/appointments` | Get professor appointments | Professor |
| PATCH | `/api/v1/professor/appointments/:id` | Update appointment status | Professor |
| GET | `/api/v1/professor/schedule` | Get available time slots | Professor |
| GET | `/api/v1/professor/dashboard` | Get dashboard data | Professor |
| POST | `/api/v1/professor/schedule` | Set availability | Professor |

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## ⚙️ Environment Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration  
MONGODB_URI=mongodb://localhost:27017/college-appointment-system
# For production use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
JWT_LIFETIME=7d

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:5173

# Health Check Configuration (optional)
HEALTH_CHECK_INTERVAL=30000

# Logging Configuration (optional)
LOG_LEVEL=info
```

### Frontend Environment Variables

#### Development (`.env.development`)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_API_DOCS_URL=http://localhost:4000/api-docs
VITE_API_ROOT_URL=http://localhost:4000

# Environment
VITE_NODE_ENV=development

# App Configuration
VITE_APP_NAME=College Appointment System
VITE_APP_VERSION=1.0.0
```

#### Production (`.env.production`)
```env
# API Configuration
VITE_API_BASE_URL=https://college-appointment-backend.onrender.com/api/v1
VITE_API_DOCS_URL=https://college-appointment-backend.onrender.com/api-docs
VITE_API_ROOT_URL=https://college-appointment-backend.onrender.com

# Environment
VITE_NODE_ENV=production

# App Configuration
VITE_APP_NAME=College Appointment System
VITE_APP_VERSION=1.0.0
```

### Security Best Practices

1. **JWT Secret**: Use a secure, randomly generated string (minimum 32 characters)
2. **Environment Files**: Never commit `.env` files to version control
3. **Production Secrets**: Use secure secret management in production
4. **Database Security**: Use strong passwords and network restrictions
5. **CORS Configuration**: Restrict origins in production environments

## 👥 Usage Guide

### For Students

1. **Registration/Login**
   - Navigate to the login page
   - Register as a "Student" or login with existing credentials
   - You'll be redirected to the student dashboard

2. **Booking Appointments**
   - Go to "Professors" tab to view all available professors
   - Click on a professor to view their profile and available slots
   - Select a time slot and click "Book Appointment"
   - Confirmation will be sent once professor approves

3. **Managing Appointments**
   - View all your appointments in the "Appointments" tab
   - Check status: Pending, Confirmed, or Cancelled
   - Cancel appointments if needed

### For Professors

1. **Registration/Login**
   - Register as a "Professor" with your credentials
   - Complete your profile with specialization details

2. **Setting Availability**
   - Go to "Schedule" tab to set your available time slots
   - Define your working hours and days
   - Set break times and unavailable periods

3. **Managing Appointments**
   - View incoming appointment requests
   - Accept or decline student requests
   - Reschedule if necessary

## 🛠️ Development Guide

### Code Style & Conventions

#### Frontend (React)
- Use functional components with hooks
- Follow naming convention: PascalCase for components, camelCase for functions
- Use Tailwind CSS for styling
- Implement error boundaries for robustness

#### Backend (Node.js)
- Use async/await for asynchronous operations
- Implement proper error handling middleware
- Follow RESTful API conventions
- Use Mongoose for MongoDB operations

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/appointment-booking

# Make changes and commit
git add .
git commit -m "feat: add appointment booking functionality"

# Push to remote
git push origin feature/appointment-booking

# Create Pull Request on GitHub
```

### Testing

#### Frontend Testing
```bash
cd frontend
npm run test
```

#### Backend Testing
```bash
cd backend
npm run test
```

### Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
```

#### Backend Production
```bash
cd backend
npm run start:prod
```

## � Testing

### Backend API Testing

#### Automated Testing Scripts

The project includes several testing utilities:

```bash
# Test all API endpoints (Windows)
cd backend
test-endpoints.bat

# Test all API endpoints (Linux/Mac)
./test-endpoints.sh

# Test beautiful documentation endpoint
test-beautiful-docs.bat
```

#### Manual API Testing

**Health Check:**
```bash
curl https://college-appointment-backend.onrender.com/health
```

**Test Registration:**
```bash
curl -X POST "https://college-appointment-backend.onrender.com/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "role": "student"
  }'
```

**Test Login:**
```bash
curl -X POST "https://college-appointment-backend.onrender.com/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Frontend Testing

#### Browser Testing

1. **Network Tab**: Monitor API calls and responses
2. **Console**: Check for JavaScript errors and debug output
3. **Application Tab**: Inspect localStorage for tokens and user data
4. **Performance Tab**: Monitor loading times and performance metrics

### Docker Testing

```bash
# Test Docker build
docker build -t test-backend ./backend

# Test Docker run
docker run -p 4000:4000 --env-file backend/.env test-backend

# Test health check
curl http://localhost:4000/health
```

### Deployment Testing

#### Vercel Frontend
```bash
# Test production build locally
cd frontend
npm run build
npm run preview
```

#### Render Backend
```bash
# Test Docker image
docker pull sajjad6ansari/college-appointment-backend:latest
docker run -p 4000:4000 sajjad6ansari/college-appointment-backend:latest
```

## �🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Project Repository**: [GitHub](https://github.com/sajjad6ansari/College-Appointment-System-API)
- **Issues**: [GitHub Issues](https://github.com/sajjad6ansari/College-Appointment-System-API/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sajjad6ansari/College-Appointment-System-API/discussions)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- Tailwind CSS for the utility-first styling approach
- All contributors who helped improve this project

---

<div align="center">

**Built with ❤️ for the academic community**

[⭐ Star this repo](https://github.com/sajjad6ansari/College-Appointment-System-API) | [🐛 Report Bug](https://github.com/sajjad6ansari/College-Appointment-System-API/issues) | [💡 Request Feature](https://github.com/sajjad6ansari/College-Appointment-System-API/issues)

</div>