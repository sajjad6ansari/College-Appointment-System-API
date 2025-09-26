require("dotenv").config()
require("express-async-errors")

const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const authenticateUser = require("./middlewares/authentication")
const notFoundMiddleware = require("./middlewares/notFound")

const authRoutes = require("./routes/auth")
const studentRoutes = require("./routes/student")
const professorRoutes = require("./routes/professor")

app.use(express.json())
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}))

// Configure CORS - allow all origins for now
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(xss())

const path = require("path");

// Serve home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});


const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Beautiful Swagger Documentation endpoint
app.get("/api/v1/docs", (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Documentation - College Appointment System</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
  </head>
  <body class="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">📚 API Documentation</h1>
        <p class="text-xl text-blue-200 mb-6">College Appointment System</p>
        <div class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
          <div class="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
          API Status: Online
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-12">
        <a href="${baseUrl}/api-docs" class="block bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-3xl mb-4">🔧</div>
          <h3 class="text-xl font-semibold text-white mb-2">Interactive Docs</h3>
          <p class="text-blue-200 text-sm">Test endpoints directly with Swagger UI</p>
        </a>
        
        <a href="${baseUrl}/api/v1/docs/info" class="block bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-3xl mb-4">ℹ️</div>
          <h3 class="text-xl font-semibold text-white mb-2">API Information</h3>
          <p class="text-blue-200 text-sm">Quick reference and endpoint overview</p>
        </a>
        
        <a href="${baseUrl}/health" class="block bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
          <div class="text-3xl mb-4">💚</div>
          <h3 class="text-xl font-semibold text-white mb-2">Health Check</h3>
          <p class="text-blue-200 text-sm">Monitor API status and uptime</p>
        </a>
      </div>

      <!-- OpenAPI Specification -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">📄 OpenAPI Specification</h2>
          <button onclick="downloadJSON()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            📥 Download JSON
          </button>
        </div>
        
        <div class="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <pre><code class="language-json">${JSON.stringify(swaggerDocument, null, 2)}</code></pre>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-blue-200 text-sm">
        <p>🚀 College Appointment System API • Version ${swaggerDocument.info.version}</p>
        <p class="mt-2">
          <a href="https://github.com/sajjad6ansari/College-Appointment-System-API" class="hover:text-white transition-colors">GitHub</a> • 
          <a href="https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system" class="hover:text-white transition-colors">Postman</a>
        </p>
      </div>
    </div>

    <script>
      function downloadJSON() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(${JSON.stringify(swaggerDocument)}, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "college-appointment-api-spec.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }
    </script>
  </body>
  </html>`;
  
  res.send(htmlContent);
});

// Beautiful API Information endpoint
app.get("/api/v1/docs/info", (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Information - College Appointment System</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-block p-4 bg-white/10 rounded-full mb-4">
          <div class="text-6xl">🎓</div>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4">College Appointment System</h1>
        <p class="text-xl text-purple-200">REST API Information & Quick Reference</p>
      </div>

      <!-- API Stats -->
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-green-400">✅</div>
          <div class="text-white font-semibold mt-2">Status</div>
          <div class="text-green-300 text-sm">Online</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-blue-400">📱</div>
          <div class="text-white font-semibold mt-2">Version</div>
          <div class="text-blue-300 text-sm">v${swaggerDocument.info.version}</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-yellow-400">🔗</div>
          <div class="text-white font-semibold mt-2">Endpoints</div>
          <div class="text-yellow-300 text-sm">15+ Routes</div>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <div class="text-3xl font-bold text-purple-400">🔐</div>
          <div class="text-white font-semibold mt-2">Security</div>
          <div class="text-purple-300 text-sm">JWT Auth</div>
        </div>
      </div>

      <!-- Endpoints Overview -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <!-- Authentication -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">🔐</span> Authentication
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-green-400 font-mono text-sm">POST</span>
              <span class="text-white">/api/v1/auth/register</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-blue-400 font-mono text-sm">POST</span>
              <span class="text-white">/api/v1/auth/login</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/auth/me</span>
            </div>
          </div>
        </div>

        <!-- Student Endpoints -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">👨‍🎓</span> Student
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/student/professors</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-green-400 font-mono text-sm">POST</span>
              <span class="text-white">/api/v1/student/appointments</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/student/profile</span>
            </div>
          </div>
        </div>

        <!-- Professor Endpoints -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">👨‍🏫</span> Professor
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/professor/appointments</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-yellow-400 font-mono text-sm">PATCH</span>
              <span class="text-white">/api/v1/professor/schedule</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/professor/profile</span>
            </div>
          </div>
        </div>

        <!-- System Endpoints -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center">
            <span class="text-2xl mr-2">⚙️</span> System
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/health</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api-docs</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-white/5 rounded">
              <span class="text-cyan-400 font-mono text-sm">GET</span>
              <span class="text-white">/api/v1/test</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
        <h3 class="text-2xl font-bold text-white mb-6 text-center">🔗 Quick Links</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="${baseUrl}/api-docs" class="block p-4 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg text-center transition-all duration-300 hover:scale-105">
            <div class="text-2xl mb-2">📖</div>
            <span class="text-white font-medium">Swagger UI</span>
          </a>
          <a href="${baseUrl}/api/v1/docs" class="block p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg text-center transition-all duration-300 hover:scale-105">
            <div class="text-2xl mb-2">📄</div>
            <span class="text-white font-medium">API Spec</span>
          </a>
          <a href="https://github.com/sajjad6ansari/College-Appointment-System-API" class="block p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg text-center transition-all duration-300 hover:scale-105">
            <div class="text-2xl mb-2">📦</div>
            <span class="text-white font-medium">GitHub</span>
          </a>
          <a href="https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system" class="block p-4 bg-orange-600/20 hover:bg-orange-600/30 rounded-lg text-center transition-all duration-300 hover:scale-105">
            <div class="text-2xl mb-2">📮</div>
            <span class="text-white font-medium">Postman</span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center text-purple-200 text-sm">
        <p>🚀 Built with Express.js, MongoDB, and JWT Authentication</p>
        <p class="mt-2">© 2025 College Appointment System API</p>
      </div>
    </div>
  </body>
  </html>`;
  
  res.send(htmlContent);
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/student", authenticateUser, studentRoutes)
app.use("/api/v1/professor", authenticateUser, professorRoutes)

// Health check endpoint for Docker
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Raw JSON endpoints for developers
app.get("/api/v1/docs/json", (req, res) => {
  res.json(swaggerDocument);
});

app.get("/api/v1/docs/info/json", (req, res) => {
  res.json({
    title: "College Appointment System API",
    version: swaggerDocument.info.version,
    description: "REST API for College Appointment Booking System",
    baseUrl: req.protocol + '://' + req.get('host'),
    endpoints: {
      interactive_docs: "/api-docs",
      api_documentation: "/api/v1/docs", 
      api_info: "/api/v1/docs/info",
      raw_swagger_json: "/api/v1/docs/json",
      raw_info_json: "/api/v1/docs/info/json",
      health_check: "/health",
      test_endpoint: "/api/v1/test"
    },
    authentication: {
      type: "JWT Bearer Token",
      header: "Authorization: Bearer <token>",
      endpoints: {
        register: "/api/v1/auth/register",
        login: "/api/v1/auth/login",
        profile: "/api/v1/auth/me"
      }
    },
    external_links: {
      github: "https://github.com/sajjad6ansari/College-Appointment-System-API",
      postman: "https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system"
    }
  });
});

app.use(notFoundMiddleware)

const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on the port ${port}........`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
