# Architecture — Ryan's Roofing Chatbot Platform

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Customer Browser                       │
│                                                             │
│  ┌─────────────────────┐    ┌────────────────────────────┐  │
│  │  frontend/ (React)  │    │  widget.js (IIFE bundle)   │  │
│  │  Ryan's Roofing     │    │  Shadow DOM chat widget     │  │
│  │  website sections   │    │  Reads data-site-id         │  │
│  │  :5173 / Vercel     │    │  from <script> tag          │  │
│  └─────────────────────┘    └──────────┬─────────────────┘  │
│                                        │ HTTP POST          │
└────────────────────────────────────────┼────────────────────┘
                                         │
┌────────────────────────────────────────┼────────────────────┐
│          backend/ (Express)  :8000     │     Render         │
│                                        │                    │
│  ┌─────────────────────────────────────┼─────────────────┐  │
│  │                 Routes              │                 │  │
│  │  POST /api/chat ◄───────────────────┘                 │  │
│  │  POST /api/ingest/:site_id  (admin only)              │  │
│  │  CRUD /api/sites            (admin only)              │  │
│  │  GET  /api/site-config/:id  (public)                  │  │
│  │  POST /api/leads            (public)                  │  │
│  └───────┬─────────────────────────────┬─────────────────┘  │
│          │                             │                    │
│  ┌───────▼───────────┐    ┌────────────▼─────────────┐     │
│  │ Services          │    │ Middleware               │     │
│  │                   │    │                          │     │
│  │ crawler.js        │    │ auth.js (Bearer token)   │     │
│  │ chunker.js        │    │ domainVerify.js          │     │
│  │ embeddings.js     │    │ rateLimiter.js           │     │
│  │ rag.js            │    └──────────────────────────┘     │
│  └───────┬───────────┘                                      │
│          │                                                  │
│  ┌───────▼──────────────────────────────────────────────┐  │
│  │              External Services                        │  │
│  │  ┌────────────┐  ┌───────────────────────────────┐   │  │
│  │  │  OpenAI    │  │  Supabase (Postgres+pgvector) │   │  │
│  │  │  - embed   │  │  - sites table                │   │  │
│  │  │  - gpt-4o  │  │  - documents table (vectors)  │   │  │
│  │  │    mini    │  │  - leads table                │   │  │
│  │  └────────────┘  └───────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          admin/ (Next.js)  :3001      Vercel                │
│                                                             │
│  Browser ──► Next.js Server Routes ──► Backend API          │
│              (injects ADMIN_SECRET)                          │
│                                                             │
│  Pages: Dashboard, Sites CRUD, Ingest trigger, Leads view   │
└─────────────────────────────────────────────────────────────┘
```

## Directory Layout

```
├── backend/                    # Node.js + Express (→ Render)
│   ├── src/
│   │   ├── index.js            # App entry, middleware, route mounting
│   │   ├── config/database.js  # Supabase pg Pool
│   │   ├── middleware/
│   │   │   ├── auth.js         # Bearer token admin check
│   │   │   ├── domainVerify.js # Origin vs site domain
│   │   │   └── rateLimiter.js  # Chat rate limiting
│   │   ├── services/
│   │   │   ├── crawler.js      # axios + cheerio BFS crawler
│   │   │   ├── chunker.js      # Text → ~600 token chunks
│   │   │   ├── embeddings.js   # OpenAI text-embedding-3-small
│   │   │   └── rag.js          # Retrieval + prompt + gpt-4o-mini
│   │   └── routes/
│   │       ├── chat.js         # POST /api/chat
│   │       ├── ingest.js       # POST /api/ingest/:site_id
│   │       ├── sites.js        # CRUD /api/sites
│   │       ├── siteConfig.js   # GET /api/site-config/:site_id
│   │       └── leads.js        # POST+GET /api/leads
│   ├── schema.sql              # Supabase DDL (run once)
│   └── package.json
│
├── frontend/                   # React + Vite + TailwindCSS (→ Vercel)
│   └── src/
│       ├── components/
│       │   ├── layout/         # Navbar, Footer
│       │   ├── sections/       # Hero, About, Services, FAQ, etc.
│       │   └── raffy/          # Original Raffy UI components
│       ├── pages/HomePage.tsx
│       ├── hooks/useChat.ts
│       └── utils/api.ts
│
├── widget/                     # Embeddable IIFE bundle (→ Vercel static)
│   └── src/
│       ├── main.tsx            # Shadow DOM mount, reads script attrs
│       ├── components/         # ChatBubble, ChatWindow, LeadForm, etc.
│       ├── hooks/useChat.ts    # Chat state + API calls
│       └── styles.ts           # CSS-in-JS for Shadow DOM
│
├── admin/                      # Next.js dashboard (→ Vercel)
│   └── src/
│       ├── app/                # Pages + API proxy routes
│       └── lib/api.ts          # Server-side fetch with ADMIN_SECRET
│
└── docs/                       # Product vision, architecture
```

## Data Flow — Chat (RAG)

1. User types in widget → `POST /api/chat { site_id, user_message }`
2. Backend embeds query → `text-embedding-3-small`
3. pgvector cosine search → top 5 chunks WHERE `site_id` matches
4. System prompt built from site config + retrieved context
5. `gpt-4o-mini` (temp 0.3) generates answer
6. If user asks about pricing/booking → `should_capture_lead: true`
7. Widget shows lead form if flagged

## Data Flow — Ingestion

1. Admin triggers `POST /api/ingest/:site_id`
2. Old docs for site_id deleted
3. Crawler BFS from site domain (max 20 pages, 500KB/page)
4. Chunker splits text (~600 tokens/chunk, max 500 chunks/site)
5. Embeddings batch (50 at a time) via OpenAI
6. INSERT rows into `documents` with pgvector embedding

## Multi-Tenancy

All DB tables keyed on `site_id`:
```sql
SELECT content FROM documents
WHERE site_id = $1
ORDER BY embedding <=> $2::vector
LIMIT 5;
```

## Key Security Decisions

| Layer | Mechanism |
|-------|-----------|
| Admin API | Bearer token (`ADMIN_SECRET`) via middleware |
| Admin Dashboard | Next.js server routes inject token; browser never sees it |
| Widget Chat | Domain verification (prod): Origin must match `sites.domain` |
| Rate Limiting | 100 req/15min global, 30 req/min on chat |
| RAG Guardrails | Strict system prompt: only answer from context |
| Secrets | `.env` files in `.gitignore`, no secrets in client code |
