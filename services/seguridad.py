from pydantic import BaseModel, Field, EmailStr
from typing import Optional


class Revisar_JSON_producto (BaseModel):
    
    name: str = Field(min_length=5, max_length=100)
    description: Optional[str] = None
    price: float
    stock: int = Field(ge= 1)


class Revisar_JSON_login (BaseModel):
    
    user : str = Field(min_length=5, max_length= 22)
    password: str = Field(min_length= 6, max_length=20)


class Revisar_JSON_nuevo_Gerente (BaseModel):
    
    name: str 
    telefono: str
    email: EmailStr
    user : str = Field(min_length=5, max_length= 22)
    password: str = Field(min_length= 6, max_length=20)
    rol: str
    
class Revisar_JSON_nuevo_Empleado (BaseModel):
    
    name: str 
    telefono: str
    email: EmailStr
    user : str = Field(min_length=5, max_length= 22)
    password: str = Field(min_length= 6, max_length=20)
    rol: str
    


class Revisar_JSON_actualizar_Gerente(BaseModel):
    name: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[EmailStr] = None