import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import Table from "../../../components/cms/Table";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSCustomerList = () => {
  const authCMSToken = localStorage.getItem('authCMSToken');
  const [formData, setFormData] = useState([]);
  const [formOriData, setFormOriData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const tableHeader = ["name", "gender", "mobile_no", "status", "created_at"];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        apiUrl + "customer",
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );

      if (response.status === 200){
        const filteredData = response.data.filter((item) => item.trash === false);
        const transformedData = filteredData.map((item) => ({
          id: item.customer_id,
          user_id: item.user_id,
          name: item.customer_name,
          gender: item.customer_gender,
          mobile_no: item.customer_mobile_no,
          created_at: item.created_at,
          status: item.customer_status,
        }));

        setFormData(transformedData);
        setFormOriData(transformedData);
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
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
    setFilterValue("");
    setFormData(formOriData);
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);

    const filteredData = formOriData.filter((item) => {
      return item[selectedField]
        .toString()
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setFormData(filteredData);
  };

  const clearFilter = () => {
    setSelectedField("");
    setFilterValue("");
    setFormData(formOriData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <ToastContainer />
      <Sidebar page="customer-list" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />
          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              {/* Title Row with Manage User and Dropdown + Buttons */}
              <div className="flex justify-between items-center p-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-semibold">Manage Customer</h2>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => setShowFilters(!showFilters)} className=" text-gray-700 w-24 h-9 rounded-md text-sm focus:outline-none hover:bg-gray-300 border border-black flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                    Filter
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-11 gap-4 items-center">
                    {/* Left column: Choose field to filter */}
                    <select
                      name="selectedField"
                      value={selectedField}
                      onChange={handleFieldChange}
                      className="border rounded-md p-2 col-span-5"
                    >
                      <option value="">Select Field</option>
                      {tableHeader.map(
                        (item, index) =>
                          item !== "created_at" && (
                            <option key={index} value={item}>
                              {(
                                item.charAt(0).toUpperCase() + item.slice(1)
                              ).replace(/_/g, " ")}
                            </option>
                          )
                      )}
                    </select>

                    {/* Right column: Enter value for selected filter field */}
                    {selectedField === "status" ? (
                      <select
                        name="filterValue"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        className="border rounded-md p-2 col-span-5"
                      >
                        <option value="">All Status</option>
                        <option value="active" label="Active">
                          Active
                        </option>
                        <option value="inactive" label="Inactive">
                          Inactive
                        </option>
                      </select>
                    ) : selectedField === "gender" ? (
                      <select
                        name="gender"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        className="border rounded-md p-2 col-span-5"
                      >
                        <option value="">All Gender</option>
                        <option value="male" label="Male">
                          Male
                        </option>
                        <option value="female" label="Female">
                          Female
                        </option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="filterValue"
                        placeholder={`Enter ${selectedField}`}
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        className="border rounded-md p-2 col-span-5"
                      />
                    )}

                    {/* Clear Button */}
                    <button 
                      onClick={clearFilter}
                      className="text-white h-9 rounded-md text-sm focus:outline-none hover:bg-zinc-700 bg-black flex justify-center items-center"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Table Section */}
              <Table
                tableHeader={tableHeader}
                tableData={formData}
                editPath={"/cms/customer/edit"}
                deletePath={"user"}
                onRefresh={fetchData}
              />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSCustomerList;