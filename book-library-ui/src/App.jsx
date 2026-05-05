import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filterRead, setFilterRead] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchBooks = async () => {
    const params = {};
    if (search) params.search = search;
    if (filterRead !== "") params.read = filterRead;
    const res = await axios.get(`${API}/books`, { params });
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, [search, filterRead]);

  const createBook = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/books`, { title, author, description });
    setTitle("");
    setAuthor("");
    setDescription("");
    fetchBooks();
  };

  const toggleRead = async (book) => {
    await axios.put(`${API}/books/${book.id}`, { read: !book.read });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`${API}/books/${id}`);
    fetchBooks();
  };

  const startEditing = (book) => {
    setEditingBook(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditDescription(book.description || "");
  };

  const saveEdit = async () => {
    await axios.put(`${API}/books/${editingBook}`, {
      title: editTitle,
      author: editAuthor,
      description: editDescription
    });
    setEditingBook(null);
    fetchBooks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Book Library</h1>

      {/* Create book */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title..."
          style={{ padding: 8 }}
        />
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author..."
          style={{ padding: 8 }}
        />
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description (optional)..."
          style={{ padding: 8 }}
        />
        <button onClick={createBook}>Add Book</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          style={{ flex: 1, padding: 8 }}
        />
        <select value={filterRead} onChange={e => setFilterRead(e.target.value)}>
          <option value="">All</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>

      {/* Book list */}
      {books.map(book => (
        <div key={book.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          {editingBook === book.id ? (
            // Edit form
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                style={{ padding: 8 }}
              />
              <input
                value={editAuthor}
                onChange={e => setEditAuthor(e.target.value)}
                style={{ padding: 8 }}
              />
              <input
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                style={{ padding: 8 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingBook(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            // Book display
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={book.read}
                  onChange={() => toggleRead(book)}
                />
                <span style={{ flex: 1, fontWeight: "bold", textDecoration: book.read ? "line-through" : "none" }}>
                  {book.title}
                </span>
                <button onClick={() => startEditing(book)}>Edit</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </div>
              <div style={{ marginTop: 4, color: "#555", fontSize: 14 }}>
                ✍️ {book.author}
              </div>
              {book.description && (
                <div style={{ marginTop: 4, color: "#777", fontSize: 13 }}>
                  {book.description}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;