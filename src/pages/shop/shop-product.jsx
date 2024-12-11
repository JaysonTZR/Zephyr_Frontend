import React, { useState, useEffect, startTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DetailsPayment from "../../assets/images/details-payment.png";
import ProductList from "../../components/shop/ProductList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../constant/constants";

const ShopProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [category, setCategory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [menuSection, setMenuSection] = useState("description");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [ratingData, setRatingData] = useState({
    totalRating: 0,
    average: 5,
  });

  const authCustomerData = localStorage.getItem("authCustomerData");
  const customerDataObject = authCustomerData
    ? JSON.parse(authCustomerData)
    : null;

  const customer_id = customerDataObject
    ? customerDataObject.customer_id
    : null;

  const sizes = ["XXL", "XL", "L", "S"];
  const colors = [
    { name: "Black", class: "bg-black" },
    { name: "Blue", class: "bg-blue-900" },
    { name: "Yellow", class: "bg-yellow-500" },
    { name: "Red", class: "bg-red-500" },
    { name: "White", class: "bg-white" },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "product", {});

      if (response.status === 200) {
        const filteredRelatedProductData = response.data.filter(
          (item) => item.product_status === "active" && item.trash === false
        );
        const shuffledData = filteredRelatedProductData.sort(
          () => 0.5 - Math.random()
        );
        const topFourData = shuffledData.slice(0, 4);
        const transformedData = topFourData.map((item) => ({
          id: item.product_id,
          category_id: item.category_id,
          name: item.product_name,
          product_image: item.product_photo,
          product_sub_image: item.product_sub_photo.split(", "),
          price: item.product_price,
          new: item.product_new,
          sale: item.product_sale,
        }));
        setRelatedProductData(transformedData);

        const filteredData = response.data.filter(
          (item) =>
            item.product_id == id &&
            item.product_status === "active" &&
            item.trash === false
        );
        setData(filteredData);
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

  const fetchCategory = async () => {
    try {
      const response = await axios.get(apiUrl + "category", {});

      if (response.status === 200) {
        const filteredData = response.data.filter(
          (item) => item.category_status === "active" && item.trash === false
        );
        setCategory(filteredData);
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

  const fetchRating = async () => {
    try {
      const response = await axios.get(
        apiUrl + `productrating/product/${id}`,
        {}
      );

      if (response.status === 200) {
        const totalRating = response.data.reduce(
          (acc, item) => acc + item.rating_level,
          0
        );
        const average = totalRating / response.data.length;

        setRatingData({
          totalRating: response.data.length,
          average: average.toFixed(2),
        });

        // setCategory(filteredData);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Error Fetching Data", {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
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
      const response = await axios.post(apiUrl + "wishlist/item", {
        customer_id: customer_id,
        product_id: productId,
      });

      if (response.status === 201) {
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
  };

  const removeWishlistItem = async (wishlist_item_id) => {
    try {
      const response = await axios.delete(
        apiUrl + `wishlist/item/${wishlist_item_id}`,
        {}
      );

      if (response.status === 200) {
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
  };

  const handleWishlist = async (productId) => {

    if(!customer_id){
      redirectLoginPage();
      return;
    }

    const filteredItems = wishlist.filter(
      (item) => item.product.product_id == productId
    );

    const wishlistItem = filteredItems[0];

    if (wishlistItem) {
      removeWishlistItem(wishlistItem.wishlist_item_id);
    } else {
      addWishlistItem(productId);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const getCategoryName = (categoryId) => {
    const categoryItem = category.find(
      (item) => item.category_id === categoryId
    );
    return categoryItem ? categoryItem.category_name : "Unknown Category";
  };

  const handleAddToCart = async (product_id, qty) => {

    if(!customer_id){
      redirectLoginPage();
      return;
    }

    try {
      const response = await axios.post(apiUrl + "cart", {
        customer_id: customer_id,
        product_id: product_id,
        cart_quantity: qty,
        cart_description: `Size: ${selectedSize}, Color: ${selectedColor}`,
        trash: false,
      });

      if (response.status === 201) {
        toast.success("Item Added To Cart", {
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
      toast.error("Error Adding Cart", {
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

  const renderProductInformation = (information) => {
    const parts = information.split("*");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <div key={index} className="text-lg font-semibold mt-5">
            {part}
          </div>
        );
      } else {
        return (
          <div key={index} className="text-gray-600 mb-4">
            {part}
          </div>
        );
      }
    });
  };

  const inWishlist = wishlist.some(
    (wishlistItem) => wishlistItem.product_id == id
  );

  const redirectLoginPage = () => {
    startTransition(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    fetchData();
    fetchCategory();

    customer_id && fetchWishlist();
    fetchRating();
    window.scrollTo(0, 0);
  }, [id]);

  const filledStars = Math.floor(ratingData.average); // Get the whole number of stars
  const hasHalfStar = ratingData.average % 1 !== 0; // Check if there's a half star
  const totalStars = 5; // Maximum number of stars

  return (
    <div>
      <Header />
      <ToastContainer />
      <div
        className="flex justify-center p-4"
        style={{ backgroundColor: "#f3f2ee" }}
      >
        <div className="flex md:w-3/4">
          {/* Thumbnail Images Section */}
          <div className="flex flex-col w-1/4 p-4 pl-24">
            {data.length > 0 &&
              data[0].product_sub_photo
                .split(", ")
                .map((subPhoto, index) => (
                  <img
                    key={index}
                    src={subPhoto}
                    alt={`${index}`}
                    className="h-36 w-32 mb-4 object-cover"
                  />
                ))}
          </div>

          {/* Main Image Section */}
          <div className="flex w-2/4 p-4 justify-center">
            <img
              src={data.length > 0 ? data[0].product_photo : ""}
              alt="Product"
              className="h-[625px] w-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto p-4 mt-16 mb-5 w-[800px]">
        {/* Removed border and shadow */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {data.length > 0 ? data[0].product_name : "Product Name"}
        </h2>
        <div className="flex items-center justify-center mb-3">
          {/* Generate filled stars */}
          {[...Array(filledStars)].map((_, index) => (
            <svg
              key={`filled-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6 text-orange-400"
              style={{ stroke: '#D1D5DB' /* text-gray-300 */ }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          ))}

          {/* Generate a half star if applicable */}
          {hasHalfStar && (
            <svg
            key="half-star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-6 text-gray-300" // Adjust stroke color to gray for outline
          >
            {/* Full star for the stroke */}
            <path
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              fill="none" // Ensure only the stroke is applied initially
            />
            {/* Mask for the filled half */}
            <defs>
              <linearGradient id="half-fill">
                <stop offset="50%" stopColor="orange" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Full star filled but clipped to half */}
            <path
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              fill="url(#half-fill)" // Apply the gradient mask
            />
          </svg>
          
          )}

          {/* Generate empty stars */}
          {[...Array(totalStars - filledStars - (hasHalfStar ? 1 : 0))].map(
            (_, index) => (
              <svg
                key={`empty-${index}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            )
          )}

          {/* Display the total number of reviews */}
          <span className="text-gray-600 ml-1">
            - {ratingData.totalRating} Reviews
          </span>
        </div>
        <div className="text-lg font-semibold mb-5 text-center">
          <span className="text-3xl">
            $ {data.length > 0 ? data[0].product_price : "Product Price"}
          </span>
        </div>
        <p className="mb-12 text-center text-sm">
          {data.length > 0
            ? data[0].product_description
            : "Product Description"}
        </p>
        <div className="flex justify-center space-x-16 mb-7">
          {/* Size Selection */}
          <div className="flex items-center">
            <label className="mr-3">Size:</label>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 flex items-center justify-center border cursor-pointer ${
                    size === selectedSize ? "bg-black" : ""
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  <span
                    className={`font-semibold ${
                      size === selectedSize ? "text-white" : "text-black"
                    }`}
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
              {colors.map((color) => (
                <div
                  key={color.name}
                  className={`border rounded-full w-8 h-8 flex items-center justify-center ${
                    selectedColor === color.name ? "border-slate-800" : ""
                  }`}
                >
                  <button
                    className={`${color.class} w-7 h-7 border rounded-full`}
                    onClick={() => handleColorClick(color.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 py-2 border mr-4 text-center"
          />
          <button
            className="bg-black text-white w-48 px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700"
            onClick={() => handleAddToCart(id, quantity)}
          >
            Add to Cart
          </button>
        </div>

        <div className="flex items-center justify-center mb-6">
          <button
            className="flex items-center justify-center hover:text-red-500"
            onClick={() => handleWishlist(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span className="uppercase tracking-widest text-sm font-semibold">
              {inWishlist ? "Remove From Wishlist" : "Add to Wishlist"}
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <hr className="border-gray-300 w-1/6" />
          <span className="font-semibold text-xl px-5">
            Guaranteed Safe Checkout
          </span>
          <hr className="border-gray-300 w-1/6" />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-10">
          <img
            src={DetailsPayment}
            alt="Payment Methods"
            className="object-cover w-auto h-full"
          />
        </div>
        <div className="font-semibold text-center">
          <div className="mb-1">
            <span className="text-gray-400">SKU: </span>
            <span className="text-black">
              {data.length > 0 ? data[0].product_code : "Product Code"}
            </span>
          </div>
          <div className="mb-1">
            <span className="text-gray-400">Categories: </span>
            <span className="text-black">
              {data.length > 0
                ? getCategoryName(data[0].category_id)
                : "Unknown Category"}
            </span>
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
                Customer Reviews ({ratingData.totalRating})
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
                {data.length > 0 ? data[0].product_description : "Description"}
              </p>
            </div>
          )}

          {/* Customer Reviews Content */}
          {menuSection == "review" && (
            <div>
              <h1 className="text-xl font-bold mb-4">Customer Reviews</h1>
              <p className="text-gray-700 mb-4">
                - This Pocket PC is fantastic! It has all the features I need to
                stay organized. Highly recommended!
              </p>
              <p className="text-gray-700 mb-4">
                - Good value for money. It has been a reliable device for me.
              </p>
              <div className="mt-10">
                <textarea
                  className="w-full px-4 py-3 rounded-md border border-gray-300 resize-none"
                  rows="2"
                  placeholder="Write a review..."
                  value={review}
                  onChange={handleReview}
                />
                <button className="mt-2 bg-black text-white w-28 px-6 py-3 uppercase tracking-widest font-semibold text-sm hover:bg-zinc-700">
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Additional Information Content */}
          {menuSection == "additional" && (
            <div>
              <h1 className="text-xl font-bold mb-4">Additional Information</h1>
              {data.length > 0
                ? renderProductInformation(data[0].product_information)
                : "Information"}
            </div>
          )}
        </div>
        <div className="container mx-auto py-10">
          <h2 className="text-3xl font-semibold mb-10 item text-center">
            Related Product
          </h2>
          <div className="px-11">
            <ProductList
              currentItems={relatedProductData}
              itemPerRow={4}
              wishlist={wishlist}
              handleWishlist={handleWishlist}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopProduct;
