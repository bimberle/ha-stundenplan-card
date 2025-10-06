const http = require('http');
const fs = require('fs');
const path = require('path');

// Load the IServ mock data
const isservData = JSON.parse(fs.readFileSync(path.join(__dirname, 'iserv-data.json'), 'utf8'));

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}`);

  // Handle IServ timetable requests
  if (url.pathname.includes('/iserv-timetable/content/')) {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      screenshots: isservData,
      message: 'Mock IServ data loaded successfully'
    }));
    return;
  }

  // Health check
  if (url.pathname === '/health') {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'healthy', service: 'iserv-mock' }));
    return;
  }

  // 404 for other routes
  res.writeHead(404);
  res.end('Not found');
});

const PORT = process.env.PORT || 8234;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 IServ Mock Server running on http://0.0.0.0:${PORT}`);
  console.log(`📊 Serving stundenplan data for david.kech`);
});