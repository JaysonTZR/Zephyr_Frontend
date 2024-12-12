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

const CMSDiscountEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authCMSToken = localStorage.getItem('authCMSToken');
  const [formData, setFormData] = useState({
    discount_description: "",
    discount_code: "",
    discount_amount: 0.00,
    discount_status: "active",
    trash: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `discount/${id}`,
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          discount_description: responseData.discount_description,
          discount_code: responseData.discount_code,
          discount_amount: responseData.discount_amount,
          discount_status: responseData.discount_status,
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
        apiUrl + `discount/${id}`, 
        {
          'discount_id': id,
          'discount_description': formData.discount_description,
          'discount_code': formData.discount_code,
          'discount_amount': formData.discount_amount,
          'discount_status': formData.discount_status,
        }, 
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
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
              navigate("/cms/discount/list");
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
      discount_description: "",
      discount_code: "",
      discount_amount: 0.0,
      discount_status: "active",
    });
  };

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

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
                <div className="space-y-6">
                  {/* Discount Code */}
                  <div className="flex flex-row">
                    <label htmlFor="discount_code" className="mb-2 mt-2 w-72">
                      Discount Code<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="discount_code"
                      name="discount_code"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Discount Code"
                      value={formData && formData.discount_code}
                      onChange={(e) =>
                        handleInputChange("discount_code", e.target.value)
                      }
                    />
                  </div>

                  {/* Discount Amount */}
                  <div className="flex flex-row">
                    <label htmlFor="discount_amount" className="mb-2 mt-2 w-72">
                      Discount Amount<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="discount_amount"
                      name="discount_amount"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Discount Amount"
                      value={formData && formData.discount_amount}
                      onChange={(e) =>
                        handleInputChange("discount_amount", e.target.value)
                      }
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-row">
                    <label htmlFor="discount_description" className="mb-2 mt-2 w-72">
                      Description<span className="text-red-500"> *</span>
                    </label>
                    <textarea
                      type="text"
                      id="discount_description"
                      name="discount_description"
                      className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Discount Description"
                      value={formData && formData.discount_description}
                      onChange={(e) =>
                        handleInputChange("discount_description", e.target.value)
                      }
                      rows="4"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-row">
                    <label htmlFor="discount_status" className="mb-2 mt-2 w-72">
                      Status
                    </label>
                    <select
                      id="discount_status"
                      name="discount_status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.discount_status}
                      onChange={(e) =>
                        handleInputChange("discount_status", e.target.value)
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

export default CMSDiscountEdit;
