import express from 'express';
import validator from 'validator';
import { sendContactEmail } from '../services/email.js';
import pool from '../config/database.js';
import { contactFormLimiter } from '../middleware/rateLimiter.js';
import { sanitizeContactInput } from '../middleware/sanitize.js';

const router = express.Router();

router.post('/', contactFormLimiter, sanitizeContactInput, async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const sanitizedData = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email),
      phone: phone ? validator.escape(phone.trim()) : null,
      service: service ? validator.escape(service.trim()) : 'General Inquiry',
      message: validator.escape(message.trim()),
    };

    const result = await pool.query(
      `INSERT INTO leads (
        site_id, name, email, phone, message, source, intent, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id`,
      [
        null,
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.phone,
        sanitizedData.message,
        'contact_form',
        sanitizedData.service,
      ]
    );

    await sendContactEmail(sanitizedData);

    res.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you shortly.',
      lead_id: result.rows[0].id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to process contact form. Please try again or call us directly.' 
    });
  }
});

export default router;
