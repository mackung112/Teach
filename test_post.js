const https = require('https');
const { URL } = require('url');

const urlString = 'https://www.saladpuk.com/~gitbook/mcp';
const payload = {
  jsonrpc: '2.0',
  method: 'initialize',
  id: 1,
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  }
};

const body = JSON.stringify(payload);
const parsedUrl = new URL(urlString);
const options = {
  hostname: parsedUrl.hostname,
  path: parsedUrl.pathname + parsedUrl.search,
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/event-stream',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
  let responseBody = '';
  res.on('data', (d) => { responseBody += d.toString(); });
  res.on('end', () => {
    console.log('Response Body:', responseBody);
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e.message);
});

req.write(body);
req.end();
