import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DetailsPayment from "../../assets/images/details-payment.png";
import ProductList from "../../components/shop/ProductList";

const ShopProduct = () => {
  const [menuSection, setMenuSection] = useState("description");

  const items = [
    { name: "Faux Biker Jacket", price: "$67.24", rating: 5 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", rating: 5, sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39", rating: 3 },
    { name: "Ankle Boots", price: "$38.49", rating: 2, sale: true },
  ];

  return (
    <div>
      <Header />
      <section className="flex justify-center p-4" style={{ backgroundColor: '#f3f2ee' }}>
        <div className="flex md:w-3/4">
          {/* Thumbnail Images Section */}
          <div className="flex flex-col w-1/4 p-4 pl-24">
            <div className="bg-gray-200 h-36 w-32 mb-4"></div>
            <div className="bg-gray-200 h-36 w-32 mb-4"></div>
            <div className="bg-gray-200 h-36 w-32 mb-4"></div>
            <div className="bg-gray-200 h-36 w-32 mb-4"></div>
          </div>

          {/* Main Image Section */}
          <div className="flex-shrink-0 w-2/4 p-4">
            <div className="bg-gray-200 h-full w-full"></div>
            {/* This grey box represents the main product image with the same height as the left images */}
          </div>
        </div>
      </section>

      <div className="mx-auto p-4 mt-16 mb-5 w-[800px]">
        {/* Removed border and shadow */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Hooded thermal anorak
        </h2>
        <div className="flex items-center justify-center mb-3">
          <span className="text-orange-400 text-xl">★★★★☆</span>
          <span className="text-gray-600 ml-1">- 5 Reviews</span>
        </div>
        <div className="text-lg font-semibold mb-5 text-center">
          <span className="text-3xl">$270.00</span>
          <span className="line-through ml-3 text-gray-400">$70.00</span>
        </div>
        <p className="mb-12 text-center text-sm">
          Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable cuff tabs, adjustable asymmetric hem with
          elastic side tabs and a front zip fastening with placket.
        </p>
        <div className="flex justify-center space-x-16 mb-7">
          {/* Size Selection */}
          <div className="flex items-center">
            <label className="mr-3">Size:</label>
            <div className="flex space-x-2">
              {["XXL", "XL", "L", "S"].map((size) => (
                <button
                  key={size}
                  className={
                    size === "XL" ? "px-4 py-2 flex items-center justify-center border cursor-pointer bg-black" : "px-4 py-2 flex items-center justify-center border cursor-pointer"
                  }
                >
                  <span
                    className={
                      size === "XL" ? "font-semibold text-white" : "font-semibold text-black"
                    }
                  >
                    {size}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="flex items-center">
            <label className="mr-2">Color:</label>
            <div className="flex justify-center space-x-2">
              <div className="border rounded-full w-8 h-8 flex items-center justify-center">
                <button className="bg-black w-7 h-7 border rounded-full" />
              </div>
              <div className="border rounded-full w-8 h-8 flex items-center justify-center">
                <button className="bg-blue-900 w-7 h-7 border rounded-full" />
              </div>
              <div className="border rounded-full w-8 h-8 flex items-center justify-center">
                <button className="bg-yellow-500 w-7 h-7 border rounded-full" />
              </div>
              <div className="border rounded-full w-8 h-8 flex items-center justify-center">
                <button className="bg-red-500 w-7 h-7 border rounded-full" />
              </div>
              <div className="border rounded-full w-8 h-8 flex items-center justify-center">
                <button className="bg-white w-7 h-7 border rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <input
            type="number"
            defaultValue="1"
            className="w-20 py-2 border mr-4 text-center"
          />
          <button className="bg-black text-white w-48 px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700">
            Add to Cart
          </button>
        </div>


        <div className="flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <button>
            <span className="uppercase tracking-widest text-sm font-semibold">
              Add To Wishlist
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <hr className="border-gray-300 w-1/6" />
          <span className="font-semibold text-xl px-5">Guaranteed Safe Checkout</span>
          <hr className="border-gray-300 w-1/6" />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-10">
          <img src={DetailsPayment} alt="Payment Methods" className="object-cover w-auto h-full"/>
        </div>
        <div className="font-semibold text-center">
          <div className="mb-1">
            <span className="text-gray-400">SKU: </span>
            <span className="text-black">3812912</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">Categories: </span>
            <span className="text-black">Clothes</span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">Tag: </span>
            <span className="text-black">Clothes, Skin, Bod</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 px-40 mb-20">
        {/* Menu Section */}
        <div className="p-5">
          <div className="flex">
            {/* Left Blank Area */}
            <div className="w-1/5"></div>

            {/* Center Menu Items */}
            <div className="flex justify-center items-center w-3/5">
              <button
                onClick={(e) => {
                  setMenuSection("description");
                }}
                className="text-gray-800 text-xl font-bold mx-6 cursor-pointer"
              >
                Description
              </button>
              <button
                onClick={(e) => {
                  setMenuSection("review");
                }}
                className="text-gray-800 text-xl font-bold mx-6 cursor-pointer"
              >
                Customer Reviews (5)
              </button>
              <button
                onClick={(e) => {
                  setMenuSection("additional");
                }}
                className="text-gray-800 text-xl font-bold mx-6 cursor-pointer"
              >
                Additional Information
              </button>
            </div>

            {/* Right Blank Area */}
            <div className="w-1/5"></div>
          </div>
        </div>

        <div className="border-t border-gray-300 mx-4" />{" "}

        {/* Content Section */}
        <div className="p-5">
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
          <h2 className="text-3xl font-semibold mb-10 item text-center">Related Product</h2>
          <div className="px-11">
            <ProductList currentItems={items} itemPerRow={4} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopProduct;
