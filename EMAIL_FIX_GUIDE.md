# Email Fix - Quick Reference

## 🔴 The Problem
Your contact form wasn't sending emails because the `.env` file had placeholder values instead of real SMTP credentials.

## ✅ The Solution

### Updated Environment Variables
```bash
# OLD (Placeholder - didn't work)
EMAIL_PROVIDER=gmail
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-gmail-app-password
NOTIFICATION_EMAIL=info@ryansroofing.ca

# NEW (Working Outlook credentials)
EMAIL_PROVIDER=outlook
SMTP_USER=humzam241@outlook.com
SMTP_APP_PASSWORD=zezdxtanmdcxbcbh
NOTIFICATION_EMAIL=humzam241@outlook.com
```

## 🧪 How to Test

1. **Start your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Check startup logs** - You should see:
   ```
   📧 Using email provider: outlook
   ✅ SMTP connection verified
   ✅ Environment variables validated
   ```

3. **Fill out the contact form** on your website

4. **Watch backend logs** - You should see:
   ```
   📝 Processing contact form submission: { name: 'Test', email: 'test@example.com', service: 'General Inquiry' }
   ✅ Lead saved to database with ID: 123
   📧 Sending contact notification to humzam241@outlook.com...
   ✅ Contact notification sent successfully
   📧 Sending confirmation to test@example.com...
   ✅ Confirmation email sent successfully
   ✅ Contact emails sent successfully
   ```

5. **Check your email** (`humzam241@outlook.com`) - You should receive:
   - A notification email about the new contact form submission
   - The customer should receive a confirmation email

## 🚨 If Email Still Doesn't Work

### Check These:

1. **Outlook App Password Valid?**
   - Go to: https://account.microsoft.com/security
   - Verify the app password `zezdxtanmdcxbcbh` is still active
   - Create a new one if needed

2. **Backend Running?**
   - Make sure your backend server is running
   - Check it's using the updated `.env` file
   - Restart the server after changing `.env`

3. **SMTP Connection Test**
   - Run: `npm run test:email` (if this script exists)
   - Or check the startup logs for "✅ SMTP connection verified"

4. **Firewall/Network**
   - Ensure port 587 (SMTP) is not blocked
   - Try from a different network if blocked

5. **Rate Limits**
   - Outlook has rate limits (usually 300 emails/day for personal accounts)
   - If testing repeatedly, you might hit the limit

## 📋 Email Flow

When someone submits the contact form:

1. **Form validated** (required fields, email format)
2. **Lead saved to database** (always happens, even if email fails)
3. **Two emails sent**:
   - **To you** (`humzam241@outlook.com`): "New contact form submission"
   - **To customer**: "Thanks for contacting us"

## 🔧 Troubleshooting Commands

### View Backend Logs (if deployed on Render)
```bash
# From Render dashboard: View Logs
# Or using Render CLI:
render logs <your-service-name>
```

### Test Locally
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Then test the contact form
```

## 📝 Files Modified

- `backend/.env` - Updated SMTP credentials
- `backend/src/services/email.js` - Added logging and error handling
- `backend/src/routes/contact.js` - Improved error handling
- `frontend/src/components/sections/Contact.tsx` - Enhanced UI with CTAs

## ✅ Checklist

- [x] Email provider set to "outlook"
- [x] SMTP_USER set to humzam241@outlook.com
- [x] SMTP_APP_PASSWORD set to correct value
- [x] NOTIFICATION_EMAIL configured
- [x] Backend restarted with new .env
- [ ] Test email sent successfully
- [ ] Email received in inbox

---

**Your emails should now work! 🎉**

If you're still having issues, check the backend logs for specific error messages.
