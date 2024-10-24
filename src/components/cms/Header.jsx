import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-end items-center">
      <div className="flex items-center space-x-3">
        <button className=" text-gray-600 py-2 px-1 rounded">Tzuyu</button>
        <button className=" text-gray-600 py-2 px-4 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
