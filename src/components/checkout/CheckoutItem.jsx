import React from "react";

const CheckoutItem = ({ item, index }) => {
    return (
        <li key={index} className="flex justify-between py-2">
            <span>{item.product.product_name} <strong>({item.cart_quantity})</strong></span>
            <span>$ {item.totalPrice}</span>
        </li>
    );
};

export default CheckoutItem;