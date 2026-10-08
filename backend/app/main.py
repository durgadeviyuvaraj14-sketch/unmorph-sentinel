from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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


@app.get("/")
def root():
    return {
        "name": "UNMORPH SENTINEL",
        "status": "running",
        "message": "Backend API is working.",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "UNMORPH SENTINEL API",
    }
