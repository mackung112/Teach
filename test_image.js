const https = require('https');

const testUrl = 'https://www.saladpuk.com/files/-lnsfu3kbei9k5_qswae';

https.get(testUrl, (res) => {
  console.log(`Status for ${testUrl}: ${res.statusCode} ${res.statusMessage}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
}).on('error', (e) => {
  console.error('Error checking image:', e.message);
});
