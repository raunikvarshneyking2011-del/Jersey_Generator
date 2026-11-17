import os
import uuid
from fastapi import UploadFile, HTTPException, status
from PIL import Image
from app.config import settings

ALLOWED_MIME_TYPES = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
}

class ImageService:
    @staticmethod
    async def save_upload(file: UploadFile, subfolder: str = "logos") -> dict:
        """Validates and persists uploaded badge/image, returning relative access URL and metadata."""
        # 1. Content type check
        content_type = file.content_type or ""
        if content_type not in ALLOWED_MIME_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported image format ({content_type}). Allowed formats: PNG, JPG, WEBP, SVG."
            )

        # 2. Read and size check
        content = await file.read()
        file_size = len(content)
        if file_size > settings.MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File exceeds maximum allowed size of {settings.MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)}MB."
            )

        # 3. Generate unique filename
        ext = ALLOWED_MIME_TYPES[content_type]
        unique_name = f"{uuid.uuid4().hex}{ext}"
        target_dir = os.path.join(settings.UPLOAD_DIR, subfolder)
        os.makedirs(target_dir, exist_ok=True)
        file_path = os.path.join(target_dir, unique_name)

        # 4. Save file to disk
        with open(file_path, "wb") as f:
            f.write(content)

        # 5. Measure dimensions if raster
        dimensions_str = "Vector/SVG"
        if ext != ".svg":
            try:
                with Image.open(file_path) as img:
                    dimensions_str = f"{img.width}x{img.height}"
            except Exception:
                pass

        # 6. Format access URL
        file_url = f"/static/uploads/{subfolder}/{unique_name}"

        return {
            "file_url": file_url,
            "filename": unique_name,
            "content_type": content_type,
            "file_size_bytes": file_size,
            "dimensions": dimensions_str,
        }

image_service = ImageService()
