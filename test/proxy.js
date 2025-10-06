const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Nur GET-Requests für IServ-API erlauben
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Ziel-URL aus Query-Parameter extrahieren
  const urlParams = new URL(req.url, `http://localhost:${PORT}`);
  const targetUrl = urlParams.searchParams.get('url');

  if (!targetUrl || !targetUrl.includes('172.17.0.5:8234')) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid or missing target URL' }));
    return;
  }

  console.log(`Proxying request to: ${targetUrl}`);

  // Proxy-Request erstellen
  const targetUrlObj = new URL(targetUrl);
  const requestOptions = {
    hostname: targetUrlObj.hostname,
    port: targetUrlObj.port,
    path: targetUrlObj.pathname + targetUrlObj.search,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'HA-Stundenplan-Card-Proxy/1.0'
    }
  };

  const proxyReq = http.request(requestOptions, (proxyRes) => {
    // Headers weiterleiten
    res.writeHead(proxyRes.statusCode, {
      'Content-Type': proxyRes.headers['content-type'] || 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    // Daten weiterleiten
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (error) => {
    console.error('Proxy request failed:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Proxy request failed', details: error.message }));
  });

  proxyReq.end();
});

server.listen(PORT, () => {
  console.log(`🔄 CORS Proxy running on http://localhost:${PORT}`);
  console.log(`📡 Usage: http://localhost:${PORT}/?url=<target_url>`);
});