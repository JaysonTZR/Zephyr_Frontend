import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import AccordionItem from "../../components/shop/shop-sidebar/accordion/AccordionItem";
import ProductList from "../../components/shop/ProductList";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);

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

  const itemsPerPage = 12;
  
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

      <Banner bannerText="Shop" />
      <div className="flex justify-center">
        <div className="py-8 flex w-7/12">
          {/* Left Panel */}
          <AccordionItem />

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
            <ProductList currentItems={currentItems}/>
            
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
