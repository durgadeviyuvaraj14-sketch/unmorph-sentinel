from datetime import datetime
from uuid import uuid4

from app.models.database import get_connection


class CaseService:
    """
    Handles case-management operations using SQLite.
    """

    def create_case(
        self,
        description: str,
        incident_type: str | None = None,
    ) -> dict:

        case_id = str(uuid4())[:8]
        now = datetime.utcnow().isoformat()

        connection = get_connection()

        connection.execute(
            """
            INSERT INTO cases (
                case_id,
                description,
                incident_type,
                status,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                case_id,
                description,
                incident_type,
                "Created",
                now,
                now,
            ),
        )

        connection.commit()
        connection.close()

        return self.get_case(case_id)

    def get_case(self, case_id: str) -> dict | None:
        connection = get_connection()

        row = connection.execute(
            """
            SELECT *
            FROM cases
            WHERE case_id = ?
            """,
            (case_id,),
        ).fetchone()

        connection.close()

        if not row:
            return None

        return dict(row)

    def update_case(
        self,
        case_id: str,
        updates: dict,
    ) -> dict | None:

        case = self.get_case(case_id)

        if not case:
            return None

        allowed_fields = {
            "description",
            "incident_type",
            "status",
            "updated_at",
        }

        updates = {
            key: value
            for key, value in updates.items()
            if key in allowed_fields
        }

        if not updates:
            return case

        updates["updated_at"] = datetime.utcnow().isoformat()

        set_clause = ", ".join(
            f"{key} = ?"
            for key in updates
        )

        values = list(updates.values())
        values.append(case_id)

        connection = get_connection()

        connection.execute(
            f"""
            UPDATE cases
            SET {set_clause}
            WHERE case_id = ?
            """,
            values,
        )

        connection.commit()
        connection.close()

        return self.get_case(case_id)


case_service = CaseService()
