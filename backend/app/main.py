import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import init_db
from app.routes.auth import router as auth_router
from app.routes.teams import router as teams_router
from app.routes.uploads import router as uploads_router
from app.routes.designs import router as designs_router
from app.routes.ai import router as ai_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure upload directories exist and initialize database schema
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "logos"), exist_ok=True)
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "images"), exist_ok=True)
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "concepts"), exist_ok=True)
    os.makedirs(os.path.join(settings.UPLOAD_DIR, "exports"), exist_ok=True)

    # Initialize SQLAlchemy database tables
    init_db()
    yield
    # Shutdown logic if needed

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="JerseyAI – AI-Powered Football Jersey Designer Backend API",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Files Mount for serving uploaded badges and generated kit images
static_dir = os.path.join(settings.BASE_DIR, "static")
os.makedirs(static_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Include Routers
app.include_router(auth_router)
app.include_router(teams_router)
app.include_router(uploads_router)
app.include_router(designs_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {
        "service": "JerseyAI Backend API",
        "tagline": "Design Your Identity. Wear Your Legacy.",
        "status": "online",
        "version": settings.VERSION,
        "docs": "/docs",
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": settings.DATABASE_URL.split("://")[0],
        "ai_provider": settings.AI_PROVIDER,
        "ai_configured": bool(settings.GEMINI_API_KEY),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
