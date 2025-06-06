# Mastaskillz - Job Simulation Engine (Probation Task)

This is the MVP implementation of a Job Simulation Engine that dynamically generates tiered, role-based simulation tasks and validates submissions based on the task type (code, document).

## 📦 Features

- Dynamic task generation using FastAPI
- Unified skill/task taxonomy (`role_tasks.json`)
- Role-based simulations with Beginner → Expert levels
- Code task validation via pytest
- Document task validation via NLP similarity scoring
- Supports `.txt`, `.docx`, and `.pdf` uploads
- Full Swagger API docs and curl support

## Getting Started

1. Clone the repo
2. Create and activate a virtual environment
3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the app locally:

```bash
uvicorn app.main:app --reload
```

Then visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for Swagger UI.

---

## API Endpoints

### Generate a Simulation Task

```
GET /generate-task/{role}/{level}
```

**Example:**

```
/generate-task/Backend%20Developer/Beginner
```

---

### Submit a Code Task

```
POST /submit-code
```

**Form Fields:** `role`, `level`, `file (.py)`  
Validates code using pytest with auto-generated test cases.

---

### Submit a Document Task

```
POST /submit-document
```

**Form Fields:** `role`, `level`, `description` OR `file` (`.txt`, `.docx`, `.pdf`)  
Scores similarity with expected output using NLP (difflib).

---

## Data Structure

All role-based tasks are stored in one file:

```
app/data/role_tasks.json
```

Each role has 4 tiers (Beginner → Expert) with:

- `instructions`
- `constraints`
- `expected_deliverables`
- `expected_description`

Supported Roles:

- Backend Developer
- Product Manager
- UI/UX Designer
- Data Analyst
- Virtual Assistant
- AI/ML Engineer
- Frontend Developer
- Cloud/DevOps Engineer

---

## Dependencies

Be sure your `requirements.txt` includes:

```txt
fastapi
uvicorn
python-docx
pymupdf
pytest
```

---

## Notes

- You can test all endpoints using Swagger UI or `curl`
- Handles both file uploads and manual description input for document tasks
- Cleanup and feedback are automatic

---

## Status: June 3rd and 6th Deliverables Completed
