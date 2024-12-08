import React , { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
  };

  return (
    <div className="relative w-full mb-3">
        <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-5 border rounded mb-4 pr-10"
            value={searchTerm}
            onChange={handleInputChange}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-4 text-gray-100" viewBox="0 0 32 32" stroke="currentColor">
                <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
            </svg>
        </div>
    </div>
  );
};

export default Search;