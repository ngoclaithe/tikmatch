import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3099;

// Serve static prototype files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'prototype')));

// Health check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TikMatch',
    market: 'Angola (AO)',
    timestamp: new Date().toISOString()
  });
});

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'prototype', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[TikMatch] Express server listening on http://0.0.0.0:${PORT}`);
});
