import React, { useState } from "react";

function RatingModal({ isOpen, onClose, product, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Pass rating and review to the parent component
    onSubmit({ rating, review });
    setRating(0); // Reset state
    setReview("");
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-1/2">
        {/* Header */}
        <div className="mb-4 border-b">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Review Product</h2>
            <button
              className="text-gray-800 hover:text-red-500"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex items-start mb-4">
          <img src={product?.productImage} alt="Product" className="object-cover w-16 h-16 mr-4" />
          <div>
            <div className="font-semibold text-lg">{product?.productName}</div>
            <div className="text-sm text-gray-500">
              {product?.productVariant}
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-md mb-2">Rate this product:</h3>
          <div className="flex items-center">
            {/* Rating stars */}
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <svg
                  key={value}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={value <= rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className={`h-6 w-6 cursor-pointer ${
                    value <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(value)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>

            {/* Rating text */}
            <span className="ml-2 text-sm text-gray-600">{rating} {rating == 1 ? 'star' : 'stars'}</span>
          </div>
        </div>

        {/* Review Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-md mb-2">Product review:</h3>
          <textarea
            className="resize-none w-full border border-gray-300 rounded-md p-2"
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}

          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            className="px-4 py-2 bg-black text-white font-semibold hover:bg-zinc-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
