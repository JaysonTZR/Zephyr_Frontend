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
        currentItems.length === 0 ? (
            <div className="h-60 text-center flex items-center justify-center text-lg text-gray-500">No available products.</div>
        ) : (
        <div className={`grid ${gridColsClass} gap-6`}>
            {currentItems.map((item, index) => (
                <ProductItem item={item} index={index} />
            ))}
        </div>
        )
    );
};

export default ProductList;