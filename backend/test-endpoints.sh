#!/bin/bash

echo "Testing College Appointment System Backend Endpoints..."
echo "======================================================="

BASE_URL="https://college-appointment-backend.onrender.com"

echo "1. Testing Health Endpoint..."
curl -s "$BASE_URL/health" | jq '.' || echo "Health endpoint failed"
echo ""

echo "2. Testing Test Endpoint..."
curl -s "$BASE_URL/api/v1/test" | jq '.' || echo "Test endpoint failed"
echo ""

echo "3. Testing Auth Login Endpoint..."
curl -s -X POST "$BASE_URL/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","role":"student"}' | jq '.' || echo "Auth endpoint failed"
echo ""

echo "4. Testing API Docs Endpoint..."
curl -s -I "$BASE_URL/api-docs" | head -n 1 || echo "API docs endpoint failed"
echo ""

echo "Testing complete!"