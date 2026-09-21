from fastapi import FastAPI , HTTPException, status, Depends
from sqlalchemy.orm import Session
from modules.tareas.schema import Revisar_JSON_nueva_tarea
from modules.tareas.models import Tareas
from modules.tareas.repository import TareasRepository as repo


class TareasService ():
    
    @staticmethod
    def crear_tarea(db: Session, json:Revisar_JSON_nueva_tarea):
        
        nueva_tarea = Tareas(
            
            titulo = json.titulo,
            descripcion = json.descripcion,
            prioridad = json.prioridad,
            
        )
        
        return repo.crear_nueva_tarea(db,nueva_tarea)
    
    
    @staticmethod
    def ver_tareas(db:Session):
        return repo.ver_tareas(db, 10,0)
        
        
        
    
        
    
        
        
"""
@router.post("/tareas")
def crear_nueva_tarea(json: Revisar_JSON_nueva_tarea, db: Session = Depends(abrir_puerta_bd)):
    
    nueva_tarea = Tareas(
        
        titulo = json.titulo,
        descripcion = json.titulo
    )
    
    db.add(nueva_tarea)
    db.flush(nueva_tarea)
    db.commit()
    return {"Descripcion": f"Tarea creada con ID {nueva_tarea.id}"}
    

"""

