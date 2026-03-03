# Product Vision - Ryan's Roofing AI Platform

## Mission

Deliver a multi-tenant, embeddable AI chatbot platform - starting with Ryan's Roofing as the first customer. Any website can embed a single script tag and get an intelligent RAG-powered chat assistant.

## Problem

- Homeowners get slow responses to roofing questions
- Business owners want 24/7 chat without hiring staff
- Generic chatbots hallucinate; they need to answer only from the site's own content

## Solution

A platform with three pieces:

1. **Widget** - single `<script>` tag embeds a chat bubble on any site
2. **Backend** - RAG pipeline: crawl site, embed content, retrieve + answer with AI
3. **Admin** - dashboard to manage sites, trigger ingestion, view leads

## How It Works

1. Admin creates a site entry with domain + branding config
2. Admin triggers ingestion: crawl the domain, chunk text, embed with OpenAI, store in Supabase pgvector
3. Customer adds the widget script to their site
4. Users chat with the widget, which queries only that site's content
5. Lead capture triggers when users ask about pricing, booking, or contact

## Multi-Tenancy

Everything is scoped by `site_id`. One backend serves many customer sites. Vector search is always filtered:
```sql
WHERE site_id = $1 ORDER BY embedding <=> query_vector LIMIT 5
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Database | Supabase Postgres + pgvector |
| Embeddings | OpenAI text-embedding-3-small |
| Chat LLM | OpenAI gpt-4o-mini |
| Widget | React + Vite (IIFE bundle, Shadow DOM) |
| Frontend | React + Vite + TailwindCSS |
| Admin | Next.js 15 |
| Backend hosting | Render |
| Frontend/Widget/Admin hosting | Vercel |

## Sprint Roadmap

| Sprint | Focus | Week |
|--------|-------|------|
| 1 | Website Scaffold + Platform Architecture | 1 |
| 2 | Website Content Sections | 2 |
| 3 | RAG Backend (Crawl, Embed, Retrieve) | 3 |
| 4 | Widget Frontend (Chat UI, Shadow DOM) | 4 |
| 5 | Booking + Contact + Lead Capture | 5 |
| 6 | QA, Polish, Deploy | 6 |
