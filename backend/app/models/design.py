import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Design(Base):
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="SET NULL"), nullable=True)
    design_name = Column(String(150), nullable=False, default="Untitled Jersey")
    jersey_type = Column(String(50), nullable=False, default="home")  # home, away, third
    style = Column(String(50), nullable=False, default="modern")     # modern, geometric, striped, etc.
    status = Column(String(50), nullable=False, default="draft")     # draft, generating, ready, completed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="designs")
    team = relationship("Team", back_populates="designs")
    generated_images = relationship("GeneratedImage", back_populates="design", cascade="all, delete-orphan")
    elements = relationship("DesignElement", back_populates="design", cascade="all, delete-orphan")
