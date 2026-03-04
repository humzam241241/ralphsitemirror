# Architecture Overview

Complete technical architecture for the Ryan's Roofing AI Chatbot Platform.

## System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Customer Browser                        │
│                                                              │
│  ┌─────────────────┐         ┌──────────────────────────┐   │
│  │ Frontend        │         │ Widget (IIFE)            │   │
│  │ React + Vite    │         │ Shadow DOM Chat          │   │
│  │ :5173           │         │ Reads data-site-id       │   │
│  └─────────────────┘         └──────────┬───────────────┘   │
│                                         │                    │
└─────────────────────────────────────────┼────────────────────┘
                                          │ POST /api/chat
                                          │
┌─────────────────────────────────────────┼────────────────────┐
│              Backend (Express) :8000    │     Render         │
│                                         │                    │
│  Routes:                                │                    │
│  • POST /api/chat            ← RAG chat responses           │
│  • POST /api/contact         ← Contact form submissions     │
│  • POST /api/bookings        ← Appointment scheduling       │
│  • POST /api/leads           ← Lead capture                 │
│  • POST /api/ingest/:site_id ← Content crawling (admin)     │
│  • CRUD /api/sites           ← Site management (admin)      │
│                                                              │
│  Services:                                                   │
│  • email.js          → Gmail SMTP notifications             │
│  • calendar.js       → Cal.com API integration              │
│  • rag.js            → Retrieval + AI + intent detection    │
│  • crawler.js        → Website content scraping             │
│  • embeddings.js     → OpenAI text-embedding-3-small        │
│                                                              │
│  Middleware:                                                 │
│  • auth.js           → Bearer token verification            │
│  • sanitize.js       → Input validation & XSS prevention    │
│  • rateLimiter.js    → Request throttling                   │
│                                                              │
│  External Services:                                          │
│  • OpenAI            → Embeddings + GPT-4o-mini             │
│  • Supabase          → PostgreSQL + pgvector                │
│  • Gmail SMTP        → Email notifications                  │
│  • Cal.com API       → Booking integration                  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│           Admin Dashboard (Next.js) :3001    Vercel          │
│                                                              │
│  • Manage sites (CRUD)                                       │
│  • Trigger content ingestion                                 │
│  • View leads and bookings                                   │
│  • Configure branding and AI behavior                        │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow: Chat with RAG

1. **User sends message** → Widget POSTs to `/api/chat` with `site_id` and `user_message`
2. **Intent detection** → Regex patterns detect booking/quote/emergency intent
3. **Query embedding** → OpenAI `text-embedding-3-small` converts message to vector
4. **Vector search** → pgvector finds top 5 relevant chunks: `WHERE site_id = $1 ORDER BY embedding <=> query_vector`
5. **Context building** → Retrieved chunks + site config form system prompt
6. **AI generation** → `gpt-4o-mini` (temp 0.3) generates response
7. **Intent handling**:
   - **Booking**: Returns `intent: 'booking'` → Widget shows booking modal
   - **Quote**: Returns `intent: 'quote'` → Widget shows lead form
   - **Emergency**: Returns `intent: 'emergency'` → Widget shows phone CTA
8. **Lead capture** → If form submitted, stored in database + email notifications sent

## Data Flow: Content Ingestion

1. **Admin triggers** → `POST /api/ingest/:site_id` with auth token
2. **Cleanup** → Delete old documents for site_id
3. **Crawl** → BFS traversal from site domain (max 20 pages, 500KB each)
4. **Chunk** → Split text into ~600 token chunks (max 500 chunks per site)
5. **Embed** → Batch process with OpenAI (50 chunks at a time)
6. **Store** → INSERT into `documents` table with pgvector embeddings

## Database Schema

### Core Tables

```sql
-- Multi-tenant site configuration
CREATE TABLE sites (
  id UUID PRIMARY KEY,
  company_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  primary_color TEXT DEFAULT '#f8b427',
  tone TEXT DEFAULT 'friendly and professional',
  custom_prompt TEXT,
  welcome_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Vector-indexed content chunks
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  url TEXT,
  content TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI text-embedding-3-small
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_documents_site_id ON documents(site_id);

-- Lead capture with source tracking
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  page_url TEXT,
  source VARCHAR(50) DEFAULT 'chat',  -- chat, contact_form, booking, widget
  intent VARCHAR(50),                  -- booking, quote, emergency, general
  booking_reference VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Appointment bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  cal_com_booking_id VARCHAR(255),
  attendee_name VARCHAR(255) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  attendee_phone VARCHAR(50),
  scheduled_time TIMESTAMPTZ NOT NULL,
  service_type VARCHAR(100) DEFAULT 'Roof Inspection',
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Multi-Tenancy Strategy

All database operations are scoped by `site_id`:

```sql
-- Vector search always filtered by tenant
SELECT content, url 
FROM documents
WHERE site_id = $1
ORDER BY embedding <=> $2::vector
LIMIT 5;

