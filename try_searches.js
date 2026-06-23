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

const terms = [
  'uml',
  'ooad',
  'sequence',
  'diagram',
  'แผนภาพ',
  'ลำดับ',
  '31910',
  '2003',
  '2.4',
  'class',
  'usecase',
  'interaction'
];

async function run() {
  for (const term of terms) {
    try {
      console.log(`Searching for "${term}"...`);
      const result = await callMCP('searchDocumentation', { query: term });
      if (result && result.content && result.content.length > 0) {
        console.log(`✅ Success for "${term}": Found ${result.content.length} results!`);
        console.log(JSON.stringify(result.content.slice(0, 2), null, 2));
      } else {
        console.log(`❌ No results for "${term}"`);
      }
    } catch (e) {
      console.error(`Error for "${term}":`, e.message);
    }
  }
}

run();
