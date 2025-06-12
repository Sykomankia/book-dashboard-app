// Dashboard.jsx

import React, { useEffect, useState, useMemo } from "react";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Loader from "../components/Loader";
import { fetchBooks, addBook, updateBook, deleteBook } from "../api/booksApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      toast.error("Failed to load books");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSave = async (book) => {
    try {
      if (editBook) {
        await updateBook(editBook._id, book);
        toast.success("Book updated successfully");
      } else {
        await addBook(book);
        toast.success("Book added successfully");
      }
      setShowForm(false);
      setEditBook(null);
      loadBooks();
    } catch {
      toast.error("Save operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(deleteTarget._id);
      toast.success("Book deleted successfully");
      setDeleteTarget(null);
      loadBooks();
    } catch {
      toast.error("Delete operation failed");
    }
  };

  const filteredBooks = useMemo(() => {
    return books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      )
      .filter((b) => (genreFilter ? b.genre === genreFilter : true))
      .filter((b) => (statusFilter ? b.status === statusFilter : true));
  }, [books, search, genreFilter, statusFilter]);

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, page]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              value={genreFilter}
              onChange={(e) => {
                setGenreFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Biography">Biography</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>

          <BookTable
            books={paginatedBooks}
            onEdit={(book) => {
              setEditBook(book);
              setShowForm(true);
            }}
            onDelete={(book) => setDeleteTarget(book)}
            onAdd={() => setShowForm(true)}
          />

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showForm && (
        <BookFormModal
          defaultValues={editBook}
          onClose={() => {
            setShowForm(false);
            setEditBook(null);
          }}
          onSubmit={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
