from fastapi import FastAPI
from modules.usuarios.router import router as usuarios_router

app = FastAPI(title="To-Do List Pro")

app.include_router(usuarios_router)