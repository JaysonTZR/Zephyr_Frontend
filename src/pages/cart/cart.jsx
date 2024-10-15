import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Cart() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Header />

      <div className="bg-gray-100 py-10">
        <div className="container mx-auto flex flex-col lg:flex-row lg:space-x-10">
          <div className="bg-white p-6 rounded-md flex-grow">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="text-sm text-gray-500 mb-6">
              Home &gt; Shop &gt; Shopping Cart
            </div>

            <div className="grid grid-cols-5 gap-6 border-b pb-4 mb-4">
              <div className="col-span-2 font-semibold">Product</div>
              <div className="col-span-1 font-semibold text-center">
                Quantity
              </div>
              <div className="col-span-1 font-semibold text-center">Total</div>
              <div className="col-span-1 font-semibold text-center">
                Actions
              </div>
            </div>

            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-6 items-center py-4 border-b"
              >
                <div className="col-span-2 flex items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded mr-4"></div>
                  <div>
                    <p className="font-medium">Product Title</p>
                    <p className="text-sm text-gray-500">$98.49</p>
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 border border-gray-300 rounded text-center"
                  />
                </div>
                <div className="col-span-1 text-center">$30.00</div>
                <div className="col-span-1 text-center">
                  <button className="text-red-500">&#10006;</button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <button className="text-sm text-gray-500 border px-4 py-2 rounded hover:bg-gray-200">
                Continue Shopping
              </button>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Update Cart
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md w-full lg:w-1/3 mt-10 lg:mt-0">
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Coupon code"
                className="border border-gray-300 p-2 rounded-l-md w-full"
              />
              <button className="bg-black text-white p-2 rounded-r-md hover:bg-gray-800">
                Apply
              </button>
            </div>

            <div className="text-right">
              <p className="font-medium">CART TOTAL</p>
              <div className="text-sm text-gray-500 my-2">
                Subtotal:{" "}
                <span className="font-semibold text-red-500">$169.50</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Total:{" "}
                <span className="font-semibold text-red-500">$169.50</span>
              </div>
              <button onClick={handleCheckout} className="bg-black text-white w-full px-6 py-2 rounded hover:bg-gray-800">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
