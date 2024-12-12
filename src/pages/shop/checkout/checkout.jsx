import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import CheckoutList from "../../../components/checkout/CheckoutList";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const discountAmount = location.state?.discount_amount || 0;
  const discountId = location.state?.discount_id || null;
  const [cartData, setCartData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [isOrderNotesEnabled, setIsOrderNotesEnabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const authCustomerData = localStorage.getItem("authCustomerData");
  const customerDataObject = authCustomerData ? JSON.parse(authCustomerData) : null;
  const authUserData = localStorage.getItem("authUserData");
  const userDataObject = authUserData ? JSON.parse(authUserData) : null;
  const [formData, setFormData] = useState({
    billing: {
      billing_name: customerDataObject.customer_name,
      billing_address: `${customerDataObject.customer_address_1}, ${customerDataObject.customer_address_2}, ${customerDataObject.customer_address_3}`,
      billing_address_optional: "",
      billing_country: customerDataObject.customer_country,
      billing_state: customerDataObject.customer_state,
      billing_city: customerDataObject.customer_city,
      billing_mobile_no: customerDataObject.customer_mobile_no,
      billing_email: userDataObject.user_email,
      billing_notes: "",
    },
    salesOrder: {
      customer_id: customerDataObject.customer_id,
      discount_id: "",
      order_subtotal: 0,
      order_rounding: 0,
      order_total: 0,
      order_status: "pending",
    }
  });

  const roundValue = (value) => {
    const roundedValue = (Math.round(value * 10) / 10).toFixed(2);
    const difference = (roundedValue - value).toFixed(2);
    return { roundedValue, difference };
  };

  useEffect(() => {  
    const { roundedValue, difference } = roundValue(totalSum - (discountAmount ? parseFloat(discountAmount) : 0));

    setFormData((prevData) => ({
      ...prevData,
      billing: {
        billing_name: customerDataObject.customer_name,
        billing_address: `${customerDataObject.customer_address_1}, ${customerDataObject.customer_address_2}, ${customerDataObject.customer_address_3}`,
        billing_address_optional: prevData.billing.billing_address_optional,
        billing_country: customerDataObject.customer_country,
        billing_state: customerDataObject.customer_state,
        billing_city: customerDataObject.customer_city,
        billing_mobile_no: customerDataObject.customer_mobile_no,
        billing_email: userDataObject.user_email,
        billing_notes: prevData.billing.billing_notes,
      },
      salesOrder: {
        customer_id: customerDataObject.customer_id,
        discount_id: discountId,
        order_subtotal: totalSum - parseFloat(discountAmount),
        order_rounding: parseFloat(difference),
        order_total: roundedValue,
        order_status: 'pending',
      }
    }));
  }, [totalSum, discountId, discountAmount]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `cart/customer/${customerDataObject.customer_id}`,
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data.items;
        
        setCartData(responseData);
        setTotalSum(response.data.totalSum);
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
  }, [customerDataObject.customer_id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    setButtonDisabled(true);
    try {
      const response = await axios.post(
        apiUrl + `salesorder`, 
        {
          ...formData,
        }, 
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Checkout Successfully", {
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
              navigate("/");
            });
          },
        });
      }
    } catch (error) {
      toast.error("Error Checkout", {
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

  const handleInputChange = (section, name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsOrderNotesEnabled(e.target.checked);
    handleInputChange("billing", "billing_notes", "");
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <Banner bannerText="Check Out" />
      <div className="flex justify-center py-8">
        <div className="flex justify-between w-7/12 space-x-8">
          <div className="w-2/3">
            <h2 className="font-semibold uppercase border-b pb-6 mb-4">Billing Details</h2>
            <div>
              <div className="flex-col mt-6">
                <label>Name<span className="text-red-600"> *</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  value={formData && formData.billing.billing_name}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_name", e.target.value)
                  }
                />
              </div>
              <div className="mt-6">
                <div className="flex-col">
                  <label>Address<span className="text-red-600"> *</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                    placeholder="Street Address"
                    value={formData && formData.billing.billing_address}
                    onChange={(e) =>
                      handleInputChange("billing", "billing_address", e.target.value)
                    }
                  />
                </div>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-5"
                  placeholder="Apartment, suite, unit ect (optional)"
                  value={formData && formData.billing.billing_address_optional}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_address_optional", e.target.value)
                  }
                />
              </div>
              <div className="flex-col mt-6">
                <label>Country<span className="text-red-600"> *</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  value={formData && formData.billing.billing_country}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_country", e.target.value)
                  }
                />
              </div>
              <div className="flex-col mt-6">
                <label>State<span className="text-red-600"> *</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  value={formData && formData.billing.billing_state}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_state", e.target.value)
                  }
                />
              </div>
              <div className="flex-col mt-6">
                <label>City<span className="text-red-600"> *</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  value={formData && formData.billing.billing_city}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_city", e.target.value)
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex-col">
                  <label>Phone<span className="text-red-600"> *</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                    value={formData && formData.billing.billing_mobile_no}
                    onChange={(e) =>
                      handleInputChange("billing", "billing_mobile_no", e.target.value)
                    }
                  />
                </div>
                <div className="flex-col">
                  <label>Email<span className="text-red-600"> *</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                    value={formData && formData.billing.billing_email}
                    onChange={(e) =>
                      handleInputChange("billing", "billing_email", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="inline-flex items-center text-sm">
                  <input type="checkbox" className="mr-3" onChange={handleCheckboxChange} /> Note about your order, e.g, special note for delivery.
                </label>
              </div>
              <div className="flex-col mt-6">
                <label>Order Notes</label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  placeholder="Notes about your order, e.g, special note for delivery"
                  value={formData && formData.billing.billing_notes}
                  onChange={(e) =>
                    handleInputChange("billing", "billing_notes", e.target.value)
                  }
                  disabled={!isOrderNotesEnabled}
                />
              </div>
            </div>
          </div>
          <div className="w-1/3 p-7 h-fit" style={{ backgroundColor: '#f3f2ee' }}>
            <h2 className="text-2xl font-semibold uppercase mb-4 border-b-2 pb-6">Your Order</h2>
            <div className="p-1 mt-6">
              <div className="flex justify-between mb-3 text-lg">
                <span>Product(s)</span>
                <span>Total</span>
              </div>
              <ul className="mb-4">
                <CheckoutList items={cartData} />
              </ul>
              <div className="border-t-2 border-b-2 py-6 mb-5">
                {discountAmount !== 0 && (
                  <div className="flex justify-between mb-4">
                    <span>Discount</span>
                    <span className="text-red-600 font-semibold text-lg">- $ {parseFloat(discountAmount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span className="text-red-600 font-semibold text-lg">$ {totalSum - parseFloat(discountAmount)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Rounding</span>
                  <span className="text-red-600 font-semibold text-lg">{formData.salesOrder.order_rounding < 0 ? `- $ ${Math.abs(formData.salesOrder.order_rounding).toFixed(2)}` : `+ $ ${formData.salesOrder.order_rounding.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-red-600 font-semibold text-lg">$ {formData.salesOrder.order_total}</span>
                </div>
              </div>
              <div className="mb-4">
                <span>
                  Lorem ipsum dolor sit amet consect adipisicing elit. Aspernatur pariatur libero conseqr nisi perferendis.
                </span>
              </div>
              <button 
                className="bg-black hover:bg-zinc-700 text-white w-full py-4 mt-2 uppercase tracking-widest font-semibold text-sm"
                onClick={handleSubmit}
                disabled={buttonDisabled}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
