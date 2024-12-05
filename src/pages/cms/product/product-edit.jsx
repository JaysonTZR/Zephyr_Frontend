import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/cms/Sidebar";
import Footer from "../../../components/cms/Footer";
import Breadcrumb from "../../../components/cms/Breadcrumb";
import Header from "../../../components/cms/Header";
import { toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const CMSProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    product_code: "",
    product_photo: "",
    product_sub_photo: "",
    product_price: 0.0,
    product_description: "",
    product_information: "",
    product_sale: false,
    product_new: false,
    product_status: "",
    created_by: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `product/${id}`
      );

      if (response.status === 200) {
        const responseData = response.data;
        setFormData({
          category_id: responseData.category_id,
          product_name: responseData.product_name,
          product_code: responseData.product_code,
          product_photo: responseData.product_photo,
          product_sub_photo: responseData.product_sub_photo,
          product_price: responseData.product_price,
          product_description: responseData.product_description,
          product_information: responseData.product_information,
          product_sale: responseData.product_sale,
          product_new: responseData.product_new,
          product_status: responseData.product_status,
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

  //Validation
  const isPriceValid = (price) => {
    const priceRegex = /^\d+(\.\d+)?$/;
    return priceRegex.test(price);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => {
        const updatedData = {
            ...prevData,
            [name]: (name === 'product_sale' || name === 'product_new') ? value === 'true' : value,
        };
    
        return updatedData;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!isPriceValid(formData.product_price)) {
        toast.error("Product price must be a valid decimal number", {
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
        apiUrl + `product/${id}`, 
        {
          'product_id': id,
          'category_id': formData.category_id,
          'product_name': formData.product_name,
          'product_code': formData.product_code,
          'product_photo': formData.product_photo,
          'product_sub_photo': formData.product_sub_photo,
          'product_price': formData.product_price,
          'product_description': formData.product_description,
          'product_information': formData.product_information,
          'product_sale': formData.product_sale,
          'product_new': formData.product_new,
          'product_status': formData.product_status,
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
              navigate("/cms/product/list");
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
      category_id: "",
      product_name: "",
      product_code: "",
      product_photo: "",
      product_sub_photo: "",
      product_price: 0.0,
      product_description: "",
      product_information: "",
      product_sale: false,
      product_new: false,
      product_status: "active",
    });
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        apiUrl + "category",
        {}
      );

      const filteredData = response.data
      .filter((categories) => categories?.trash === false && categories?.category_status === "active")
      .map((categories) => ({
      ...categories,
      }));

      setCategory(filteredData);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const categoryOptions = category.map((categories) => ({
    value: categories.category_id,
    label: categories.category_name,
  }))

  const saleOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page="product-list" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="ml-64 flex-1 flex flex-col">
          <Breadcrumb />

          {/* Main Section */}
          <main className="flex-1 px-6 pt-0 pb-10">
            <div className="bg-white shadow-md rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Edit Product Details</h2>
              </div>

              <div className="p-6">
                  <div className="space-y-6">
                      {/* Name */}
                      <div className="flex flex-row">
                          <label htmlFor="product_name" className="mb-2 mt-2 w-72">
                              Product Name<span className="text-red-500"> *</span>
                          </label>
                          <input
                              type="text"
                              id="product_name"
                              name="product_name"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              placeholder="Product Name"
                              value={formData && formData.product_name}
                              onChange={(e) =>
                                  handleInputChange("product_name", e.target.value)
                              }
                          />
                      </div>

                      {/* Code */}
                      <div className="flex flex-row">
                          <label htmlFor="product_code" className="mb-2 mt-2 w-72">
                              Product Code<span className="text-red-500"> *</span>
                          </label>
                          <input
                              type="text"
                              id="product_code"
                              name="product_code"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              placeholder="Product Code"
                              value={formData && formData.product_code}
                              onChange={(e) =>
                                  handleInputChange("product_code", e.target.value)
                              }
                          />
                      </div>

                      {/* Category */}
                      <div className="flex flex-row">
                          <label htmlFor="category_id" className="mb-2 mt-2 w-72">
                              Category<span className="text-red-500"> *</span>
                          </label>
                          <select
                              id="category_id"
                              name="category_id"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              value={formData && formData.category_id}
                              onChange={(e) =>
                                  handleInputChange("category_id", e.target.value)
                              }
                          >
                              <option value="" disabled hidden>Select a category</option>
                              {categoryOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* Price */}
                      <div className="flex flex-row">
                          <label htmlFor="product_price" className="mb-2 mt-2 w-72">
                              Product Price<span className="text-red-500"> *</span>
                          </label>
                          <input
                              type="text"
                              id="product_price"
                              name="product_price"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              placeholder="Product Price"
                              value={formData && formData.product_price}
                              onChange={(e) =>
                                  handleInputChange("product_price", e.target.value)
                              }
                          />
                      </div>

                      {/* Description */}
                      <div className="flex flex-row">
                          <label
                              htmlFor="product_description"
                              className="mb-2 mt-2 w-72"
                          >
                              Description<span className="text-red-500"> *</span>
                          </label>
                          <textarea
                              type="text"
                              id="product_description"
                              name="product_description"
                              className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              placeholder="Product Description"
                              value={formData && formData.product_description}
                              onChange={(e) =>
                                  handleInputChange("product_description", e.target.value)
                              }
                              rows="4"
                          />
                      </div>

                      {/* Information */}
                      <div className="flex flex-row">
                          <label
                              htmlFor="product_information"
                              className="mb-2 mt-2 w-72"
                          >
                              Information<span className="text-red-500"> *</span>
                          </label>
                          <textarea
                              type="text"
                              id="product_information"
                              name="product_information"
                              className="resize-none border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              placeholder="Product Information"
                              value={formData && formData.product_information}
                              onChange={(e) =>
                                  handleInputChange("product_information", e.target.value)
                              }
                              rows="4"
                          />
                      </div>

                      {/* Sale */}
                      <div className="flex flex-row">
                          <label htmlFor="product_sale" className="mb-2 mt-2 w-72">
                              On Sale<span className="text-red-500"> *</span>
                          </label>
                          <select
                              id="product_sale"
                              name="product_sale"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              value={formData && formData.product_sale}
                              onChange={(e) =>
                                  handleInputChange("product_sale", e.target.value)
                              }
                          >
                              <option value="" disabled hidden>Select an option</option>
                              {saleOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* New */}
                      <div className="flex flex-row">
                          <label htmlFor="product_new" className="mb-2 mt-2 w-72">
                              Is New<span className="text-red-500"> *</span>
                          </label>
                          <select
                              id="product_new"
                              name="product_new"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              value={formData && formData.product_new}
                              onChange={(e) =>
                                  handleInputChange("product_new", e.target.value)
                              }
                          >
                              <option value="" disabled hidden>Select an option</option>
                              {saleOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                      {option.label}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* Status */}
                      <div className="flex flex-row">
                          <label htmlFor="product_status" className="mb-2 mt-2 w-72">
                              Status<span className="text-red-500"> *</span>
                          </label>
                          <select
                              id="product_status"
                              name="product_status"
                              className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                              value={formData && formData.product_status}
                              onChange={(e) =>
                                  handleInputChange("product_status", e.target.value)
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
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CMSProductEdit;
