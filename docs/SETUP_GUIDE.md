# 🔑 Environment Variables & API Keys Setup

Complete guide for configuring all environment variables and obtaining necessary API keys.

## 📋 Quick Reference

| Service | File Location | Keys Needed |
|---------|---------------|-------------|
| Backend | `backend/.env` | Database, OpenAI, Email (Gmail/Outlook), Cal.com |
| Admin | `admin/.env.local` | Admin secret, API URLs |
| Frontend | `frontend/.env` | API URL (optional) |
| Widget | N/A | Configured via script tag |

---

## 🔧 Backend Environment Variables

**File**: `backend/.env`

```bash
# ============================================
# DATABASE
# ============================================
DATABASE_URL=postgresql://postgres:password@host:5432/dbname

# ============================================
# OPENAI API
# ============================================
OPENAI_API_KEY=sk-proj-...

# ============================================
# AUTHENTICATION
# ============================================
ADMIN_SECRET=your-secret-min-32-characters

# ============================================
# EMAIL NOTIFICATIONS
# ============================================
# Supported providers: gmail, outlook, office365
EMAIL_PROVIDER=gmail
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=info@ryansroofing.ca

# ============================================
# CAL.COM BOOKING INTEGRATION (Optional)
# ============================================
CAL_COM_API_KEY=cal_live_...
CAL_COM_EVENT_TYPE_ID=123456

# ============================================
# SECURITY & CORS
# ============================================
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com,https://anothersite.com
PORT=8000
```

---

## 🔑 How to Obtain API Keys

### 1️⃣ OpenAI API Key

**Purpose**: Powers AI embeddings and chat responses

**Steps**:
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click **"Create new secret key"**
4. Name it (e.g., "Ryan's Roofing Platform")
5. Copy the key (starts with `sk-proj-`)
6. ⚠️ **Save immediately** - you can't view it again!

**Add to backend/.env**:
```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

**Cost Estimate**:
- Embeddings: ~$0.01 per 1000 pages
- Chat: ~$0.10 per 1000 conversations
- Budget: Start with $5-10/month

---

### 2️⃣ Email Configuration (Gmail or Outlook)

**Purpose**: Send email notifications for leads, contacts, and bookings

**Supported Providers**: Gmail, Outlook.com, Office 365

#### Quick Setup - Gmail (Recommended for Personal Use)

**Prerequisites**: 
- Gmail account with 2-Factor Authentication enabled

**Steps**:
1. Enable 2FA on your Google account (if not already):
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification" and follow setup

2. Generate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select **"Mail"** as app
   - Select **"Other (Custom name)"** as device
   - Name it: "Ryan's Roofing Platform"
   - Click **Generate**
   - Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

**Add to backend/.env**:
```bash
EMAIL_PROVIDER=gmail
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=abcdefghijklmnop
NOTIFICATION_EMAIL=info@ryansroofing.ca
```

#### Quick Setup - Outlook (Recommended for Business Use)

**Prerequisites**: 
- Outlook.com or Office 365 account with 2FA enabled

**Steps**:
1. Enable 2FA on your Microsoft account:
   - Go to https://account.microsoft.com/security
   - Click "Advanced security options"
   - Turn on "Two-step verification"

2. Generate App Password:
   - Go to https://account.microsoft.com/security
   - Under "App passwords", create new app password
   - Name it: "Ryan's Roofing Platform"
   - Copy the generated password

**Add to backend/.env**:
```bash
EMAIL_PROVIDER=outlook
SMTP_USER=your-email@outlook.com
SMTP_APP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=info@outlook.com
```

**For Office 365 Business**: Use `EMAIL_PROVIDER=office365` instead.

**⚠️ Important**:
- Use the app password, NOT your regular email password
- Remove spaces from the app password
- Test connection with: `cd backend && npm run test:email`

📚 **For detailed setup instructions, troubleshooting, and provider-specific guides, see `docs/EMAIL_SETUP.md`**

---

### 3️⃣ Supabase Database URL

**Purpose**: PostgreSQL database with pgvector for embeddings

**Steps**:
1. Go to https://supabase.com
2. Click **"Start your project"** (free tier available)
3. Create new project:
   - Choose project name
   - Set database password (save this!)
   - Select region closest to you
   - Wait ~2 minutes for setup

4. Enable pgvector extension:
   - Go to **SQL Editor**
   - Click **"New query"**
   - Run: `CREATE EXTENSION IF NOT EXISTS vector;`

5. Get connection string:
   - Go to **Project Settings** > **Database**
   - Scroll to **Connection string**
   - Copy **Connection pooling** URL (recommended for Render)
   - Replace `[YOUR-PASSWORD]` with your database password

**Add to backend/.env**:
```bash
DATABASE_URL=postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Next Steps**:
1. Run `backend/schema.sql` in Supabase SQL Editor
2. Run `backend/migrations/001_add_bookings_and_lead_enhancements.sql`

---

### 4️⃣ Cal.com API Key (Optional)

**Purpose**: Online booking and appointment scheduling

