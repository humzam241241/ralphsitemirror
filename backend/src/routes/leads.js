import { Router } from 'express';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';
import { leadSubmissionLimiter } from '../middleware/rateLimiter.js';
import { sanitizeLeadInput } from '../middleware/sanitize.js';

const router = Router();

router.post('/', leadSubmissionLimiter, sanitizeLeadInput, async (req, res) => {
  try {
    const { site_id, name, email, phone, message, page_url } = req.body;

    if (!site_id) {
      return res.status(400).json({ error: 'site_id is required' });
    }

    if (!email && !phone && !name) {
      return res.status(400).json({ error: 'At least one contact field (name, email, or phone) is required' });
    }

    const siteCheck = await query('SELECT id FROM sites WHERE id = $1', [site_id]);
    if (siteCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const result = await query(
      `INSERT INTO leads (site_id, name, email, phone, message, page_url, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [site_id, name || null, email || null, phone || null, message || null, page_url || null, 'widget']
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! We will be in touch soon.',
      lead_id: result.rows[0].id,
    });
  } catch (err) {
    console.error('Create lead error:', err);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

router.get('/:site_id', requireAdmin, async (req, res) => {
  try {
    const { site_id } = req.params;

    const result = await query(
      'SELECT * FROM leads WHERE site_id = $1 ORDER BY created_at DESC',
      [site_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('List leads error:', err);
    res.status(500).json({ error: 'Failed to list leads' });
  }
});

export default router;
