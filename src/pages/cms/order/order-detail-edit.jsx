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

const CMSOrderDetailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const authCMSToken = localStorage.getItem('authCMSToken');
  const [formData, setFormData] = useState([]);
  const [productMap, setProductMap] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        apiUrl + "product", 
        {}
      );

      if (response.status === 200) {
        const productData = response.data.reduce((acc, product) => {
        acc[product.product_id] = {
          name: product.product_name,
          image: product.product_photo,
        };
        return acc;
        }, {});
        setProductMap(productData);
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        apiUrl + "salesorderitem", 
        {
          headers: {
              Authorization: `Bearer ${authCMSToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        const filteredData = response.data.filter((item) => item.order_item_id == id && item.trash === false);
        const transformedData = filteredData.map((item) => ({
          id: item.order_item_id,
          product: productMap[item.product_id]?.name || item.product_id,
          product_image: productMap[item.product_id]?.image || '',
          quantity: item.order_item_quantity,
          total_price: item.order_item_total_price,
          description: item.order_item_description,
          status: item.order_item_status,
          trash: item.trash,
          updated_at: item.updated_at,
          created_at: item.created_at,
        }));

        setFormData(transformedData[0]);
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

  useEffect(() => {
    fetchProductData();
  }, []);
  
  useEffect(() => {
    if (Object.keys(productMap).length > 0) {
      fetchData();
    }
  }, [productMap]);

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
        apiUrl + `salesorderitem/status/${id}`, 
        {
          'order_item_status': formData.status,
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
              navigate("/cms/order/detail/" + id);
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
      <Sidebar page="order-list" />

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
                  Edit Order Item
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {formData && formData.product_image && (
                    <div className="flex items-center mb-6">
                      <div className="w-1/6 ml-[-17px]"/>
                      <img
                        src={formData.product_image}
                        alt="Product"
                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                      />
                    </div>
                  )}

                  <div className="flex flex-row">
                    <label htmlFor="product" className="mb-2 mt-2 w-72">
                      Product
                    </label>
                    <input
                      type="text"
                      id="product"
                      name="product"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Product"
                      value={formData && formData.product}
                      disabled={true}
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="quantity" className="mb-2 mt-2 w-72">
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Quantity"
                      value={formData && formData.quantity}
                      disabled={true}
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="total_price" className="mb-2 mt-2 w-72">
                      Total Price
                    </label>
                    <input
                      type="text"
                      id="total_price"
                      name="total_price"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Total Price"
                      value={formData && formData.total_price}
                      disabled={true}
                    />
                  </div>

                  <div className="flex flex-row">
                    <label htmlFor="description" className="mb-2 mt-2 w-72">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      placeholder="Description"
                      value={formData && formData.description}
                      disabled={true}
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-row">
                    <label htmlFor="status" className="mb-2 mt-2 w-72">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="border py-2 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-black w-full"
                      value={formData && formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
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

export default CMSOrderDetailEdit;
