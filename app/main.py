from fastapi import FastAPI
from app.routers import tasks, submit_code, submit_document
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(submit_code.router)
app.include_router(submit_document.router)

@app.get("/")
def read_root():
    return {"message": "Simulation Engine Running"}
