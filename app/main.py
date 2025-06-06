from fastapi import FastAPI
from app.routers import tasks, submit_code

app = FastAPI()
app.include_router(tasks.router)
app.include_router(submit_code.router)


@app.get("/")
def read_root():
    return {"message": "Simulation Engine Running"}
