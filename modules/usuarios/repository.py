from sqlalchemy.orm import Session
from modules.usuarios.models import Users


class UsuarioRepository:

  # 1. READ (Lectura)
  @staticmethod
  def obtener_todos(db: Session, limite: int = 100, salto: int = 0):
    return db.query(Users).offset(salto).limit(limite).all()

  @staticmethod
  def buscar_por_id(db: Session, user_id: int):
    return db.query(Users).filter(Users.id == user_id).first()

  @staticmethod
  def buscar_por_user(db: Session, user: str):
    return db.query(Users).filter(Users.user == user).first()


  # 2. CREATE (Creacion - POST)
  @staticmethod
  def crear(db: Session, nuevo_usuario: Users):
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

  # 3. UPDATE (Actualizacion - PUT)
  @staticmethod
  def actualizar(db: Session, usuario_db: Users, datos_nuevos: dict):
    # Recorremos los datos del JSON y actualizamos el objeto de la BD
    for clave, valor in datos_nuevos.items():
      setattr(usuario_db, clave, valor)

    db.commit()
    db.refresh(usuario_db)
    return usuario_db

  # 4. DELETE (Eliminacion - DELETE)
  @staticmethod
  def eliminar(db: Session, usuario_db: Users):
    db.delete(usuario_db)
    db.commit()
    return True