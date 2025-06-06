from fastapi import APIRouter
import json
import os

router = APIRouter()

@router.get("/generate-task/{role}/{level}")
def generate_task(role: str, level: str):
    try:
        # Normalize role name to match key in role_tasks.json
        normalized_role = role.lower().replace(" ", "_") + "_tasks"
        filepath = "app/data/role_tasks.json"

        with open(filepath, "r") as f:
            all_tasks = json.load(f)

        tasks = all_tasks[normalized_role]

        return {
            "role": role,
            "level": level,
            "task": tasks[level]
        }
    except Exception as e:
        return {"error": str(e)}
