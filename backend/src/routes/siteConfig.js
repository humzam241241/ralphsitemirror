import { Router } from 'express';
import { query } from '../config/database.js';

const router = Router();

router.get('/:site_id', async (req, res) => {
  try {
    const { site_id } = req.params;

    const result = await query(
      'SELECT company_name, primary_color, tone, welcome_message FROM sites WHERE id = $1',
      [site_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Site config error:', err);
    res.status(500).json({ error: 'Failed to fetch site config' });
  }
});

export default router;
