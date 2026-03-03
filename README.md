# Ryan's Roofing — AI-Powered Roofing Platform

Modern website for Ryan's Roofing (Durham Region, ON) featuring **Raffy**, an AI-powered customer assistant chatbot.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite 7, TailwindCSS 4, TypeScript |
| Backend | FastAPI, Python 3.11+ |
| AI | Anthropic Claude, ChromaDB, spaCy |
| Booking | Cal.com integration |
| CI/CD | GitHub Actions |
| Hosting | Vercel (frontend) + VPS (backend) |

## Quick Start

### Option 1: start.bat (Windows)

```bash
start.bat
```

### Option 2: Manual

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
cp .env.example .env        # Edit with your API keys
python -m uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
├── frontend/          # React + Vite + TailwindCSS
│   └── src/
│       ├── components/
│       │   ├── layout/    # Navbar, Footer
│       │   ├── sections/  # Hero, About, Services, FAQ, etc.
│       │   └── raffy/     # Chat widget components
│       ├── pages/         # Page compositions
│       ├── hooks/         # Custom hooks (useChat)
│       └── utils/         # API client
├── backend/           # FastAPI + Python
│   └── app/
│       ├── routers/       # API endpoints
│       ├── services/      # Business logic (Raffy, KB)
│       ├── models/        # Pydantic schemas
│       └── utils/         # Intent classifier
├── docs/              # Product vision & architecture
├── .github/workflows/ # CI pipeline
└── start.bat          # One-click dev launcher
```

## Sprint Roadmap

| Sprint | Focus | Status |
|--------|-------|--------|
| 1 | Website Scaffold | In Progress |
| 2 | Content Sections | Planned |
| 3 | Raffy Backend (Brain) | Planned |
| 4 | Raffy Frontend (Face) | Planned |
| 5 | Booking + Contact Integration | Planned |
| 6 | QA, Polish & Launch Prep | Planned |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | Send message to Raffy |
| WS | `/ws/chat` | Real-time chat stream |

## Environment Variables

Copy `.env.example` to `.env` and fill in your keys. See `docs/architecture.md` for details.
