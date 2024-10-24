import React from "react";

const Sidebar = ({ page }) => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        {/* Placeholder for the logo */}
        {/* <img src="/path-to-logo.png" alt="Logo" className="h-10 mb-4" /> can you make this show no image > */}
        <div className="h-10 mb-8 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
        <ul>
          <li className="mb-2">
            <a
              href="/cms/dashboard"
              className={`py-3 px-3 text-sm rounded-md flex items-center ${
                page === "dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/cms/user/list"
              className={`py-3 px-3 text-sm rounded-md flex items-center ${
                page === "user-list"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Manage User
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/cms/user/list"
              className={`py-3 px-3 text-sm rounded-md flex items-center ${
                page === "category-list"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
              Manage Category
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/cms/user/list"
              className={`py-3 px-3 text-sm rounded-md flex items-center ${
                page === "product-list"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Manage Product
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
