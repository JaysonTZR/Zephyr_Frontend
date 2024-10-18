import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ currentItems, itemPerRow }) => {
    const gridColsClass = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
    }[itemPerRow] || "grid-cols-1";

    return (
        <div className={`grid ${gridColsClass} gap-6`}>
            {currentItems.map((item, index) => (
                <ProductItem item={item} index={index} />
            ))}
        </div>
    );
};

export default ProductList;