// Test script to verify footer API links
const testFooterLinks = () => {
  const links = [
    {
      name: 'API Documentation (Swagger UI)',
      url: 'https://college-appointment-backend.onrender.com/api-docs',
      expected: 'Interactive Swagger UI'
    },
    {
      name: 'Swagger JSON',
      url: 'https://college-appointment-backend.onrender.com/api/v1/docs',
      expected: 'OpenAPI JSON specification'
    },
    {
      name: 'API Info',
      url: 'https://college-appointment-backend.onrender.com/api/v1/docs/info',
      expected: 'API metadata'
    }
  ];

  console.log('🔗 Testing Footer API Documentation Links:');
  console.log('============================================');
  
  links.forEach(async (link, index) => {
    try {
      console.log(`${index + 1}. Testing ${link.name}...`);
      const response = await fetch(link.url);
      
      if (response.ok) {
        console.log(`   ✅ Status: ${response.status} - ${link.expected}`);
      } else {
        console.log(`   ❌ Status: ${response.status} - Failed`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  });
};

// Export for use in React components
export { testFooterLinks };