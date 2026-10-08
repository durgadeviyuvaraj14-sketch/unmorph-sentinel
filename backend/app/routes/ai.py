from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ai_service


router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


class IncidentRequest(BaseModel):
    description: str


@router.post("/analyze-incident")
def analyze_incident(request: IncidentRequest):
    result = ai_service.analyze_incident(request.description)

    return {
        "success": True,
        "analysis": result,
        "disclaimer": (
            "This is an AI-assisted prototype assessment and is not "
            "a legal or professional investigation."
        ),
    }
