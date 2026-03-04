import { Router } from 'express';
import { query } from '../config/database.js';
import { chatWithRAG } from '../services/rag.js';
import { verifyDomain } from '../middleware/domainVerify.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { sanitizeLeadInput } from '../middleware/sanitize.js';

const router = Router();

router.post('/', chatLimiter, verifyDomain, sanitizeLeadInput, async (req, res) => {
  try {
    const { site_id, user_message, current_page_url } = req.body;

    if (!site_id || !user_message) {
      return res.status(400).json({ error: 'site_id and user_message are required' });
    }

    const siteResult = await query('SELECT * FROM sites WHERE id = $1', [site_id]);
    if (siteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const siteConfig = siteResult.rows[0];
    const result = await chatWithRAG(site_id, user_message, siteConfig);

    res.json({
      answer: result.answer,
      reply: result.answer,
      should_capture_lead: result.should_capture_lead,
      intent: result.intent,
      sources: result.sources,
    });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

export default router;
