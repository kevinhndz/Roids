from pydantic import BaseModel, Field, EmailStr
from typing import Optional


class Revisar_JSON_Crear_User(BaseModel):
    user: str = Field(min_length=5, max_length=18)
    password: str = Field(min_length=6, max_length=25)
    rol: str = "user"
    name: str = Field(min_length=3, max_length=25)
    email: EmailStr
    phone_number: Optional[str] = None


class Revisar_JSON_Editar_User(BaseModel):
    name: str = Field(min_length=3, max_length=25)
    email: EmailStr
    phone_number: Optional[str] = None


class Revisar_JSON_Login(BaseModel):
    user: str = Field(min_length=5, max_length=18)
    password: str = Field(min_length=6, max_length=25)