import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSUserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authCMSToken = localStorage.getItem('authCMSToken');
  const animatedComponents = makeAnimated();
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_role: "",
    user_permission: "",
    user_access: "",
    user_status: "",
    user_password: "",
    confirm_user_password: "",
    created_by: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `user/${id}`,
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          user_name: responseData.user_name,
          user_email: responseData.user_email,
          user_role: responseData.user_role,
          user_permission: responseData.user_permission,
          user_access: responseData.user_access,
          user_status: responseData.user_status,
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

  // Validations
  //Pasword length
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_.@]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (name === 'user_password' || name === 'confirm_user_password') {
        const match = updatedData.user_password === updatedData.confirm_user_password;
        setPasswordMatch(match);
      }

      if (Array.isArray(value)) {
        updatedData[name] = value.map(option => option.value).join(", ");
      }
      
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      if (changePasswordClicked && !isPasswordValid(formData.user_password)) {
        toast.error("Password must be at least 8 characters, and contain both letters and numbers. Only these symbols can be used -_.@", {
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

      if (changePasswordClicked && !passwordMatch) {
        toast.error("Password and Confirm Password do not match", {
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

      const response = await axios.put(
        apiUrl + `user/${id}`, 
        {
          'user_id': id,
          'user_name': formData.user_name,
          'user_email': formData.user_email,
          'user_role': formData.user_role,
          'user_status': formData.user_status,
          'user_permission': formData.user_permission,
          'user_access': formData.user_access,
          'user_password': formData.user_password,
          'created_by': formData.created_by,
        }, 
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200) {
        const authUserData = localStorage.getItem('authUserData');
        if (authUserData) {
          const userDataObject = JSON.parse(authUserData);
          userDataObject.user_access = formData.user_access;
          localStorage.setItem('authUserData', JSON.stringify(userDataObject));
        }
        
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
              navigate("/cms/user/list");
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
      user_name: "",
      user_email: "",
      user_role: "",
      user_permission: "",
      user_access: "",
      user_status: "active",
      user_password: "",
      confirm_user_password: "",
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
                <h2 className="text-2xl font-semibold">Edit User Details</h2>
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

                  {changePasswordClicked && (
                    <>
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
                      <div className="flex flex-row">
                        <label htmlFor="confirm_user_password" className="mb-2 mt-2 w-72">
                          Confirm Password<span className="text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          id="confirm_user_password"
                          name="confirm_user_password"
                          className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                          placeholder="Confirm Password"
                          value={formData && formData.confirm_user_password}
                          onChange={(e) =>
                            handleInputChange("confirm_user_password", e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    <button className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex" onClick={() => setChangePasswordClicked(!changePasswordClicked)}>
                      {changePasswordClicked ? "Cancel" : "Change Password"}
                    </button>
                    <div className="flex space-x-4">
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
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSUserEdit;
