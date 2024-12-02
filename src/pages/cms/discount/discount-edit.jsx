import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSDiscountEdit = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    discount_description: "",
    discount_code: "",
    discount_amount: 0.00,
    discount_status: "active",
    trash: false,
  });

  const fetchData = async () => {
    // Fetch data from API
    try {
      const response = await axios.get(apiUrl + `discount/${id}`, {});
      // console.log(response.data);

      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      toast.error("Error Fetching Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log(apiUrl);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Submit form data to API

    try {
      const response = await axios.put(apiUrl + `discount/${id}`, formData, {});
      // console.log(response.data.message);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error Updating Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    // console.log(id);
    fetchData();
  }, []);

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
                <h2 className="text-2xl font-semibold">
                  Edit Discount Details
                </h2>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  <div className="flex flex-row">
                    <label htmlFor="discount_code" className="mb-2 mt-2 w-72">
                      Discount Code<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="discount_code"
                      name="discount_code"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="code"
                      value={formData && formData.discount_code}
                      onChange={(e) =>
                        handleInputChange("discount_code", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="discount_amount" className="mb-2 mt-2 w-72">
                      Discount Amount<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="discount_amount"
                      name="discount_amount"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="amount"
                      value={formData && formData.discount_amount}
                      onChange={(e) =>
                        handleInputChange("discount_amount", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="discount_description" className="mb-2 mt-2 w-72">
                      Description<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="discount_description"
                      name="discount_description"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="description"
                      value={formData && formData.discount_description}
                      onChange={(e) =>
                        handleInputChange("discount_description", e.target.value)
                      }
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
                      value={formData && formData.discount_status}
                      onChange={(e) =>
                        handleInputChange("discount_status", e.target.value)
                      }
                    >
                      <option value="active" label="Active">Active</option>
                      <option value="inactive" label="Inactive">Inactive</option>
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
                      onClick={handleSubmit}
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
