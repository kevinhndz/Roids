import os
from dotenv import load_dotenv
from fastapi import HTTPException, status
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

load_dotenv()

KEY = os.getenv("SECRET_KEY")

def crear_token(user: str, rol: str, user_id: int):
    expira_en = datetime.now(timezone.utc) + timedelta(minutes=30)
    
    datos = {
        "user": user,
        "rol": rol,
        "user_id": user_id,
        "exp": expira_en
    }
    

    token = jwt.encode(datos, KEY, algorithm="HS256")
    return token

def verificar_token(token: str):
    try:
        
        payload = jwt.decode(token, KEY, algorithms=["HS256"])
        return payload
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autorizado"
        )
