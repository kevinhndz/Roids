import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine

load_dotenv()

UBICACION_ALMACEN = os.getenv("DATABASE_URL")

motor = create_engine(UBICACION_ALMACEN)
llaves = sessionmaker(autocommit=False, autoflush=False, bind=motor)

class miclaseBase(DeclarativeBase):
    pass

def abrir_puerta_bd():
    base_datos = llaves()
    try:
        yield base_datos
    finally:
        base_datos.close()