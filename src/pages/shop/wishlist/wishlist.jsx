import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import QuantityInput from "../../../components/cart/QuantityInput";

import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";
import { set } from "date-fns";

const Wishlist = () => {
  const navigate = useNavigate();
  const authUserData = localStorage.getItem('authUserData');
  const userDataObject = authUserData ? JSON.parse(authUserData) : null;

  const authCustomerData = localStorage.getItem('authCustomerData');
  const customerDataObject = authCustomerData ? JSON.parse(authCustomerData) : null;

  const customer_id = customerDataObject ? customerDataObject.customer_id : null;

  const [formData, setFormData] = useState([]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `wishlist/${customer_id}`
      );

      if (response.status === 200) {
        const responseData = response.data.items;

        // console.log(responseData[0].product.product_price);
        setFormData(responseData);
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

  const handleDelete = async (wishlist_item_id) => {
    try {
      const response = await axios.delete(
        apiUrl + `wishlist/item/${wishlist_item_id}`
      );

      if (response.status === 200) {
        toast.success("Wishlist Item Removed Successfully", {
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
      toast.error("Error Removing Wishlist Item", {
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
  }

  useEffect(() => {
    fetchData();
  }, [handleDelete]);

  return (
    <div>
      <Header />
      <Banner bannerText="Wish List" />
      <ToastContainer />
      {formData.length <= 0 && (
          <div className="mx-auto py-32 w-7/12 flex justify-center text-xl">
              Wishlist is empty.
          </div>
      )}

      {formData.length > 0 && (
        <div className="container mx-auto py-8 w-7/12 mb-20">
          <div className="grid grid-cols-10 gap-6 border-b pb-4">
            <div className="col-span-6 font-semibold uppercase">Product</div>
            {/* <div className="col-span-2 font-semibold text-center uppercase">Quantity</div> */}
            <div className="col-span-3 font-semibold text-center uppercase">Price</div>
          </div>
          {formData.map((item) => (
            <div
              key={item.product.product_id}
              className="grid grid-cols-10 gap-6 items-center py-10 border-b"
            >
              <div className="col-span-6 flex items-center">
                <div className="w-20 h-20 bg-gray-100 mr-6"></div>
                <div>
                  <p>{item.product.product_name}</p>
                  <p className="text-lg font-semibold">{item.price}</p>
                </div>
              </div>
              {/* <div className="col-span-2 text-center">
                <QuantityInput item={item}/>
              </div> */}
              <div className="col-span-3 text-center font-semibold text-lg">RM {(item.product.product_price).toFixed(2)}</div>
              <div className="col-span-1 text-center border rounded-full w-9 h-9 flex items-center justify-center" style={{ backgroundColor: '#f3f2ee' }}>
                <button className="text-black font-extrabold" onClick={()=>handleDelete(item.wishlist_item_id)}>&#10006;</button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end">
            <button onClick={handleCheckout} className="bg-black text-white w-60 px-6 py-4 mt-8 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Wishlist;
