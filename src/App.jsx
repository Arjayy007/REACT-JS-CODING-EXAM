import { useState } from "react";

const books = [
  { title: "Book 1", file: "/sample_book 1.txt" },
  { title: "Book 2", file: "/sample_book 2.txt" }
];

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookContent, setBookContent] = useState("");

  const handleBookSelect = async (book) => {
    setSelectedBook(book.title);
    try {
      const response = await fetch(book.file);
      const text = await response.text();
      setBookContent(text);
    } catch (error) {
      setBookContent("Failed to load book.");
    }
  };

  return (
    <div>
      <h1>Book Reader</h1>
      <ul>
        {books.map((book) => (
          <li key={book.title}> <button onClick={() => handleBookSelect(book)}> {book.title}</button> </li>
        ))}
      </ul>
      <hr />
      {selectedBook && (
        <div>
          <h2>{selectedBook}</h2>
          <p>{bookContent} </p>
        </div>
      )}
    </div>
  );
};

export default App;
