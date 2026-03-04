import express from 'express';
import validator from 'validator';
import { createBooking, getBooking, cancelBooking } from '../services/calendar.js';
import { sendBookingConfirmation } from '../services/email.js';
import pool from '../config/database.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: 'Too many booking attempts. Please try again later.' },
});

router.post('/', bookingLimiter, async (req, res) => {
  try {
    const {
      site_id,
      attendee_name,
      attendee_email,
      attendee_phone,
      scheduled_time,
      service_type,
      notes,
    } = req.body;

    if (!attendee_name || !attendee_email || !scheduled_time) {
      return res.status(400).json({
        error: 'Missing required fields: attendee_name, attendee_email, and scheduled_time',
      });
    }

    if (!validator.isEmail(attendee_email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const scheduledDate = new Date(scheduled_time);
    if (isNaN(scheduledDate.getTime()) || scheduledDate < new Date()) {
      return res.status(400).json({ error: 'Invalid or past scheduled time' });
    }

    const sanitizedData = {
      siteId: site_id,
      attendeeName: validator.escape(attendee_name.trim()),
      attendeeEmail: validator.normalizeEmail(attendee_email),
      attendeePhone: attendee_phone ? validator.escape(attendee_phone.trim()) : null,
      scheduledTime: scheduledDate.toISOString(),
      serviceType: service_type ? validator.escape(service_type.trim()) : 'Roof Inspection',
      notes: notes ? validator.escape(notes.trim()) : null,
    };

    const calBooking = await createBooking(sanitizedData);

    const leadResult = await pool.query(
      `INSERT INTO leads (
        site_id, name, email, phone, message, source, intent, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id`,
      [
        site_id || null,
        sanitizedData.attendeeName,
        sanitizedData.attendeeEmail,
        sanitizedData.attendeePhone,
        `Booking request for ${sanitizedData.serviceType}. Notes: ${sanitizedData.notes || 'None'}`,
        'booking',
        'booking',
      ]
    );

    const bookingResult = await pool.query(
      `INSERT INTO bookings (
        site_id, lead_id, cal_com_booking_id, attendee_name, attendee_email,
        attendee_phone, scheduled_time, service_type, notes, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW()) RETURNING id`,
      [
        site_id || null,
        leadResult.rows[0].id,
        calBooking.bookingUid,
        sanitizedData.attendeeName,
        sanitizedData.attendeeEmail,
        sanitizedData.attendeePhone,
        sanitizedData.scheduledTime,
        sanitizedData.serviceType,
        sanitizedData.notes,
        'confirmed',
      ]
    );

    await sendBookingConfirmation({
      attendee_name: sanitizedData.attendeeName,
      attendee_email: sanitizedData.attendeeEmail,
      attendee_phone: sanitizedData.attendeePhone,
      scheduled_time: sanitizedData.scheduledTime,
      service_type: sanitizedData.serviceType,
      notes: sanitizedData.notes,
    });

    res.json({
      success: true,
      message: 'Booking created successfully',
      booking: {
        id: bookingResult.rows[0].id,
        cal_com_booking_id: calBooking.bookingUid,
        scheduled_time: sanitizedData.scheduledTime,
      },
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      error: 'Failed to create booking. Please try again or contact us directly.',
    });
  }
});

router.get('/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;

    const result = await pool.query(
      'SELECT * FROM bookings WHERE id = $1',
      [booking_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

router.delete('/:booking_id', async (req, res) => {
  try {
    const { booking_id } = req.params;

    const result = await pool.query(
      'SELECT cal_com_booking_id FROM bookings WHERE id = $1',
      [booking_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const calBookingId = result.rows[0].cal_com_booking_id;
    
    if (calBookingId) {
      await cancelBooking(calBookingId);
    }

    await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2',
      ['cancelled', booking_id]
    );

    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router;
