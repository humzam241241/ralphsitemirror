"""Chat router for Raffy AI chatbot."""

from collections import defaultdict
from fastapi import APIRouter, HTTPException

from app.models.schemas import ChatRequest, ChatResponse
from app.services.raffy import RaffyService

router = APIRouter()
raffy_service = RaffyService()

# In-memory rate limiting: session_id -> message count (per session window)
# Production: use Redis or similar
_session_message_counts: dict[str, int] = defaultdict(int)
RATE_LIMIT_PER_SESSION = 20


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Chat endpoint for Raffy AI assistant.
    Accepts user message and session_id, returns Raffy's response with intent and suggestions.
    Rate limited to 20 messages per session.
    """
    session_id = request.session_id

    if _session_message_counts[session_id] >= RATE_LIMIT_PER_SESSION:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Maximum 20 messages per session.",
        )

    _session_message_counts[session_id] += 1

    result = await raffy_service.get_response(request.message, session_id)

    return ChatResponse(
        response=result["response"],
        intent=result["intent"],
        suggestions=result["suggestions"],
    )
