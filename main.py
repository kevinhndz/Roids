from fastapi import FastAPI
from routers import login  
from routers import gerentes

app = FastAPI()


app.include_router(login.router)
app.include_router(gerentes.router)