# Ryan's Roofing - AI-Powered Roofing Platform

Modern roofing website with AI chat assistant, online booking, and automated notifications.

## Quick Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials

# Run locally
npm run dev
```

## Environment Variables

### Required
- `DATABASE_URL` - Supabase PostgreSQL
- `OPENAI_API_KEY` - OpenAI API key
- `SMTP_USER` / `SMTP_APP_PASSWORD` - Email notifications
- `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` - SMS notifications (optional)

### Optional
- `CAL_COM_API_KEY` - Online booking integration

## Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL + pgvector)
- **AI**: OpenAI GPT-4 + RAG
- **Notifications**: Email (Outlook) + SMS (Twilio)

## Features

- AI-powered chat assistant (Raffy)
- Online booking with Cal.com
- Automated email & SMS notifications
- Multi-page responsive design
- WebGL animated backgrounds

## License

Proprietary - Ryan's Roofing
