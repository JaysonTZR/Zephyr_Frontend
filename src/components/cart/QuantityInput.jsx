import React, { useState } from 'react';

const QuantityInput = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={decreaseQuantity}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="w-12 text-center mx-2">
        {quantity}
      </div>

      <button onClick={increaseQuantity}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5l7.5-7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  );
};

export default QuantityInput;
