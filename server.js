
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Cloud Run requires the application to listen on the port defined by the 
 * PORT environment variable, which defaults to 8080.
 */
const PORT = process.env.PORT || 8080;

// Serve from 'dist' if it exists (built files), otherwise serve from root
const getStaticDir = () => {
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) return distPath;
  return __dirname;
};

const STATIC_DIR = getStaticDir();

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Cloud Run Health Check for container orchestration
  if (req.url === '/_health') {
    res.writeHead(200);
    res.end('OK');
    return;
  }

  // Normalize the URL to find the local file path
  const url = req.url.split('?')[0];
  let filePath = path.join(STATIC_DIR, url === '/' ? 'index.html' : url);

  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // SPA routing: If the file doesn't exist, serve index.html 
        // and let the client-side router handle the path.
        fs.readFile(path.join(STATIC_DIR, 'index.html'), (err, indexContent) => {
          if (err) {
            res.writeHead(500);
            res.end('Critical Error: index.html not found.');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Successfully found and read the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Use 0.0.0.0 to ensure the server is reachable within the container network
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on port ${PORT}`);
  console.log(`Serving files from: ${STATIC_DIR}`);
});
