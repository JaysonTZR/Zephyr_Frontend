import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);

  const handleProfile = () => {
    startTransition(() => {
      navigate("/cms/profile");
    });
  }

  const handleLogout = () => {
    console.log("Logout");
  }

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-end items-center fixed top-0 left-0 w-full z-10">
      <div className="flex items-center space-x-3">
        <button className="text-gray-600 py-2 px-1 rounded">Tzuyu</button>
        <button className="text-gray-600 py-2 px-4 rounded" onClick={() => setShowDropdown(!showDropdown)}>
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

      {showDropdown && (
        <div className="absolute top-[75px] w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="">
              <button
                  onClick={handleProfile}
                  className="flex items-center px-4 py-2 text-sm w-full border text-gray-700 hover:bg-black hover:text-white"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Profile
              </button>
              <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm w-full border text-gray-700 hover:bg-black hover:text-white"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Logout
              </button>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
