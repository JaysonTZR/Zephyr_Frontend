import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";

const Wishlist = () => {
  const items = [
    {
      id: 1,
      name: "T-shirt Contrast Pocket",
      price: 30.0,
      image: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: 2,
      name: "Diagonal Textured Cap",
      price: 32.5,
      image: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: 3,
      name: "Basic Flowing Scarf",
      price: 47.0,
      image: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: 4,
      name: "Basic Flowing Scarf",
      price: 30.0,
      image: "https://via.placeholder.com/150", // Placeholder image
    },
  ];

  return (
    <div>
      <Header />
      <Banner bannerText="Wishlist" />
      <div className="container mx-auto p-4 w-7/12">
        <div className="grid grid-cols-10 gap-6 border-b pb-4">
          <div className="col-span-5 font-semibold uppercase">Product</div>
          <div className="col-span-4 font-semibold text-center uppercase">
            Total
          </div>
          <div className="col-span-1 font-semibold text-center uppercase"></div>
        </div>
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-10 gap-6 border-b py-4">
            <div className="col-span-5 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
              </div>
            </div>
            <div className="col-span-4 flex items-center justify-center">
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button className="text-black border rounded-full p-2" style={{ backgroundColor: '#f3f2ee' }}>
                {/* SVG for X icon with a circular background */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    stroke="currentColor"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
