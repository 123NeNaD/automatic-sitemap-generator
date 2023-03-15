const express = require('express');
const http = require('http');

const app = express();

// Start all cron jobs
require('./controllers/crons-controller');

// Serve sitemaps
app.get('/api/v1/sitemaps/:sitemap', (req, res) => {
  const { sitemap } = req.params;
  return res.sendFile(path.join(__dirname, 'sitemaps', sitemap));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(`Requested endpoint "${req.originalUrl}" not found.`);
  const error = new Error('Endpoint Not Found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  console.log('Error: ', error);
  res.status(error.status || 500).json({ success: false });
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server is listening on port 3000.`);
});
