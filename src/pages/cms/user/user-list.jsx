import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

const CMSUserList = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      username: "Demo",
      role: "Admin",
      creator: "Ips",
      creationDate: "2024-01-30 15:32:37",
      status: "Active",
    },
    {
      username: "Ayama1",
      role: "Super Admin",
      creator: "Ips",
      creationDate: "2024-03-27 16:55:09",
      status: "Active",
    },
    {
      username: "JohnDoe",
      role: "Editor",
      creator: "JaneDoe",
      creationDate: "2024-05-14 10:23:45",
      status: "Inactive",
    },
    {
      username: "JaneDoe",
      role: "Admin",
      creator: "Ips",
      creationDate: "2024-06-18 14:12:22",
      status: "Active",
    },
  ];

  const _handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/cms/user/edit");
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="user-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <Breadcrumb />

        {/* Main Section */}
        <main className="flex-1 p-6">
  <div className="bg-white p-6 shadow-md rounded-lg">
    {/* Title Row with Manage User and Dropdown + Buttons */}
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold">Manage User</h2>

        {/* Dropdown Field next to Manage User */}
        <div className="relative">
          <select className="border border-gray-300 bg-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">Filter by Role</option>
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button className="bg-orange-300 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600">
          Submit
        </button>
      </div>

      <div className="flex space-x-4">
        <button className=" text-gray-700 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-300 border border-orange-500">
          Filter
        </button>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-orange-600">
          + Add User
        </button>
      </div>
    </div>

    {/* Table Section */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-100">
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              <input type="checkbox" />
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Username
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Role
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Creator
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Creation Date
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Status
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700 align-middle">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map through dummy data */}
          {dummyData.map((user, index) => (
            <tr className="border-t" key={index}>
              <td className="py-3 px-6 text-center align-middle">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-6 text-center align-middle">
                {user.username}
              </td>
              <td className="py-3 px-6 text-center align-middle">
                {user.role}
              </td>
              <td className="py-3 px-6 text-center align-middle">
                {user.creator}
              </td>
              <td className="py-3 px-6 text-center align-middle">
                {user.creationDate}
              </td>
              <td className="py-3 px-6 text-center align-middle">
                <span
                  className={`px-2 py-1 rounded-full ${
                    user.status === "Active"
                      ? "text-green-800 bg-green-100"
                      : "text-red-800 bg-red-100"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center align-middle">
                <button
                  onClick={_handleSubmit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination Section */}
    <div className="flex justify-end items-center mt-4">
      <span className="text-gray-700 mr-2">Go</span>
      <input
        type="number"
        min="1"
        max="10"
        defaultValue="1"
        className="w-12 border border-gray-300 p-2 rounded-md mr-2"
      />
      <span className="text-gray-700">Page 1 of 1</span>
    </div>
  </div>
</main>


        <Footer />
      </div>
    </div>
  );
};

export default CMSUserList;
