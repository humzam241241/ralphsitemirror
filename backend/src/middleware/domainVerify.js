import { query } from '../config/database.js';

export async function verifyDomain(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  const siteId = req.body.site_id || req.params.site_id;
  if (!siteId) {
    return res.status(400).json({ error: 'site_id is required' });
  }

  const origin = req.headers.origin || req.headers.referer;
  if (!origin) {
    return res.status(403).json({ error: 'Origin header required in production' });
  }

  try {
    const hostname = new URL(origin).hostname;
    const result = await query('SELECT domain FROM sites WHERE id = $1', [siteId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const siteDomain = result.rows[0].domain.replace(/^www\./, '');
    const requestDomain = hostname.replace(/^www\./, '');

    if (siteDomain !== requestDomain) {
      return res.status(403).json({ error: 'Domain mismatch' });
    }

    next();
  } catch (err) {
    console.error('Domain verification error:', err);
    return res.status(500).json({ error: 'Domain verification failed' });
  }
}
