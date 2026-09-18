from datetime import datetime
from database.almacen import miclaseBase
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.sql import func


class Tareas(miclaseBase):

  __tablename__ = "Tareas"

  id = Column(Integer, primary_key=True, index=True)
  titulo = Column(String, nullable=False)
  descripcion = Column(
      String, nullable=True
  )  
  completada = Column(Boolean, default=False)
  prioridad = Column(String, nullable=False, default="Media")
  fecha_limite = Column(DateTime, nullable=True)

  user_id = Column(
      Integer, ForeignKey("Users.id", ondelete="CASCADE"), nullable=False
  )

  created_at = Column(DateTime(timezone=True), server_default=func.now())


    
