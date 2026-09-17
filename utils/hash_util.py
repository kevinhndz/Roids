from passlib.context import CryptContext

# 1. Configuracion del motor de encriptacion
motor = CryptContext(schemes=["bcrypt"], deprecated="auto")


def encriptar_contrasena(password: str) -> str:
    # 2. Transforma el texto plano en un hash unico
    return motor.hash(password)


def verificar_contrasena(password_plano: str, password_hasheado: str) -> bool:
    # 3. Compara si la contraseña ingresada coincide con el hash guardado
    return motor.verify(password_plano, password_hasheado)