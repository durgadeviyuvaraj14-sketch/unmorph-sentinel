from fastapi import APIRouter
from pydantic import BaseModel

from app.services.case_service import case_service


router = APIRouter(
    prefix="/api/cases",
    tags=["Cases"],
)


class CaseCreate(BaseModel):
    description: str
    incident_type: str | None = None


@router.post("/")
def create_case(case: CaseCreate):
    new_case = case_service.create_case(
        description=case.description,
        incident_type=case.incident_type,
    )

    return {
        "success": True,
        "case": new_case,
    }


@router.get("/{case_id}")
def get_case(case_id: str):
    case = case_service.get_case(case_id)

    if not case:
        return {
            "success": False,
            "message": "Case not found.",
        }

    return {
        "success": True,
        "case": case,
    }
