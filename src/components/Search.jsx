import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState(""); // User input state
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Delayed search term
  const searchRef = useRef(null); // Ref for animation

  // Adds a delay before updating the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler); // Clears timeout on input change
  }, [search]);

  // Calls onSearch when the debounced term changes
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  // Animates the search input on mount
  useEffect(() => {
    if (window.gsap && searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }
  }, []);

  return (
    <div className="flex justify-center mb-4">
      <div ref={searchRef} className="relative w-96">
        {/* Search icon */}
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 pl-10 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

// Validates props
Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
