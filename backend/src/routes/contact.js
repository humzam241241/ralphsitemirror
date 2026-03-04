import express from 'express';
import validator from 'validator';
import { sendContactEmail } from '../services/email.js';
import { sendContactSMS } from '../services/sms.js';
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

    console.log('📝 Processing contact form submission:', { 
      name: sanitizedData.name, 
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      service: sanitizedData.service 
    });

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

    console.log('✅ Lead saved to database with ID:', result.rows[0].id);

    // Send email notification
    try {
      await sendContactEmail(sanitizedData);
      console.log('✅ Contact emails sent successfully');
    } catch (emailError) {
      console.error('⚠️  Email sending failed, but lead was saved:', emailError.message);
    }

    // Send SMS notification if phone number provided
    if (sanitizedData.phone) {
      try {
        await sendContactSMS(sanitizedData);
        console.log('✅ Contact SMS sent successfully');
      } catch (smsError) {
        console.error('⚠️  SMS sending failed, but lead was saved:', smsError.message);
      }
    }

    res.json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you shortly.',
      lead_id: result.rows[0].id
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ 
      error: 'Failed to process contact form. Please try again or call us directly at (905) 555-1234.' 
    });
  }
});

export default router;
