from fastapi import FastAPI
from app.routers.health_router import router as health_router
from app.routers.ai_router import router as ai_router

app = FastAPI(title="Vibing Clip AI Service")

app.include_router(health_router)
app.include_router(ai_router)
