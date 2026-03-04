# Email Provider Quick Reference

## Configuration Cheat Sheet

### Gmail
```bash
EMAIL_PROVIDER=gmail
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
NOTIFICATION_EMAIL=your-email@gmail.com
```

**Setup**: https://myaccount.google.com/apppasswords
**Requirements**: 2FA enabled
**SMTP Server**: smtp.gmail.com:587

---

### Outlook.com
```bash
EMAIL_PROVIDER=outlook
SMTP_USER=your-email@outlook.com
SMTP_APP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=your-email@outlook.com
```

**Setup**: https://account.microsoft.com/security
**Requirements**: 2FA enabled
**SMTP Server**: smtp-mail.outlook.com:587
**Works with**: @outlook.com, @hotmail.com, @live.com

---

### Office 365 Business
```bash
EMAIL_PROVIDER=office365
SMTP_USER=your-email@yourdomain.com
SMTP_APP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=your-email@yourdomain.com
```

**Setup**: https://account.microsoft.com/security
**Requirements**: 2FA enabled, SMTP AUTH enabled by IT admin
**SMTP Server**: smtp.office365.com:587
**Note**: May require IT admin to enable SMTP AUTH

---

## Testing

Test your configuration:
```bash
cd backend
npm run test:email
```

Expected output:
```
📧 Using email provider: gmail
✅ SMTP connection verified
```

---

## Common Issues

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid credentials | Using regular password | Use app password |
| ECONNREFUSED | Port blocked | Check firewall, try VPN |
| Username not accepted | Wrong format | Use full email address |
| SMTP AUTH disabled | O365 setting | Contact IT admin |

---

## Rate Limits

| Provider | Daily Limit (Free) | Daily Limit (Paid) |
|----------|-------------------|-------------------|
| Gmail | 500 emails | 2,000 emails |
| Outlook | 300 emails | 5,000 emails |
| Office 365 | Varies | 10,000+ emails |

---

## Security Checklist

- ✅ Use app passwords, not regular passwords
- ✅ Enable 2FA/MFA
- ✅ Don't commit `.env` files
- ✅ Rotate passwords every 90 days
- ✅ Use dedicated email for production
- ✅ Monitor sent email logs

---

## Need More Help?

See full documentation: `docs/EMAIL_SETUP.md`
