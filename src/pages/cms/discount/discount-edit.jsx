import React from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

const CMSDiscountEdit = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="discount-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Edit Discount Details</h2>
              </div>

              <div className="p-6">
                <form className="space-y-6">

                <div className="flex flex-row">
                    <label htmlFor="username" className="mb-2 mt-2 w-72">
                        Discount Code<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        placeholder="code"
                    />
                    </div>

                    <div className="flex flex-row">
                    <label htmlFor="username" className="mb-2 mt-2 w-72">
                        Discount Amount<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        placeholder="amount"
                    />
                    </div>

                    <div className="flex flex-row">
                    <label htmlFor="username" className="mb-2 mt-2 w-72">
                        Description<span className="text-red-500"> *</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                        placeholder="description"
                    />
                    </div>

                  {/* Status Field */}
                  <div className="flex flex-row">
                    <label htmlFor="status" className="mb-2 mt-2 w-72">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      className="bg-white text-gray-700 px-5 py-3 rounded-md hover:bg-gray-300 border border-black tracking-widest text-sm flex"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSDiscountEdit;
