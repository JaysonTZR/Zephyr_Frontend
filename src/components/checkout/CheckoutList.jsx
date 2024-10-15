import React from "react";
import CheckoutItem from "./CheckoutItem";

const CheckoutList = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <CheckoutItem item={item} index={index} />
            ))}
        </div>
    );
};

export default CheckoutList;