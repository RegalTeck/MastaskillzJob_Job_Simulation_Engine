# Mastaskillz - Job Simulation Engine (Probation Task)

This is the MVP implementation of a Job Simulation Engine that dynamically generates tiered tasks based on a selected role and skill level.

## 📦 Features

- Dynamic task generation using FastAPI
- Role-based simulation templates (Backend Developer, Product Manager, etc.)
- Skill taxonomy handled through JSON structure
- Ready API for frontend integration

## 🚀 Getting Started

1. Clone the repo
2. Create a virtual environment
3. Install dependencies

```bash
pip install -r requirements.txt
```

Visit Swagger UI:
uvicorn app.main:app --reload

API Usage
GET /generate-task/{role}/{level}
Example:
/generate-task/Backend%20Developer/Beginner

JSON Task Templates
Stored under app/data/, e.g.:

backend_developer_tasks.json

product_manager_tasks.json
