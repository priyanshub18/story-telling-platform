import React, { useEffect, useState } from "react";

function Home() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        setBooks(data); 
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    }

    fetchBooks();
  }, []);

  const handleReadMore = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-6 py-8 flex flex-col">
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Featured Stories</h2>
          <div className="flex gap-20 flex-wrap justify-center p-4 space-x-2">
            {books.map((book, index) => (
              <StoryCard
                key={index}
                book={book}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        </section>
      </main>

      
      {isModalOpen && selectedBook && (
        <Modal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function StoryCard({ book, onReadMore }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-[300px]">
      
      <img
        src={book.Image}
        alt={book.Title}
        className="w-full h-48 object-cover"
        loading="lazy" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{book.Title}</h3>
        <p className="text-gray-400 text-sm">{book.Author}</p>
        <button
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          onClick={() => onReadMore(book)}
        >
          Read
        </button>
      </div>
    </div>
  );
}

function Modal({ book, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-[80%] md:w-[600px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
        >
          X
        </button>
        <div className="flex gap-4">
          
          <img
            src={book.Image}
            alt={book.Title}
            className="w-[200px] h-[300px] object-cover rounded-lg" 
            loading="lazy"
          />
          <div className="flex flex-col justify-between">
            <p className="text-gray-400 text-sm mb-4">{book.Author}</p>
            <div className="overflow-y-auto max-h-[400px]">
              <p className="text-white">{book.Story}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
