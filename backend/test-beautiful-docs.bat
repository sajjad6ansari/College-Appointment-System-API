@echo off
echo 🎨 Testing Beautiful API Documentation Endpoints
echo ==================================================

set BASE_URL=https://college-appointment-backend.onrender.com

echo.
echo 1. 📖 Testing Interactive Swagger UI...
powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/api-docs' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Interactive Swagger UI Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

echo.
echo 2. 📄 Testing Beautiful API Specification...
powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/api/v1/docs' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Beautiful API Spec Page Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

echo.
echo 3. ℹ️ Testing Beautiful API Overview...
powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/api/v1/docs/info' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Beautiful API Info Page Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

echo.
echo 4. 📱 Testing Raw JSON Endpoints (for developers)...
powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/api/v1/docs/json' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Raw Swagger JSON Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/api/v1/docs/info/json' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Raw API Info JSON Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

echo.
echo 5. 💚 Testing Health Check...
powershell -Command "try { $response = Invoke-WebRequest '%BASE_URL%/health' -Method GET; Write-Host '✅ Status:' $response.StatusCode '- Health Check Available' } catch { Write-Host '❌ Failed:' $_.Exception.Message }"

echo.
echo 🎉 Test Complete! 
echo.
echo 🌐 Visit these beautiful pages in your browser:
echo    • Interactive Docs: %BASE_URL%/api-docs
echo    • API Specification: %BASE_URL%/api/v1/docs  
echo    • API Overview: %BASE_URL%/api/v1/docs/info
echo.
pause