const https = require('https');
const { URL } = require('url');

const BASE_URL = 'https://www.saladpuk.com/~gitbook/mcp';
let postUrlString = null;
let sseRequest = null;
let messageId = 1;
const pendingRequests = new Map();

console.log('Connecting to GitBook MCP Server at:', BASE_URL);

// 1. Establish SSE Connection (GET)
const sseUrl = new URL(BASE_URL);
const options = {
  hostname: sseUrl.hostname,
  path: sseUrl.pathname + sseUrl.search,
  method: 'GET',
  headers: {
    'Accept': 'application/json, text/event-stream',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  }
};

let buffer = '';

sseRequest = https.request(options, (res) => {
  console.log(`SSE Connection status: ${res.statusCode} ${res.statusMessage}`);
  if (res.statusCode !== 200) {
    console.error('Failed to establish SSE connection.');
    res.on('data', (d) => console.log('Response body:', d.toString()));
    process.exit(1);
  }

  res.on('data', (chunk) => {
    buffer += chunk.toString();
    const parts = buffer.split(/\r?\n\r?\n/);
    buffer = parts.pop() || ''; // Keep last unfinished block in buffer
    for (const part of parts) {
      if (part.trim()) {
        parseSSEEvent(part);
      }
    }
  });

  res.on('end', () => {
    console.log('SSE Stream closed by server.');
    process.exit(0);
  });
});

sseRequest.on('error', (err) => {
  console.error('SSE Request Error:', err);
  process.exit(1);
});

sseRequest.end();

function parseSSEEvent(eventText) {
  const lines = eventText.split(/\r?\n/);
  let eventName = '';
  let eventData = '';
  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventName = line.substring(6).trim();
    } else if (line.startsWith('data:')) {
      // Append data, handle multi-line data
      const dataVal = line.substring(5).trim();
      eventData += (eventData ? '\n' : '') + dataVal;
    }
  }
  if (eventName && eventData) {
    handleEvent(eventName, eventData);
  } else if (!eventName && eventData) {
    // If no event name, default event in SSE is usually message
    handleEvent('message', eventData);
  }
}

function handleEvent(name, data) {
  console.log(`\n--- Received Event: ${name} ---`);
  
  if (name === 'endpoint') {
    console.log('Endpoint URL received:', data);
    // Resolve relative vs absolute URL
    try {
      const resolved = new URL(data, BASE_URL);
      postUrlString = resolved.toString();
      console.log('Resolved POST URL:', postUrlString);
      
      // Now that we have the endpoint, send the initialize request
      sendInitialize();
    } catch (e) {
      console.error('Failed to resolve POST URL:', e);
    }
  } else if (name === 'message') {
    try {
      const json = JSON.parse(data);
      console.log('Message content:', JSON.stringify(json, null, 2));
      
      // Check if it's a response to a pending request
      if (json.id !== undefined && pendingRequests.has(json.id)) {
        const handler = pendingRequests.get(json.id);
        pendingRequests.delete(json.id);
        handler(json);
      }
    } catch (e) {
      console.error('Failed to parse message JSON:', e);
      console.log('Raw message data:', data);
    }
  } else {
    console.log('Unknown event data:', data);
  }
}

function sendPost(payload, onResponse) {
  if (!postUrlString) {
    console.error('Cannot send POST, endpoint URL not set yet.');
    return;
  }
  const postUrl = new URL(postUrlString);
  const body = JSON.stringify(payload);
  const options = {
    hostname: postUrl.hostname,
    path: postUrl.pathname + postUrl.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  };

  const req = https.request(options, (res) => {
    let postResBody = '';
    res.on('data', (d) => {
      postResBody += d.toString();
    });
    res.on('end', () => {
      console.log(`POST Status: ${res.statusCode} ${res.statusMessage}`);
      if (postResBody) {
        console.log('POST Response Body:', postResBody);
        try {
          const json = JSON.parse(postResBody);
          if (onResponse) onResponse(json);
        } catch (e) {
          // POST response might not be JSON or might be empty
        }
      }
    });
  });

  req.on('error', (err) => {
    console.error('POST Error:', err);
  });

  req.write(body);
  req.end();
}

function sendInitialize() {
  const reqId = messageId++;
  const payload = {
    jsonrpc: '2.0',
    method: 'initialize',
    id: reqId,
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-mcp-client',
        version: '1.0.0'
      }
    }
  };
  
  console.log(`Sending initialize request (id: ${reqId})...`);
  
  pendingRequests.set(reqId, (response) => {
    console.log('Initialization response received!');
    // After initialization, we must send initialized notification
    sendInitializedNotification();
    
    // Then list resources or tools
    listResources();
  });

  sendPost(payload);
}

function sendInitializedNotification() {
  const payload = {
    jsonrpc: '2.0',
    method: 'notifications/initialized'
  };
  console.log('Sending notifications/initialized...');
  sendPost(payload);
}

function listResources() {
  const reqId = messageId++;
  const payload = {
    jsonrpc: '2.0',
    method: 'resources/list',
    id: reqId,
    params: {}
  };
  console.log(`Sending resources/list request (id: ${reqId})...`);
  
  pendingRequests.set(reqId, (response) => {
    console.log('Resources list response received:');
    console.log(JSON.stringify(response, null, 2));
    
    // Check if we can find lesson 2.4 here
    // If not, we might try tools/list or prompts/list
    listTools();
  });

  sendPost(payload);
}

function listTools() {
  const reqId = messageId++;
  const payload = {
    jsonrpc: '2.0',
    method: 'tools/list',
    id: reqId,
    params: {}
  };
  console.log(`Sending tools/list request (id: ${reqId})...`);
  
  pendingRequests.set(reqId, (response) => {
    console.log('Tools list response received:');
    console.log(JSON.stringify(response, null, 2));
    
    // We can also try prompts/list
    listPrompts();
  });

  sendPost(payload);
}

function listPrompts() {
  const reqId = messageId++;
  const payload = {
    jsonrpc: '2.0',
    method: 'prompts/list',
    id: reqId,
    params: {}
  };
  console.log(`Sending prompts/list request (id: ${reqId})...`);
  
  pendingRequests.set(reqId, (response) => {
    console.log('Prompts list response received:');
    console.log(JSON.stringify(response, null, 2));
    console.log('Exiting...');
    if (sseRequest) {
      sseRequest.destroy();
    }
    process.exit(0);
  });

  sendPost(payload);
}
