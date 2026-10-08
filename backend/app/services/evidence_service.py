import hashlib
from datetime import datetime
from uuid import uuid4

from app.models.database import get_connection


class EvidenceService:
    """
    Handles evidence metadata and integrity operations
    using SQLite.
    """

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
        uploaded_at = datetime.utcnow().isoformat()
        sha256 = self.calculate_sha256(file_bytes)

        connection = get_connection()

        connection.execute(
            """
            INSERT INTO evidence (
                evidence_id,
                case_id,
                filename,
                content_type,
                description,
                size_bytes,
                sha256,
                uploaded_at,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                evidence_id,
                case_id,
                filename,
                content_type,
                description,
                len(file_bytes),
                sha256,
                uploaded_at,
                "Preserved",
            ),
        )

        connection.commit()
        connection.close()

        return self.get_evidence(evidence_id)

    def get_evidence(self, evidence_id: str) -> dict | None:
        connection = get_connection()

        row = connection.execute(
            """
            SELECT *
            FROM evidence
            WHERE evidence_id = ?
            """,
            (evidence_id,),
        ).fetchone()

        connection.close()

        if not row:
            return None

        return dict(row)

    def get_case_evidence(self, case_id: str) -> list[dict]:
        connection = get_connection()

        rows = connection.execute(
            """
            SELECT *
            FROM evidence
            WHERE case_id = ?
            ORDER BY uploaded_at ASC
            """,
            (case_id,),
        ).fetchall()

        connection.close()

        return [dict(row) for row in rows]


evidence_service = EvidenceService()