-- Lead retrieval scoped to site
SELECT * FROM leads 
WHERE site_id = $1 
ORDER BY created_at DESC;
```

**Isolation guarantees**:
- Widget only knows its own `site_id` (from script tag)
- Database queries always include `site_id` filter
- Admin dashboard can view all sites but requires authentication

## Security Architecture

| Layer | Protection |
|-------|-----------|
| **Admin API** | Bearer token (`ADMIN_SECRET`) verified in middleware |
| **Widget Chat** | Domain verification: Origin must match `sites.domain` (production) |
| **Rate Limiting** | Global: 100/15min, Chat: 30/min, Contact: 5/hour, Booking: 3/hour |
| **Input Sanitization** | XSS prevention via `validator.escape()` on all user inputs |
| **CORS** | Whitelist via `ALLOWED_ORIGINS` env var |
| **Secrets** | All credentials in `.env` files (gitignored) |
| **RAG Guardrails** | System prompt enforces "only answer from context" |

## Technology Stack

| Component | Technology | Hosting |
|-----------|-----------|---------|
| **Backend** | Node.js 18 + Express | Render |
| **Database** | PostgreSQL 15 + pgvector | Supabase |
| **AI/ML** | OpenAI API (embeddings + chat) | OpenAI Cloud |
| **Email** | Nodemailer + Gmail SMTP | Gmail |
| **Booking** | Cal.com API | Cal.com Cloud |
| **Frontend** | React 19 + Vite + TailwindCSS | Vercel |
| **Widget** | React 19 (IIFE + Shadow DOM) | Vercel |
| **Admin** | Next.js 15 + React 19 | Vercel |
| **Testing** | Playwright + Lighthouse CI | Local/CI |

## Performance Optimizations

### Frontend
- Code splitting: vendor and Cal.com chunks separate
- Terser minification with console removal
- Lazy loading for below-fold content
- Brotli compression in production

### Widget
- Single IIFE bundle (<200KB target)
- Shadow DOM for style isolation
- Minimal dependencies (React only)
- CSS-in-JS for no external stylesheets

### Backend
- Connection pooling for database
- Batch embedding generation (50 at a time)
- Rate limiting prevents abuse
- Vector index (IVFFlat) for fast similarity search

### Database
- pgvector with cosine similarity index
- Query optimization: `LIMIT 5` on vector search
- Indexes on foreign keys and timestamps

## Monitoring & Observability

- **Logs**: Winston logger in backend (error.log, combined.log)
- **Metrics**: Track chat requests, lead submissions, booking creations
- **Errors**: Console logging with context (site_id, timestamps)
- **Performance**: Lighthouse CI scores tracked in CI/CD

## Deployment Architecture

```
GitHub Repository
       │
       ├──► Render (Backend)
       │    • Automatic deploys on push to main
       │    • Environment variables in dashboard
       │    • Health check: GET /api/health
       │
       ├──► Vercel (Frontend)
       │    • Root: frontend/
       │    • Build: npm run build
       │    • Output: dist/
       │
       ├──► Vercel (Widget)
       │    • Root: widget/
       │    • Build: npm run build
       │    • Output: dist/
       │
       └──► Vercel (Admin)
            • Root: admin/
            • Build: npm run build
            • Output: .next/
```

## Scalability Considerations

- **Multi-tenant**: Single backend serves unlimited sites
- **Database**: Supabase auto-scales, upgrade to Pro for >500MB
- **OpenAI**: Rate limits at 60 req/min (tier 1), can upgrade
- **Render**: Can scale to multiple instances if needed
- **Vercel**: Serverless functions scale automatically

## Future Enhancements

- [ ] Redis caching for frequent queries
- [ ] WebSocket for real-time chat updates
- [ ] Analytics dashboard for conversation insights
- [ ] A/B testing framework for AI responses
- [ ] Multi-language support
- [ ] Voice input/output integration
- [ ] Mobile app wrappers (React Native)
