#!/bin/bash

# Docker Build Script for College Appointment System Backend

echo "🐳 Building College Appointment System Backend Docker Image..."

# Navigate to backend directory
cd backend

# Build the Docker image
docker build -t college-appointment-backend:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo "📊 Image details:"
    docker images college-appointment-backend:latest
    echo ""
    echo "🚀 To run the container:"
    echo "   docker run -p 4000:4000 --env-file .env college-appointment-backend:latest"
    echo ""
    echo "🏗️  Or use Docker Compose from root directory:"
    echo "   docker-compose up -d"
else
    echo "❌ Docker build failed!"
    exit 1
fi