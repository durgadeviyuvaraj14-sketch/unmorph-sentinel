from fastapi import APIRouter
from pydantic import BaseModel

from app.services.severity_service import severity_service


router = APIRouter(
    prefix="/api/severity",
    tags=["Severity"],
)


class SeverityRequest(BaseModel):
    description: str
    incident_type: str | None = None
    evidence_count: int = 0


@router.post("/assess")
def assess_severity(request: SeverityRequest):
    result = severity_service.assess(
        description=request.description,
        incident_type=request.incident_type,
        evidence_count=request.evidence_count,
    )

    return {
        "success": True,
        "severity": result,
    }
