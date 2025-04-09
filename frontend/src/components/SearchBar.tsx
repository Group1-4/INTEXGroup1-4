import React, { useState } from "react";

type SearchBarProps = {
  searchField: string;
  searchQuery: string;
  onSearchChange: (field: string, query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchField, searchQuery, onSearchChange }) => {
  const [field, setField] = useState(searchField);
  const [query, setQuery] = useState(searchQuery);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = e.target.value;
    setField(newField);
    onSearchChange(newField, query);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearchChange(field, newQuery);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <select
        value={field}
        onChange={handleFieldChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="title">Title</option>
        <option value="director">Director</option>
        <option value="cast">Cast</option>
      </select>
      <input
        type="text"
        placeholder={`Search by ${field}`}
        value={query}
        onChange={handleQueryChange}
        className="flex-grow border border-gray-300 rounded px-2 py-1"
      />
    </div>
  );
};

export default SearchBar;
