// const BASE_URL = process.env.REACT_APP_API_BASE;
const BASE_URL =
  "https://crudcrud.com/api/4ee6c1d238a246c482f144f9ea9721eb/books";

if (!BASE_URL) {
  throw new Error("REACT_APP_API_BASE is not defined");
}

// //fetch the book details
export const fetchBooks = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

//Add new book
export const addBook = async (book) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
};

//update existing book details
export const updateBook = async (id, book) => {
  const { _id, ...rest } = book;
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  });
  if (!res.ok) throw new Error("Failed to update book");
};

// //delete book
export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
};
