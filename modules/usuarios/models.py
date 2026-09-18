from sqlalchemy import Column, Integer, String
from database.almacen import miclaseBase

class Users(miclaseBase):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    rol = Column(String, nullable=False, default="user")
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=True)