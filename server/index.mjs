import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pikudHaoref = require('pikud-haoref-api');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));

// Server-side cache: avoid hammering HFC API on every frontend poll
let alertCache = { ts: 0, alerts: [] };
const CACHE_TTL = 4000; // 4 seconds

app.get('/api/alerts', (req, res) => {
  if (Date.now() - alertCache.ts < CACHE_TTL) {
    return res.json({ alerts: alertCache.alerts });
  }

  pikudHaoref.getActiveAlert((err, alert) => {
    if (err) {
      console.error('[ratracker-server] getActiveAlert error:', err.message);
      return res.json({ alerts: [], error: err.message });
    }
    const alerts = alert ? [alert] : [];
    alertCache = { ts: Date.now(), alerts };
    res.json({ alerts });
  });
});

// Serve the built React app in production
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`[ratracker-server] Listening on http://localhost:${PORT}`);
});
