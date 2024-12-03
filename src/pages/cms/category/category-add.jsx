import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSCategoryAdd = () => {
  const navigate = useNavigate();
  const authUserData = localStorage.getItem('authUserData');
  const userDataObject = authUserData ? JSON.parse(authUserData) : null;
  const username = userDataObject ? userDataObject.user_name : null;
  const [formData, setFormData] = useState({
    category_type: "",
    category_name: "",
    category_status: "",
    trash: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
  
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        apiUrl + `category`, 
        {
          ...formData,
          created_by: username,
        }, 
        {}
      );

      if (response.status === 201) {
        toast.success("Data Added Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            startTransition(() => {
              navigate("/cms/category/list");
            });
          },
        });
      }
    } catch (error) {
      toast.error("Error Adding Data", {
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

  const handleClear = () => {
    setFormData({
      category_type: "",
      category_name: "",
      category_status: "active",
    });
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="category-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Add Category</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Category Name */}
                  <div className="flex flex-row">
                    <label htmlFor="category_name" className="mb-2 mt-2 w-72">
                      Category Name<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="category_name"
                      name="category_name"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Category Name"
                      value={formData && formData.category_name}
                      onChange={(e) =>
                        handleInputChange("category_name", e.target.value)
                      }
                    />
                  </div>

                  {/* Category Type */}
                  <div className="flex flex-row">
                    <label htmlFor="category_type" className="mb-2 mt-2 w-72">
                      Category Type<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="category_type"
                      name="category_type"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Category Type"
                      value={formData && formData.category_type}
                      onChange={(e) =>
                        handleInputChange("category_type", e.target.value)
                      }
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-row">
                    <label htmlFor="category_status" className="mb-2 mt-2 w-72">
                      Status<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="category_status"
                      name="category_status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.category_status}
                      onChange={(e) =>
                        handleInputChange("category_status", e.target.value)
                      }
                    >
                      <option value="" disabled hidden>Select a status</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      className="bg-white text-gray-700 px-5 py-3 rounded-md hover:bg-gray-300 border border-black tracking-widest text-sm flex"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                      disabled={buttonDisabled}
                      onClick={handleSubmit}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSCategoryAdd;
