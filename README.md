# Task Manager — Full Stack App

A full stack Task Manager built with **FastAPI** (backend) and **React** (frontend), created as a learning project to study REST APIs, FastAPI, and how frontends communicate with backends.

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
TaskManager/
├── task-manager-api/          # Backend
│   ├── app/
│   │   ├── main.py            # App entry point
│   │   ├── database.py        # Database connection
│   │   ├── routers/
│   │   │   └── tasks.py       # Task endpoints
│   │   ├── models/
│   │   │   └── task.py        # SQLAlchemy model
│   │   └── schemas/
│   │       └── task.py        # Pydantic schemas
│   ├── data/
│   │   └── tasks.db           # SQLite database
│   └── requirements.txt
│
└── task-manager-ui/           # Frontend
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
cd task-manager-api

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
cd task-manager-ui

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
| `GET` | `/tasks` | Get all tasks |
| `GET` | `/tasks/{id}` | Get a single task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/{id}` | Update a task |
| `DELETE` | `/tasks/{id}` | Delete a task |

### Query Parameters — `GET /tasks`

| Parameter | Type | Description |
|---|---|---|
| `done` | `bool` | Filter by completion status |
| `search` | `string` | Search by title |
| `skip` | `int` | Pagination offset (default: 0) |
| `limit` | `int` | Pagination limit (default: 10) |

**Examples:**
```
GET /tasks?done=false
GET /tasks?search=learn
GET /tasks?skip=0&limit=5
GET /tasks?search=learn&done=false
```

---

### Request & Response Examples

**Create a task**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Learn FastAPI"
}
```
```json
{
  "id": 1,
  "title": "Learn FastAPI",
  "done": false
}
```

**Update a task**
```http
PUT /tasks/1
Content-Type: application/json

{
  "done": true
}
```
```json
{
  "id": 1,
  "title": "Learn FastAPI",
  "done": true
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
- [ ] Task due dates and priorities
- [ ] Deploy backend
- [ ] Deploy frontend

---

## Author

Made by **[Luís Silva]** as a learning project!

---

<div align="center">

*† Seek Paleblood to transcend the Hunt †*

</div>
