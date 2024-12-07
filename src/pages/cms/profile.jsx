import Sidebar from "../../components/cms/Sidebar";
import Footer from "../../components/cms/Footer";
import Breadcrumb from "../../components/cms/Breadcrumb";
import Header from "../../components/cms/Header";
import React, { useEffect, useState } from "react";

const CMSProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Admin",
    permission: "",
    access: "",
    status: "Active",
    createdBy: "",
  });


  const userId = 1; // Replace with dynamic user ID if necessary
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/User/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setFormData({
            username: data.user_name || "",
            email: data.user_email || "",
            password: data.user_password || "",
            role: data.user_role || "Admin",
            permission: data.user_permission || "",
            access: data.user_access || "",
            status: data.user_status || "Active",
            createdBy: data.created_by || "",
          });
          console.log("Form data to be updated:", formData); // Log form data before sending it to the backend
        } else {
          console.error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [userId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/User/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          user_name: formData.username,
          user_email: formData.email,
          user_password: formData.password,
          user_role: formData.role,
          user_permission: formData.permission,
          user_access: formData.access,
          user_status: formData.status,
          created_by: formData.createdBy,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message || "Updated successfully");
      } else {
        console.error("Failed to update admin data");
        setMessage("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating admin data:", error);
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="profile" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Profile Details</h2>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  {/* Username Field */}
                  <div className="flex flex-row">
                    <label htmlFor="username" className="mb-2 mt-2 w-72">
                      Username<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="demo"
                    />
                  </div>

                  {/* Role Field */}
                  <div className="flex flex-row">
                    <label htmlFor="role" className="mb-2 mt-2 w-72">
                      Role<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      disabled
                    />
                    
                  </div>

                  {/* Status Field */}
                  <div className="flex flex-row">
                    <label htmlFor="status" className="mb-2 mt-2 w-72">
                      Status
                    </label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      disabled
                    />
                    
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      className="bg-white text-gray-700 px-5 py-3 rounded-md hover:bg-gray-300 border border-black tracking-widest text-sm flex"
                      onClick={() => setFormData({ username: "", role: "Admin", status: "Active" })}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="bg-black text-white px-5 py-3 rounded-md hover:bg-zinc-700 tracking-widest text-sm flex"
                      onClick={handleUpdate}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
                {message && <p className="mt-4 text-green-500">{message}</p>}
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSProfile;
