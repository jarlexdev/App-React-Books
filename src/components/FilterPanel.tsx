import React from "react";

interface FilterPanelProps {
  genres: string[];
  activeFilters: string[];
  onToggleFilter: (genre: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  genres,
  activeFilters,
  onToggleFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onToggleFilter(genre)}
          className={`px-4 py-2 rounded-full border ${
            activeFilters.includes(genre)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
