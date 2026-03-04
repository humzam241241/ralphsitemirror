# Email Configuration Guide

This guide will help you configure email notifications for the Ryan's Roofing chatbot platform using Gmail, Outlook, or Office 365.

## Supported Email Providers

The platform supports three email providers:
- **Gmail** - Personal Gmail accounts (smtp.gmail.com)
- **Outlook** - Outlook.com personal accounts (smtp-mail.outlook.com)
- **Office 365** - Microsoft 365 business accounts (smtp.office365.com)

## Configuration Overview

All email configuration is done through environment variables in `backend/.env`:

```bash
EMAIL_PROVIDER=gmail|outlook|office365
SMTP_USER=your-email@domain.com
SMTP_APP_PASSWORD=your-app-specific-password
NOTIFICATION_EMAIL=where-to-send-notifications@domain.com
```

## Gmail Setup

### Prerequisites
- Gmail account with 2-Factor Authentication enabled

### Step-by-Step Setup

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Click on "2-Step Verification"
   - Follow the setup wizard to enable 2FA

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Name it "Ryan's Roofing Platform" or similar
   - Click "Generate"
   - Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

3. **Update Environment Variables**
   ```bash
   EMAIL_PROVIDER=gmail
   SMTP_USER=your-email@gmail.com
   SMTP_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

### Common Issues
- **"Invalid credentials"**: Make sure you're using the app password, not your regular Gmail password
- **"Less secure app access"**: This is no longer needed with app passwords
- **2FA not working**: Try using SMS-based 2FA instead of authenticator apps

## Outlook Setup

### Prerequisites
- Outlook.com account with 2-Factor Authentication enabled

### Step-by-Step Setup

1. **Enable 2-Factor Authentication**
   - Go to https://account.microsoft.com/security
   - Click on "Advanced security options"
   - Under "Two-step verification", click "Turn on"
   - Follow the setup wizard

2. **Generate App Password**
   - Go to https://account.microsoft.com/security
   - Scroll to "Advanced security options"
   - Under "App passwords", click "Create a new app password"
   - Copy the generated password (shown once)

3. **Update Environment Variables**
   ```bash
   EMAIL_PROVIDER=outlook
   SMTP_USER=your-email@outlook.com
   SMTP_APP_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=your-email@outlook.com
   ```

### Supported Domains
Works with:
- @outlook.com
- @hotmail.com
- @live.com

### Common Issues
- **"Authentication failed"**: Ensure 2FA is enabled before generating app password
- **"Relay not permitted"**: Make sure you're using your full email as SMTP_USER
- **Connection timeout**: Check firewall settings for port 587

## Office 365 Setup

### Prerequisites
- Microsoft 365 business account
- Admin access to security settings (or IT department assistance)

### Step-by-Step Setup

1. **Check SMTP Authentication Status**
   - Your organization may have SMTP authentication disabled by default
   - Contact your IT administrator if you don't have access

2. **Enable SMTP AUTH (Admin Only)**
   - Sign in to Microsoft 365 Admin Center
   - Go to Settings > Org settings > Modern authentication
   - Ensure "Authenticated SMTP" is enabled

3. **Generate App Password**
   - Go to https://account.microsoft.com/security
   - Under "Advanced security options"
   - Click "Create a new app password"
   - Copy the generated password

4. **Update Environment Variables**
   ```bash
   EMAIL_PROVIDER=office365
   SMTP_USER=your-email@yourdomain.com
   SMTP_APP_PASSWORD=your-app-password
   NOTIFICATION_EMAIL=your-email@yourdomain.com
   ```

### Alternative: Modern Authentication

Some Office 365 accounts require OAuth2 instead of app passwords. If app passwords don't work:

1. Contact your IT administrator
2. Ask about enabling "SMTP AUTH" for your account
3. Consider using a dedicated service account for notifications

### Common Issues
- **"SMTP AUTH disabled"**: Contact your IT admin to enable it for your account
- **"Access denied"**: You may need admin privileges or a service account
- **Using shared mailbox**: May require special permissions from IT

## Testing Your Configuration

### Quick Test

After configuring your environment variables:

```bash
cd backend
npm run dev
```

Look for this message in the console:
```
📧 Using email provider: gmail
✅ SMTP connection verified
```

### Send Test Email

You can test email sending by:

1. Starting the backend server
2. Submitting a lead through the chatbot widget
3. Filling out the contact form on the website
4. Creating a booking appointment

All of these actions trigger email notifications.

### Manual Test Script

Create a test file `backend/test-email.js`:

```javascript
import dotenv from 'dotenv';
dotenv.config();

import { sendLeadNotification } from './src/services/email.js';

const testLead = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '555-1234',
  message: 'This is a test notification',
  source: 'test',
  intent: 'testing'
};

sendLeadNotification(testLead)
  .then(() => console.log('✅ Test email sent successfully'))
  .catch(err => console.error('❌ Test email failed:', err.message));
