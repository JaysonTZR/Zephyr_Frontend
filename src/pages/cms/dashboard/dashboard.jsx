import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          {/* Placeholder for the logo */}
          {/* <img src="/path-to-logo.png" alt="Logo" className="h-10 mb-4" /> can you make this show no image > */}
          <div className="h-10 mb-4 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image
          </div>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 bg-orange-500 text-white rounded-lg"
              >
                Dashboard
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
              >
                Manage User
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
              >
                Manage Category
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
              >
                Manage Product
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-200 rounded-lg"
              >
                Feedback List
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className=" text-gray-600 py-2 px-4 rounded">
              Settings
            </button>
            {/* SVG Down Arrow Button */}
            <button className=" text-gray-600 py-2 px-4 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="px-6 py-4 ">
          <nav className="text-sm text-gray-600 flex items-center">
            {/* Replacing "Home" with SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

            <span className="mr-2 pl-2"> /</span>
            <span>Dashboard</span>
          </nav>
        </div>

        {/* Main Section */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to Ayam A1 Content Management System!
            </h2>
            <p className="text-gray-600">
              For assistance, feel free to reach out to us at +6016 977 5111 or
              email us at info@ips.com.my. We are here to provide guidance on
              maximizing your experience with your current screen.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow p-4 text-center text-gray-600">
          COPYRIGHT © 2024 TAN SOFTWARE SDN. BHD. 202001024359 (1380679-X) All
          rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
