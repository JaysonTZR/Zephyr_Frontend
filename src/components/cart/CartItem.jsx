import React from "react";
import QuantityInput from "./QuantityInput";

const CartItem = ({ item, index }) => {
    return (
        <div
            key={index}
            className="grid grid-cols-10 gap-6 items-center py-10 border-b"
        >
            <div className="col-span-5 flex items-center">
                <div className="w-20 h-20 bg-gray-100 mr-6"></div>
                <div>
                    <p>{item.name}</p>
                    <p className="text-lg font-semibold">{item.price}</p>
                </div>
            </div>
            <div className="col-span-2 text-center">
                <QuantityInput item={item}/>
            </div>
            <div className="col-span-2 text-center font-semibold text-lg">$ 30.00</div>
            <div className="col-span-1 text-center border rounded-full w-9 h-9 flex items-center justify-center" style={{ backgroundColor: '#f3f2ee' }}>
                <button className="text-black font-extrabold">&#10006;</button>
            </div>
      </div>
    );
};

export default CartItem;