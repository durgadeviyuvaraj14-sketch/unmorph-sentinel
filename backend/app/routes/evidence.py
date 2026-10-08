import hashlib
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, UploadFile, File, Form


router = APIRouter(
    prefix="/api/evidence",
    tags=["Evidence"],
)


evidence_store = {}


def calculate_sha256(file_bytes: bytes) -> str:
    """Calculate the SHA-256 hash of uploaded evidence."""
    return hashlib.sha256(file_bytes).hexdigest()


@router.post("/upload")
async def upload_evidence(
    case_id: str = Form(...),
    description: Optional[str] = Form(None),
    file: UploadFile = File(...),
):
    file_bytes = await file.read()

    evidence_id = f"EVD-{len(evidence_store) + 1:04d}"
    file_hash = calculate_sha256(file_bytes)

    evidence = {
        "evidence_id": evidence_id,
        "case_id": case_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "description": description,
        "size_bytes": len(file_bytes),
        "sha256": file_hash,
        "uploaded_at": datetime.utcnow().isoformat(),
        "status": "Preserved",
    }

    evidence_store[evidence_id] = evidence

    return {
        "success": True,
        "evidence": evidence,
        "message": "Evidence uploaded and SHA-256 hash calculated.",
    }


@router.get("/{case_id}")
def get_case_evidence(case_id: str):
    case_evidence = [
        evidence
        for evidence in evidence_store.values()
        if evidence["case_id"] == case_id
    ]

    return {
        "success": True,
        "case_id": case_id,
        "count": len(case_evidence),
        "evidence": case_evidence,
    }
