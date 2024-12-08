import React, { useState } from 'react';

const QuantityInput = ({ item, onQuantityChange  }) => {
  const [quantity, setQuantity] = useState(item.cart_quantity);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.cart_id, newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.cart_id, newQuantity);
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
