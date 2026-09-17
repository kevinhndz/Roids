from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean
from services.almacen import miClaseBase

class Productos (miClaseBase):
    
    __tablename__ = "Productos"
    
    id = Column(Integer, primary_key= True, index= True)
    name = Column(String , nullable= False, unique = True)
    description = Column(String, nullable= True)
    price = Column(Float, nullable= False)
    stock = Column(Integer, nullable = False)
    is_active = Column(Boolean, default=True, nullable=False)
    

class Users (miClaseBase):
    
    __tablename__ = "Users"
    
    id = Column(Integer, primary_key= True, index = True)
    user = Column(String, unique = True, nullable = False)
    password = Column(String ,nullable = False)
    rol = Column(String, nullable = False)


class Empleados(miClaseBase):
    __tablename__ = "Empleados"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    telefono = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    id_user = Column(Integer, ForeignKey(Users.id)) 

class Gerentes(miClaseBase):
    __tablename__ = "Gerentes"
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    telefono = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    id_user = Column(Integer, ForeignKey(Users.id)) 


    
    
    