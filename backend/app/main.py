from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health import router as health_router
from app.routes.cases import router as cases_router


app = FastAPI(
    title="UNMORPH SENTINEL API",
    description="Backend API for the UNMORPH SENTINEL Phase 1 prototype.",
    version="1.0.0",
)


# Allow the React frontend to communicate with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes.
app.include_router(health_router)
app.include_router(cases_router)


@app.get("/")
def root():
    return {
        "name": "UNMORPH SENTINEL",
        "status": "running",
        "message": "Backend API is working.",
    }
