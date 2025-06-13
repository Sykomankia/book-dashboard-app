const BASE_URL = import.meta.env.VITE_API_BASE;

//fetch the book details
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
  const { _id, ...bookWithoutId } = book;
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookWithoutId),
  });
  if (!res.ok) throw new Error("Failed to update book");
};

//delete book
export const deleteBook = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
};
