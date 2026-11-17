from app.routes.auth import router as auth_router
from app.routes.teams import router as teams_router
from app.routes.uploads import router as uploads_router
from app.routes.designs import router as designs_router
from app.routes.ai import router as ai_router

__all__ = ["auth_router", "teams_router", "uploads_router", "designs_router", "ai_router"]
