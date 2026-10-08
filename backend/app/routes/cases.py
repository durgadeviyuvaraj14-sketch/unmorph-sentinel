from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/cases",
    tags=["Cases"],
)


class CaseCreate(BaseModel):
    description: str
    incident_type: str | None = None


cases = {}


@router.post("/")
def create_case(case: CaseCreate):
    case_id = str(uuid4())[:8]

    new_case = {
        "case_id": case_id,
        "description": case.description,
        "incident_type": case.incident_type,
        "status": "Created",
        "created_at": datetime.utcnow().isoformat(),
    }

    cases[case_id] = new_case

    return {
        "success": True,
        "case": new_case,
    }


@router.get("/{case_id}")
def get_case(case_id: str):
    case = cases.get(case_id)

    if not case:
        return {
            "success": False,
            "message": "Case not found.",
        }

    return {
        "success": True,
        "case": case,
    }