**Steps**:
1. Go to https://cal.com
2. Sign up (free tier available)
3. Create an event type:
   - Go to **Event Types**
   - Click **"New Event Type"**
   - Set up "Roof Inspection" (30 min duration)
   - Configure availability
   - Copy the **Event Type ID** from URL (e.g., `/event-types/123456`)

4. Get API key:
   - Go to **Settings** > **Developer**
   - Click **"Create API Key"**
   - Name it: "Ryan's Roofing Platform"
   - Copy the key (starts with `cal_live_`)

**Add to backend/.env**:
```bash
CAL_COM_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxxx
CAL_COM_EVENT_TYPE_ID=123456
```

**⚠️ Skip if**:
- You want to use embedded Cal.com widget only (no API)
- You're not ready for online booking yet

---

### 5️⃣ Admin Secret (Generate Secure Key)

**Purpose**: Protect admin dashboard and API endpoints

**Generate Secure Key**:

**Mac/Linux**:
```bash
openssl rand -base64 32
```

**Windows PowerShell**:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Online Tool** (if above don't work):
- Go to https://generate-random.org/api-key-generator
- Set length: 32 characters
- Use alphanumeric + symbols

**Add to BOTH files**:

`backend/.env`:
```bash
ADMIN_SECRET=your-generated-32-char-secret
```

`admin/.env.local`:
```bash
ADMIN_SECRET=your-generated-32-char-secret
```

⚠️ **Must be the same in both files!**

---

## 🎯 Admin Dashboard Configuration

**File**: `admin/.env.local`

```bash
# API endpoint (backend URL)
API_URL=http://localhost:8000/api

# Admin authentication (must match backend)
ADMIN_SECRET=your-generated-32-char-secret

# Public URLs (for client-side)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WIDGET_URL=http://localhost:5174
```

**For Production**:
```bash
API_URL=https://your-backend.onrender.com/api
ADMIN_SECRET=your-production-secret
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_WIDGET_URL=https://your-widget.vercel.app
```

---

## 🌐 Frontend Configuration (Optional)

**File**: `frontend/.env`

```bash
VITE_API_URL=http://localhost:8000
```

**Note**: Usually not needed because widget is embedded via script tag.

---

## ✅ Verification Checklist

After setting up all environment variables:

### Backend
- [ ] Database connection works (`npm run dev` shows no connection errors)
- [ ] OpenAI API responds (try a test chat)
- [ ] Email service verified (check console for SMTP connection)
- [ ] Environment validation passes on startup

### Admin Dashboard
- [ ] Can access dashboard at localhost:3001
- [ ] Admin secret matches backend
- [ ] API calls work (create site, view leads)

### Widget
- [ ] Appears on frontend when embedded
- [ ] Chat messages send and receive
- [ ] Lead form captures data

---

## 🚨 Common Issues

### "Invalid API Key" (OpenAI)
- Check key starts with `sk-proj-` or `sk-`
- Ensure no extra spaces or quotes
- Verify key is active in OpenAI dashboard

### "SMTP Connection Failed"
- Use app password, NOT regular password
- For Gmail: Verify 2FA is enabled at https://myaccount.google.com/security
- For Outlook: Verify 2FA is enabled at https://account.microsoft.com/security
- Check `EMAIL_PROVIDER` is set correctly (gmail, outlook, or office365)
- Test with: `cd backend && npm run test:email`
- Check firewall isn't blocking port 587
- See `docs/EMAIL_SETUP.md` for detailed troubleshooting

### "Database Connection Refused"
- Check DATABASE_URL format
- Verify Supabase project is running
- Use pooling connection string for production

### "CORS Error" in Widget
- Add your frontend domain to `ALLOWED_ORIGINS`
- Format: `https://domain.com` (no trailing slash)
- Separate multiple origins with commas

---

## 📊 Cost Breakdown

| Service | Free Tier | Estimated Monthly Cost |
|---------|-----------|------------------------|
| Supabase | 500MB DB, 2GB bandwidth | Free → $25/month |
| OpenAI | $5 credit | $5-20/month |
| Gmail SMTP | Unlimited | Free |
| Cal.com | Unlimited bookings | Free → $12/month |
| Render | 750 hours/month | Free → $7/month |
| Vercel | 100GB bandwidth | Free → $20/month |

**Total Estimated Cost**: $0-80/month depending on usage

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - already in `.gitignore`
2. **Use different secrets** for dev and production
3. **Rotate keys** every 90 days
4. **Monitor API usage** to detect anomalies
5. **Enable Supabase RLS** policies for production
6. **Use environment-specific** keys (don't use prod keys in dev)

---

## 📝 Production Deployment

When deploying to Render/Vercel:

1. **Don't** use `.env` files - set environment variables in dashboard
2. **Do** use secure secrets (32+ characters)
3. **Do** update `ALLOWED_ORIGINS` with production domains
4. **Do** set `NODE_ENV=production`
5. **Do** test email notifications with real addresses

See `docs/PRODUCTION_SETUP.md` for complete deployment guide.

---

## 🆘 Need Help?

- Check `.env.example` files for reference
- Verify all keys are copied correctly (no spaces/quotes)
- Test each service independently before integration
- Check service dashboards for API usage and errors

---

**Last Updated**: March 2026
