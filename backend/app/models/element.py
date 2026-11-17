import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class DesignElement(Base):
    __tablename__ = "design_elements"

    id = Column(Integer, primary_key=True, index=True)
    design_id = Column(Integer, ForeignKey("designs.id", ondelete="CASCADE"), nullable=False)
    element_type = Column(String(50), nullable=False)  # logo, text, number, shape, pattern, stripe
    element_data = Column(JSON, nullable=False, default=dict)  # Fabric.js object representation (coords, scale, colors)
    z_index = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    design = relationship("Design", back_populates="elements")
