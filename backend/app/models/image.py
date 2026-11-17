import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class GeneratedImage(Base):
    __tablename__ = "generated_images"

    id = Column(Integer, primary_key=True, index=True)
    design_id = Column(Integer, ForeignKey("designs.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    generation_status = Column(String(50), nullable=False, default="completed")  # pending, processing, completed, failed
    variation_number = Column(Integer, nullable=False, default=1)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    design = relationship("Design", back_populates="generated_images")
