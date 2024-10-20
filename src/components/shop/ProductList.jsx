import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ currentItems, itemPerRow }) => {
    return (
        <div className={`grid grid-cols-${itemPerRow} md:grid-cols-${itemPerRow} lg:grid-cols-${itemPerRow} gap-6`}>
            {currentItems.map((item, index) => (
                <ProductItem item={item} index={index} />
            ))}
        </div>
    );
};

export default ProductList;