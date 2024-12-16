import React, { useState } from "react";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void; // Callback to pass the search term
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Search Tasks by Name:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Type task name..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBox;
