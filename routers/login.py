from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from services.almacen import abrir_puerta_bd
from services.seguridad import Revisar_JSON_login
from services.tablas import Users
from utils.fabrica_token import crear_token
from utils.hash import verificar_contrasena

router = APIRouter(
    prefix = "/login",
    tags = ["Login"]
)

@router.post("/")
def login(json: Revisar_JSON_login, base_datos: Session = Depends(abrir_puerta_bd)):
    
    check = base_datos.query(Users).filter(Users.user == json.user).first()
    
    if check is None:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Lo sentimos, el usuario {json.user} no ha sido encontrado"
        )
    else:
        if not verificar_contrasena(json.password, check.password):
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail = "Usuario o Contraseña Incorrecta"
            )
        else:
            token = crear_token(check.user, check.rol, check.id)
            return {"user": check.user, "rol": check.rol, "token": token}