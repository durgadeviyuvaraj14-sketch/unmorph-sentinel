from app.models.database import get_connection


def initialize_full_schema():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS interview_answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_id TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT,
            FOREIGN KEY (case_id) REFERENCES cases(case_id)
        )
        """
    )

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS timeline_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_id TEXT NOT NULL,
            event_date TEXT,
            title TEXT NOT NULL,
            description TEXT,
            FOREIGN KEY (case_id) REFERENCES cases(case_id)
        )
        """
    )

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS severity_assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_id TEXT NOT NULL,
            level TEXT,
            score INTEGER,
            reasons TEXT,
            assessed_at TEXT,
            FOREIGN KEY (case_id) REFERENCES cases(case_id)
        )
        """
    )

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS human_reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            case_id TEXT NOT NULL,
            reviewed INTEGER DEFAULT 0,
            reviewed_at TEXT,
            FOREIGN KEY (case_id) REFERENCES cases(case_id)
        )
        """
    )

    connection.commit()
    connection.close()
