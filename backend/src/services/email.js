import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

function loadTemplate(templateName, variables) {
  const templatePath = join(__dirname, '../templates/email', templateName);
  let template = readFileSync(templatePath, 'utf-8');
  
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  
  return template;
}

export async function sendLeadNotification(leadData) {
  const { name, email, phone, message, source, intent } = leadData;
  
  const htmlContent = loadTemplate('lead-notification.html', {
    name: name || 'Not provided',
    email: email || 'Not provided',
    phone: phone || 'Not provided',
    message: message || 'No message',
    source: source || 'chat',
    intent: intent || 'general inquiry',
    timestamp: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
  });

  await transporter.sendMail({
    from: `"Ryan's Roofing Bot" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `🔔 New Lead: ${name || 'Anonymous'} - ${intent || 'General Inquiry'}`,
    html: htmlContent,
  });
}

export async function sendLeadConfirmation(leadData) {
  const { name, email } = leadData;
  
  if (!email) return;

  const htmlContent = loadTemplate('lead-confirmation.html', {
    name: name || 'there',
  });

  await transporter.sendMail({
    from: `"Ryan's Roofing" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "We've received your inquiry - Ryan's Roofing",
    html: htmlContent,
  });
}

export async function sendContactEmail(contactData) {
  const { name, email, phone, service, message } = contactData;
  
  const notificationHtml = loadTemplate('contact-notification.html', {
    name: name || 'Not provided',
    email: email || 'Not provided',
    phone: phone || 'Not provided',
    service: service || 'General Inquiry',
    message: message || 'No message',
    timestamp: new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' }),
  });

  await transporter.sendMail({
    from: `"Ryan's Roofing Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `📧 Contact Form: ${name} - ${service}`,
    html: notificationHtml,
  });

  if (email) {
    const confirmationHtml = loadTemplate('lead-confirmation.html', {
      name: name || 'there',
    });

    await transporter.sendMail({
      from: `"Ryan's Roofing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for contacting Ryan's Roofing",
      html: confirmationHtml,
    });
  }
}

export async function sendBookingConfirmation(bookingData) {
  const { attendee_name, attendee_email, scheduled_time, service_type, notes } = bookingData;
  
  if (!attendee_email) return;

  const htmlContent = loadTemplate('booking-confirmation.html', {
    name: attendee_name || 'there',
    scheduled_time: new Date(scheduled_time).toLocaleString('en-CA', { 
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'short'
    }),
    service_type: service_type || 'Roof Inspection',
    notes: notes || 'No additional notes',
  });

  await transporter.sendMail({
    from: `"Ryan's Roofing" <${process.env.SMTP_USER}>`,
    to: attendee_email,
    subject: "Appointment Confirmed - Ryan's Roofing",
    html: htmlContent,
  });

  const notificationHtml = loadTemplate('booking-notification.html', {
    name: attendee_name || 'Not provided',
    email: attendee_email,
    phone: bookingData.attendee_phone || 'Not provided',
    scheduled_time: new Date(scheduled_time).toLocaleString('en-CA', { 
      timeZone: 'America/Toronto',
      dateStyle: 'full',
      timeStyle: 'short'
    }),
    service_type: service_type || 'Roof Inspection',
    notes: notes || 'No additional notes',
  });

  await transporter.sendMail({
    from: `"Ryan's Roofing Bot" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    subject: `📅 New Booking: ${attendee_name} - ${service_type}`,
    html: notificationHtml,
  });
}

export async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return false;
  }
}
