const https = require('https');

const url = 'https://www.saladpuk.com/basic/uml/sequence-diagram';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', (d) => { html += d.toString(); });
  res.on('end', () => {
    console.log(`HTTP Status: ${res.statusCode}`);
    
    // Find all img tags or paths containing gitbook or files
    // Let's use a regex to find all src attributes
    const srcRegex = /src="([^"]+)"/g;
    let match;
    const urls = [];
    while ((match = srcRegex.exec(html)) !== null) {
      const src = match[1];
      if (src.includes('gitbook') || src.includes('files') || src.includes('saladpuk')) {
        urls.push(src);
      }
    }
    
    console.log(`Found ${urls.length} image URLs:`);
    console.log(JSON.stringify(urls, null, 2));
  });
}).on('error', (e) => {
  console.error('Error fetching HTML:', e.message);
});
