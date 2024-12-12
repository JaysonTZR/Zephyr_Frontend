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

const CMSContactEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authCMSToken = localStorage.getItem('authCMSToken');
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_message: "",
    contact_status: "",
    trash: false,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `contact/${id}`,
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
            contact_name: responseData.contact_name,
            contact_email: responseData.contact_email,
            contact_message: responseData.contact_message,
            contact_status: responseData.contact_status,
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
        apiUrl + `contact/${id}`, 
        {
          'contact_id': id,
          'contact_name': formData.contact_name,
          'contact_email': formData.contact_email,
          'contact_message': formData.contact_message,
          'contact_status': formData.contact_status,
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
              navigate("/cms/contact/list");
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

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
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
                <h2 className="text-2xl font-semibold">Edit Contact Details</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Contact Name */}
                  <div className="flex flex-row">
                    <label htmlFor="contact_name" className="mb-2 mt-2 w-72">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      id="contact_name"
                      name="contact_name"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="name"
                      value={formData && formData.contact_name}
                      onChange={(e) =>
                        handleInputChange("contact_name", e.target.value)
                      }
                      disabled={true}
                    />
                  </div>

                  {/* Contact Email */}
                  <div className="flex flex-row">
                    <label htmlFor="contact_email" className="mb-2 mt-2 w-72">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="contact_email"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Contact Email"
                      value={formData && formData.contact_email}
                      onChange={(e) =>
                        handleInputChange("contact_email", e.target.value)
                      }
                      disabled={true}
                    />
                  </div>

                  {/* Contact Message */}
                  <div className="flex flex-row">
                    <label htmlFor="contact_message" className="mb-2 mt-2 w-72">
                        Contact Message
                    </label>
                    <textarea
                      type="text"
                      id="contact_message"
                      name="contact_message"
                      className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Discount Description"
                      value={formData && formData.contact_message}
                      onChange={(e) =>
                        handleInputChange("contact_message", e.target.value)
                      }
                      rows="4"
                      disabled={true}
                    />
                  </div>

                  {/* Contact Status */}
                  <div className="flex flex-row">
                    <label htmlFor="contact_status" className="mb-2 mt-2 w-72">
                      Status<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="contact_status"
                      name="contact_status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.contact_status}
                      onChange={(e) =>
                        handleInputChange("contact_status", e.target.value)
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

export default CMSContactEdit;
