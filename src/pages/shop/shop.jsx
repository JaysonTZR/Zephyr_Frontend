import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../components/Banner";
import AccordionItem from "../../components/shop/shop-sidebar/accordion/AccordionItem";
import ProductList from "../../components/shop/ProductList";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";
import axios from "axios";

const Shop = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const authCustomerData = localStorage.getItem("authCustomerData");
  const customerDataObject = authCustomerData
    ? JSON.parse(authCustomerData)
    : null;

  const customer_id = customerDataObject
    ? customerDataObject.customer_id
    : null;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        apiUrl + "product",
        {

        }
      );

      if (response.status === 200){
        const filteredData = response.data.filter((item) => item.product_status === "active" && item.trash === false);
        const transformedData = filteredData.map((item) => ({
          id: item.product_id,
          category_id: item.category_id,
          name: item.product_name,
          product_image: item.product_photo,
          price: item.product_price,
          new: item.product_new,
          sale: item.product_sale,
        }));

        setItems(transformedData);
        setOriginalItems(transformedData);
      }
    } catch (error) {
      toast.error("Error Fetching Data", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchWishlist = async () => {
    try {

      const response = await axios.get(apiUrl + `wishlist/${customer_id}`);

      if (response.status === 200) {
        const responseData = response.data.items;
        setWishlist(responseData);
      }
    } catch (error) {
      toast.error("Error Fetching Wishlist", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  

  const addWishlistItem = async (productId) => {

    try {
      const response = await axios.post(
        apiUrl + "wishlist/item",
        {
          customer_id: customer_id,
          product_id: productId,
        }
      );

      if (response.status === 201){
        fetchWishlist();
        toast.success("Item Added To Wishlist", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Error Adding Wishlist", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  const removeWishlistItem = async (wishlist_item_id) => {

    try {
      const response = await axios.delete(
        apiUrl + `wishlist/item/${wishlist_item_id}`,
        {}
      );

      if (response.status === 200){
        
        toast.success("Wishlist Removed Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setWishlist([]);
      }
    } catch (error) {
      toast.error("Error Removing Wishlist Item", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  const handleWishlist = async (productId) => {

    if(!customer_id){
      redirectLoginPage();
      return;
    }

    const filteredItems = wishlist.filter(item => item.product.product_id == productId);

    const wishlistItem = filteredItems[0];

    if(wishlistItem){
      removeWishlistItem(wishlistItem.wishlist_item_id);
    }else{
      addWishlistItem(productId);
    }
  }

  const handleAddToCart = async (product_id) => {

    startTransition(() => {
      navigate("/product/" + product_id);
    });
  }

  

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    if (order === '') {
      setItems(originalItems);
    } else {
      const sortedItems = [...items].sort((a, b) => {
        if (order === 'lowToHigh') {
          return a.price - b.price;
        } else if (order === 'highToLow') {
          return b.price - a.price;
        } else {
          return 0;
        }
      });

      setItems(sortedItems);
    }
  };

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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBrandingId, setSelectedBrandingId] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: Infinity });
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedTagsId, setSelectedTagsId] = useState(null);
  const [selectedColorsId, setSelectedColorsId] = useState(null);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    applyFilters(searchTerm, selectedCategoryId, selectedBrandingId, selectedPriceRange, selectedSizeId, selectedTagsId);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    applyFilters(searchTerm, categoryId, selectedBrandingId, selectedPriceRange, selectedSizeId, selectedTagsId, selectedColorsId);
  };

  const handleBrandingSelect = (brandingId) => {
    setSelectedBrandingId(brandingId);
    applyFilters(searchTerm, selectedCategoryId, brandingId, selectedPriceRange, selectedSizeId, selectedTagsId, selectedColorsId);
  };

  const handlePriceSelect = (min, max) => {
    setSelectedPriceRange({ min, max });
    applyFilters(searchTerm, selectedCategoryId, selectedBrandingId, { min, max }, selectedSizeId, selectedTagsId, selectedColorsId);
  };

  const handleSizeSelect = (sizeId) => {
    setSelectedSizeId(sizeId);
    applyFilters(searchTerm, selectedCategoryId, selectedBrandingId, selectedPriceRange, sizeId, selectedTagsId, selectedColorsId);
  };

  const handleTagsSelect = (tagsId) => {
    setSelectedTagsId(tagsId);
    applyFilters(searchTerm, selectedCategoryId, selectedBrandingId, selectedPriceRange, selectedSizeId, tagsId, selectedColorsId);
  };

  const handleColorsSelect = (colorsId) => {
    setSelectedColorsId(colorsId);
    applyFilters(searchTerm, selectedCategoryId, selectedBrandingId, selectedPriceRange, selectedSizeId, selectedTagsId, colorsId);
  };

  const applyFilters = (searchTerm, categoryId, brandingId, priceRange, sizeId, tagsId, colorsId) => {
    let filteredItems = originalItems;

    if (categoryId) {
      filteredItems = filteredItems.filter(item => item.category_id === categoryId);
    }

    if (brandingId) {
      filteredItems = filteredItems.filter(item => item.category_id === brandingId);
    }

    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange) {
      filteredItems = filteredItems.filter(item =>
        item.price >= priceRange.min && item.price <= priceRange.max
      );
    }

    if (sizeId) {
      filteredItems = filteredItems.filter(item => item.category_id === sizeId);
    }

    if (colorsId) {
      filteredItems = filteredItems.filter(item => item.category_id === colorsId);
    }

    if (tagsId) {
      filteredItems = filteredItems.filter(item => item.category_id === tagsId);
    }

    setItems(filteredItems);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategoryId(null);
    setSelectedBrandingId(null);
    setSelectedPriceRange({ min: 0, max: Infinity });
    setSelectedSizeId(null);
    setSelectedColorsId(null);
    setSelectedTagsId(null);
    setItems(originalItems);
  };

  const redirectLoginPage = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    fetchData();
    customer_id && fetchWishlist();
  }, []);

  return (
    <div className="font-sans">
      <Header />

      <Banner bannerText="Shop" />
      <ToastContainer />
      <div className="flex justify-center mb-20">
        <div className="py-8 flex w-7/12">
          {/* Left Panel */}
          <AccordionItem 
            onSearch={handleSearch} 
            onCategorySelect={handleCategorySelect} 
            onBrandingSelect={handleBrandingSelect} 
            onPriceSelect={handlePriceSelect}
            onSizeSelect={handleSizeSelect}
            onColorsSelect={handleColorsSelect}
            onTagsSelect={handleTagsSelect}
          />

          {/* Main Shop Area */}
          <div className="w-3/4">
            <div className="flex justify-between mb-2">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <p>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, items.length)} of {items.length} results</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="flex">
                  <p className="mr-1">Sort by Price:</p>
                  <select className="font-semibold pb-1" value={sortOrder} onChange={handleSortChange}>
                    <option value="">No Sort</option>
                    <option value="lowToHigh">Low To High</option>
                    <option value="highToLow">High To Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-8">
              {/* <button
                className="bg-black text-white px-4 py-1 uppercase text-sm font-semibold"
                onClick={clearFilters}
              >
                Clear Filters
              </button> */}
            </div>
            <ProductList currentItems={currentItems} itemPerRow={3} wishlist={wishlist} handleWishlist={handleWishlist} handleAddToCart={handleAddToCart}  />
            
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