```

Run with:
```bash
node backend/test-email.js
```

## Email Features

The platform sends these types of emails:

### 1. Lead Notifications (to business)
- Triggered when: User submits contact info via chat or form
- Sent to: `NOTIFICATION_EMAIL`
- Contains: Name, email, phone, message, intent classification

### 2. Lead Confirmations (to customer)
- Triggered when: User submits contact info
- Sent to: Customer's email
- Contains: Thank you message, next steps

### 3. Booking Confirmations (to customer)
- Triggered when: User books appointment
- Sent to: Customer's email
- Contains: Appointment details, time, service type

### 4. Booking Notifications (to business)
- Triggered when: User books appointment
- Sent to: `NOTIFICATION_EMAIL`
- Contains: Customer details, appointment info

## Security Best Practices

### For Gmail
✅ Always use app passwords, never your main password
✅ Keep 2FA enabled
✅ Regularly review authorized apps
✅ Consider using a dedicated email for notifications
⚠️ Don't share app passwords
⚠️ Don't commit `.env` files to version control

### For Outlook/Office 365
✅ Use app passwords when possible
✅ Enable 2FA/MFA
✅ Use dedicated service accounts for production
✅ Regularly audit app passwords
⚠️ Follow organizational security policies
⚠️ Don't use personal accounts for business apps

## Troubleshooting

### Connection Issues

**Error: "ECONNREFUSED"**
- Check your internet connection
- Verify firewall isn't blocking port 587
- Try testing from a different network

**Error: "ETIMEDOUT"**
- Port 587 may be blocked by your ISP or firewall
- Try using a VPN
- Contact your network administrator

### Authentication Issues

**Error: "Invalid login: 535"**
- Gmail: Use app password, not regular password
- Outlook: Ensure 2FA is enabled before generating app password
- Office 365: Check if SMTP AUTH is enabled

**Error: "Username and Password not accepted"**
- Double-check `SMTP_USER` is the full email address
- Verify `SMTP_APP_PASSWORD` was copied correctly (no spaces)
- Generate a new app password and try again

### Provider-Specific Issues

**Gmail: "Less secure app access"**
- This setting is deprecated
- You must use app passwords with 2FA now
- Remove spaces from the app password

**Outlook: "Relay access denied"**
- Verify you're using the correct `EMAIL_PROVIDER=outlook`
- Ensure `SMTP_USER` matches the account that generated the app password

**Office 365: "Authentication unsuccessful"**
- Check if SMTP AUTH is enabled for your organization
- Verify you have the right permissions
- Consider using a dedicated service account

## Migration Guide

### Switching from Gmail to Outlook

1. Generate Outlook app password (see Outlook Setup above)
2. Update `backend/.env`:
   ```bash
   EMAIL_PROVIDER=outlook
   SMTP_USER=your-email@outlook.com
   SMTP_APP_PASSWORD=new-outlook-app-password
   ```
3. Restart the backend server
4. Verify connection in logs

### Switching from Outlook to Gmail

1. Generate Gmail app password (see Gmail Setup above)
2. Update `backend/.env`:
   ```bash
   EMAIL_PROVIDER=gmail
   SMTP_USER=your-email@gmail.com
   SMTP_APP_PASSWORD=new-gmail-app-password
   ```
3. Restart the backend server
4. Verify connection in logs

## Production Considerations

### Use Dedicated Email Accounts
- Don't use personal email for production notifications
- Create a dedicated account like `notifications@yourdomain.com`
- This makes it easier to manage and audit

### Monitor Email Deliverability
- Regularly check spam folders
- Set up SPF/DKIM records for your domain
- Monitor bounce rates and failed deliveries

### Rate Limits
- Gmail: 500 emails/day for free accounts
- Outlook: 300 emails/day for personal accounts
- Office 365: Higher limits based on your plan

If you exceed these limits, consider:
- Using a dedicated email service (SendGrid, AWS SES, Mailgun)
- Implementing email queuing
- Batching notifications

### Backup Email Provider
Consider configuring a backup provider:
1. Set up accounts with multiple providers
2. Implement fallback logic in code
3. Monitor primary provider health

## Support

If you continue to have issues:

1. Check the console logs when starting the backend
2. Look for the `📧 Using email provider:` message
3. Verify SMTP connection status
4. Review error messages in server logs
5. Test with the manual test script above

For provider-specific issues:
- Gmail: https://support.google.com/accounts/answer/185833
- Outlook: https://support.microsoft.com/account-billing
- Office 365: Contact your IT administrator

## Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [Outlook SMTP Settings](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-8361e398-8af4-4e97-b147-6c6c4ac95353)
- [Office 365 SMTP Relay](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/how-to-set-up-a-multifunction-device-or-application-to-send-email-using-microsoft-365-or-office-365)
