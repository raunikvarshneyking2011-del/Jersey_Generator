import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from app.main import app
from app.database import init_db

init_db()

client = TestClient(app)

print("=" * 60)
print("TESTING FASTAPI ENDPOINTS VIA TESTCLIENT")
print("=" * 60)

# 1. Health check
res = client.get("/api/health")
print("1. GET /api/health ->", res.status_code, res.json())
assert res.status_code == 200

# 2. Root check
res = client.get("/")
print("2. GET / ->", res.status_code, res.json()["service"])
assert res.status_code == 200

# 3. Auth registration
res = client.post("/api/auth/register", json={
    "username": "coach_alex",
    "email": "alex@thunderfc.com",
    "password": "Password123!"
})
print("3. POST /api/auth/register ->", res.status_code)
assert res.status_code in [201, 400]  # 400 if already created
if res.status_code == 201:
    token = res.json()["access_token"]
else:
    # Login
    res_login = client.post("/api/auth/login", json={
        "email": "alex@thunderfc.com",
        "password": "Password123!"
    })
    token = res_login.json()["access_token"]
    print("   POST /api/auth/login ->", res_login.status_code)

headers = {"Authorization": f"Bearer {token}"}

# 4. Auth me
res = client.get("/api/auth/me", headers=headers)
print("4. GET /api/auth/me ->", res.status_code, res.json()["username"])
assert res.status_code == 200

# 5. Create Team
res = client.post("/api/teams", json={
    "team_name": "Thunder FC",
    "primary_color": "#0f172a",
    "secondary_color": "#f59e0b",
    "accent_color": "#38bdf8"
}, headers=headers)
print("5. POST /api/teams ->", res.status_code, res.json()["team_name"])
assert res.status_code == 201
team_id = res.json()["id"]

# 6. List Teams
res = client.get("/api/teams", headers=headers)
print("6. GET /api/teams ->", res.status_code, f"({len(res.json())} teams)")
assert res.status_code == 200

# 7. Create Design
res = client.post("/api/designs", json={
    "design_name": "Thunder 2026 Home Kit",
    "jersey_type": "home",
    "style": "geometric",
    "team_id": team_id,
    "elements": [
        {"element_type": "logo", "element_data": {"x": 100, "y": 150, "scale": 1.0}, "z_index": 1},
        {"element_type": "number", "element_data": {"text": "10", "fontSize": 48}, "z_index": 2}
    ]
}, headers=headers)
print("7. POST /api/designs ->", res.status_code, res.json()["design_name"])
assert res.status_code == 201
design_id = res.json()["id"]

# 8. List Designs
res = client.get("/api/designs", headers=headers)
print("8. GET /api/designs ->", res.status_code, f"({len(res.json())} designs)")
assert res.status_code == 200

# 9. Get Specific Design Detail
res = client.get(f"/api/designs/{design_id}", headers=headers)
print("9. GET /api/designs/{id} ->", res.status_code, f"(Elements: {len(res.json()['elements'])})")
assert res.status_code == 200

# 10. AI Generate
res = client.post("/api/ai/generate", json={
    "team_name": "Thunder FC",
    "primary_color": "#0f172a",
    "secondary_color": "#f59e0b",
    "accent_color": "#38bdf8",
    "jersey_type": "home",
    "collar_type": "round",
    "sleeves": "short",
    "design_style": "geometric",
    "additional_prompt": "Golden lightning bolt accents",
    "sponsor_name": "HYPERION",
    "design_id": design_id
})
print("10. POST /api/ai/generate ->", res.status_code, f"(Status: {res.json()['status']}, Variations: {len(res.json()['variations'])})")
assert res.status_code == 200

# 11. Upload test logo
import io
dummy_png = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
files = {"file": ("test_crest.png", io.BytesIO(dummy_png), "image/png")}
res = client.post("/api/upload/logo", files=files)
print("11. POST /api/upload/logo ->", res.status_code, res.json()["file_url"])
assert res.status_code == 201

# 12. Design Export
res = client.post(f"/api/designs/{design_id}/export", json={
    "canvas_data": {"objects": []},
    "export_format": "png",
    "resolution_multiplier": 2,
    "view": "front"
}, headers=headers)
print("12. POST /api/designs/{id}/export ->", res.status_code, res.json()["resolution"])
assert res.status_code == 200

print("=" * 60)
print("ALL 12 BACKEND TESTS PASSED WITH 100% SUCCESS!")
print("=" * 60)
