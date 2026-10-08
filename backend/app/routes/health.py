from fastapi import APIRouter

from app.models.database import get_connection


router = APIRouter(
    prefix="/api",
    tags=["Health"],
)


@router.get("/health")
def health_check():
    connection = get_connection()

    connection.execute(
        "SELECT 1"
    )

    connection.close()

    return {
        "status": "healthy",
        "service": "UNMORPH SENTINEL API",
        "database": "connected",
    }
