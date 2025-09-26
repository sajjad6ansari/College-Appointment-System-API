@echo off
echo 🐳 Building College Appointment System Backend Docker Image...

cd backend

docker build -t college-appointment-backend:latest .

if %errorlevel% equ 0 (
    echo ✅ Docker image built successfully!
    echo 📊 Image details:
    docker images college-appointment-backend:latest
    echo.
    echo 🚀 To run the container:
    echo    docker run -p 4000:4000 --env-file .env college-appointment-backend:latest
    echo.
    echo 🏗️  Or use Docker Compose from root directory:
    echo    docker-compose up -d
) else (
    echo ❌ Docker build failed!
    exit /b 1
)