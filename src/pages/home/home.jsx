import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WinterCollectionImage from "../../assets/images/momo-model.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";

function HomePage() {
  const options = {
    triggerOnce: false,
    threshold: 0.1,
  };

  const navigate = useNavigate();
  const [section1Ref, section1InView] = useInView(options);
  const [section2Ref, section2InView] = useInView(options);
  const [section3Ref, section3InView] = useInView(options);
  const [section4Ref, section4InView] = useInView(options);
  const [section5Ref, section5InView] = useInView(options);
  const [section6Ref, section6InView] = useInView(options);
  const [section7Ref, section7InView] = useInView(options);
  const [newArrivalsProductData, setNewArrivalsProductData] = useState([]);
  const [currentNewArrivalsIndex, setCurrentNewArrivalsIndex] = useState(0);
  const [currentNewCollectionIndex, setCurrentNewCollectionIndex] = useState(0);
  const [bestSellingProductData, setBestSellingProductData] = useState([]);
  const [currentBestSellingIndex, setCurrentBestSellingIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);
  const itemsPerPage = 4;
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
        const filteredRandomProductData = response.data.filter((item) => item.product_status === "active" && item.trash === false);
        const allImagesArray = filteredRandomProductData.flatMap((item) => [
          item.product_photo,
          ...item.product_sub_photo.split(", "),
        ]);

        const randomImagesArray = allImagesArray.sort(() => 0.5 - Math.random()).slice(0, 6);
        setRandomImages(randomImagesArray);

        const filteredNewArrivalsProductData = response.data.filter((item) => item.product_new === true && item.product_status === "active" && item.trash === false);
        const shuffledNewArrivalsData = filteredNewArrivalsProductData.sort(() => 0.5 - Math.random());
        const transformedNewArrivalsData = shuffledNewArrivalsData.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          product_image: item.product_photo,
          price: item.product_price,
          new: item.product_new,
          sale: item.product_sale,
        }));
        setNewArrivalsProductData(transformedNewArrivalsData);

        const filteredBestSellingProductData = response.data.filter((item) => item.product_sale === true && item.product_status === "active" && item.trash === false);
        const shuffledBestSellingData = filteredBestSellingProductData.sort(() => 0.5 - Math.random());
        const transformedBestSellingData = shuffledBestSellingData.map((item) => ({
          id: item.product_id,
          name: item.product_name,
          product_image: item.product_photo,
          price: item.product_price,
          new: item.product_new,
          sale: item.product_sale,
        }));
        setBestSellingProductData(transformedBestSellingData);
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

  

  const redirectProductPage = (id) => {
    startTransition(() => {
      navigate("/product/" + id);
    });
  };

  const redirectLoginPage = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  const handleNextNewArrivalsItem = () => {
    setCurrentNewArrivalsIndex((prevIndex) => (prevIndex + 1) % newArrivalsProductData.length);
  };

  const handlePreviousNewArrivalsItem = () => {
    setCurrentNewArrivalsIndex((prevIndex) => (prevIndex - 1 + newArrivalsProductData.length) % newArrivalsProductData.length);
  };

  const displayedNewArrivalsItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentNewArrivalsIndex + i) % newArrivalsProductData.length;
    displayedNewArrivalsItems.push(newArrivalsProductData[index]);
  }

  const handleNextNewCollectionItem = () => {
    setCurrentNewCollectionIndex((prevIndex) => (prevIndex + 1) % newArrivalsProductData.length);
  };

  const handlePreviousNewCollectionItem = () => {
    setCurrentNewCollectionIndex((prevIndex) => (prevIndex - 1 + newArrivalsProductData.length) % newArrivalsProductData.length);
  };

  const displayedNewCollectionItems = [];
  for (let i = 0; i < itemsPerPage - 1; i++) {
    const index = (currentNewCollectionIndex + i) % newArrivalsProductData.length;
    displayedNewCollectionItems.push(newArrivalsProductData[index]);
  }

  const handleNextBestSellingItem = () => {
    setCurrentBestSellingIndex((prevIndex) => (prevIndex + 1) % bestSellingProductData.length);
  };

  const handlePreviousBestSellingItem = () => {
    setCurrentBestSellingIndex((prevIndex) => (prevIndex - 1 + bestSellingProductData.length) % bestSellingProductData.length);
  };

  const displayedBestSellingItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentBestSellingIndex + i) % bestSellingProductData.length;
    displayedBestSellingItems.push(bestSellingProductData[index]);
  }

  useEffect(() => {
    fetchData();
    customer_id && fetchWishlist();
    
  }, []);

  return (
    <div className="font-sans text-center" style={{ backgroundColor: '#f1f1f0' }}>
      <Header />
      <ToastContainer />

      <main>
        <section
          ref={section1Ref}
          className={`mt-24 mb-20 mx-16 ${
            section1InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-7xl">New Collections</h1>
          <p className="mt-10 text-gray-500 max-w-2xl mx-auto tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            voluptas ut dolorum consequuntur, adipisci repellat! Eveniet commodi
            voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus
            harum, quibumdam ex repellat eaque!
          </p>
        </section>

        <section
          ref={section2Ref}
          className={`flex items-center justify-center pb-32 mb-32 ${
            section2InView ? "opacity-100" : "opacity-0"
          }`}
        >
          {newArrivalsProductData.length > 0 && (
            <>
              <button 
                className="p-6 mr-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300"
                onClick={handleNextNewCollectionItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className="flex space-x-20 h-[500px]">
                {displayedNewCollectionItems.map((item) => (
                  <div className="w-96">
                    <img src={item.product_image} alt="Product" className="w-full h-full object-cover transition-transform duration-500 hover:scale-90" />
                    <div className="flex flex-col justify-center items-start">
                      <span className="mt-5 mb-3 text-2xl tracking-wide">
                        {item.name}
                      </span>
                      <span className="mb-4 text-gray-500 text-left tracking-wider">
                        Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.
                      </span>
                      <a href={`/product/${item.id}`} className="underline underline-offset-8 uppercase tracking-widest">
                        Discover Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="p-6 ml-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300"
                onClick={handlePreviousNewCollectionItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}
        </section>

        <section
          ref={section3Ref}
          className={` pt-24 px-72 bg-white ${
            section3InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <h3 className="text-3xl mb-2">Book An Appointment</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <h3 className="text-3xl mb-2">Pick Up In Store</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              <h3 className="text-3xl mb-2">Special Packaging</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11 text-gray-400 mb-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <h3 className="text-3xl mb-2">Free Global Returns</h3>
              <p className="mt-2 text-gray-500 tracking-wider">
                At imperdiet dui accumsan sit amet nulla risus est ultricies
                quis.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={section4Ref}
          className={`bg-white py-28 ${
            section4InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-14 h-[450px]">
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/shop">
                  <img src={'https://zephyr-bucket-demo.s3.us-east-1.amazonaws.com/ShopForMen.jpg'} alt="Shop For Men" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95" />
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/shop" className="text-gray-400 uppercase tracking-wide">Shop For Men</a>
              </div>
            </div>
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/shop">
                  <img src={'https://zephyr-bucket-demo.s3.us-east-1.amazonaws.com/ShopForWomen.jpg'} alt="Shop For Men" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95" />
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/shop" className="text-gray-400 uppercase tracking-wide">Shop For Women</a>
              </div>
            </div>
            <div className="w-[400px] group">
              <div className="w-full h-full">
                <a href="/shop">
                  <img src={'https://zephyr-bucket-demo.s3.us-east-1.amazonaws.com/ShopForAccessories.jpg'} alt="Shop For Men" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95" />
                </a>
              </div>
              <div className="p-2 w-fit">
                <a href="/shop" className="text-gray-400 uppercase tracking-wide">Shop Acccessories</a>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={section5Ref}
          className={`bg-white px-[300px] pb-16 pt-5 ${
            section5InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl mb-6 uppercase">Our New Arrivals</h2>
            </div>
            <div>
              <a href="/shop" className="underline underline-offset-8 uppercase text-sm tracking-widest">
                View All Products
              </a>
            </div>
          </div>
          {newArrivalsProductData.length > 0 && (
            <div className="flex items-center justify-center">
              <button 
                className="p-6 mr-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300"
                onClick={handleNextNewArrivalsItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className="flex space-x-[51px]">
                {displayedNewArrivalsItems.map((item) => (
                  <div className="w-72 transition-transform duration-500 hover:scale-95 group">
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center" style={{ backgroundImage: `url(${item.product_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="absolute top-[16px] left-[233px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <button 
                            className={`bg-white ${(wishlist.some((wishlistItem) => wishlistItem.product_id === item.id)) ? "text-red-500" :"text-black"} w-10 h-10 mr-2 flex justify-center items-center mb-2`}
                            onClick={()=>handleWishlist(item.id)}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill={(wishlist.some((wishlistItem) => wishlistItem.product_id === item.id)) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                              </svg>
                          </button>
                          {/* <button 
                            className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2"
                            onClick={() => redirectProductPage(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                          </button> */}
                      </div>
                    </div>
                    <div className="mt-3 text-xl tracking-wide text-left uppercase">
                      {item.name}
                    </div>
                    <div className="mt-2 text-lg text-left">
                      <span className="opacity-100 group-hover:opacity-0 duration-300">$ {item.price}</span>
                      <button className="absolute left-0 transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-semibold text-red-600 rounded" onClick={()=>handleAddToCart(item.id, 1)}>
                          + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="p-6 ml-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300" 
                onClick={handlePreviousNewArrivalsItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </section>

        <section
          ref={section6Ref}
          className={`py-24 px-[300px] ${
            section6InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center">
            <img src={WinterCollectionImage} alt="Classic Winter Collection" className="w-1/2 h-[630px] object-cover bg-gray-300 flex items-center justify-center text-xl text-gray-800" />
            <div className="w-1/2 px-24 h-[630px] bg-white flex flex-col justify-center">
              <div className="text-5xl mb-7 text-left uppercase tracking-wide">
                Classic Winter Collection
              </div>
              <p className="text-gray-400 mb-8 text-left tracking-wide leading-7">
                Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus,
                gravida orci, fringilla a. Ac sed eu fringilla odio mi.
                Consequat pharetra at magna imperdiet cursus ac faucibus sit
                libero. Ultricies quam nunc, lorem sit lorem urna, pretium
                aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo
                mollis diam sed facilisis at cursus imperdiet cursus ac faucibus
                sit faucibus sit libero.
              </p>
              <div className="flex justify-start">
                <a href="shop" className="bg-black text-white w-48 px-6 py-4 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800">
                  Shop Collection
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={section7Ref}
          className={`bg-white px-[300px] pb-16 pt-24 ${
            section7InView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-3xl mb-6 uppercase">Best Selling Items</h2>
            </div>
            <div>
              <a href="/shop" className="underline underline-offset-8 uppercase text-sm tracking-widest">
                View All Products
              </a>
            </div>
          </div>
          {bestSellingProductData.length > 0 && (
            <div className="flex items-center justify-center">
              <button 
                className="p-6 mr-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300"
                onClick={handleNextBestSellingItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="size-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div className="flex space-x-[51px]">
                {displayedBestSellingItems.map((item) => (
                  <div className="w-72 transition-transform duration-500 hover:scale-95 group">
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center" style={{ backgroundImage: `url(${item.product_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="absolute top-[16px] left-[233px] opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <button 
                            className={`bg-white ${(wishlist.some((wishlistItem) => wishlistItem.product_id === item.id)) ? "text-red-500" :"text-black"} w-10 h-10 mr-2 flex justify-center items-center mb-2`}
                            onClick={()=>handleWishlist(item.id)}
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill={(wishlist.some((wishlistItem) => wishlistItem.product_id === item.id)) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                              </svg>
                          </button>
                          {/* <button 
                            className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2"
                            onClick={() => redirectProductPage(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                          </button> */}
                      </div>
                    </div>
                    <div className="mt-3 text-xl tracking-wide text-left uppercase">
                      {item.name}
                    </div>
                    <div className="mt-2 text-lg text-left">
                      <span className="opacity-100 group-hover:opacity-0 duration-300">$ {item.price}</span>
                      <button className="absolute left-0 transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-semibold text-red-600 rounded" onClick={()=>handleAddToCart(item.id, 1)}>
                          + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="p-6 ml-28 cursor-pointer rounded-full border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-500 transition-all duration-300" 
                onClick={handlePreviousBestSellingItem}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          )}
        </section>

        <section className="py-24">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl mb-8 uppercase tracking-wider">
              Sign Up for Our Newsletter
            </h2>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-3/5 p-3 border border-gray-300"
              />
              <a href="#" className="bg-black text-white w-36 px-6 py-4 ml-2 uppercase tracking-widest font-semibold text-sm hover:bg-gray-800">
                Sign Up
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            {randomImages.map((image, index) => (
              <img key={index} src={image} alt="Random" className="w-96 h-80 object-cover" />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default HomePage;
