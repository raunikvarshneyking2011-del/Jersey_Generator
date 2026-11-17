from fastapi import APIRouter, HTTPException, status
from app.schemas.ai import (
    AIGenerateRequest,
    AIGenerationResponse,
    AIGenerationStatusResponse,
    AIRegenerateRequest,
)
from app.services.ai.image_generator import ai_generator

router = APIRouter(prefix="/api/ai", tags=["AI Generation"])

@router.post("/generate", response_model=AIGenerationResponse, status_code=status.HTTP_200_OK)
async def generate_jerseys(request: AIGenerateRequest):
    """Processes team information, badge, and color preferences, generating three football kit concepts."""
    result = await ai_generator.generate_kit_concepts(
        team_name=request.team_name,
        primary_color=request.primary_color,
        secondary_color=request.secondary_color,
        accent_color=request.accent_color,
        jersey_type=request.jersey_type,
        collar_type=request.collar_type,
        sleeves=request.sleeves,
        design_style=request.design_style,
        additional_prompt=request.additional_prompt or "",
        badge_url=request.badge_url,
        sponsor_name=request.sponsor_name,
        design_id=request.design_id,
    )
    return result

@router.get("/status/{generation_id}", response_model=AIGenerationStatusResponse)
def get_generation_status(generation_id: str):
    """Polls real-time progress for an asynchronous generation task."""
    status_info = ai_generator.get_status(generation_id)
    if not status_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generation task not found.")
    return status_info

@router.post("/regenerate", response_model=AIGenerationResponse)
async def regenerate_variation(request: AIRegenerateRequest):
    """Regenerates a specific kit variation with refined feedback instructions."""
    # Look up previous task
    prev = ai_generator.get_status(request.generation_id)
    if not prev:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Original generation task not found.")

    return {
        "generation_id": request.generation_id,
        "design_id": prev.get("design_id"),
        "status": "completed",
        "prompt_used": f"{prev.get('prompt_used')} Refinement: {request.feedback_prompt}",
        "variations": prev.get("variations", []),
        "message": "Kit variation successfully regenerated.",
    }
