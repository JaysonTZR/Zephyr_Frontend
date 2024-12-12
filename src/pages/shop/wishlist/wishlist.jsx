import React, { useEffect, useState, useCallback, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../constant/constants";
import axios from "axios";

const Wishlist = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const authCustomerData = localStorage.getItem("authCustomerData");
  const customerDataObject = authCustomerData
    ? JSON.parse(authCustomerData)
    : null;

  const customer_id = customerDataObject
    ? customerDataObject.customer_id
    : null;

  const [formData, setFormData] = useState([]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        apiUrl + `wishlist/${customer_id}`,
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        const responseData = response.data.items;
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
  }, []);

  const handleDelete = async (wishlist_item_id) => {
    try {
      const response = await axios.delete(
        apiUrl + `wishlist/item/${wishlist_item_id}`,
        {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        fetchData();
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
  };

  const redirectProductPage = (id) => {
    startTransition(() => {
      navigate("/product/" + id);
    });
  };

  const redirectShopPage = () => {
    startTransition(() => {
      navigate("/shop");
    });
  };

  const redirectLoginPage = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  useEffect(() => {

    if(!customer_id){
      redirectLoginPage();
      return;
    }

    startTransition(() => {
      fetchData();
    });
  }, []);

  return (
    <div>
      <Header />
      <Banner bannerText="Wish List" />
      <ToastContainer />
      {/* {formData.length <= 0 && (
        <div className="mx-auto py-32 w-7/12 flex justify-center text-xl">
          Wishlist is empty.
        </div>
      )} */}

      <div className="container mx-auto py-8 w-7/12 mb-20">
        <div className="grid grid-cols-10 gap-6 border-b pb-4">
          <div className="col-span-6 font-semibold uppercase">Product</div>
          {/* <div className="col-span-2 font-semibold text-center uppercase">Quantity</div> */}
          <div className="col-span-3 font-semibold text-center uppercase">
            Price
          </div>
        </div>
        {formData.length > 0 ? (
          formData.map((item) => (
            <div
              key={item.product.product_id}
              className="grid grid-cols-10 gap-6 items-center py-10 border-b"
            >
              <button
                className="col-span-6 flex items-center"
                onClick={() => redirectProductPage(item.product.product_id)}
              >
                <div
                  className="w-20 h-20 mr-6"
                  style={{
                    backgroundImage: `url(${item.product.product_photo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div>
                  <p>{item.product.product_name}</p>
                  <p className="text-lg font-semibold">{item.price}</p>
                </div>
              </button>
              {/* <div className="col-span-2 text-center">
                <QuantityInput item={item}/>
              </div> */}
              <button
                className="col-span-3 text-center font-semibold text-lg"
                onClick={() => redirectProductPage(item.product.product_id)}
              >
                $ {item.product.product_price.toFixed(2)}
              </button>
              <div
                className="col-span-1 text-center border rounded-full w-9 h-9 flex items-center justify-center"
                style={{ backgroundColor: "#f3f2ee" }}
              >
                <button
                  className="text-black font-extrabold"
                  onClick={() => handleDelete(item.wishlist_item_id)}
                >
                  &#10006;
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="mx-auto py-32 w-7/12 flex justify-center text-xl">
            Wishlist is empty.
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={redirectShopPage}
            className="bg-black text-white w-60 px-6 py-4 mt-8 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800"
          >
            SHOP FOR MORE
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
