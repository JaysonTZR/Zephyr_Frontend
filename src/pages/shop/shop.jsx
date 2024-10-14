import React, { useState } from "react";
import "../../App.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Icon from "../../components/ui/Icon";

const Shop = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isBrandingOpen, setIsBrandingOpen] = useState(true);
  const [isFilterPriceOpen, setIsFilterPriceOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const items = [
    { name: "Faux Biker Jacket", price: "$67.24", rating: 5 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", rating: 5, sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39", rating: 3 },
    { name: "Ankle Boots", price: "$38.49", rating: 2, sale: true },
    { name: "T-shirt Contrast Pocket", price: "$40.85", rating: 4 },
    { name: "Basic Flowing Scarf", price: "$22.28", rating: 1 },
    { name: "Faux Biker Jacket", price: "$67.24", rating: 0 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", rating: 5, sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39", rating: 0 },
    { name: "Camouflage Jacket", price: "$89.43", rating: 4, sale: true },
    { name: "Leather Bag", price: "$120.45", rating: 2 },
    { name: "Basic Flowing Scarf", price: "$22.28", rating: 3 },
    { name: "Faux Biker Jacket", price: "$67.24", rating: 5 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", rating: 5, sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39", rating: 3 },
    { name: "Ankle Boots", price: "$38.49", rating: 2, sale: true },
    { name: "T-shirt Contrast Pocket", price: "$40.85", rating: 4 },
    { name: "Basic Flowing Scarf", price: "$22.28", rating: 1 },
    { name: "Faux Biker Jacket", price: "$67.24", rating: 0 },
    { name: "Multi-pocket Chest Bag", price: "$43.48", rating: 5, sale: true },
    { name: "Diagonal Textured Cap", price: "$60.39", rating: 0 },
  ];

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const visiblePages = 5;

    if (totalPages <= visiblePages) {
      // If total pages are less than or equal to the visible pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= visiblePages - 1) {
      // If current page is in the first 3 pages, show first 3 and the last page
      for (let i = 1; i <= visiblePages; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - visiblePages + 2) {
      // If current page is in the last 3 pages, show the last 3 pages
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, ellipsis, 3 middle pages, ellipsis, and the last page
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="font-sans">
      <Header />

      <div className="flex justify-center mb-16" style={{ backgroundColor: '#f3f2ee' }}>
        <div className="flex items-center h-40">
          <span className="text-3xl font-bold">Shop</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="py-8 flex w-7/12">
          {/* Left Panel */}
          <div className="w-1/4 pr-12">
            <div className="relative w-full mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-5 border rounded mb-4 pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-4 text-gray-100" viewBox="0 0 32 32" stroke="currentColor">
                  <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
                </svg>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Categories</h2>
                <div className="mb-4">
                  {isCategoriesOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isCategoriesOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-2 mb-3">
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Bags (20)
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Clothing (20)
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Shoes (20)
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Accessories (20)
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Kids (20)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsBrandingOpen(!isBrandingOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Branding</h2>
                <div className="mb-4">
                  {isBrandingOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isBrandingOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-2 mb-3">
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Louis Vuitton
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Chanel
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      Hermes
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">Gucci</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsFilterPriceOpen(!isFilterPriceOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Filter Price</h2>
                <div className="mb-4">
                  {isFilterPriceOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isFilterPriceOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <ul className="space-y-2 mb-3">
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $0.00 - $50.00
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $50.00 - $100.00
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $100.00 - $150.00
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $150.00 - $200.00
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $200.00 - $250.00
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-gray-800 transition duration-300">
                      $250.00+
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Size</h2>
                <div className="mb-4">
                  {isSizeOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isSizeOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="space-y-2 mb-3">
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      XS
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      S
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      M
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      2XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      XXL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      3XL
                    </button>
                    <button className="font-semibold text-gray-800 border border-gray-200 px-6 py-1 mr-3">
                      4XL
                    </button>
                </div>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsColorsOpen(!isColorsOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Colors</h2>
                <div className="mb-4">
                  {isColorsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isColorsOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="mb-3 flex flex-wrap gap-y-2">
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-black w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-blue-950 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-amber-500 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-gray-500 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-rose-200 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-fuchsia-300 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-red-500 w-8 h-8 border rounded-full" />
                  </div>
                  <div className="border rounded-full w-9 h-9 mr-2 flex items-center justify-center">
                    <button className="bg-white w-8 h-8 border rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 border-b mb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsTagsOpen(!isTagsOpen)}
              >
                <h2 className="font-semibold uppercase mb-4">Tags</h2>
                <div className="mb-4">
                  {isTagsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                  isTagsOpen ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="space-y-2 mb-3">
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Product
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Bags
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Shoes
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Fashion
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Clothing
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Hats
                    </button>
                    <button className="text-sm font-semibold text-gray-800 bg-slate-100 px-4 py-1 mr-3 uppercase">
                      Accessories
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Shop Area */}
          <div className="w-3/4">
            <div className="flex justify-between mb-10">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <p>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, items.length)} of {items.length} results</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="flex">
                  <p className="mr-1">Sort by Price:</p>
                  <select className="font-semibold pb-1">
                    <option value="">Low To High</option>
                    <option value="">$0 - $55</option>
                    <option value="">$55 - $100</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item, index) => (
                <div key={index} className="relative p-1 group">
                  <div className="w-full h-64 bg-gray-100 mb-5 py-5">
                    <div className="absolute top-[72px] left-[200px] transform -translate-y-1/2 translate-x-7 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                      <button className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                      </button>
                    </div>
                    {item.sale && (
                      <div className="bg-black w-16 text-center pb-0.5">
                        <span className="text-white font-semibold text-xs tracking-widest">SALE</span>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="mb-2">
                  <span className="opacity-100 group-hover:opacity-0 duration-300">{item.name}</span>
                    <button className="absolute left-0.5 top-[280px] transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-semibold text-red-600 rounded">
                      + Add to Cart
                    </button>
                  </h2>

                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 -ml-0.5 ${
                          i < item.rating ? 'text-orange-400' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.839-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.09 10.101c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.516-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 flex justify-center space-x-2">
              {renderPagination().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && goToPage(page)}
                  className={`w-7 h-7 font-semibold text-black ${
                    page === '...' ? '' : ( currentPage === page ? 'border border-black rounded-full' : 'hover:border border-black rounded-full' )
                  }`}
                  disabled={typeof page !== 'number'}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
