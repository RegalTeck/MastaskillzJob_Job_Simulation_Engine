# File: app/routers/submit_code.py

from fastapi import APIRouter, UploadFile, File, Form
import subprocess
import os
import uuid
import shutil

router = APIRouter()

@router.post("/submit-code")
def submit_code(
    role: str = Form(...),
    level: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # ✅ Step 1: Create a temp folder
        folder_id = str(uuid.uuid4())
        folder_path = f"temp_submissions/{folder_id}"
        os.makedirs(folder_path, exist_ok=True)

        # ✅ Step 2: Save the uploaded file
        code_path = os.path.join(folder_path, file.filename)
        with open(code_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # ✅ Step 3: Auto-generate a test file
        # Extract function name (assume filename without .py)
        module_name = os.path.splitext(file.filename)[0]
        test_file_content = f"""
from {module_name} import square

def test_square_positive():
    assert square(2) == 4

def test_square_negative():
    assert square(-3) == 9
"""
        test_file_path = os.path.join(folder_path, f"test_{module_name}.py")
        with open(test_file_path, "w") as tf:
            tf.write(test_file_content)

        # ✅ Step 4: Run Pytest in the temp folder
        result = subprocess.run(
            ["pytest", folder_path, "--tb=short", "-q"],
            capture_output=True,
            text=True
        )

        passed = result.returncode == 0

        # ✅ Step 5: Clean up the temp folder
        shutil.rmtree(folder_path)

        return {
            "role": role,
            "level": level,
            "filename": file.filename,
            "passed": passed,
            "output": result.stdout or result.stderr
        }

    except Exception as e:
        return {"error": str(e)}
