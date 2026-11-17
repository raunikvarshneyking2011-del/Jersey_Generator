from fastapi import APIRouter, UploadFile, File, status
from app.schemas.upload import UploadResponse
from app.services.image_service import image_service

router = APIRouter(prefix="/api/upload", tags=["Image Uploads"])

@router.post("/logo", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_logo(file: UploadFile = File(...)):
    """Uploads a club crest/badge (PNG, SVG, JPG, WEBP) with 5MB validation and metadata extraction."""
    metadata = await image_service.save_upload(file=file, subfolder="logos")
    return metadata

@router.post("/image", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...)):
    """Uploads a general reference artwork, sponsor mark, or pattern texture."""
    metadata = await image_service.save_upload(file=file, subfolder="images")
    return metadata
