import React from "react";
import styles from "../styles/BookTable.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BookTable = ({ books, onEdit, onDelete, onAdd }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Book List</h2>
        <button onClick={onAdd} className={styles.addButton}>
          <FaPlus /> Add Book
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.year}</td>
              <td>{book.status}</td>
              <td>
                <button
                  onClick={() => onEdit(book)}
                  className={styles.iconButton}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(book)}
                  className={styles.iconButton}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
