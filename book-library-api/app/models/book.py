from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True, default="This book doesn't have a description yet.")
    author = Column(String, nullable=False)
    done = Column(Boolean, default=False)