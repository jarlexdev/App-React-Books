import React from "react";
import { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onToggleFavorite,
  isFavorite,
}) => {
  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-32 h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold text-center">{book.title}</h2>
      <p className="text-sm text-gray-600 text-center">
        {book.authors?.map((author) => author.name).join(", ") ||
          "Autor desconocido"}
      </p>
      {book.first_publish_year && (
        <p className="text-xs text-gray-500">
          Publicado: {book.first_publish_year}
        </p>
      )}
      <button
        onClick={() => onToggleFavorite(book)}
        className={`mt-2 px-3 py-1 rounded ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
      </button>
    </div>
  );
};

export default BookCard;
