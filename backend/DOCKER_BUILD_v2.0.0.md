# Docker Image v2.0.0 - Professional Refactored Backend

## Build Information
- **Build Date**: 2025-09-27T05:24:00Z
- **Image Tag**: sajjad6ansari/college-appointment-backend:v2.0.0
- **Latest Tag**: sajjad6ansari/college-appointment-backend:latest
- **Digest**: sha256:2ffa98486e740a831a739c38d0859279e24e8f269941e0876fe689bc4dc9b4ff

## What's New in v2.0.0
- Clean, professional app.js (158 lines vs 381 lines)
- Professional API documentation HTML files
- Removed unused files and dependencies
- Enhanced error handling and middleware
- Optimized Docker build process
- Professional security configuration

## Usage
```bash
docker pull sajjad6ansari/college-appointment-backend:v2.0.0
docker run -p 4000:4000 \
  -e MONGO_URI="your_mongodb_connection_string" \
  -e JWT_SECRET="your_jwt_secret" \
  -e JWT_LIFETIME="7d" \
  sajjad6ansari/college-appointment-backend:v2.0.0
```

## Environment Variables Required
- MONGO_URI: MongoDB connection string
- JWT_SECRET: JWT signing secret
- JWT_LIFETIME: Token expiration time (optional, default: 30d)
- PORT: Port number (optional, default: 4000)