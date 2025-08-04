// Test the file upload process to debug the 500 error
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function testUpload() {
    console.log('🧪 Testing file upload to debug 500 error...\n');
    
    try {
        // Create a simple test CSV
        const csvContent = `Date,Description,Amount,Reference
2024-08-04,Test Transaction 1,1000.00,REF001
2024-08-05,Test Transaction 2,-500.00,REF002
2024-08-06,Test Transaction 3,2000.00,REF003`;
        
        const testFilePath = 'C:\\Users\\Aditya\\Desktop\\test-upload.csv';
        fs.writeFileSync(testFilePath, csvContent);
        
        console.log('1. Created test CSV file');
        console.log('   Content:', csvContent.replace(/\n/g, '\\n'));
        
        // Create form data
        const form = new FormData();
        form.append('file', fs.createReadStream(testFilePath));
        
        console.log('\n2. Uploading to backend...');
        
        const response = await axios.post(
            'https://kosh-ai-467615.el.r.appspot.com/api/upload-bank-statement', 
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'Accept': 'application/json'
                },
                timeout: 30000
            }
        );
        
        console.log('✅ Upload successful!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        
        // Clean up
        fs.unlinkSync(testFilePath);
        
    } catch (error) {
        console.error('❌ Upload failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
        
        // Try to get more detailed logs from the health endpoint
        console.log('\n🔍 Checking backend health for more details...');
        try {
            const healthResponse = await axios.get('https://kosh-ai-467615.el.r.appspot.com/api/health');
            console.log('Backend status:', healthResponse.data.status);
            console.log('Services:', Object.keys(healthResponse.data.services));
        } catch (healthError) {
            console.error('Health check also failed:', healthError.message);
        }
    }
}

testUpload();