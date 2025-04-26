import React, { useState, useEffect } from "react";
import { useFetchData } from "./hooks/useFetchData";
import { useNotification } from "./hooks/useNotification";
import { Book } from "./types/book";
import BookCard from "./components/BookCard";
import FilterPanel from "./components/FilterPanel";

const genres = ["romance", "fantasy", "mystery"];

const App: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const { data, loading, error } = useFetchData<{ works: Book[] }>(
    `https://openlibrary.org/subjects/${
      activeFilters[0] || "romance"
    }.json?limit=10`
  );

  const { notify } = useNotification();

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (book: Book) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.key === book.key);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.key !== book.key));
      notify("Libro removido de favoritos", "error");
    } else {
      setFavorites([...favorites, book]);
      notify("Libro agregado a favoritos", "success");
    }
  };

  const handleToggleFilter = (genre: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(genre)
        ? prevFilters.filter((g) => g !== genre)
        : [genre]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">
        Mi Catálogo de Libros
      </h1>
      <FilterPanel
        genres={genres}
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
      />
      {loading && <p className="text-center">Cargando libros...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.works.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isFavorite={favorites.some((fav) => fav.key === book.key)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>
          Desarrollado por Dennys Menjivar | Código: MA22I04001 | Fecha:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  );
};

export default App;
