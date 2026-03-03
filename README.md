# Ryan's Roofing - AI Chatbot Platform

Multi-tenant, embeddable chatbot platform powering Ryan's Roofing website. A single widget script tag lets any customer site get an AI chat assistant backed by RAG (Retrieval-Augmented Generation).

## Architecture

```
frontend/ (React+Vite)  -->  widget/ (IIFE embed)  -->  admin/ (Next.js)
        \                        |                        /
         -------->  backend/ (Express + RAG)  <----------
                    Supabase pgvector + OpenAI
```

## Deployables

| Service | Tech | Deploys to | Port |
|---------|------|-----------|------|
| backend | Node.js + Express | Render | 8000 |
| frontend | React + Vite + TailwindCSS | Vercel | 5173 |
| widget | React + Vite IIFE | Vercel (static) | 5174 |
| admin | Next.js 15 | Vercel | 3001 |

## Quick Start

### All-in-one (Windows)
```
start.bat
```

### Manual
```bash
# Backend
cd backend && npm install && cp .env.example .env && npm run dev

# Frontend (Ryan's Roofing site)
cd frontend && npm install && npm run dev

# Widget (embeddable chat)
cd widget && npm install && npm run dev

# Admin dashboard
cd admin && npm install && cp .env.local.example .env.local && npm run dev
```

### Database setup (one-time)
1. Create a Supabase project
2. Run `backend/schema.sql` in the Supabase SQL Editor
3. Copy the connection string to `backend/.env`

## Multi-Tenancy

Every table is scoped by `site_id`:
- **sites** - tenant config (company name, domain, colors, tone, prompt)
- **documents** - chunked content + embeddings, filtered by site_id
- **leads** - contact submissions, filtered by site_id

## Widget Embed

```html
<script
  src="https://your-widget-domain.vercel.app/widget.js"
  data-site-id="uuid-from-admin"
  data-api-url="https://your-backend.onrender.com/api">
</script>
```

## End-to-End Flow

1. Admin creates a site and gets site_id
2. Admin triggers ingest: crawl, chunk, embed, store in pgvector
3. Customer embeds widget script with their site_id
4. User chats: widget POSTs to /api/chat, RAG retrieval, AI response
5. Lead capture triggered when user asks about pricing/booking

## Environment Variables

See each service's `.env.example` for details.
