import React from "react";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Shop = () => {
  const items = [
    { name: "Faux Biker Jacket", price: "$67.24" },
    { name: "Multi-pocket Chest Bag", price: "$43.48", sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39" },
    { name: "Ankle Boots", price: "$38.49" },
    { name: "T-shirt Contrast Pocket", price: "$40.85" },
    { name: "Basic Flowing Scarf", price: "$22.28" },
    { name: "Faux Biker Jacket", price: "$67.24" },
    { name: "Multi-pocket Chest Bag", price: "$43.48", sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39" },
    { name: "Camouflage Jacket", price: "$89.43", sale: true },
    { name: "Leather Bag", price: "$120.45" },
    { name: "Basic Flowing Scarf", price: "$22.28" },
  ];

  return (
    <div className="font-sans text-center">
      <Header />
      <div className="p-8 flex">
        {/* Left Panel */}
        <div className="w-1/4 pr-8">
          <div className="p-4 border rounded-lg mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded mb-4"
            />
            <h2 className="font-bold text-xl mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button className="text-blue-500 hover:underline">
                  Bags (20)
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Clothing (20)
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Shoes (20)
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Accessories (20)
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Kids (20)
                </button>
              </li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg mb-6">
            <h2 className="font-bold text-xl mb-4">Branding</h2>
            <ul className="space-y-2">
              <li>
                <button className="text-blue-500 hover:underline">
                  Louis Vuitton
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Chanel
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Hermes
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">Gucci</button>
              </li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg mb-6">
            <h2 className="font-bold text-xl mb-4">Filter Price</h2>
            <ul className="space-y-2">
              <li>
                <button className="text-blue-500 hover:underline">
                  $0.00 - $50.00
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  $50.00 - $100.00
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  $100.00 - $150.00
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  $150.00 - $200.00
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  $200.00 - $250.00
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  $250.00+
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Shop Area */}
        <div className="w-3/4">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="w-full h-48 bg-gray-300 mb-4"></div>
                <h2 className="font-semibold text-lg mb-2">{item.name}</h2>
                <p className="text-gray-700">{item.price}</p>
                {item.sale && (
                  <span className="text-red-500 font-bold">SALE</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
