# Product Vision — Ryan's Roofing

## Mission

Deliver the most technologically advanced roofing experience in Durham Region by blending old-school craftsmanship with cutting-edge AI — starting with **Raffy**, our AI-powered customer assistant.

## Problem

Homeowners shopping for roofing services face:

- Long wait times for quotes and callbacks
- Uncertainty about pricing, timelines, and materials
- No easy way to book inspections outside business hours
- Emergency situations (storm damage, leaks) with no immediate guidance

## Solution

A modern, mobile-first website paired with **Raffy** — an AI chatbot that:

1. Answers roofing questions instantly using a curated knowledge base
2. Classifies customer intent (booking, quote, emergency, general)
3. Triggers booking flows and escalates emergencies to humans
4. Provides 24/7 availability with personality and brand consistency

## Target Users

| Persona | Need |
|---------|------|
| Homeowner (Durham Region) | Quick quote, book inspection, learn about services |
| Emergency caller | Immediate guidance for storm/leak damage |
| Comparison shopper | FAQ answers, pricing transparency, trust signals |

## Key Metrics

- **Chat engagement rate** — % of visitors who interact with Raffy
- **Booking conversion** — chats that result in a booked inspection
- **Response accuracy** — Raffy answers matching knowledge base correctly
- **Lighthouse score** — ≥ 90 across all categories
- **Time to first response** — < 2 seconds for Raffy replies

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS + TypeScript |
| Backend | FastAPI (Python) |
| AI/LLM | Anthropic Claude API |
| Knowledge Base | ChromaDB (vector store) |
| Intent Classification | spaCy NLP |
| Booking | Cal.com integration |
| Hosting | Vercel (frontend) + VPS (backend) |
| CI/CD | GitHub Actions |
| Testing | Playwright (E2E) + pytest (API) |

## Sprint Roadmap

| Sprint | Focus | Week |
|--------|-------|------|
| 1 | Website Scaffold | 1 |
| 2 | Website Content Sections | 2 |
| 3 | Raffy Backend (Brain) | 3 |
| 4 | Raffy Frontend (Face) | 4 |
| 5 | Booking + Contact Integration | 5 |
| 6 | QA, Polish & Launch Prep | 6 |
