import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE_DIR = BASE_DIR / "data"
DATABASE_DIR.mkdir(exist_ok=True)

DATABASE_PATH = DATABASE_DIR / "unmorph.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS cases (
            case_id TEXT PRIMARY KEY,
            description TEXT NOT NULL,
            incident_type TEXT,
            status TEXT,
            created_at TEXT,
            updated_at TEXT
        )
        """
    )

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS evidence (
            evidence_id TEXT PRIMARY KEY,
            case_id TEXT NOT NULL,
            filename TEXT,
            content_type TEXT,
            description TEXT,
            size_bytes INTEGER,
            sha256 TEXT,
            uploaded_at TEXT,
            status TEXT,
            FOREIGN KEY (case_id) REFERENCES cases(case_id)
        )
        """
    )

    connection.commit()
    connection.close()


def execute_query(query, parameters=()):
    connection = get_connection()

    cursor = connection.execute(query, parameters)
    connection.commit()

    rows = cursor.fetchall()

    connection.close()

    return rows
