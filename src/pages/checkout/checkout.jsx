import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Checkout = () => {
  return (
    <div>
        <Header />
      <div className="flex justify-center py-10">
        <div className="flex justify-between w-1/2 space-x-8">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name*"
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Country*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street Address*"
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Apartment, suite, unit etc (optional)"
                  className="border p-2 w-full mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Town/City*"
                  className="border p-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Country/State*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Postcode / ZIP*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Phone*"
                  className="border p-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" /> Create an account?
                </label>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Account Password*"
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Order notes (optional)"
                  className="border p-2 w-full"
                />
              </div>
            </form>
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            <div className="border p-4 mb-4">
              <ul className="mb-4">
                <li className="flex justify-between mb-2">
                  <span>01. Vanilla salted caramel</span>
                  <span>$300.00</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>02. German chocolate</span>
                  <span>$170.00</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>03. Sweet autumn</span>
                  <span>$170.00</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>04. Gluten free mini dozen</span>
                  <span>$110.00</span>
                </li>
              </ul>
              <div className="flex justify-between font-bold mb-2">
                <span>Subtotal</span>
                <span>$750.99</span>
              </div>
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>$750.99</span>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" /> Check Payment
                </label>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" /> Paypal
                </label>
              </div>
              <button className="bg-black text-white w-full p-3 font-bold">
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
