'use client';

import React, { useState } from 'react';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4 h-full px-4 py-2">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search Google"
        className="flex-1 border-2 border-gray-300 p-3 rounded-l-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-lg shadow-sm transition-colors duration-300"
      >
        🔎 Search
      </button>
    </form>
  );
};

export default SearchComponent;
