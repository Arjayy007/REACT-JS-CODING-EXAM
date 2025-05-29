import { useState } from "react";


const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookContent, setBookContent] = useState("");

  const [books, setBooks] = useState([
    { title: "Book 1", file: "/sample_book 1.txt" },
    { title: "Book 2", file: "/sample_book 2.txt" }
  ]);

  const [title, setTitle] = useState("");

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

  const addBook = () => {
    setBooks(title ? [...books, { title, file: `/sample_${title}.txt` }] : books);
  }

  const deleteBook = (bookTitle) => {
    setBooks(books.filter((book) => book.title !== bookTitle));
    
    }
  

  return (
    <div>
      <h1>Book Reader</h1>
      <input value={title} type="text" onChange={(e) => setTitle( e.target.value )}/>
      <button onClick={addBook}>Add Books</button>

      <ul>
        {books.map((book) => (
          <li key={book.title}><button onClick={() => deleteBook(book.title)}>Delete</button> <button onClick={() => handleBookSelect(book)}> {book.title}</button> </li>
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
