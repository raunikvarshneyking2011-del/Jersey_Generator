from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class DesignElementBase(BaseModel):
    element_type: str = Field(..., description="logo, text, number, shape, pattern")
    element_data: Dict[str, Any] = Field(default_factory=dict)
    z_index: int = 0

class DesignElementCreate(DesignElementBase):
    pass

class DesignElementResponse(DesignElementBase):
    id: int
    design_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GeneratedImageResponse(BaseModel):
    id: int
    design_id: int
    image_url: str
    generation_status: str
    variation_number: int
    created_at: datetime

    class Config:
        from_attributes = True

class DesignBase(BaseModel):
    design_name: str = Field("Untitled Kit", max_length=150)
    jersey_type: str = Field("home", description="home, away, third")
    style: str = Field("geometric", description="modern, geometric, striped, minimal, futuristic, retro, gradient, abstract")
    team_id: Optional[int] = None

class DesignCreate(DesignBase):
    elements: Optional[List[DesignElementCreate]] = []

class DesignUpdate(BaseModel):
    design_name: Optional[str] = None
    jersey_type: Optional[str] = None
    style: Optional[str] = None
    team_id: Optional[int] = None
    status: Optional[str] = None
    elements: Optional[List[DesignElementCreate]] = None

class DesignResponse(DesignBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DesignDetailResponse(DesignResponse):
    elements: List[DesignElementResponse] = []
    generated_images: List[GeneratedImageResponse] = []

    class Config:
        from_attributes = True

class DesignExportRequest(BaseModel):
    canvas_data: Dict[str, Any] = Field(..., description="Fabric.js JSON canvas state")
    export_format: str = Field("png", description="png, svg, jpg")
    resolution_multiplier: int = Field(2, ge=1, le=4)
    view: str = Field("front", description="front, back")

class DesignExportResponse(BaseModel):
    export_url: str
    view: str
    resolution: str
    file_size_bytes: int
    format: str
