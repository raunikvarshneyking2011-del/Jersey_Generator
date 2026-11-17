# JerseyAI – AI-Powered Football Jersey Designer

> **Tagline:** *"Design Your Identity. Wear Your Legacy."*

JerseyAI is a modern, professional, full-stack sportswear design platform that allows users to generate and customize football jerseys using Artificial Intelligence and an interactive vector editing studio.

---

## Project Status

- [x] **PHASE 1: Frontend Architecture & Interactive Mockup Studio** (Completed)
  - React 19 + Vite setup with Tailwind CSS dark sports-tech theme
  - Modern athletic navigation, hero showcase, and responsive layout
  - Multi-section jersey design form with validation
  - Real-time vector SVG football jersey mockup with dynamic colors, collars (Round, V-neck, Polo), styles, patterns, team badge, and chest sponsor
  - Front & Back 360° jersey toggling with arched player names and squad numbers
- [x] **PHASE 2: Backend Architecture & Database Engine** (Completed)
  - Python FastAPI high-performance asynchronous REST API
  - SQLAlchemy ORM with PostgreSQL and SQLite cross-compatibility
  - Database schema: `Users`, `Teams`, `Designs`, `GeneratedImages`, and `DesignElements`
  - Secure bcrypt password hashing and PyJWT token authentication
  - Logo and image upload pipeline with 5MB validation, MIME checking, and Pillow dimensions
  - Full CRUD REST APIs for teams, designs, canvas elements, and export
  - AI prompt builder and generation service module with status tracking
- [ ] **PHASE 3: AI Generation Pipeline** (Next)
- [ ] **PHASE 4: Fabric.js Interactive Studio Editor**
- [ ] **PHASE 5: Saving & High-Res PNG Export**
- [ ] **PHASE 6: Authentication & 3D Garment Previews**

---

## Directory Structure

```text
JerseyAI/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Athletic navigation with mobile menu
│   │   │   ├── Footer.jsx       # Pro kit tech footer
│   │   │   └── JerseyPreviewMockup.jsx # Dynamic vector SVG jersey renderer
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Landing page with hero & showcase
│   │   │   ├── CreateJerseyPage.jsx # Multi-section kit configuration form
│   │   │   ├── MyDesignsPage.jsx# Saved design library & project cards
│   │   │   ├── AboutPage.jsx    # Engine tech & sportswear standards
│   │   │   └── AuthModal.jsx    # Sign in & registration modal
│   │   ├── styles/
│   │   │   └── index.css        # Tailwind CSS & sports theme styling
│   │   ├── App.jsx              # Main routing & state container
│   │   └── main.jsx             # React entrypoint
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entrypoint & static mount
│   │   ├── config.py            # Pydantic environment settings
│   │   ├── database.py          # SQLAlchemy engine, session & init_db()
│   │   ├── models/              # SQLAlchemy Database Models
│   │   │   ├── user.py          # Users table
│   │   │   ├── team.py          # Teams table
│   │   │   ├── design.py        # Designs table
│   │   │   ├── image.py         # GeneratedImages table
│   │   │   └── element.py       # DesignElements table (JSON/JSONB canvas layers)
│   │   ├── schemas/             # Pydantic request & response validation
│   │   │   ├── user.py          # Auth schemas (register, login, token)
│   │   │   ├── team.py          # Team schemas (create, update, response)
│   │   │   ├── design.py        # Design & export schemas
│   │   │   ├── upload.py        # Upload response schemas
│   │   │   └── ai.py            # AI generation request/response schemas
│   │   ├── routes/              # FastAPI Router endpoints
│   │   │   ├── auth.py          # /api/auth (register, login, me, logout)
│   │   │   ├── teams.py         # /api/teams (CRUD)
│   │   │   ├── uploads.py       # /api/upload (logo, image)
│   │   │   ├── designs.py       # /api/designs (CRUD, export)
│   │   │   └── ai.py            # /api/ai (generate, status, regenerate)
│   │   ├── services/
│   │   │   ├── auth_service.py  # JWT & current user dependencies
│   │   │   ├── image_service.py # Pillow processing & file storage
│   │   │   └── ai/
│   │   │       ├── prompt_builder.py  # Engineered sportswear prompt builder
│   │   │       └── image_generator.py # Configurable generation service & status tracker
│   │   └── utils/
│   │       └── security.py      # Bcrypt password hashing & JWT encoding/decoding
│   ├── tests/
│   │   └── test_api.py          # Comprehensive 12-test API test suite
│   ├── requirements.txt         # Python dependencies
│   └── .venv/                   # Python virtual environment
├── .env.example                 # Global environment configuration template
└── README.md
```

---

## Backend Quickstart Instructions

### 1. Requirements
- Python 3.10+ (Tested on Python 3.13)
- pip

### 2. Run the Backend API Server
```bash
# Navigate to the backend directory
cd backend

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Start the FastAPI server with Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Interactive API Documentation
Once running, open your browser at:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc UI:** `http://localhost:8000/redoc`

### 4. Run the Automated Test Suite
```bash
cd backend
.venv\Scripts\python.exe tests/test_api.py
```
This runs an end-to-end integration test of all 12 endpoints:
- Health check & root status
- User registration and JWT authentication
- Team creation and retrieval
- Multi-layer design project creation with vector canvas elements
- Club crest upload with MIME and dimension inspection
- Sportswear AI prompt generation and status polling
- High-resolution composition export
