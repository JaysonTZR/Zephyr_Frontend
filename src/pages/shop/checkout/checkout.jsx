import React from "react";
import Header from "../../../components/Header";
import Footer2 from "../../../components/Footer2";
import Banner from "../../../components/Banner";
import CheckoutList from "../../../components/checkout/CheckoutList";

const Checkout = () => {
  const items = [
    { name: "Faux Biker Jacket", price: "67.24" },
    { name: "Multi-pocket Chest Bag", price: "43.48" },
    { name: "Diagonal Textured Cap", price: "60.39" },
    { name: "Ankle Boots", price: "38.49" },
  ];

  return (
    <div>
      <Header />

      <Banner bannerText="Check Out" />
      <div className="flex justify-center py-8">
        <div className="flex justify-between w-7/12 space-x-8">
          <div className="w-2/3">
            <h2 className="font-semibold uppercase border-b pb-6 mb-4">Billing Details</h2>
            <form>
              <div className="grid grid-cols-2 gap-4 mt-7">
                <div className="flex-col">
                  <label>First Name<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                  />
                </div>
                <div className="flex-col">
                  <label>Last Name<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                  />
                </div>
              </div>
              <div className="flex-col mt-6">
                <label>Country<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                />
              </div>
              <div className="mt-6">
                <div className="flex-col">
                  <label>Address<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                    placeholder="Street Address"
                  />
                </div>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-5"
                  placeholder="Apartment, suite, unit ect (optional)"
                />
              </div>
              <div className="flex-col mt-6">
                <label>Town / City<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                />
              </div>
              <div className="flex-col mt-6">
                <label>Country / State<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                />
              </div>
              <div className="flex-col mt-6">
                <label>Postcode / ZIP<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex-col">
                  <label>Phone<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                  />
                </div>
                <div className="flex-col">
                  <label>Email<span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    className="border py-3 px-4 w-full mt-4"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="inline-flex items-center text-sm">
                  <input type="checkbox" className="mr-3" /> Create an account?
                </label>
              </div>
              <div className="mt-4">
                <label className="inline-flex items-center text-sm">
                  Create an account by below. If you are a returning customer please login at the top of the page.
                </label>
              </div>
              <div className="flex-col mt-6">
                <label>Account Password<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                />
              </div>
              <div className="mt-6">
                <label className="inline-flex items-center text-sm">
                  <input type="checkbox" className="mr-3" /> Note about your order, e.g, special note for delivery.
                </label>
              </div>
              <div className="flex-col mt-6">
                <label>Order Notes<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  className="border py-3 px-4 w-full mt-4"
                  placeholder="Notes about your order, e.g, special note for delivery"
                />
              </div>
            </form>
          </div>
          <div className="w-1/3 p-7 h-fit" style={{ backgroundColor: '#f3f2ee' }}>
            <h2 className="text-2xl font-semibold uppercase mb-4 border-b-2 pb-6">Your Order</h2>
            <div className="p-1 mt-6">
              <div className="flex justify-between mb-3 text-lg">
                <span>Product</span>
                <span>Total</span>
              </div>
              <ul className="mb-4">
                <CheckoutList items={items} />
              </ul>
              <div className="border-t-2 border-b-2 py-6 mb-5">
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span className="text-red-600 font-semibold text-lg">$750.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-red-600 font-semibold text-lg">$750.99</span>
                </div>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="mr-2" /> Create an account?
                </label>
              </div>
              <div className="mb-4">
                <span>
                  Lorem ipsum dolor sit amet consect adipisicing elit. Aspernatur pariatur libero conseqr nisi perferendis.
                </span>
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
              <button className="bg-black text-white w-full py-4 mt-2 uppercase tracking-widest font-semibold text-sm">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </div>
  );
};

export default Checkout;
