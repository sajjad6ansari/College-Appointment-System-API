@echo off
echo Testing College Appointment System Backend Endpoints...
echo =======================================================

set BASE_URL=https://college-appointment-backend.onrender.com

echo 1. Testing Health Endpoint...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/health' -Method GET | Select-Object -ExpandProperty Content"
echo.

echo 2. Testing Test Endpoint...
powershell -Command "try { Invoke-WebRequest -Uri '%BASE_URL%/api/v1/test' -Method GET | Select-Object -ExpandProperty Content } catch { Write-Host 'Test endpoint failed:' $_.Exception.Message }"
echo.

echo 3. Testing Auth Login Endpoint...
powershell -Command "try { $body = '{\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"student\"}'; Invoke-WebRequest -Uri '%BASE_URL%/api/v1/auth/login' -Method POST -ContentType 'application/json' -Body $body | Select-Object -ExpandProperty Content } catch { Write-Host 'Auth endpoint failed:' $_.Exception.Message }"
echo.

echo 4. Testing API Docs Endpoint...
powershell -Command "try { Invoke-WebRequest -Uri '%BASE_URL%/api-docs' -Method GET | Select-Object StatusCode } catch { Write-Host 'API docs endpoint failed:' $_.Exception.Message }"
echo.

echo Testing complete!