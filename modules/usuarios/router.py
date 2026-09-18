from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from database.almacen import abrir_puerta_a_bd

from modules.usuarios.service import (
    Revisar_JSON_Crear_User,
    Revisar_JSON_Editar_User,
)
from modules.usuarios.service import UsuarioService

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def crear_usuario(
    datos: Revisar_JSON_Crear_User, db: Session = Depends(abrir_puerta_a_bd)
):
  return UsuarioService.crear_usuario(db, datos)


@router.get("/")
def listar_usuarios(
    limite: int = Query(10, ge=1, le=100),
    salto: int = Query(0, ge=0),
    db: Session = Depends(abrir_puerta_a_bd),
):
  return UsuarioService.listar_usuarios(db, limite=limite, salto=salto)


# 3. GET - Obtener un usuario por ID
@router.get("/{user_id}")
def obtener_usuario(user_id: int, db: Session = Depends(abrir_puerta_a_bd)):
  return UsuarioService.obtener_por_id(db, user_id)


@router.put("/{user_id}")
def actualizar_usuario(
    user_id: int,
    datos: Revisar_JSON_Editar_User,
    db: Session = Depends(abrir_puerta_a_bd),
):
  return UsuarioService.actualizar_usuario(db, user_id, datos)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_usuario(user_id: int, db: Session = Depends(abrir_puerta_a_bd)):
  UsuarioService.eliminar_usuario(db, user_id)
  return None