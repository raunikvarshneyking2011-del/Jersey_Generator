from typing import Optional, List
from pydantic import BaseModel, Field

class AIGenerateRequest(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100)
    badge_url: Optional[str] = None
    primary_color: str = Field("#0f172a", max_length=20)
    secondary_color: str = Field("#f59e0b", max_length=20)
    accent_color: str = Field("#38bdf8", max_length=20)
    jersey_type: str = Field("home", description="home, away, third")
    collar_type: str = Field("round", description="round, v-neck, polo")
    sleeves: str = Field("short", description="short")
    design_style: str = Field("geometric", description="modern, minimal, retro, geometric, futuristic, striped, gradient, abstract")
    additional_prompt: Optional[str] = ""
    sponsor_name: Optional[str] = None
    design_id: Optional[int] = None

class AIVariation(BaseModel):
    variation_number: int
    image_url: str
    preview_url: str
    palette: dict

class AIGenerationResponse(BaseModel):
    generation_id: str
    design_id: Optional[int]
    status: str  # processing, completed, failed
    prompt_used: str
    variations: List[AIVariation] = []
    message: str = "Jersey concepts generated successfully"

class AIGenerationStatusResponse(BaseModel):
    generation_id: str
    status: str
    progress_percentage: int
    variations: List[AIVariation] = []
    error: Optional[str] = None

class AIRegenerateRequest(BaseModel):
    generation_id: str
    feedback_prompt: Optional[str] = None
    variation_to_replace: Optional[int] = None
