import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import HTTPException, status
from jose import JWTError, jwt

load_dotenv()

LLAVE = os.getenv("LLAVE_SECRETA")


def crear_token(user: str, user_id: int, rol: str) -> str:
 
  expira_en = datetime.now(timezone.utc) + timedelta(minutes=20)

  data = {"user": user, "user_id": user_id, "rol": rol, "exp": expira_en}

  token = jwt.encode(data, LLAVE, algorithm="HS256")

  return token


def verificar_token(token: str) -> dict:
  try:
    
    datos_del_cliente = jwt.decode(token, LLAVE, algorithms=["HS256"])
    return datos_del_cliente

  except JWTError:
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Sesion expirada o token invalido",
    )