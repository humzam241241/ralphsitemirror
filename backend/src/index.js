import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import chatRouter from './routes/chat.js';
import ingestRouter from './routes/ingest.js';
import sitesRouter from './routes/sites.js';
import siteConfigRouter from './routes/siteConfig.js';
import leadsRouter from './routes/leads.js';

const app = express();
const PORT = process.env.PORT || 8000;
const isDev = process.env.NODE_ENV !== 'production';

app.set('trust proxy', 1);

app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: '1mb' }));

app.use(cors(
  isDev
    ? { origin: true, credentials: true }
    : {
        origin: (origin, cb) => {
          if (!origin) return cb(null, true);
          cb(null, true);
        },
        credentials: true,
      }
));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/chat', chatRouter);
app.use('/api/ingest', ingestRouter);
app.use('/api/sites', sitesRouter);
app.use('/api/site-config', siteConfigRouter);
app.use('/api/leads', leadsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${isDev ? 'development' : 'production'})`);
});

export default app;
