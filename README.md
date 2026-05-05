# Book Library — Full Stack App

A full stack Book Library built with **FastAPI** (backend) and **React** (frontend), created as a learning project to study REST APIs, FastAPI, and how frontends communicate with backends. This one was made entirely by myself, seeing just my old notepads from the Task Manager projects, documentation and my old code. 

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI |
| Database | SQLite + SQLAlchemy |
| Validation | Pydantic |
| Frontend | React + Vite |
| HTTP Client | Axios |

---

## Project Structure

```
BookLibrary/
├── book-library-api/          # Backend
│   ├── app/
│   │   ├── main.py            # App entry point
│   │   ├── database.py        # Database connection
│   │   ├── routers/
│   │   │   └── books.py       # Task endpoints
│   │   ├── models/
│   │   │   └── book.py        # SQLAlchemy model
│   │   └── schemas/
│   │       └── book.py        # Pydantic schemas
│   ├── data/
│   │   └── books.db           # SQLite database
│   └── requirements.txt
│
└── book-library-ui/           # Frontend
    ├── src/
    │   └── App.jsx            # Main React component
    └── package.json
```

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+

---

### Backend Setup

```bash
# 1. Navigate to the backend folder
cd book-library-api

# 2. Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the server
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`
Interactive docs available at `http://localhost:8000/docs`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd book-library-ui

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/books` | Get all books |
| `GET` | `/books/{id}` | Get a single book |
| `POST` | `/books` | Create a new book |
| `PUT` | `/books/{id}` | Update a book |
| `DELETE` | `/books/{id}` | Delete a book |

### Query Parameters — `GET /books`

| Parameter | Type | Description |
|---|---|---|
| `read` | `bool` | Filter by read status |
| `search` | `string` | Search by title or author |
| `skip` | `int` | Pagination offset (default: 0) |
| `limit` | `int` | Pagination limit (default: 10) |

**Examples:**
```
GET /books?read=false
GET /books?search=learn
GET /books?skip=0&limit=5
GET /books?search=learn&read=false
```

---

### Request & Response Examples

**Create a book**
```http
POST /books
Content-Type: application/json

{
  "title": "Clean Code",
  "author": "Robert C. Martin",
}
```
```json
{
  "id": 1,
  "title": "Clean Code",
  "description": "This book doesn't have a description yet.",
  "author": "Robert C. Martin",
  "read": false
}
```

**Update a book**
```http
PUT /books/1
Content-Type: application/json

{
  "read": true
}
```
```json
{
  "id": 1,
  "title": "Clean Code",
  "description": "This book doesn't have a description yet.",
  "author": "Robert C. Martin",
  "read": true
}
```

---

## Concepts Learned

- REST architecture and HTTP methods (GET, POST, PUT, DELETE)
- FastAPI routing, path parameters, and query parameters
- Pydantic schemas for request/response validation
- SQLAlchemy ORM for database operations
- Dependency injection with `Depends`
- CORS and how frontends communicate with backends
- Project structure separation (routers, models, schemas)

---

## Possible Next Steps

- [ ] User authentication with JWT tokens
- [ ] Deploy backend
- [ ] Deploy frontend

---

## Author

Made by **[Luís Silva]** as a learning project!

---

<div align="center">

*† Seek Paleblood to transcend the Hunt †*

</div>
