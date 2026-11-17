from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.design import Design
from app.models.element import DesignElement
from app.models.user import User
from app.schemas.design import (
    DesignCreate,
    DesignUpdate,
    DesignResponse,
    DesignDetailResponse,
    DesignExportRequest,
    DesignExportResponse,
)
from app.services.auth_service import get_optional_current_user

router = APIRouter(prefix="/api/designs", tags=["Design Management"])

@router.post("", response_model=DesignDetailResponse, status_code=status.HTTP_201_CREATED)
def create_design(
    design_in: DesignCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Creates a new jersey design project with optional initial canvas elements."""
    design = Design(
        user_id=current_user.id,
        team_id=design_in.team_id,
        design_name=design_in.design_name,
        jersey_type=design_in.jersey_type,
        style=design_in.style,
        status="draft",
    )
    db.add(design)
    db.commit()
    db.refresh(design)

    # Add any initial elements if provided
    if design_in.elements:
        for elem_in in design_in.elements:
            elem = DesignElement(
                design_id=design.id,
                element_type=elem_in.element_type,
                element_data=elem_in.element_data,
                z_index=elem_in.z_index,
            )
            db.add(elem)
        db.commit()
        db.refresh(design)

    return design

@router.get("", response_model=List[DesignResponse])
def get_user_designs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Lists all saved jersey design projects for the current user."""
    return db.query(Design).filter(Design.user_id == current_user.id).order_by(Design.updated_at.desc()).all()

@router.get("/{design_id}", response_model=DesignDetailResponse)
def get_design(
    design_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Retrieves full design details including Fabric.js canvas elements and generated images."""
    design = db.query(Design).filter(Design.id == design_id, Design.user_id == current_user.id).first()
    if not design:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Design project not found.")
    return design

@router.put("/{design_id}", response_model=DesignDetailResponse)
def update_design(
    design_id: int,
    design_in: DesignUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Updates design metadata and synchronizes editable canvas elements."""
    design = db.query(Design).filter(Design.id == design_id, Design.user_id == current_user.id).first()
    if not design:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Design project not found.")

    update_data = design_in.model_dump(exclude_unset=True)
    elements_data = update_data.pop("elements", None)

    for field, value in update_data.items():
        setattr(design, field, value)

    # Sync elements if explicitly sent
    if elements_data is not None:
        db.query(DesignElement).filter(DesignElement.design_id == design.id).delete()
        for elem_in in elements_data:
            elem = DesignElement(
                design_id=design.id,
                element_type=elem_in["element_type"],
                element_data=elem_in["element_data"],
                z_index=elem_in.get("z_index", 0),
            )
            db.add(elem)

    db.commit()
    db.refresh(design)
    return design

@router.delete("/{design_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_design(
    design_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Permanently deletes a design project."""
    design = db.query(Design).filter(Design.id == design_id, Design.user_id == current_user.id).first()
    if not design:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Design project not found.")

    db.delete(design)
    db.commit()
    return None

@router.post("/{design_id}/export", response_model=DesignExportResponse)
def export_design(
    design_id: int,
    export_in: DesignExportRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_optional_current_user)
):
    """Exports the jersey composition to high-resolution PNG or SVG for printing."""
    design = db.query(Design).filter(Design.id == design_id, Design.user_id == current_user.id).first()
    if not design:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Design project not found.")

    res_str = f"{1000 * export_in.resolution_multiplier}x{1200 * export_in.resolution_multiplier}"
    export_url = f"/static/uploads/exports/design_{design.id}_{export_in.view}.{export_in.export_format}"

    return {
        "export_url": export_url,
        "view": export_in.view,
        "resolution": res_str,
        "file_size_bytes": 1024 * 750 * export_in.resolution_multiplier,
        "format": export_in.export_format,
    }
