import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSCategoryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category_type: "",
    category_name: "",
    category_status: "active",
    created_by: "",
    trash: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `category/${id}`
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          category_type: responseData.category_type,
          category_name: responseData.category_name,
          category_status: responseData.category_status,
          created_by: responseData.created_by,
        });
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
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    try {
      const response = await axios.put(
        apiUrl + `category/${id}`, 
        {
          'category_id': id,
          'category_type': formData.category_type,
          'category_name': formData.category_name,
          'category_status': formData.category_status,
          'created_by': formData.created_by,
        }, 
        {}
      );

      if (response.status === 200) {
        toast.success("Data Updated Successfully", {
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

  const categoryTypeOptions = [
    { value: "Categories", label: "Categories" },
    { value: "Branding", label: "Branding" },
    { value: "Size", label: "Size" },
    { value: "Colors", label: "Colors" },
    { value: "Tags", label: "Tags" },
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
                <h2 className="text-2xl font-semibold">Edit Category Details</h2>
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
                      placeholder="name"
                      value={formData && formData.category_name}
                      onChange={(e) =>
                        handleInputChange("category_name", e.target.value)
                      }
                    />
                  </div>

                  {/* Category Type */}
                  <div className="flex flex-row">
                    <label htmlFor="category_type" className="mb-2 mt-2 w-72">
                      Status<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="category_type"
                      name="category_type"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.category_type}
                      onChange={(e) =>
                        handleInputChange("category_type", e.target.value)
                      }
                    >
                      <option value="" disabled hidden>Select a category type</option>
                      {categoryTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
                      onClick={handleSubmit}
                    >
                      Update
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

export default CMSCategoryEdit;
