import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";

import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSUserEdit = () => {
  const { id } = useParams();

  const userData = localStorage.getItem("authUserData");

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "staff",
    user_permission: "yes",
    user_access: "all",
    user_status: "active",
    trash: false,
  });

  const fetchData = async () => {
    // Fetch data from API
    try {
      const response = await axios.get(apiUrl + `user/${id}`, {});
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
      const response = await axios.put(apiUrl + `user/${id}`, {
        'user_id': id,
        'user_name': formData.user_name,
        'user_email': formData.user_email,
        'user_role': formData.user_role,
        'user_status': formData.user_status,
        'user_permission': formData.user_permission,
        'user_access': formData.user_access,
      }, {});
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
    // console.log(userData);
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="user-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Edit User Details</h2>
              </div>

              <div className="p-6">
              <form className="space-y-6">
                  {/* Username Field */}
                  <div className="flex flex-row">
                    <label htmlFor="user_name" className="mb-2 mt-2 w-72">
                      Username<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="name"
                      value={formData && formData.user_name}
                      onChange={(e) =>
                        handleInputChange("user_name", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="user_email" className="mb-2 mt-2 w-72">
                      Email<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_email"
                      name="user_email"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="email"
                      value={formData && formData.user_email}
                      onChange={(e) =>
                        handleInputChange("user_email", e.target.value)
                      }
                    />
                  </div>

                  {/* <div className="flex flex-row">
                    <label htmlFor="user_password" className="mb-2 mt-2 w-72">
                      Password<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_password"
                      name="user_password"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="password"
                      value={formData && formData.user_password}
                      onChange={(e) =>
                        handleInputChange("user_password", e.target.value)
                      }
                    />
                  </div> */}

                  {/* Role Field */}
                  <div className="flex flex-row">
                    <label htmlFor="user_role" className="mb-2 mt-2 w-72">
                      Role<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="user_role"
                      name="user_role"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.user_role}
                      onChange={(e) =>
                        handleInputChange("user_role", e.target.value)
                      }
                    >
                      <option value="staff" label="Staff">Staff</option>
                      <option value="admin" label="Admin">Admin</option>
                    </select>
                  </div>

                  {/* Status Field */}
                  <div className="flex flex-row">
                    <label htmlFor="user_status" className="mb-2 mt-2 w-72">
                      Status
                    </label>
                    <select
                      id="user_status"
                      name="user_status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.user_status}
                      onChange={(e) =>
                        handleInputChange("user_status", e.target.value)
                      }
                    >
                      <option value="active" label="Active">
                        Active
                      </option>
                      <option value="inactive" label="Inactive">
                        Inactive
                      </option>
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
                      Add
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

export default CMSUserEdit;
