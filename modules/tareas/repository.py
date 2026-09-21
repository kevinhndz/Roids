from sqlalchemy.orm import Session
from modules.tareas.models import Tareas

class TareasRepository:
    
    @staticmethod
    def ver_tareas (db: Session, limite: int = 10, salto: int = 0):
        return db.query(Tareas).offset(salto).limit(limite).all()
    
    
    
    @staticmethod
    def crear_nueva_tarea(db: Session, nueva_tarea):
        
        db.add(nueva_tarea)
        db.commit()
        db.refresh(nueva_tarea)
    
    


