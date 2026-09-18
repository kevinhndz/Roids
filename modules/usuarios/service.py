from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from modules.usuarios.models import Users
from modules.usuarios.repository import UsuarioRepository

from modules.usuarios.service import (
    Revisar_JSON_Crear_User,
    Revisar_JSON_Editar_User,
)
from utils.hash_util import hash_password


class UsuarioService:

  @staticmethod
  def crear_usuario(db: Session, datos: Revisar_JSON_Crear_User) -> Users:
   
    if UsuarioRepository.buscar_por_user(db, datos.user):
      raise HTTPException(
          status_code=status.HTTP_400_BAD_REQUEST,
          detail="El nombre de usuario ya esta en uso.",
      )


    password_encriptada = hash_password(datos.password)

    nuevo_usuario = Users(
        user=datos.user,
        password=password_encriptada,
        rol=datos.rol,
        name=datos.name,
        email=datos.email,
        phone_number=datos.phone_number,
    )

  
    return UsuarioRepository.crear(db, nuevo_usuario)


  @staticmethod
  def obtener_por_id(db: Session, user_id: int) -> Users:
    usuario = UsuarioRepository.buscar_por_id(db, user_id)
    if not usuario:
      raise HTTPException(
          status_code=status.HTTP_404_NOT_FOUND,
          detail="El usuario no existe.",
      )
    return usuario
  
  

  @staticmethod
  def listar_usuarios(db: Session, limite: int = 100, salto: int = 0):
    return UsuarioRepository.obtener_todos(db, limite=limite, salto=salto)
  
  

  @staticmethod
  def actualizar_usuario(
      db: Session, user_id: int, datos: Revisar_JSON_Editar_User
  ) -> Users:
    usuario = UsuarioService.obtener_por_id(db, user_id)
    # Convertimos el JSON de Pydantic a diccionario para actualizar solo esos campos
    datos_dict = datos.model_dump(exclude_unset=True)
    return UsuarioRepository.actualizar(db, usuario, datos_dict)
  

  @staticmethod
  def eliminar_usuario(db: Session, user_id: int):
    usuario = UsuarioService.obtener_por_id(db, user_id)
    return UsuarioRepository.eliminar(db, usuario)