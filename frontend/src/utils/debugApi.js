// Frontend API Test - Run this in browser console on your Vercel site
// to debug the network errors

console.log('🔍 Testing College Appointment System API Connection...');

// Test 1: Check if BASE_URL is correct
const BASE_URL = 'https://college-appointment-backend.onrender.com/api/v1';
console.log('📍 Base URL:', BASE_URL);

// Test 2: Simple fetch test
async function testConnection() {
  try {
    console.log('🔄 Testing health endpoint...');
    const healthResponse = await fetch('https://college-appointment-backend.onrender.com/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.error('❌ Health check failed:', error);
  }

  try {
    console.log('🔄 Testing test endpoint...');
    const testResponse = await fetch('https://college-appointment-backend.onrender.com/api/v1/test');
    const testData = await testResponse.json();
    console.log('✅ Test endpoint:', testData);
  } catch (error) {
    console.error('❌ Test endpoint failed:', error);
  }

  try {
    console.log('🔄 Testing registration endpoint...');
    const registerResponse = await fetch('https://college-appointment-backend.onrender.com/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        role: 'student'
      })
    });
    
    console.log('📊 Registration response status:', registerResponse.status);
    const registerData = await registerResponse.json();
    console.log('📄 Registration response:', registerData);
  } catch (error) {
    console.error('❌ Registration failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

// Run tests
testConnection();

// Also test what the current frontend is using
try {
  // Check if API_ENDPOINTS is available
  console.log('🔍 Checking API_ENDPOINTS...');
  // This will only work if you import the file
} catch (error) {
  console.log('⚠️ API_ENDPOINTS not available in console');
}

console.log('✨ Test complete! Check the console output above.');