from fastapi import APIRouter, Depends
from modules.tareas.schema import Revisar_JSON_nueva_tarea, TareaRespuestaDTO
from modules.tareas.service import TareasService as service
from sqlalchemy.orm import Session
from database.almacen import abrir_puerta_bd

router = APIRouter(prefix="/tareas", tags=["Tareas"])


@router.post("/", response_model=TareaRespuestaDTO)
def new_hw(
    json: Revisar_JSON_nueva_tarea, db: Session = Depends(abrir_puerta_bd)
):
  return service.crear_tarea(db, json)


# Agregamos response_model=list[...] y pasamos (db) al servicio
@router.get("/", response_model=list[TareaRespuestaDTO])
def ver_tareas(db: Session = Depends(abrir_puerta_bd)):
  return service.ver_tareas(db)

    
    