"""FastAPI application entry point for Ryan's Roofing API."""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.config import Settings
from app.routers import chat, health

settings = Settings()

app = FastAPI(
    title="Ryan's Roofing API",
    description="Backend API for Ryan's Roofing website with Raffy AI chatbot",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(chat.router, prefix="/api", tags=["chat"])


@app.websocket("/ws/chat")
async def websocket_chat(websocket: WebSocket) -> None:
    """
    WebSocket endpoint stub for real-time chat with Raffy.
    Full implementation to be added later.
    """
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Placeholder: echo back for now
            await websocket.send_json({"type": "message", "content": f"Raffy received: {data}"})
    except WebSocketDisconnect:
        pass
