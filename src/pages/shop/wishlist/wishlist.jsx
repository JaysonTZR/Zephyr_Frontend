import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import QuantityInput from "../../../components/cart/QuantityInput";

const Wishlist = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const items = [
    {
      id: 1,
      name: "T-shirt Contrast Pocket",
      price: "$30.0",
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
    {
      id: 2,
      name: "Diagonal Textured Cap",
      price: "$32.5",
      image: "https://via.placeholder.com/150",
      quantity: 3
    },
    {
      id: 3,
      name: "Basic Flowing Scarf",
      price: "$47.0",
      image: "https://via.placeholder.com/150",
      quantity: 2
    },
    {
      id: 4,
      name: "Basic Flowing Scarf",
      price: "$30.0",
      image: "https://via.placeholder.com/150",
      quantity: 1
    },
  ];

  return (
    <div>
      <Header />
      <Banner bannerText="Wish List" />
      {items.length <= 0 && (
          <div className="mx-auto py-32 w-7/12 flex justify-center text-xl">
              Wishlist is empty.
          </div>
      )}

      {items.length > 0 && (
        <div className="container mx-auto py-8 w-7/12">
          <div className="grid grid-cols-10 gap-6 border-b pb-4">
            <div className="col-span-6 font-semibold uppercase">Product</div>
            {/* <div className="col-span-2 font-semibold text-center uppercase">Quantity</div> */}
            <div className="col-span-3 font-semibold text-center uppercase">Total</div>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-10 gap-6 items-center py-10 border-b"
            >
              <div className="col-span-6 flex items-center">
                <div className="w-20 h-20 bg-gray-100 mr-6"></div>
                <div>
                  <p>{item.name}</p>
                  <p className="text-lg font-semibold">{item.price}</p>
                </div>
              </div>
              {/* <div className="col-span-2 text-center">
                <QuantityInput item={item}/>
              </div> */}
              <div className="col-span-3 text-center font-semibold text-lg">$ 30.00</div>
              <div className="col-span-1 text-center border rounded-full w-9 h-9 flex items-center justify-center" style={{ backgroundColor: '#f3f2ee' }}>
                <button className="text-black font-extrabold">&#10006;</button>
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
