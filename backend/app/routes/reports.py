from fastapi import APIRouter
from pydantic import BaseModel

from app.services.report_service import report_service


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"],
)


class ReportRequest(BaseModel):
    case: dict


@router.post("/generate")
def generate_report(request: ReportRequest):
    report = report_service.generate_report(request.case)

    return {
        "success": True,
        "report": report,
    }
