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