import React from "react";

const CheckoutItem = ({ item, index }) => {
    return (
        <li className="flex justify-between py-2">
            <span>{(index + 1).toString().padStart(2, '0')}. {item.name}</span>
            <span>$ {item.price}</span>
        </li>
    );
};

export default CheckoutItem;