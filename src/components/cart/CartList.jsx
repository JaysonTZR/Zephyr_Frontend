import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, onQuantityChange, onRemove }) => {
    return (
        <div>
            {items.map((item, index) => (
                <CartItem item={item} index={index} onQuantityChange={onQuantityChange} key={index} onRemove={onRemove}/>
            ))}
        </div>
    );
};

export default CartList;