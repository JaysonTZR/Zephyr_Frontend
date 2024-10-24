import React from "react";

const Breadcrumb = () => {
  return (
    <div className="px-6 py-4 ">
      <nav className="text-sm text-gray-600 flex items-center">
        {/* Replacing "Home" with SVG */}
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>

        <span className="mr-2 pl-2"> &gt;</span>
        <span>Dashboard</span>
      </nav>
    </div>
  );
};

export default Breadcrumb;
