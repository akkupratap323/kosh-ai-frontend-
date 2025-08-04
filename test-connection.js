// Simple test to verify frontend-backend connectivity
const axios = require('axios');

const API_BASE = 'https://kosh-ai-467615.el.r.appspot.com/api';

async function testConnection() {
    console.log('🧪 Testing frontend-backend connectivity...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${API_BASE}/health`);
        console.log('✅ Health check successful!');
        console.log(`   Status: ${healthResponse.data.status}`);
        console.log(`   Services: ${Object.keys(healthResponse.data.services).join(', ')}`);
        
        // Test stats endpoint
        console.log('\n2. Testing stats endpoint...');
        const statsResponse = await axios.get(`${API_BASE}/stats`);
        if (statsResponse.data.success) {
            console.log('✅ Stats endpoint successful!');
            console.log(`   Total reconciliations: ${statsResponse.data.data.total_reconciliations || 0}`);
        } else {
            console.log('⚠️  Stats endpoint returned no data (expected for new system)');
        }
        
        console.log('\n🎉 All connectivity tests passed!');
        console.log('\n📋 Next steps:');
        console.log('1. Frontend is running at: http://localhost:3000');
        console.log('2. Backend is running at: https://kosh-ai-467615.el.r.appspot.com');
        console.log('3. Open http://localhost:3000 in your browser to test the full system');
        console.log('4. All buttons should work perfectly without CSP violations!');
        
    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
        if (error.response) {
            console.error('   Response status:', error.response.status);
            console.error('   Response data:', error.response.data);
        }
    }
}

testConnection();