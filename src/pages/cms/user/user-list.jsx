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
          <div className="bg-white shadow-md rounded-lg">
            {/* Title Row with Manage User and Dropdown + Buttons */}
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-semibold">Manage User</h2>
              </div>

              <div className="flex space-x-4">
                <button className=" text-gray-700 w-24 h-9 rounded-md text-sm focus:outline-none hover:bg-gray-300 border border-black flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                  </svg>
                  Filter
                </button>
                <button className=" text-white w-28 h-9 rounded-md text-sm focus:outline-none hover:bg-zinc-700 bg-black flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add User
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full border-t uppercase text-xs">
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          id="tableHeaderCheckbox"
                          className="peer cursor-pointer hidden after:opacity-100"
                        />
                        <label
                          htmlFor="tableHeaderCheckbox"
                          class="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                        ></label>
                      </div>
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Username
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Role
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Creator
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Creation Date
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Status
                    </th>
                    <th className="py-5 px-6 text-center font-semibold text-gray-700 align-middle">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through dummy data */}
                  {dummyData.map((user, index) => (
                    <tr className="border-t text-sm" key={index}>
                      <td className="py-5 px-6 text-center align-middle">
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            id={"tableContentCheckbox-" + index}
                            className="peer cursor-pointer hidden after:opacity-100"
                          />
                          <label
                            htmlFor={"tableContentCheckbox-" + index}
                            class="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"
                          ></label>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center align-middle">
                        {user.username}
                      </td>
                      <td className="py-5 px-6 text-center align-middle">
                        {user.role}
                      </td>
                      <td className="py-5 px-6 text-center align-middle">
                        {user.creator}
                      </td>
                      <td className="py-5 px-6 text-center align-middle">
                        {user.creationDate}
                      </td>
                      <td className="py-5 text-center flex justify-center">
                        <div
                          className={`py-1 w-24 rounded-full ${
                            user.status === "Active"
                              ? "text-green-400 bg-green-100 font-semibold"
                              : "text-red-400 bg-red-100 font-semibold"
                          }`}
                        >
                          <span>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center align-middle">
                        <button
                          onClick={_handleSubmit}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-start items-center p-6">
              <span className="text-gray-700 mr-2">Go</span>
              <input
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                className="w-12 border border-gray-300 p-1 px-2 rounded-md mr-2"
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
