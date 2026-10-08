from datetime import datetime
from uuid import uuid4


class CaseService:
    """
    Handles core case-management operations.

    Phase 1 uses in-memory storage.
    This can later be replaced with SQLite
    without changing the API structure.
    """

    def __init__(self):
        self.cases = {}

    def create_case(
        self,
        description: str,
        incident_type: str | None = None,
    ) -> dict:
        case_id = str(uuid4())[:8]

        case = {
            "case_id": case_id,
            "description": description,
            "incident_type": incident_type,
            "status": "Created",
            "created_at": datetime.utcnow().isoformat(),
        }

        self.cases[case_id] = case

        return case

    def get_case(self, case_id: str) -> dict | None:
        return self.cases.get(case_id)

    def update_case(
        self,
        case_id: str,
        updates: dict,
    ) -> dict | None:
        case = self.cases.get(case_id)

        if not case:
            return None

        case.update(updates)
        case["updated_at"] = datetime.utcnow().isoformat()

        return case


case_service = CaseService()
