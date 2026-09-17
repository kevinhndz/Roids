from fastapi import APIRouter, HTTPException, status, Depends, Header
from sqlalchemy.orm import Session

from services.almacen import abrir_puerta_bd
from services.seguridad import Revisar_JSON_nuevo_Gerente
from services.tablas import Gerentes, Users
from services.seguridad import Revisar_JSON_actualizar_Gerente
from utils.hash import encriptar_contrasena
from utils.fabrica_token import verificar_token

router = APIRouter(
    prefix = "/gerentes",
    tags = ["Gerentes"]
)

@router.post("/")
def crear_nuevo_gerente(json: Revisar_JSON_nuevo_Gerente, base_datos: Session = Depends(abrir_puerta_bd)):
    
   
    check_email = base_datos.query(Gerentes).filter(Gerentes.email == json.email).first()
    
    if check_email is not None:
        raise HTTPException(
            status_code = status.HTTP_409_CONFLICT,
            detail = f"El usuario con correo : {json.email} ya existe!"
        )
    else:
        
        nuevo_user = Users(
            user = json.user,
            password = encriptar_contrasena(json.password),
            rol = json.rol
        )
        base_datos.add(nuevo_user)
        base_datos.flush()  
        
        
        nuevo_gerente = Gerentes(
            name = json.name,
            telefono = json.telefono,
            email = json.email,
            id_user = nuevo_user.id 
        )
        base_datos.add(nuevo_gerente)
        
        
        base_datos.commit()
        
        return {"Mensaje": f"Usuario Creado con ID : {nuevo_user.id}"}


@router.get("/")
def ver_gerentes(
    skip: int = 0,                               
    limit: int = 10,                             
    base_datos: Session = Depends(abrir_puerta_bd),
    token: str = Header(...)                     #
):
    
    verificar_token(token)
    
    gerentes = base_datos.query(Gerentes).offset(skip).limit(limit).all()
    
    if not gerentes:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "No hay mas registros disponibles en esta pagina."
        )
        
    return {
        "skip": skip,
        "limit": limit,
        "Gerentes": gerentes
    }
    

@router.put("/{id}")
def actualizar_gerente_completo(
    id: int, 
    json: Revisar_JSON_actualizar_Gerente, 
    base_datos: Session = Depends(abrir_puerta_bd)
):
    gerente = base_datos.query(Gerentes).filter(Gerentes.id == id).first()
    
    if not gerente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El gerente con ID {id} no fue encontrado"
        )
    
    gerente.name = json.name
    gerente.telefono = json.telefono
    gerente.email = json.email
    
    base_datos.commit()
    base_datos.refresh(gerente)
    
    return {"Mensaje": "Gerente actualizado por completo", "Gerente": gerente}


@router.patch("/{id}")
def actualizar_gerente_parcial(
    id: int, 
    json: Revisar_JSON_actualizar_Gerente, 
    base_datos: Session = Depends(abrir_puerta_bd)
):
    gerente = base_datos.query(Gerentes).filter(Gerentes.id == id).first()
    
    if not gerente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El gerente con ID {id} no fue encontrado"
        )
    
    # PATCH solo actualiza los campos que el usuario mand en el JSON
    datos_enviados = json.dict(exclude_unset=True)
    for clave, valor in datos_enviados.items():
        setattr(gerente, clave, valor)
        
    base_datos.commit()
    base_datos.refresh(gerente)
    
    return {"Mensaje": "Gerente actualizado parcialmente", "Gerente": gerente}


@router.delete("/{id}")
def eliminar_gerente(
    id: int, 
    base_datos: Session = Depends(abrir_puerta_bd)
):
    gerente = base_datos.query(Gerentes).filter(Gerentes.id == id).first()
    
    if not gerente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"El gerente con ID {id} no fue encontrado"
        )
    
    base_datos.delete(gerente)
    base_datos.commit()
    
    return {"Mensaje": f"Gerente con ID {id} eliminado exitosamente"}