import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ShopProduct = () => {
  const [menuSection, setMenuSection] = useState("description");

  const products = [
    { name: "Piqué Biker Jacket", price: "$67.24", isNew: true },
    { name: "Piqué Biker Jacket", price: "$67.24" },
    {
      name: "Multi-pocket Chest Bag",
      price: "$43.48",
      isOnSale: true,
      rating: 4,
    },
    { name: "Diagonal Textured Cap", price: "$60.90" },
  ];

  return (
    <div>
      <Header />
      <section className="flex justify-center p-4">
        <div className="flex md:w-3/4 bg-white shadow-md rounded-lg">
          {/* Thumbnail Images Section */}
          <div className="flex flex-col w-1/4 p-4">
            <div className="bg-gray-300 h-32 w-32 mb-4 rounded-lg"></div>
            <div className="bg-gray-300 h-32 w-32 mb-4 rounded-lg"></div>
            <div className="bg-gray-300 h-32 w-32 mb-4 rounded-lg"></div>
            <div className="bg-gray-300 h-32 w-32 mb-4 rounded-lg"></div>
          </div>

          {/* Main Image Section */}
          <div className="flex-shrink-0 w-3/4 p-4">
            <div className="bg-gray-300 h-full w-full rounded-lg"></div>
            {/* This grey box represents the main product image with the same height as the left images */}
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto p-4">
        {/* Removed border and shadow */}
        <h2 className="text-2xl font-bold mb-2 text-center">
          Hooded thermal anorak
        </h2>
        <div className="flex items-center justify-center mb-2">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="text-gray-500 ml-2">(5 Reviews)</span>
        </div>
        <div className="text-lg font-semibold mb-2 text-center">
          <span className="line-through text-gray-500">$70.00</span>
          <span className="text-red-500 ml-2 text-2xl">$270.00</span>
        </div>
        <p className="mb-4 text-center">
          Coat with quilted lining and an adjustable hood. Featuring long
          sleeves with adjustable cuff tabs, adjustable asymmetric hem with
          elastic side tabs and a front zip fastening with placket.
        </p>
        <div className="flex justify-center space-x-8 mb-4">
          {/* Size Selection */}
          <div className="flex items-center">
            <label className="mr-2">Size:</label>
            <div className="flex space-x-2">
              {["XXL", "XL", "L", "S"].map((size) => (
                <div
                  key={size}
                  className="w-12 h-8 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-300"
                >
                  <span
                    className={
                      size === "XL" ? "font-bold text-black" : "text-gray-700"
                    }
                  >
                    {size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex items-center">
            <label className="mr-2">Color:</label>
            <div className="flex justify-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full cursor-pointer"></div>
              <div className="w-6 h-6 bg-white rounded-full border border-gray-300 cursor-pointer"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <input
            type="number"
            defaultValue="1"
            className="w-16 p-2 border rounded-md mr-2"
          />
          <button className="bg-orange-500 text-white py-2 px-4 rounded-md">
            Add to Cart
          </button>
        </div>
        <div className="text-gray-500 text-sm mb-4 text-center">
          <span>Guaranteed Safe Checkout</span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span>Powered by:</span>
          <img
            src="https://via.placeholder.com/50"
            alt="Payment methods"
            className="h-8"
          />
        </div>
        <div className="text-gray-500 text-sm text-center">
          <span>SKU: 3812912</span>
          <div>Categories: Clothes</div>
          <div>Tag: Clothes, Skin, Body</div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Menu Section */}
        <div className="bg-white-100 shadow-md rounded-lg p-5 mb-4">
          <div className="flex">
            {/* Left Blank Area */}
            <div className="w-1/5"></div>

            {/* Center Menu Items */}
            <div className="flex justify-center items-center w-3/5">
              <a
                onClick={(e) => {
                  setMenuSection("description");
                }}
                className="text-gray-800 font-bold hover:underline mx-4"
              >
                Description
              </a>
              <a
                onClick={(e) => {
                  setMenuSection("review");
                }}
                className="text-gray-800 font-bold hover:underline mx-4"
              >
                Customer Reviews
              </a>
              <a
                onClick={(e) => {
                  setMenuSection("additional");
                }}
                className="text-gray-800 font-bold hover:underline mx-4"
              >
                Additional Information
              </a>
            </div>

            {/* Right Blank Area */}
            <div className="w-1/5"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white shadow-md rounded-lg p-5">
          {/* Description Content */}
          {menuSection == "description" && (
            <div>
              <h1 className="text-xl font-bold mb-4">Description</h1>
              <p className="text-gray-700 mb-4">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                sollicitud felis. Pellentesque diam dolor, elementum etos
                lobortis des mollis ut risus. Sedcus faucibus an sullamcorper
                mattis drostique des commodo pharetras lorem.
              </p>
            </div>
          )}

          {/* Customer Reviews Content */}
          {menuSection == "review" && (
            <div>
              <h1 className="text-xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-gray-700 mb-4">
                This Pocket PC is fantastic! It has all the features I need to
                stay organized. Highly recommended!
              </p>
              <p className="text-gray-700 mb-4">
                Good value for money. It has been a reliable device for me.
              </p>
            </div>
          )}

          {/* Additional Information Content */}
          {menuSection == "additional" && (
            <div>
              <h1 className="text-xl font-bold mb-4">Additional Information</h1>
              <h2 className="text-lg font-semibold mt-5">
                Products Information
              </h2>
              <p className="text-gray-600 mb-4">
                A Pocket PC is a handheld computer, which features many of the
                same capabilities as a modern PC. These handy little devices
                allow individuals to retrieve and store e-mail messages, create
                a contact file, coordinate appointments, surf the internet,
                exchange text messages and more. Every product that is labeled
                as a Pocket PC must be accompanied with specific software to
                operate the unit and must feature a touchscreen and touchpad. As
                is the case with any new technology product, the cost of a
                Pocket PC was substantial during its early release. For
                approximately $700.00, consumers could purchase one of
                top-of-the-line Pocket PCs in 2003. These days, customers are
                finding that prices have become much more reasonable now that
                the newness is wearing off. For approximately $350.00, a new
                Pocket PC can now be purchased.
              </p>

              <h2 className="text-lg font-semibold mt-5">Material Used</h2>
              <p className="text-gray-600">
                Polyester is deemed lower quality due to its non-natural
                quality's. Made from synthetic materials, not natural like wool.
                Polyester suits become creased easily and are known for not
                being breathable. Polyester suits tend to have a shine to them
                compared to wool and cotton suits, this can make the suit look
                cheap. The texture of velvet is luxurious and breathable. Velvet
                is a great choice for a dinner party jacket and can be worn all
                year round.
              </p>
            </div>
          )}
        </div>

        <div className="container mx-auto py-10">
          <h2 className="text-xl font-bold mb-4 item text-center">Related Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="border rounded-lg p-4">
                {product.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 text-xs absolute">
                    NEW
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-red-500 text-white px-2 py-1 text-xs absolute">
                    SALE
                  </span>
                )}
                <img
                  src={`https://via.placeholder.com/150?text=No+Image`}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-lg">{product.price}</p>
                {product.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
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

export default ShopProduct;
