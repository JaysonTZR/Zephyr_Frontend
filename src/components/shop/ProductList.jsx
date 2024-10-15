import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ currentItems }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item, index) => (
                <ProductItem item={item} index={index} />
            ))}
        </div>
    );
};

export default ProductList;