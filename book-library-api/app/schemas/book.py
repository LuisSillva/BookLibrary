from pydantic import BaseModel, Field
from typing import Optional

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    author: str = Field(min_length=1, max_length=100)

class BookUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, min_length=1, max_length=300)
    author: Optional[str] = Field(None, min_length=1, max_length=100)
    done: Optional[bool] = None

class BookResponse(BaseModel):
    id: int
    title: str
    description: str
    author: str
    done: bool

    class Config:
        from_attributes = True