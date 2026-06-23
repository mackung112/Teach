const https = require('https');
const { URL } = require('url');

const toolName = process.argv[2];
const argsString = process.argv[3];

if (!toolName) {
  console.error('Usage: node mcp_query.js <toolName> <argumentsJsonString>');
  process.exit(1);
}

let toolArgs = {};
if (argsString) {
  try {
    toolArgs = JSON.parse(argsString);
  } catch (e) {
    console.error('Failed to parse arguments JSON:', e.message);
    process.exit(1);
  }
}

const urlString = 'https://www.saladpuk.com/~gitbook/mcp';
const payload = {
  jsonrpc: '2.0',
  method: 'tools/call',
  id: 42,
  params: {
    name: toolName,
    arguments: toolArgs
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
  let responseBody = '';
  res.on('data', (d) => { responseBody += d.toString(); });
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`HTTP Status: ${res.statusCode} ${res.statusMessage}`);
      console.error(responseBody);
      process.exit(1);
    }
    
    // Parse SSE format: event: message\ndata: {...}
    const lines = responseBody.split('\n');
    let dataJsonStr = '';
    for (const line of lines) {
      if (line.startsWith('data:')) {
        dataJsonStr += (dataJsonStr ? '\n' : '') + line.substring(5).trim();
      }
    }
    
    try {
      const json = JSON.parse(dataJsonStr);
      if (json.error) {
        console.error('MCP Error:', JSON.stringify(json.error, null, 2));
      } else {
        console.log(JSON.stringify(json.result, null, 2));
      }
    } catch (e) {
      console.error('Failed to parse response JSON:', e.message);
      console.log('Raw Response:', responseBody);
    }
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e.message);
});

req.write(body);
req.end();
