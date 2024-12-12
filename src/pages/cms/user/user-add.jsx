import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSUserAdd = () => {
  const navigate = useNavigate();
  const authCMSToken = localStorage.getItem('authCMSToken');
  const animatedComponents = makeAnimated();
  const authUserData = localStorage.getItem('authUserData');
  const userDataObject = authUserData ? JSON.parse(authUserData) : null;
  const username = userDataObject ? userDataObject.user_name : null;
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "",
    user_permission: "",
    user_access: "",
    user_status: "active",
    trash: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Validations
  //Pasword length
  const isPasswordLengthValid = (password) => {
    return password && password.length >= 8;
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (Array.isArray(value)) {
        updatedData[name] = value.map(option => option.value).join(", ");
      }
      
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    setButtonDisabled(true);
    try {
      if (!isPasswordLengthValid(formData.user_password)) {
        toast.error("Password must be at least 8 characters in length", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      const response = await axios.post(
        apiUrl + `user`, 
        {
          ...formData,
          created_by: username,
        }, 
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
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
              navigate("/cms/user/list");
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
      setButtonDisabled(false);
    }
  };

  const handleClear = () => {
    setFormData({
      user_name: "",
      user_email: "",
      user_role: "",
      user_permission: "",
      user_access: "",
      user_status: "active",
      user_password: "",
    });
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
    { value: "customer", label: "Customer" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const permissionOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const accessOptions = [
    { value: "Dashboard", label: "Dashboard" },
    { value: "Manage Contact", label: "Manage Contact" },
    { value: "Manage Category", label: "Manage Category" },
    { value: "Manage Product", label: "Manage Product" },
    { value: "Manage Discount", label: "Manage Discount" },
    { value: "Manage Customer", label: "Manage Customer" },
    { value: "Manage Order", label: "Manage Order" },
    { value: "Manage User", label: "Manage User" },
  ];

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
                <h2 className="text-2xl font-semibold">Add User</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Username */}
                  <div className="flex flex-row">
                    <label htmlFor="user_name" className="mb-2 mt-2 w-72">
                      Username<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Username"
                      value={formData && formData.user_name}
                      onChange={(e) =>
                        handleInputChange("user_name", e.target.value)
                      }
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-row">
                    <label htmlFor="user_email" className="mb-2 mt-2 w-72">
                      Email<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_email"
                      name="user_email"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Email"
                      value={formData && formData.user_email}
                      onChange={(e) =>
                        handleInputChange("user_email", e.target.value)
                      }
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-row">
                    <label htmlFor="user_password" className="mb-2 mt-2 w-72">
                      Password<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="user_password"
                      name="user_password"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Password"
                      value={formData && formData.user_password}
                      onChange={(e) =>
                        handleInputChange("user_password", e.target.value)
                      }
                    />
                  </div>

                  {/* Role */}
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
                      <option value="" disabled hidden>Select a role</option>
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* CMS Permission */}
                  <div className="flex flex-row">
                    <label htmlFor="user_permission" className="mb-2 mt-2 w-72">
                      CMS Permission<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="user_permission"
                      name="user_permission"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.user_permission}
                      onChange={(e) =>
                        handleInputChange("user_permission", e.target.value)
                      }
                    >
                      <option value="" disabled hidden>Select a permission</option>
                      {permissionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* CMS Access */}
                  <div className="flex flex-row">
                    <label htmlFor="user_access" className="mt-2 w-72">
                      CMS Access
                    </label>
                    <Select
                      id="user_access"
                      name="user_access"
                      className="w-full"
                      value={formData.user_access ? formData.user_access.split(', ').map(value => accessOptions.find(option => option.value === value)) : []}
                      onChange={(e) =>
                        handleInputChange("user_access", e)
                      }
                      options={accessOptions}
                      isMulti
                      isClearable={false}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-row">
                    <label htmlFor="user_status" className="mb-2 mt-2 w-72">
                      Status<span className="text-red-500"> *</span>
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

export default CMSUserAdd;
