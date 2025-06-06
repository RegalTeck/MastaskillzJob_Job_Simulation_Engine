# File: app/routers/submit_document.py

from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
import difflib
import json
import os
import mimetypes
from docx import Document
import fitz  # PyMuPDF

router = APIRouter()

@router.post("/submit-document")
def submit_document(
    role: str = Form(...),
    level: str = Form(...),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    try:
        if not description and not file:
            return {"error": "You must provide either a description or a file."}

        # ✅ Step 1: Load the expected task from unified JSON
        normalized_role = role.lower().replace(" ", "_") + "_tasks"
        filepath = "app/data/role_tasks.json"

        with open(filepath, "r") as f:
            all_roles = json.load(f)

        task_data = all_roles[normalized_role][level]

        # ✅ Step 2: Extract content from uploaded file if no description is passed
        if not description and file:
            mime_type = file.content_type
            if mime_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                # .docx handling
                docx = Document(file.file)
                content = "\n".join([para.text for para in docx.paragraphs])
            elif mime_type == "application/pdf":
                # .pdf handling
                with fitz.open(stream=file.file.read(), filetype="pdf") as pdf:
                    content = "\n".join([page.get_text() for page in pdf])
            else:
                # .txt or similar
                content = file.file.read().decode("utf-8")
        else:
            content = description

        # ✅ Step 3: Get expected comparison string
        if "expected_description" in task_data:
            expected_text = task_data["expected_description"]
        else:
            expected_text = "\n".join(task_data.get("expected_deliverables", []))

        # ✅ Step 4: Score similarity using difflib
        similarity = difflib.SequenceMatcher(None, content.lower(), expected_text.lower()).ratio()
        score = round(similarity * 100, 2)  # Convert to percentage

        return {
            "role": role,
            "level": level,
            "score": f"{score}% match",
            "feedback": "High similarity" if score > 75 else "Could be improved",
            "matched_against": expected_text
        }

    except Exception as e:
        return {"error": str(e)}
