# 🚀 Quick Setup: Environment Variables & API Keys

**Complete this checklist to get your platform running in ~15 minutes.**

---

## ✅ Setup Checklist

### Step 1: OpenAI API Key (Required) ⏱️ 2 min

1. Visit https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-proj-`)
4. Add to `backend/.env`:
   ```bash
   OPENAI_API_KEY=sk-proj-your-key-here
   ```

**💰 Cost**: ~$5-20/month (start with $5 credit)

---

### Step 2: Supabase Database (Required) ⏱️ 5 min

1. Visit https://supabase.com → Sign up (free)
2. Create new project, set password, choose region
3. Go to **SQL Editor** → Run:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
4. Run `backend/schema.sql` in SQL Editor
5. Run `backend/migrations/001_add_bookings_and_lead_enhancements.sql`
6. Go to **Settings > Database** → Copy "Connection pooling" string
7. Add to `backend/.env`:
   ```bash
   DATABASE_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

**💰 Cost**: Free tier (500MB)

---

### Step 3: Gmail SMTP (Required) ⏱️ 3 min

1. Enable 2FA on Gmail: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
   - Select **"Mail"** → **"Other (Custom)"**
   - Name: "Ryan's Roofing"
   - Copy the 16-character password
3. Add to `backend/.env`:
   ```bash
   SMTP_USER=your-email@gmail.com
   SMTP_APP_PASSWORD=abcdefghijklmnop
   NOTIFICATION_EMAIL=info@ryansroofing.ca
   ```

**💰 Cost**: Free

---

### Step 4: Admin Secret (Required) ⏱️ 1 min

Generate secure key:

**Mac/Linux**:
```bash
openssl rand -base64 32
```

**Windows PowerShell**:
```powershell
[Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))
```

Add to **BOTH** files:
- `backend/.env`
- `admin/.env.local`

```bash
ADMIN_SECRET=your-generated-secret-here
```

⚠️ **Must be the same in both files!**

---

### Step 5: Cal.com API (Optional) ⏱️ 4 min

1. Visit https://cal.com → Sign up
2. Create event type: **"Roof Inspection"** (30 min)
3. Go to **Settings > Developer** → Generate API key
4. Copy event type ID from URL (e.g., `/event-types/123456`)
5. Add to `backend/.env`:
   ```bash
   CAL_COM_API_KEY=cal_live_your-key
   CAL_COM_EVENT_TYPE_ID=123456
   ```

**💰 Cost**: Free tier

**Skip if**: You don't need online booking yet

---

## 📄 Complete .env File Templates

### `backend/.env`
```bash
# Required
DATABASE_URL=postgresql://postgres.xxx:PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
ADMIN_SECRET=your-generated-32-char-secret
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-16-char-password
NOTIFICATION_EMAIL=info@ryansroofing.ca

# Optional
CAL_COM_API_KEY=cal_live_xxxxxxxxxxxxxxxxxxxxx
CAL_COM_EVENT_TYPE_ID=123456

# Defaults (change for production)
NODE_ENV=development
PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001
```

### `admin/.env.local`
```bash
# Must match backend ADMIN_SECRET
ADMIN_SECRET=your-generated-32-char-secret

# Local development
API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WIDGET_URL=http://localhost:5174
```

### `frontend/.env` (Optional)
```bash
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Start Development

After setting up all environment variables:

```bash
# Option 1: All-in-one (Windows)
start.bat

# Option 2: Manual
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
cd widget && npm install && npm run dev
cd admin && npm install && npm run dev
```

**Services will be available at**:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Widget Dev: http://localhost:5174
- Admin: http://localhost:3001

---

## 🧪 Verify Setup

### 1. Backend Health Check
```bash
curl http://localhost:8000/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### 2. Check Logs
Look for these messages on backend startup:
```
✅ SMTP connection verified
✅ Environment variables validated
Server running on port 8000
```

### 3. Test Frontend
- Open http://localhost:5173
- Chat widget should appear in bottom-right
- Click widget → should open chat window

### 4. Test Admin Dashboard
- Open http://localhost:3001
- Should see dashboard (may need to create site first)

---

## ⚠️ Common Issues

### "Invalid API Key" (OpenAI)
- Check key starts with `sk-proj-` or `sk-`
- No extra spaces or quotes in .env file
- Verify key is active in OpenAI dashboard

### "SMTP Connection Failed"
- Use app password, NOT regular Gmail password
- Ensure 2FA is enabled on Gmail
- Remove spaces from 16-character password

### "Database Connection Refused"
- Verify DATABASE_URL format is correct
- Check Supabase project is running
- Use "Connection pooling" URL (port 6543), not "Direct connection"

### "CORS Error" in Widget
- Add your domain to `ALLOWED_ORIGINS` in backend/.env
- Format: `http://localhost:5173` (no trailing slash)
- Separate multiple origins with commas

---

## 📊 Cost Summary

| Service | Free Tier | Typical Monthly Cost |
|---------|-----------|---------------------|
| Supabase | 500MB, 2GB bandwidth | $0 → $25 |
| OpenAI | $5 credit | $5 → $20 |
| Gmail SMTP | Unlimited | $0 |
| Cal.com | Unlimited bookings | $0 → $12 |
| Render | 750 hours | $0 → $7 |
| Vercel | 100GB bandwidth | $0 → $20 |
| **Total** | **Free for small sites** | **$0-80/month** |

---

## 🔒 Security Reminders

✅ Never commit `.env` files (already in `.gitignore`)  
✅ Use different secrets for dev and production  
✅ Rotate keys every 90 days  
✅ Monitor API usage for anomalies  
✅ Use strong passwords (32+ characters)  

---

## 🆘 Need Help?

1. Check `docs/SETUP_GUIDE.md` for detailed instructions
2. Verify all keys are copied correctly (no spaces)
3. Test each service independently
4. Check service dashboards for errors

---

## 📚 Next Steps

After setup is working:

1. ✅ Test chat functionality
2. ✅ Verify email notifications
3. ✅ Test booking flow (if Cal.com configured)
4. ✅ Run E2E tests: `npm run test:e2e`
5. ✅ Deploy to production (see `docs/SETUP_GUIDE.md`)

---

**Setup complete! 🎉** Your platform is ready for development.
