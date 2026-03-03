"""Health check router."""

from fastapi import APIRouter

from app.models.schemas import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    Health check endpoint for load balancers and monitoring.
    Returns service status and name.
    """
    return HealthResponse(status="healthy", service="ryans-roofing-api")
