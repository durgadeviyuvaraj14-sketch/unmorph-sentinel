import hashlib
from datetime import datetime
from uuid import uuid4


class EvidenceService:
    """
    Handles evidence metadata and integrity operations.

    Phase 1 calculates a real SHA-256 hash for uploaded
    file content. Persistent database storage can be added later.
    """

    def __init__(self):
        self.evidence = {}

    def calculate_sha256(self, file_bytes: bytes) -> str:
        return hashlib.sha256(file_bytes).hexdigest()

    def create_evidence(
        self,
        case_id: str,
        filename: str,
        content_type: str | None,
        file_bytes: bytes,
        description: str | None = None,
    ) -> dict:

        evidence_id = str(uuid4())[:8]

        evidence = {
            "evidence_id": evidence_id,
            "case_id": case_id,
            "filename": filename,
            "content_type": content_type,
            "description": description,
            "size_bytes": len(file_bytes),
            "sha256": self.calculate_sha256(file_bytes),
            "uploaded_at": datetime.utcnow().isoformat(),
            "status": "Preserved",
        }

        self.evidence[evidence_id] = evidence

        return evidence

    def get_case_evidence(self, case_id: str) -> list[dict]:
        return [
            item
            for item in self.evidence.values()
            if item["case_id"] == case_id
        ]


evidence_service = EvidenceService()
