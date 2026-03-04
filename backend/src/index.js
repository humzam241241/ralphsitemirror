import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import { validateEnv } from './config/validateEnv.js';
import { verifyConnection } from './services/email.js';

import chatRouter from './routes/chat.js';
import ingestRouter from './routes/ingest.js';
import sitesRouter from './routes/sites.js';
import siteConfigRouter from './routes/siteConfig.js';
import leadsRouter from './routes/leads.js';
import contactRouter from './routes/contact.js';
import bookingsRouter from './routes/bookings.js';

validateEnv();
verifyConnection();

const app = express();
const PORT = process.env.PORT || 10000;
const isDev = process.env.NODE_ENV !== 'production';

app.set('trust proxy', 1);

app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: '1mb' }));

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

app.use(cors(
  isDev
    ? { origin: true, credentials: true }
    : {
        origin: (origin, cb) => {
          if (!origin) return cb(null, true);
          if (allowedOrigins.length === 0) {
            console.warn('⚠️  ALLOWED_ORIGINS not set - allowing all origins');
            return cb(null, true);
          }
          if (allowedOrigins.includes(origin) || allowedOrigins.some(allowed => origin.endsWith(allowed))) {
            return cb(null, true);
          }
          return cb(new Error('Not allowed by CORS'));
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
app.use('/api/contact', contactRouter);
app.use('/api/bookings', bookingsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
});

export default app;
