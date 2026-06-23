const https = require('https');
const { URL } = require('url');

const urlString = 'https://www.saladpuk.com/~gitbook/mcp';

function callMCP(toolName, args) {
  return new Promise((resolve, reject) => {
    const payload = {
      jsonrpc: '2.0',
      method: 'tools/call',
      id: Date.now(),
      params: {
        name: toolName,
        arguments: args
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
          reject(new Error(`HTTP Status ${res.statusCode}: ${responseBody}`));
          return;
        }

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
            reject(new Error(JSON.stringify(json.error)));
          } else {
            resolve(json.result);
          }
        } catch (e) {
          reject(new Error(`JSON Parse Error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const testPaths = [
  'SUMMARY.md',
  'SUMMARY',
  'summary.md',
  'summary',
  'README.md',
  'README',
  'readme.md',
  'readme'
];

async function run() {
  for (const path of testPaths) {
    const url = `https://www.saladpuk.com/${path}`;
    try {
      console.log(`Fetching: ${url} ...`);
      const result = await callMCP('getPage', { url });
      if (result && result.isError) {
        console.log(`❌ Error for ${url}: ${result.content[0].text}`);
      } else {
        console.log(`✅ SUCCESS for ${url}! Length: ${result.content[0].text.length}`);
        console.log(`Preview: ${result.content[0].text.substring(0, 200)}...\n`);
      }
    } catch (e) {
      console.log(`💥 Exception for ${url}:`, e.message);
    }
  }
}

run();
