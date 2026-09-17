from fastapi import FastAPI, HTTPException, status, Depends, Header
from utils.jwt_util import verificar_token


def el_vigilante(token: str = Header(...)) -> dict:
    return verificar_token(token)


def permiso_admin(json: dict = Depends(el_vigilante)) -> dict:
    
    if json["rol"] != "Admin":
        raise HTTPException(
            status_code= status.HTTP_403_FORBIDDEN,
            detail = "No estas autorizado para consumir este recurso!"
        )
    else:
        return json
    
def permiso_user(json: dict = Depends(el_vigilante)):
  if json["rol"] in ["user", "admin"]:
    return json
  else:
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="No tienes permiso"
    )
