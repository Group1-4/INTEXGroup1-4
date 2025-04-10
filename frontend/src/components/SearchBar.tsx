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
        className="px-2 py-1 rounded"
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
        className="flex-grow px-2 py-1 rounded !important"
      />
    </div>
  );
};

export default SearchBar;
