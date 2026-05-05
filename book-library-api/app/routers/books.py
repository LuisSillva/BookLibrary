from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.book import Book
from app.schemas.book import BookCreate, BookResponse, BookUpdate
from typing import List, Optional

router = APIRouter(
    prefix="/books",
    tags=["books"]
)

@router.post('', response_model=BookResponse, status_code=201)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    new_book = Book(title=book.title, author=book.author, description=book.description)
    db.add(new_book)
    db.commit()
    db.refresh(new_book) # adiciona automaticamente coias que foram geradas, como o ID, retornando de volta pro objeto py
    return new_book

@router.get('', response_model=List[BookResponse])
def get_books(
    read: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
    ):
    query = db.query(Book)

    if read is not None:
        query = query.filter(Book.read == read)

    if search is not None:
        query = query.filter(Book.title.contains(search) | Book.author.contains(search))

    return query.offset(skip).limit(limit).all()

@router.get('/{book_id}', response_model=BookResponse)
def get_books(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.put("/{book_id}", response_model=BookResponse)
def update_book(book_id: int, updated: BookUpdate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if updated.title is not None:
        book.title = updated.title
    if updated.read is not None:
        book.read = updated.read
    if updated.author is not None:
        book.author = updated.author
    if updated.description is not None:
        book.description = updated.description
    db.commit()
    db.refresh(book)
    return book

@router.delete('/{book_id}', status_code=204)
def delete_book(book_id: int, db:Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    