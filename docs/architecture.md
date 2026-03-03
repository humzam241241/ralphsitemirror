# Architecture — Ryan's Roofing Platform

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                    Client Browser                    │
│  ┌───────────────────────────────────────────────┐  │
│  │         React + Vite + TailwindCSS            │  │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────────┐  │  │
│  │  │ Website  │ │  Router  │ │ Raffy Widget  │  │  │
│  │  │ Sections │ │         │ │ (Chat UI)     │  │  │
│  │  └─────────┘ └──────────┘ └───────┬───────┘  │  │
│  └────────────────────────────────────┼──────────┘  │
│                                       │              │
│                    HTTP / WebSocket    │              │
└───────────────────────────────────────┼──────────────┘
                                        │
┌───────────────────────────────────────┼──────────────┐
│                  FastAPI Backend      │              │
│  ┌────────────────────────────────────┼──────────┐  │
│  │                API Layer           │          │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────┴───────┐  │  │
│  │  │ /health  │ │ /chat    │ │ /ws/chat     │  │  │
│  │  └──────────┘ └────┬─────┘ └──────┬───────┘  │  │
│  └─────────────────────┼─────────────┼───────────┘  │
│                        │             │              │
│  ┌─────────────────────┼─────────────┼───────────┐  │
│  │            Service Layer          │           │  │
│  │  ┌──────────────┐ ┌──────┴───────────────┐   │  │
│  │  │ IntentClass. │ │    RaffyService      │   │  │
│  │  │  (spaCy)     │ │  (Claude API)        │   │  │
│  │  └──────────────┘ └──────────┬────────────┘   │  │
│  │                              │                │  │
│  │  ┌───────────────────────────┴────────────┐   │  │
│  │  │        KnowledgeBaseService            │   │  │
│  │  │           (ChromaDB)                   │   │  │
│  │  └────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │          External Integrations                │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐  │  │
│  │  │ Cal.com  │ │  SMTP    │ │ Anthropic    │  │  │
│  │  │ Booking  │ │  Email   │ │ Claude API   │  │  │
│  │  └──────────┘ └──────────┘ └──────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── sections/        # Hero, About, Services, FAQ, Testimonials, Contact
│   │   └── raffy/           # RaffyWidget, ChatPanel, ChatMessage
│   ├── pages/               # HomePage (composes sections)
│   ├── hooks/               # useChat (state management)
│   ├── utils/               # API client utilities
│   ├── assets/              # Images, fonts
│   ├── App.tsx              # Root with Router
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind theme config
├── index.html
├── vite.config.ts           # Vite + Tailwind + API proxy
├── tsconfig.json
└── package.json
```

## Backend Architecture

```
backend/
├── app/
│   ├── main.py              # FastAPI app, CORS, WebSocket
│   ├── config.py            # Pydantic Settings (.env)
│   ├── routers/
│   │   ├── health.py        # GET /api/health
│   │   └── chat.py          # POST /api/chat
│   ├── services/
│   │   ├── raffy.py         # LLM orchestration (Claude)
│   │   └── knowledge_base.py # ChromaDB vector search
│   ├── models/
│   │   └── schemas.py       # Pydantic request/response models
│   └── utils/
│       └── intent_classifier.py  # spaCy intent detection
├── tests/
│   └── test_health.py       # API tests
├── knowledge/               # Knowledge base source documents
├── requirements.txt
└── .env.example
```

## Data Flow — Chat Request

1. User types message in Raffy chat widget
2. Frontend sends POST `/api/chat` (or via WebSocket)
3. `IntentClassifier` categorizes: book / quote / emergency / general
4. `KnowledgeBaseService` retrieves relevant context from ChromaDB
5. `RaffyService` constructs prompt with system prompt + context + user message
6. Claude API generates response
7. Response + intent + suggestions returned to frontend
8. If intent is "book" → trigger Cal.com booking flow
9. If intent is "emergency" → show emergency CTA prominently

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Monorepo (frontend + backend) | Simpler CI/CD, shared types later |
| FastAPI over Express | Python ecosystem for NLP (spaCy, ChromaDB) |
| ChromaDB over Pinecone | Self-hosted, no vendor lock-in, free |
| Claude over GPT | Better instruction following for chat personas |
| WebSocket for chat | Real-time streaming responses |
| TailwindCSS v4 | Zero-config, fast builds, utility-first |
| Rate limiting (20/session) | Prevent abuse, control API costs |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API access |
| `CHROMA_PERSIST_DIR` | ChromaDB storage path |
| `CORS_ORIGINS` | Allowed frontend origins |
| `SMTP_HOST/PORT/USER/PASSWORD` | Email notification sending |
| `CAL_COM_API_KEY` | Booking integration |
| `VITE_API_URL` | Frontend API base URL |
