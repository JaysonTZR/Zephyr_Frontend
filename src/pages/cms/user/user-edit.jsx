import React from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

const CMSUserEdit = () => {
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
            <h2 className="text-2xl font-semibold mb-4">Edit User Details</h2>

            <form className="space-y-6">
              {/* Username Field */}
              <div className="flex flex-col">
                <label htmlFor="username" className="font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="demo"
                />
              </div>

              {/* Role Field */}
              <div className="flex flex-col">
                <label htmlFor="role" className="font-medium mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>

              {/* User Status Field */}
              <div className="flex flex-col">
                <label htmlFor="status" className="font-medium mb-2">
                  User Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-300"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-orange-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CMSUserEdit;
