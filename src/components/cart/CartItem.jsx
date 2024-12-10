import React, { useState } from 'react';
import QuantityInput from "./QuantityInput";

const CartItem = ({ item, index, onQuantityChange, onRemove }) => {
    const [updatedCart, setUpdatedCart] = useState([]);

    return (
        <div
            key={index}
            className="grid grid-cols-10 gap-6 items-center py-10 border-b"
        >
            <div className="col-span-5 flex items-center">
                <div className="w-20 h-20 mr-6" style={{ backgroundImage: `url(${item.product.product_photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div>
                    <p>{item.product.product_name}</p>
                    <p className="text-lg font-semibold">$ {(item.product.product_price).toFixed(2)}</p>
                </div>
            </div>
            <div className="col-span-2 text-center">
                <QuantityInput item={item} onQuantityChange={onQuantityChange} />
            </div>
            <div className="col-span-2 text-center font-semibold text-lg">$ {(item.totalPrice).toFixed(2)}</div>
            <button className="col-span-1 text-center border rounded-full w-9 h-9 flex items-center justify-center" style={{ backgroundColor: '#f3f2ee' }} onClick={()=>onRemove(item.cart_id)}>
                <div className="text-black font-extrabold">&#10006;</div>
            </button>
      </div>
    );
};

export default CartItem;