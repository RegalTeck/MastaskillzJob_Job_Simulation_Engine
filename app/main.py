from fastapi import FastAPI
from app.routers import tasks  # This should work now

app = FastAPI()
app.include_router(tasks.router)

@app.get("/")
def read_root():
    return {"message": "Simulation Engine Running"}
