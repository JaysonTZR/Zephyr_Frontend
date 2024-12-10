import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import CartList from "../../../components/cart/CartList";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(null);

  const authCustomerData = localStorage.getItem("authCustomerData");
  const customerDataObject = authCustomerData ? JSON.parse(authCustomerData) : null;
  const customer_id = customerDataObject ? customerDataObject.customer_id : null;

  const handleCheckout = () => {
    startTransition(() => {
      if (discount) {
        navigate("/checkout", { state: { discount_id: discount.discount_id, discount_amount: discount.discount_amount } });
      } else {
        navigate("/checkout");
      }
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl + `cart/customer/${customer_id}`);

      if (response.status === 200) {
        const responseData = response.data.items;

        setFormData(responseData);
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
  }, [customer_id]);

  const handleQuantityChange = (cartId, newQuantity) => {
    setUpdatedCart((prevState) => {
      // Check if the item already exists in the updated array
      const existingItemIndex = prevState.findIndex(
        (item) => item.cart_id === cartId
      );

      if (existingItemIndex !== -1) {
        // Update the existing item's quantity
        const updatedItems = [...prevState];
        updatedItems[existingItemIndex].cart_quantity = newQuantity;
        return updatedItems;
      } else {
        // Add a new item to the array
        return [...prevState, { cart_id: cartId, cart_quantity: newQuantity }];
      }
    });
  };

  const handleCartUpdate = async () => {
    try {
      const response = await axios.put(
        apiUrl + `cart`, 
        updatedCart
      );

      if (response.status === 200) {
        fetchData();
        toast.success("Cart Updated", {
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
      toast.error("Error Updating Cart", {
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

  const handleCartItemDelete = async (cart_id) => {
    try {
      const response = await axios.delete(
        apiUrl + `cart/${cart_id}`
      );

      if (response.status === 200) {
        fetchData();
        toast.success("Cart Item Removed", {
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
      toast.error("Error Removing Cart Item", {
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

  const handleDiscountCode = async () => {
    try {
      const response = await axios.get(
        apiUrl + `discount/validate?customer_id=${customer_id}&discount_code=${discountCode}`
      );

      if (response.status === 200) {
        setDiscount(response.data.discount);

        toast.success("Discount Applied", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.data.message, {
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
      toast.error("Invalid Discount Code", {
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

  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setDiscount(null);
  };

  const redirectShopPage = () => {
    startTransition(() => {
      navigate("/shop");
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Banner bannerText="Shopping Cart" />
      <div className="flex justify-center mb-20">
        <div className="py-8 w-7/12">
          <div className="container mx-auto flex flex-col lg:flex-row lg:space-x-2">
            <div className="bg-white rounded-md flex-grow">
              {/* <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
              <div className="text-sm text-gray-500 mb-6">
                Home &gt; Shop &gt; Shopping Cart
              </div> */}

              <div className="grid grid-cols-10 gap-6 border-b pb-4">
                <div className="col-span-5 font-semibold uppercase">
                  Product
                </div>
                <div className="col-span-2 font-semibold text-center uppercase">
                  Quantity
                </div>
                <div className="col-span-2 font-semibold text-center uppercase">
                  Total
                </div>
              </div>

              {formData.length > 0 ? (
                <CartList
                  items={formData}
                  onQuantityChange={handleQuantityChange}
                  key={formData.cart_id}
                  onRemove={handleCartItemDelete}
                />
              ) : (
                <div className="mx-auto py-32 w-7/12 flex justify-center text-xl">
                  Cart is empty.
                </div>
              )}

              <div className="mt-7 flex justify-between items-center">
                <button className="text-black border px-10 py-4 hover:bg-gray-100 uppercase tracking-widest font-semibold text-sm" onClick={redirectShopPage}>
                  Continue Shopping
                </button>
                {formData.length > 0 && updatedCart.length > 0 && (
                  <button
                    className="bg-black text-white px-6 py-4 hover:bg-zinc-700 uppercase tracking-widest font-semibold text-sm flex"
                    onClick={() => handleCartUpdate()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Update Cart
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:w-1/3 items-start">
              <div className="font-semibold text-center uppercase ml-7">
                Discount Codes
              </div>
              <div className="bg-white px-6 py-4 rounded-md w-full">
                <div className="flex items-center mb-6 mt-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="border border-gray-300 py-3 px-5 w-full"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    className="bg-black text-white px-5 py-[15px] uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
                    onClick={
                      !discount ? handleDiscountCode : handleRemoveDiscount
                    }
                  >
                    {!discount ? "Apply" : "Remove"}
                  </button>
                </div>

                <div
                  className="text-left px-8 py-8 mt-16"
                  style={{ backgroundColor: "#f3f2ee" }}
                >
                  <p className="text-lg font-medium">CART TOTAL</p>
                  <div className="text-zinc-500 mt-5 flex justify-between">
                    Subtotal{" "}
                    <span className="font-semibold text-lg text-red-600">
                      $ {totalSum.toFixed(2)}
                    </span>
                  </div>
                  {discount && (
                    <div className="text-zinc-500 mt-4 flex justify-between">
                      Discount{" "}
                      <span className="font-semibold text-lg text-red-600">
                        - $ {discount.discount_amount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="text-zinc-500 mt-4 flex justify-between">
                    Total{" "}
                    <span className="font-semibold text-lg text-red-600">
                      ${" "}
                      {!discount
                        ? totalSum.toFixed(2)
                        : (totalSum - discount.discount_amount).toFixed(2)}
                    </span>
                  </div>
                  {formData.length > 0 && <button
                    onClick={handleCheckout}
                    className="bg-black text-white w-full px-6 py-3 mt-8 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800"
                  >
                    Proceed to Checkout
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
