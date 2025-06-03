from fastapi import APIRouter
import json
import os

# ✅ This line is missing in your file
router = APIRouter()

@router.get("/generate-task/{role}/{level}")
def generate_task(role: str, level: str):
    try:
        normalized_role = role.lower().replace(" ", "_")
        filepath = f"app/data/{normalized_role}_tasks.json"

        with open(filepath, "r") as f:
            tasks = json.load(f)

        return {
            "role": role,
            "level": level,
            "task": tasks[level]
        }
    except Exception as e:
        return {"error": str(e)}
