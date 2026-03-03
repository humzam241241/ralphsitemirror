import { Router } from 'express';
import { query } from '../config/database.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const result = await query(
      'SELECT id, company_name, domain, primary_color, tone, welcome_message, created_at FROM sites ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('List sites error:', err);
    res.status(500).json({ error: 'Failed to list sites' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { company_name, domain, primary_color, tone, custom_prompt, welcome_message } = req.body;

    if (!company_name || !domain) {
      return res.status(400).json({ error: 'company_name and domain are required' });
    }

    const result = await query(
      `INSERT INTO sites (company_name, domain, primary_color, tone, custom_prompt, welcome_message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        company_name,
        domain.replace(/^https?:\/\//, '').replace(/\/+$/, ''),
        primary_color || '#f8b427',
        tone || 'friendly and professional',
        custom_prompt || null,
        welcome_message || 'Hi! How can I help you today?',
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create site error:', err);
    res.status(500).json({ error: 'Failed to create site' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM sites WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get site error:', err);
    res.status(500).json({ error: 'Failed to get site' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { company_name, domain, primary_color, tone, custom_prompt, welcome_message } = req.body;

    const existing = await query('SELECT * FROM sites WHERE id = $1', [req.params.id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const current = existing.rows[0];
    const result = await query(
      `UPDATE sites
       SET company_name = $1, domain = $2, primary_color = $3, tone = $4, custom_prompt = $5, welcome_message = $6
       WHERE id = $7
       RETURNING *`,
      [
        company_name ?? current.company_name,
        domain ? domain.replace(/^https?:\/\//, '').replace(/\/+$/, '') : current.domain,
        primary_color ?? current.primary_color,
        tone ?? current.tone,
        custom_prompt !== undefined ? custom_prompt : current.custom_prompt,
        welcome_message ?? current.welcome_message,
        req.params.id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update site error:', err);
    res.status(500).json({ error: 'Failed to update site' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM sites WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    console.error('Delete site error:', err);
    res.status(500).json({ error: 'Failed to delete site' });
  }
});

export default router;
