from pydantic import BaseModel, Field
from typing import Optional


class Revisar_JSON_producto (BaseModel):
    
    name :int = Field(min_length= 5, max_length=100)
    description: Optional[str] = None
    price: float
    stock: int = Field(ge= 1)
    

