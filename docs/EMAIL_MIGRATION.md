# Email Provider Migration Guide

## Quick Migration Between Providers

This guide helps you migrate from one email provider to another (e.g., Gmail → Outlook, Outlook → Office 365).

---

## 🚀 Migration Overview

**Time Required**: 5-10 minutes  
**Downtime**: None (if done during maintenance window)  
**Complexity**: Easy  
**Code Changes**: None  

---

## 📋 Pre-Migration Checklist

Before starting:
- [ ] Decide on new email provider
- [ ] Generate app password for new provider
- [ ] Have access to `backend/.env` file
- [ ] Backup current `.env` file
- [ ] Note current email volume (for limit comparison)

---

## 🔄 Migration Steps

### Step 1: Generate New App Password

#### For Gmail
1. Go to https://myaccount.google.com/apppasswords
2. Enable 2FA if not already enabled
3. Create new app password named "Ryan's Roofing Platform"
4. Copy the 16-character password

#### For Outlook
1. Go to https://account.microsoft.com/security
2. Enable 2FA if not already enabled
3. Create new app password
4. Copy the generated password

#### For Office 365
1. Go to https://account.microsoft.com/security
2. Verify SMTP AUTH is enabled (may need IT admin)
3. Create new app password
4. Copy the generated password

See `docs/EMAIL_SETUP.md` for detailed instructions.

---

### Step 2: Update Environment Variables

#### Backup Current Configuration
```bash
# On Mac/Linux
cp backend/.env backend/.env.backup

# On Windows
copy backend\.env backend\.env.backup
```

#### Update backend/.env

**From Gmail to Outlook:**
```bash
# OLD
EMAIL_PROVIDER=gmail
SMTP_USER=old@gmail.com
SMTP_APP_PASSWORD=old-gmail-password
NOTIFICATION_EMAIL=old@gmail.com

# NEW
EMAIL_PROVIDER=outlook
SMTP_USER=new@outlook.com
SMTP_APP_PASSWORD=new-outlook-password
NOTIFICATION_EMAIL=new@outlook.com
```

**From Outlook to Office 365:**
```bash
# OLD
EMAIL_PROVIDER=outlook
SMTP_USER=old@outlook.com
SMTP_APP_PASSWORD=old-password
NOTIFICATION_EMAIL=old@outlook.com

# NEW
EMAIL_PROVIDER=office365
SMTP_USER=new@company.com
SMTP_APP_PASSWORD=new-password
NOTIFICATION_EMAIL=new@company.com
```

**From Office 365 to Gmail:**
```bash
# OLD
EMAIL_PROVIDER=office365
SMTP_USER=old@company.com
SMTP_APP_PASSWORD=old-password
NOTIFICATION_EMAIL=old@company.com

# NEW
EMAIL_PROVIDER=gmail
SMTP_USER=new@gmail.com
SMTP_APP_PASSWORD=new-gmail-password
NOTIFICATION_EMAIL=new@gmail.com
```

---

### Step 3: Test New Configuration

```bash
cd backend
npm run test:email
```

**Expected output:**
```
🧪 Email Configuration Test

Configuration:
  Provider: outlook
  SMTP User: new@outlook.com
  Notification Email: new@outlook.com
  Password Set: ✓

Testing SMTP connection...

✅ SMTP connection successful!
```

**If test fails**, see troubleshooting section below.

---

### Step 4: Restart Backend

#### Development
```bash
cd backend
npm run dev
```

#### Production (depends on your deployment)

**Render:**
1. Update environment variables in Render dashboard
2. Redeploy or restart service

**Heroku:**
```bash
heroku config:set EMAIL_PROVIDER=outlook
heroku config:set SMTP_USER=new@outlook.com
heroku config:set SMTP_APP_PASSWORD=new-password
heroku restart
```

**Docker:**
```bash
docker-compose down
docker-compose up -d
```

---

### Step 5: Verify in Logs

Check server logs for confirmation:
```
📧 Using email provider: outlook
✅ SMTP connection verified
```

---

### Step 6: Test Email Functionality

Test each email feature:
- [ ] Submit a test lead via chatbot
- [ ] Submit contact form
- [ ] Create a test booking
- [ ] Check notification emails received
- [ ] Check customer confirmation emails received

---

## 🔙 Rollback Plan

If something goes wrong, quickly rollback:

```bash
# Restore backup
# On Mac/Linux
cp backend/.env.backup backend/.env

# On Windows
copy backend\.env.backup backend\.env

# Restart backend
npm run dev
```

---

## 🛠️ Troubleshooting

### Test Email Failed

**Error: "Invalid credentials"**
- Double-check app password (no spaces)
- Verify EMAIL_PROVIDER matches the account type
- Ensure 2FA is enabled on new account

**Error: "Connection refused"**
- Check firewall settings
- Verify port 587 is open
- Try from different network

**Error: "Username not accepted"**
- Use full email address as SMTP_USER
- Verify email format is correct

### Emails Not Sending After Migration

1. Check server logs for errors
2. Verify NOTIFICATION_EMAIL is updated
3. Test SMTP connection: `npm run test:email`
4. Check spam folder for test emails

### Provider-Specific Issues

