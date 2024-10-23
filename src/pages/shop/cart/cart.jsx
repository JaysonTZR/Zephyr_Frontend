import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import CartList from "../../../components/cart/CartList";

function Cart() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    startTransition(() => {
      navigate("/checkout");
    });
  };

  const items = [
    { name: "Faux Biker Jacket", price: "$67.24", quantity: 2 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", quantity: 1 },
    { name: "Diagonal Textured Cap", price: "$60.39", quantity: 3 },
    { name: "Ankle Boots", price: "$38.49", quantity: 2 },
  ];

  return (
    <div>
      <Header />

      <Banner bannerText="Shopping Cart" />
      <div className="flex justify-center">
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

              <CartList items={items} />

              <div className="mt-7 flex justify-between items-center">
                <button className="text-black border px-10 py-4 hover:bg-gray-100 uppercase tracking-widest font-semibold text-sm">
                  Continue Shopping
                </button>
                <button className="bg-black text-white px-10 py-4 hover:bg-zinc-700 uppercase tracking-widest font-semibold text-sm flex">
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
                  />
                  <button className="bg-black text-white px-5 py-[15px] uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700">
                    Apply
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
                      $169.50
                    </span>
                  </div>
                  <div className="text-zinc-500 mt-4 flex justify-between">
                    Total{" "}
                    <span className="font-semibold text-lg text-red-600">
                      $169.50
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-black text-white w-full px-6 py-3 mt-8 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800"
                  >
                    Proceed to Checkout
                  </button>
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
