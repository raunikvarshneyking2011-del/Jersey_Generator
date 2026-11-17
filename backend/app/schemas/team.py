from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class TeamBase(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100)
    badge_url: Optional[str] = None
    primary_color: str = Field("#0f172a", max_length=20)
    secondary_color: str = Field("#f59e0b", max_length=20)
    accent_color: str = Field("#38bdf8", max_length=20)

class TeamCreate(TeamBase):
    pass

class TeamUpdate(BaseModel):
    team_name: Optional[str] = Field(None, min_length=2, max_length=100)
    badge_url: Optional[str] = None
    primary_color: Optional[str] = Field(None, max_length=20)
    secondary_color: Optional[str] = Field(None, max_length=20)
    accent_color: Optional[str] = Field(None, max_length=20)

class TeamResponse(TeamBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True
