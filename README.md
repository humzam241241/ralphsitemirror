# Ryan's Roofing - AI Chatbot Platform

Production-ready multi-tenant AI chatbot platform with RAG-powered conversations, intelligent lead capture, booking integration, and automated notifications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (PostgreSQL + pgvector)
- OpenAI API key
- Email account (Gmail or Outlook/Office 365)

### Local Development

**Windows (Fastest):**
```bash
start.bat
```

**Manual Setup:**
```bash
# 1. Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# 2. Frontend
cd frontend
npm install
npm run dev

# 3. Widget
cd widget
npm install
npm run dev

# 4. Admin Dashboard
cd admin
npm install
cp .env.local.example .env.local
npm run dev
```

### Database Setup
1. Create Supabase project at https://supabase.com
2. Enable `vector` extension in SQL Editor
3. Run `backend/schema.sql` in SQL Editor
4. Run `backend/migrations/001_add_bookings_and_lead_enhancements.sql`
5. Copy connection string to `backend/.env`

## 📁 Project Structure

```
├── backend/          # Node.js + Express API (→ Render)
│   ├── src/
│   │   ├── routes/     # API endpoints
│   │   ├── services/   # Email, Calendar, RAG, Crawler
│   │   ├── middleware/ # Auth, Rate limiting, Sanitization
│   │   └── config/     # Database, Env validation
│   ├── migrations/     # SQL migration files
│   └── schema.sql      # Initial database schema
│
├── frontend/         # React + Vite website (→ Vercel)
│   └── src/
│       ├── components/ # UI components
│       ├── pages/      # Page layouts
│       └── hooks/      # React hooks
│
├── widget/           # Embeddable chat widget (→ Vercel)
│   └── src/
│       ├── components/ # Chat UI, Booking modal, Lead form
│       ├── hooks/      # Chat logic with intent detection
│       └── styles.ts   # Shadow DOM styles
│
├── admin/            # Next.js dashboard (→ Vercel)
│   └── src/
│       ├── app/        # Next.js 15 pages
│       └── lib/        # API client with auth
│
├── tests/
│   └── e2e/          # Playwright test suite
│
└── docs/             # Documentation
```

## ✨ Features

### Core Platform
- **Multi-tenant RAG**: Each site gets isolated AI assistant trained on their content
- **Vector Search**: pgvector with OpenAI embeddings for semantic retrieval
- **Smart Crawling**: Automatic website ingestion and content chunking
- **Shadow DOM Widget**: Isolated, embeddable chat with zero CSS conflicts

### Sprint 5-6 Additions
- **📧 Email Notifications**: Gmail/Outlook/Office 365 SMTP with professional HTML templates
- **📅 Booking System**: Cal.com integration with appointment scheduling
- **🚨 Emergency Detection**: AI-powered intent detection for urgent requests
- **📝 Contact Forms**: Integrated with backend API and notifications
- **🎯 Lead Capture**: Multi-source tracking with intent classification
- **🔒 Security**: Input sanitization, rate limiting, CORS hardening
- **⚡ Performance**: Code splitting, bundle optimization, Lighthouse CI
- **🧪 Testing**: Comprehensive Playwright E2E test suite
- **📊 SEO**: Meta tags, schema markup, sitemap, robots.txt

## 🔑 Environment Variables

### Backend (`backend/.env`)
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Authentication
ADMIN_SECRET=your-secret-min-32-chars

# Email Configuration
# Supported providers: gmail, outlook, office365
EMAIL_PROVIDER=gmail
SMTP_USER=your-email@gmail.com
SMTP_APP_PASSWORD=your-app-password
NOTIFICATION_EMAIL=info@ryansroofing.ca

# Cal.com Integration
CAL_COM_API_KEY=your-cal-com-api-key
CAL_COM_EVENT_TYPE_ID=your-event-type-id

# Security
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
```

### Admin Dashboard (`admin/.env.local`)
```bash
API_URL=http://localhost:8000/api
ADMIN_SECRET=same-as-backend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WIDGET_URL=http://localhost:5174
```

### Frontend (`frontend/.env`)
```bash
VITE_API_URL=http://localhost:8000
```

## 🔐 API Keys Setup Guide

### 1. OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-`)
4. Add to `backend/.env` as `OPENAI_API_KEY`

### 2. Email Configuration (Gmail or Outlook)

#### Option A: Gmail SMTP (Recommended for personal use)
1. Enable 2FA on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Other (Custom name)"
4. Name it "Ryan's Roofing Platform"
5. Copy the 16-character password
6. Add to `backend/.env`:
   ```bash
   EMAIL_PROVIDER=gmail
   SMTP_USER=your-email@gmail.com
   SMTP_APP_PASSWORD=the-16-char-password
   NOTIFICATION_EMAIL=your-email@gmail.com
   ```

