// Load environment variables and handle async errors
require("dotenv").config();
require("express-async-errors");

// Import required packages
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// Import database connection
const connectDB = require("./db/connect");

// Import middleware
const authenticateUser = require("./middlewares/authentication");
const notFoundMiddleware = require("./middlewares/notFound");

// Import route handlers
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const professorRoutes = require("./routes/professor");

// Initialize Express app
const app = express();

// MIDDLEWARE CONFIGURATION
// Body parsing middleware
app.use(express.json());

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration - allow all origins for development
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));

// XSS protection
app.use(xss());

// STATIC FILES & DOCUMENTATION

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Load Swagger documentation
const swaggerDocument = YAML.load("./swagger.yaml");

// ROUTES DEFINITION

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "College Appointment System API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development"
  });
});

// API DOCUMENTATION ROUTES

// Interactive Swagger UI documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customSiteTitle: "College Appointment System API",
  customfavIcon: "/favicon.ico",
  customCss: `
    .topbar-wrapper img { content: url('/favicon.ico'); }
    .swagger-ui .topbar { background-color: #1e40af; }
  `
}));

// Beautiful API documentation page
app.get("/api/v1/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "api-docs.html"));
});

// API information page
app.get("/api/v1/docs/info", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "api-info.html"));
});

// API specification endpoint
app.get("/api/v1/spec", (req, res) => {
  res.json(swaggerDocument);
});

// API ROUTES

// Authentication routes (public)
app.use("/api/v1/auth", authRoutes);

// Protected routes (require authentication)
app.use("/api/v1/student", authenticateUser, studentRoutes);
app.use("/api/v1/professor", authenticateUser, professorRoutes);

// ERROR HANDLING

// 404 handler - must be last
app.use(notFoundMiddleware);


const port = process.env.PORT || 4000;

/*
  Start the server and connect to MongoDB
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
       
      // Show environment info in development
      if (process.env.NODE_ENV !== "production") {
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`API Info: http://localhost:${port}/api/v1/docs/info`);
      }
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start the application
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

module.exports = app;