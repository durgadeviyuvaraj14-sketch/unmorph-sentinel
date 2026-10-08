from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional

from app.services.evidence_service import evidence_service


router = APIRouter(
    prefix="/api/evidence",
    tags=["Evidence"],
)


@router.post("/upload")
async def upload_evidence(
    case_id: str = Form(...),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
):
    file_bytes = await file.read()

    evidence = evidence_service.create_evidence(
        case_id=case_id,
        filename=file.filename,
        content_type=file.content_type,
        file_bytes=file_bytes,
        description=description,
    )

    return {
        "success": True,
        "evidence": evidence,
        "message": "Evidence uploaded and SHA-256 hash calculated.",
    }


@router.get("/{case_id}")
def get_case_evidence(case_id: str):
    evidence = evidence_service.get_case_evidence(case_id)

    return {
        "success": True,
        "case_id": case_id,
        "count": len(evidence),
        "evidence": evidence,
    }