#### Option B: Outlook/Office 365 SMTP (Recommended for business)
1. Ensure your Outlook account has 2FA enabled (Microsoft Account Security)
2. Go to https://account.microsoft.com/security
3. Select "Advanced security options"
4. Under "App passwords", create a new app password
5. Name it "Ryan's Roofing Platform"
6. Copy the generated password
7. Add to `backend/.env`:
   ```bash
   EMAIL_PROVIDER=outlook
   SMTP_USER=your-email@outlook.com
   SMTP_APP_PASSWORD=the-app-password
   NOTIFICATION_EMAIL=your-email@outlook.com
   ```
   
**Note**: For Office 365 business accounts, use `EMAIL_PROVIDER=office365` instead. The setup is the same, but the SMTP server is different.

**Supported Email Providers**:
- `gmail` - Gmail (smtp.gmail.com)
- `outlook` - Outlook.com (smtp-mail.outlook.com)
- `office365` - Office 365 business (smtp.office365.com)

### 3. Supabase Database
1. Sign up at https://supabase.com
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string (Pooler mode)
5. Add to `backend/.env` as `DATABASE_URL`

### 4. Cal.com API (Optional - for bookings)
1. Sign up at https://cal.com
2. Create an event type (e.g., "Roof Inspection")
3. Go to Settings > Developer
4. Generate API key
5. Get event type ID from the event URL
6. Add to `backend/.env`:
   - `CAL_COM_API_KEY=cal_live_...`
   - `CAL_COM_EVENT_TYPE_ID=123456`

### 5. Admin Secret (Generate Secure Key)
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```
Add the output to both `backend/.env` and `admin/.env.local` as `ADMIN_SECRET`

## 🚀 Deployment

### Backend (Render)
1. Create new Web Service on Render
2. Connect your GitHub repo
3. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Add all backend env vars
4. Deploy

### Frontend (Vercel)
1. Import project from GitHub
2. Settings:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variables
4. Deploy

### Widget & Admin
Same as frontend, but use `widget/` and `admin/` as root directories.

See `docs/PRODUCTION_SETUP.md` for detailed deployment instructions.

## 🧪 Testing

```bash
# E2E Tests
npm run test:e2e              # Run all tests
npm run test:e2e:ui           # Run with UI
npm run test:e2e:report       # View report

# Email Configuration Test
cd backend
npm run test:email            # Verify SMTP connection

# Lighthouse Performance
cd frontend
npm run lighthouse

# Raffy Validation (Manual)
# See tests/raffy-validation.md for 50 test prompts
```

## 📦 Widget Embed Code

```html
<!-- Add before closing </body> tag -->
<script
  src="https://your-widget-url.vercel.app/widget.js"
  data-site-id="your-site-uuid"
  data-api-url="https://your-backend.onrender.com">
</script>
```

## 🔄 Development Workflow

1. **Make changes** to any service
2. **Test locally** with `start.bat` or manual setup
3. **Run tests**: `npm run test:e2e`
4. **Commit & push** to GitHub
5. **Auto-deploy** via Vercel/Render webhooks

## 📚 Documentation

- **Email Setup**: Step-by-step guide for Gmail, Outlook, and Office 365 (`docs/EMAIL_SETUP.md`)
- **Email Provider Comparison**: Help choosing the right provider (`docs/EMAIL_PROVIDER_COMPARISON.md`)
- **Email Migration**: Guide for switching between providers (`docs/EMAIL_MIGRATION.md`)
- **Architecture**: Complete system design and data flows
- **API Reference**: All endpoints documented inline in route files
- **Production Setup**: Deployment checklist and environment configuration
- **Testing Guide**: E2E test suite and validation prompts

## 🆘 Troubleshooting

**Widget not appearing?**
- Check `data-site-id` matches your database
- Verify `data-api-url` points to correct backend
- Check browser console for CORS errors

**Database connection failed?**
- Verify `DATABASE_URL` format and credentials
- Ensure pgvector extension is enabled
- Run schema.sql if tables don't exist

**Email not sending?**
- Verify you're using an app password (not your regular account password)
- For Gmail: Check https://myaccount.google.com/apppasswords
- For Outlook: Check https://account.microsoft.com/security
- Ensure `EMAIL_PROVIDER` is set correctly (gmail, outlook, or office365)
- Check SMTP settings in backend/.env
- Test connection with: `npm run test:email` (if available)
- Check server logs for detailed error messages

**Build errors?**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (18+)
- Ensure all env vars are set

## 📄 License

Proprietary - Ryan's Roofing Platform

## 🤝 Support

For issues or questions, check the docs/ folder or contact the development team.
