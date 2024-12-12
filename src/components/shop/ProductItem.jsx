import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({
  item,
  index,
  wishlist,
  handleWishlist,
  handleAddToCart,
}) => {
  const navigate = useNavigate();
  const redirectProductPage = () => {
    startTransition(() => {
      navigate("/product/" + item.id);
    });
  };

  const inWishlist = wishlist.some(
    (wishlistItem) => wishlistItem.product_id === item.id
  );

  const filledStars = Math.floor(item.rating_level);
  const hasHalfStar = item.rating_level % 1 !== 0; // Check if there's a half star
  const totalStars = 5; // Maximum number of stars

  return (
    <div key={item.id} className="relative p-1 group">
      <div
        className="w-full h-96 mb-5 py-5"
        style={{
          backgroundImage: `url(${item.product_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-[46px] left-[200px] transform -translate-y-1/2 translate-x-7 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button
            className={`bg-white ${
              inWishlist ? "text-red-500" : "text-black"
            } w-10 h-10 mr-2 flex justify-center items-center mb-2`}
            onClick={() => handleWishlist(item.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={inWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          {/* <button 
                        className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2"
                        onClick={redirectProductPage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button> */}
        </div>
        {item.sale && (
          <div className="bg-black w-16 text-center pb-0.5">
            <span className="text-white font-semibold text-xs tracking-widest">
              SALE
            </span>
          </div>
        )}
        {item.new && (
          <div
            className={`bg-white w-16 text-center pb-0.5 ${
              item.sale ? "mt-2" : ""
            }`}
          >
            <span className="text-black font-semibold text-xs tracking-widest">
              NEW
            </span>
          </div>
        )}
      </div>

      <h2 className="mb-1">
        <span className="opacity-100 group-hover:opacity-0 duration-300">
          {item.name}
        </span>
        <button
          className="absolute left-0.5 top-[408px] transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-semibold text-red-600 rounded"
          onClick={() => handleAddToCart(item.id, 1)}
        >
          + Add to Cart
        </button>
      </h2>

      <div className="flex items-center mb-2">
        {[...Array(filledStars)].map((_, index) => (
          <svg
            key={`filled-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-4 text-orange-400"
            style={{ stroke: "#D1D5DB" /* text-gray-300 */ }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            key="half-star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-4 text-gray-300" // Adjust stroke color to gray for outline
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

        {[...Array(totalStars - filledStars - (hasHalfStar ? 1 : 0))].map(
          (_, index) => (
            <svg
              key={`empty-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          )
        )}

        <span className="text-gray-600 ml-1">({item.total_rating})</span>
      </div>
      <p className="text-gray-700 text-lg font-semibold">$ {item.price}</p>
    </div>
  );
};

export default ProductItem;
