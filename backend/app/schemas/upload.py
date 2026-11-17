from pydantic import BaseModel

class UploadResponse(BaseModel):
    file_url: str
    filename: str
    content_type: str
    file_size_bytes: int
    dimensions: str = "N/A"
