"""Pydantic schemas for API request/response models."""

from pydantic import BaseModel, Field


class Message(BaseModel):
    """Single chat message."""

    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Request body for POST /api/chat."""

    message: str = Field(..., min_length=1, max_length=2000, description="User message")
    session_id: str = Field(..., min_length=1, description="Session identifier for conversation context")


class ChatResponse(BaseModel):
    """Response body for POST /api/chat."""

    response: str = Field(..., description="Raffy's response")
    intent: str = Field(..., description="Classified intent: book, quote, emergency, general")
    suggestions: list[str] = Field(default_factory=list, description="Suggested follow-up prompts")


class HealthResponse(BaseModel):
    """Response body for GET /api/health."""

    status: str = Field(..., description="Service status")
    service: str = Field(..., description="Service name")
