import twilio from 'twilio';

// Check if Twilio is configured
const isTwilioConfigured = () => {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );
};

// Initialize Twilio client only if configured
let twilioClient = null;
if (isTwilioConfigured()) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('📱 Twilio SMS enabled');
} else {
  console.log('📱 Twilio SMS not configured (optional)');
}

/**
 * Send SMS notification to customer
 */
export async function sendCustomerSMS(phoneNumber, message) {
  if (!twilioClient) {
    console.log('📱 Twilio not configured, skipping SMS');
    return { success: false, reason: 'not_configured' };
  }

  try {
    // Format phone number (ensure it has country code)
    let formattedPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    if (!formattedPhone.startsWith('1') && formattedPhone.length === 10) {
      formattedPhone = `+1${formattedPhone}`; // Add +1 for North America
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = `+${formattedPhone}`;
    } else {
      formattedPhone = `+${formattedPhone}`;
    }

    console.log(`📱 Sending SMS to ${formattedPhone}...`);

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone,
    });

    console.log(`✅ SMS sent successfully (SID: ${result.sid})`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('❌ Failed to send SMS:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send SMS notification to business owner
 */
export async function sendOwnerSMS(message) {
  const ownerPhone = process.env.OWNER_PHONE_NUMBER;
  
  if (!ownerPhone) {
    console.log('📱 Owner phone number not configured');
    return { success: false, reason: 'no_owner_phone' };
  }

  return sendCustomerSMS(ownerPhone, message);
}

/**
 * Send contact form notification SMS
 */
export async function sendContactSMS(contactData) {
  const { name, phone, service } = contactData;
  
  // Send to owner
  const ownerMessage = `🔔 New Contact: ${name}\nService: ${service}\nPhone: ${phone}\n\nCheck your email for details.`;
  await sendOwnerSMS(ownerMessage);

  // Send confirmation to customer
  const customerMessage = `Thank you ${name}! We received your ${service} inquiry. We'll contact you within 24 hours. - Ryan's Roofing`;
  return sendCustomerSMS(phone, customerMessage);
}

/**
 * Send booking confirmation SMS
 */
export async function sendBookingSMS(bookingData) {
  const { attendee_name, attendee_phone, scheduled_time, service_type } = bookingData;
  
  const date = new Date(scheduled_time).toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Send to owner
  const ownerMessage = `📅 New Booking: ${attendee_name}\nService: ${service_type}\nWhen: ${date}\nPhone: ${attendee_phone}`;
  await sendOwnerSMS(ownerMessage);

  // Send confirmation to customer
  const customerMessage = `✅ Appointment Confirmed!\n${service_type}\n${date}\n\nSee you then! - Ryan's Roofing\n(905) 555-1234`;
  return sendCustomerSMS(attendee_phone, customerMessage);
}

/**
 * Send emergency service SMS
 */
export async function sendEmergencySMS(emergencyData) {
  const { name, phone, message } = emergencyData;
  
  // Send urgent notification to owner
  const ownerMessage = `🚨 EMERGENCY REQUEST\nFrom: ${name}\nPhone: ${phone}\nIssue: ${message}\n\nCall immediately!`;
  return sendOwnerSMS(ownerMessage);
}

export default {
  sendCustomerSMS,
  sendOwnerSMS,
  sendContactSMS,
  sendBookingSMS,
  sendEmergencySMS,
  isConfigured: isTwilioConfigured,
};
