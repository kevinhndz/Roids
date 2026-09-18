from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field


# 1. DTO de Entrada: Crear Tarea (POST)
class Revisar_JSON_nueva_tarea(BaseModel):
  titulo: str = Field(min_length=3, max_length=40)
  descripcion: Optional[str] = Field(default=None, max_length=250)
  prioridad: Literal["Baja", "Media", "Alta"] = "Media"


# 2. DTO de Entrada: Editar Tarea (PUT / PATCH)
class Revisar_JSON_editar_tarea(BaseModel):
  titulo: Optional[str] = Field(default=None, min_length=3, max_length=40)
  descripcion: Optional[str] = Field(default=None, max_length=250)
  prioridad: Optional[Literal["Baja", "Media", "Alta"]] = None
  completada: Optional[bool] = None


class TareaRespuestaDTO(BaseModel):
  id: int
  titulo: str
  descripcion: Optional[str]
  completada: bool
  prioridad: str
  user_id: int
  created_at: datetime

  class Config:
    from_attributes = True  # Permite mapear modelos de SQLAlchemy directamente a Pydantic
    