**Gmail**
- Ensure app password has no spaces
- Verify 2FA is active
- Check https://myaccount.google.com/security

**Outlook**
- Verify 2FA is enabled
- Check app password is fresh (< 90 days)
- Try regenerating app password

**Office 365**
- Verify SMTP AUTH is enabled
- Contact IT admin if blocked
- Check organization policies

---

## 📊 Migration Scenarios

### Scenario 1: Small Project (Gmail → Outlook)

**Reason**: Need higher email limits

**Steps**:
1. Generate Outlook app password (5 min)
2. Update 3 lines in `.env` (1 min)
3. Test with `npm run test:email` (1 min)
4. Restart server (1 min)

**Total time**: ~8 minutes

---

### Scenario 2: Growing Business (Outlook → Office 365)

**Reason**: Company already has Microsoft 365, need custom domain

**Steps**:
1. Coordinate with IT admin (async)
2. Verify SMTP AUTH is enabled (admin task)
3. Generate app password (5 min)
4. Update `.env` (1 min)
5. Test (1 min)
6. Schedule maintenance window
7. Update production environment
8. Restart services (2 min)

**Total time**: ~30 minutes (excluding IT coordination)

---

### Scenario 3: Enterprise (Gmail → Office 365)

**Reason**: Enterprise requirements, custom domain, higher limits

**Steps**:
1. Get approval from IT/management
2. Set up dedicated service account with IT
3. Ensure SMTP AUTH enabled (IT admin)
4. Test in staging environment first
5. Document rollback plan
6. Schedule maintenance window
7. Update production environment
8. Monitor email delivery
9. Update documentation

**Total time**: 1-2 hours (with planning)

---

## 🔍 Verification Checklist

After migration, verify:

### Email Delivery
- [ ] Lead notifications arrive at business email
- [ ] Customer confirmations send successfully
- [ ] Booking confirmations send to customers
- [ ] Booking notifications arrive at business email
- [ ] Contact form emails work

### Configuration
- [ ] Correct provider shown in logs
- [ ] SMTP connection verified on startup
- [ ] No errors in server logs
- [ ] Test email command works

### Business Continuity
- [ ] Response times normal
- [ ] No emails bouncing
- [ ] Spam folder checked
- [ ] Email volume within limits

---

## 📝 Post-Migration Tasks

### Update Documentation
- [ ] Document new provider in internal docs
- [ ] Update team wiki/knowledge base
- [ ] Notify team of change

### Monitor
- [ ] Watch email delivery for 48 hours
- [ ] Check for bounces or failures
- [ ] Monitor rate limits
- [ ] Review spam reports

### Cleanup
- [ ] Revoke old app password
- [ ] Delete `.env.backup` after 7 days
- [ ] Update deployment documentation

---

## 📈 Migration Best Practices

### Do's ✅
- Test in development first
- Backup current configuration
- Use app passwords (never regular passwords)
- Test all email features after migration
- Monitor for 24-48 hours post-migration
- Keep backup for quick rollback

### Don'ts ❌
- Don't migrate during peak hours
- Don't skip testing phase
- Don't forget to update production environment
- Don't revoke old credentials immediately
- Don't forget to update documentation
- Don't ignore rate limits of new provider

---

## 🎯 Common Migration Paths

### Gmail → Outlook
**Reason**: Higher email limits (5,000 vs 2,000)  
**Difficulty**: Easy  
**Time**: 5-10 minutes  

### Outlook → Office 365
**Reason**: Custom domain, enterprise features  
**Difficulty**: Moderate  
**Time**: 30 minutes  

### Gmail → Office 365
**Reason**: Enterprise migration  
**Difficulty**: Moderate  
**Time**: 1-2 hours  

### Any → Gmail
**Reason**: Simplicity, testing  
**Difficulty**: Easy  
**Time**: 5-10 minutes  

---

## 🔐 Security During Migration

### Protect Credentials
- Never commit `.env` files
- Use secure channels to share passwords
- Rotate passwords after migration
- Use password managers for storage

### Access Control
- Limit who has access to app passwords
- Use dedicated service accounts in production
- Enable MFA on all email accounts
- Regular security audits

---

## 📞 Need Help?

### Documentation
- Setup Guide: `docs/EMAIL_SETUP.md`
- Provider Comparison: `docs/EMAIL_PROVIDER_COMPARISON.md`
- Quick Reference: `docs/EMAIL_QUICK_REF.md`

### Support
- Gmail: https://support.google.com/mail
- Outlook: https://support.microsoft.com
- Office 365: Contact your IT admin

### Testing
```bash
cd backend
npm run test:email
```

---

## ✅ Migration Complete Checklist

- [ ] New app password generated
- [ ] `.env` file updated
- [ ] Old configuration backed up
- [ ] Test email script passed
- [ ] Backend restarted successfully
- [ ] Logs show correct provider
- [ ] Lead notification tested
- [ ] Customer confirmation tested
- [ ] Booking emails tested
- [ ] No errors in logs
- [ ] Team notified
- [ ] Documentation updated
- [ ] 24-hour monitoring scheduled

---

**Migration is simple!** Just 3 lines of config and you're done. 🚀
