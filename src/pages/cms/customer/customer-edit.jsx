import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSCustomerEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    customer_name: "",
    customer_gender: "",
    customer_mobile_no: "",
    customer_country: "",
    customer_state: "",
    customer_city: "",
    customer_address_1: "",
    customer_address_2: "",
    customer_address_3: "",
    customer_status: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `customer/${id}`
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          user_id: responseData.user_id,
          customer_name: responseData.customer_name,
          customer_gender: responseData.customer_gender,
          customer_mobile_no: responseData.customer_mobile_no,
          customer_country: responseData.customer_country,
          customer_state: responseData.customer_state,
          customer_city: responseData.customer_city,
          customer_address_1: responseData.customer_address_1,
          customer_address_2: responseData.customer_address_2,
          customer_address_3: responseData.customer_address_3,
          customer_status: responseData.customer_status,
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
        apiUrl + `customer/${id}`, 
        {
          'customer_id': id,
          'user_id': formData.user_id,
          'customer_name': formData.customer_name,
          'customer_gender': formData.customer_gender,
          'customer_mobile_no': formData.customer_mobile_no,
          'customer_country': formData.customer_country,
          'customer_state': formData.customer_state,
          'customer_city': formData.customer_city,
          'customer_address_1': formData.customer_address_1,
          'customer_address_2': formData.customer_address_2,
          'customer_address_3': formData.customer_address_3,
          'customer_status': formData.customer_status,
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
              navigate("/cms/customer/list");
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
      user_id: "",
      customer_name: "",
      customer_gender: "",
      customer_mobile_no: "",
      customer_country: "",
      customer_state: "",
      customer_city: "",
      customer_address_1: "",
      customer_address_2: "",
      customer_address_3: "",
      customer_status: "active",
    });
  };

  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`http://api.geonames.org/countryInfoJSON?username=jaysonzr`);
        const countryOptions = response.data.geonames.map((country) => ({
          value: country.geonameId,
          label: country.countryName,
        }));
        setCountries(countryOptions);

        const selectedCountry = countryOptions.find(
          (country) => country.label === formData.customer_country
        );
        if (selectedCountry) {
          setCountry(selectedCountry);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [formData.customer_country]);

  useEffect(() => {
    if (formData.customer_country) {
      // Fetch states
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${country.value}&username=jaysonzr`
          );
          const stateOptions = response.data.geonames.map((state) => ({
            value: state.geonameId,
            label: state.name,
          }));
          setStates(stateOptions);

          const selectedState = stateOptions.find(
            (state) => state.label === formData.customer_state
          );
          if (selectedState) {
            setState(selectedState);
          }
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    }
  }, [country, formData.customer_state]);

  useEffect(() => {
    if (formData.customer_state) {
      // Fetch cities
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${state.value}&username=jaysonzr`
          );
          const cityOptions = response.data.geonames.map((city) => ({
            value: city.geonameId,
            label: city.name,
          }));
          setCities(cityOptions);

          const selectedCity = cityOptions.find(
            (city) => city.label === formData.customer_city
          );
          if (selectedCity) {
            setCity(selectedCity);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [state, formData.customer_city]);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const countryOptions = [
    { value: "Malaysia", label: "Malaysia" },
  ];

  const stateOptions = [
    { value: "Selangor", label: "Selangor" },
  ];

  const cityOptions = [
    { value: "Klang", label: "Klang" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="customer-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Edit Customer Details</h2>
              </div>

              <div className="p-6">
                <form className="space-y-6">
                  {/* Username */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_name" className="mb-2 mt-2 w-72">
                      Name<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="customer_name"
                      name="customer_name"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Name"
                      value={formData && formData.customer_name}
                      onChange={(e) =>
                        handleInputChange("customer_name", e.target.value)
                      }
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_gender" className="mb-2 mt-2 w-72">
                      Gender<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="customer_gender"
                      name="customer_gender"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.customer_gender}
                      onChange={(e) =>
                        handleInputChange("customer_gender", e.target.value)
                      }
                    >
                      <option value="" disabled hidden>Select a gender</option>
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_mobile_no" className="mb-2 mt-2 w-72">
                      Mobile No.<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="customer_mobile_no"
                      name="customer_mobile_no"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Mobile No."
                      value={formData && formData.customer_mobile_no}
                      onChange={(e) =>
                        handleInputChange("customer_mobile_no", e.target.value)
                      }
                    />
                  </div>

                  {/* Country */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_country" className="mb-2 mt-2 w-72">
                      Country<span className="text-red-500"> *</span>
                    </label>
                    <Select
                      id="customer_country"
                      className="w-full"
                      value={country}
                      onChange={(e) => {
                        setCountry(e);
                        handleInputChange("customer_country", e.label);
                      }}
                      options={countries}
                      placeholder="Select a country"
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_state" className="mb-2 mt-2 w-72">
                      State<span className="text-red-500"> *</span>
                    </label>
                    <Select
                      id="customer_state"
                      className="w-full"
                      value={state}
                      onChange={(e) => {
                          setState(e);
                          handleInputChange("customer_state", e.label);
                      }}
                      options={states}
                      placeholder="Select a state"
                      isDisabled={!country}
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_city" className="mb-2 mt-2 w-72">
                      City<span className="text-red-500"> *</span>
                    </label>
                    <Select
                      id="customer_city"
                      className="w-full"
                      value={city}
                      onChange={(e) => {
                          setCity(e);
                          handleInputChange("customer_city", e.label);
                      }}
                      options={cities}
                      placeholder="Select a city"
                      isDisabled={!state}
                    />
                  </div>

                  {/* Address 1 */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_address_1" className="mb-2 mt-2 w-72">
                      Address Line 1<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="customer_address_1"
                      name="customer_address_1"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Address Line 1"
                      value={formData && formData.customer_address_1}
                      onChange={(e) =>
                        handleInputChange("customer_address_1", e.target.value)
                      }
                    />
                  </div>

                  {/* Address 2 */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_address_2" className="mb-2 mt-2 w-72">
                      Address Line 2<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      id="customer_address_2"
                      name="customer_address_2"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Address Line 2"
                      value={formData && formData.customer_address_2}
                      onChange={(e) =>
                        handleInputChange("customer_address_2", e.target.value)
                      }
                    />
                  </div>

                  {/* Address 3 */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_address_3" className="mb-2 mt-2 w-72">
                      Address Line 3
                    </label>
                    <input
                      type="text"
                      id="customer_address_3"
                      name="customer_address_3"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Address Line 3"
                      value={formData && formData.customer_address_3}
                      onChange={(e) =>
                        handleInputChange("customer_address_3", e.target.value)
                      }
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-row">
                    <label htmlFor="customer_status" className="mb-2 mt-2 w-72">
                      Status<span className="text-red-500"> *</span>
                    </label>
                    <select
                      id="customer_status"
                      name="customer_status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.customer_status}
                      onChange={(e) =>
                        handleInputChange("customer_status", e.target.value)
                      }
                    >
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

export default CMSCustomerEdit;
