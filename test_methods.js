const https = require('https');
const { URL } = require('url');

const testCases = [
  { url: 'https://www.saladpuk.com/~gitbook/mcp', method: 'GET' },
  { url: 'https://www.saladpuk.com/~gitbook/mcp', method: 'POST' },
  { url: 'https://www.saladpuk.com/~gitbook/mcp/', method: 'GET' },
  { url: 'https://www.saladpuk.com/~gitbook/mcp/', method: 'POST' },
];

function runTest(testCase) {
  return new Promise((resolve) => {
    console.log(`\nTesting ${testCase.method} to ${testCase.url}...`);
    const parsedUrl = new URL(testCase.url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: testCase.method,
      headers: {
        'Accept': 'application/json, text/event-stream',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
      console.log('Headers:', JSON.stringify(res.headers, null, 2));
      let body = '';
      res.on('data', (d) => { body += d.toString(); });
      res.on('end', () => {
        console.log('Body length:', body.length);
        console.log('Body start:', body.substring(0, 500));
        resolve();
      });
    });

    req.on('error', (e) => {
      console.error('Request Error:', e.message);
      resolve();
    });

    if (testCase.method === 'POST') {
      req.write(JSON.stringify({}));
    }
    req.end();
  });
}

async function start() {
  for (const tc of testCases) {
    await runTest(tc);
  }
}

start();
