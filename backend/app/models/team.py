import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    team_name = Column(String(100), nullable=False)
    badge_url = Column(String(500), nullable=True)
    primary_color = Column(String(20), nullable=False, default="#0f172a")
    secondary_color = Column(String(20), nullable=False, default="#f59e0b")
    accent_color = Column(String(20), nullable=False, default="#38bdf8")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="teams")
    designs = relationship("Design", back_populates="team", cascade="all, delete-orphan")
