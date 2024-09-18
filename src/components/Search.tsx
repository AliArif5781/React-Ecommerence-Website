// Search.tsx
import React from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchProps {
  setQuery: (query: string) => void;
  query: string;
}

const Search: React.FC<SearchProps> = ({ setQuery, query }) => {
  return (
    <div className="relative w-full items-end">
      <input
        id="search-input" // Changed id to be more descriptive
        name="search-input" // Added name attribute for better form handling and accessibility
        autoComplete="search" // Updated to a more standard value
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black font-bold text-custom-black"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <IoSearchSharp className="text-gray-500" />
      </div>
    </div>
  );
};

export default Search;
