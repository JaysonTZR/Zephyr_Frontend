import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <CartItem item={item} index={index} />
            ))}
        </div>
    );
};

export default CartList;