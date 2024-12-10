import React, { startTransition } from "react";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ item, index, wishlist, handleWishlist, handleAddToCart }) => {
    const navigate = useNavigate();
    const redirectProductPage = () => {
        startTransition(() => {
            navigate("/product/" + item.id);
        });
    };

    const inWishlist = wishlist.some((wishlistItem) => wishlistItem.product_id === item.id);

    return (
        <div key={item.id} className="relative p-1 group">
            <div className="w-full h-96 mb-5 py-5" style={{ backgroundImage: `url(${item.product_image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute top-[72px] left-[200px] transform -translate-y-1/2 translate-x-7 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button className={`bg-white ${inWishlist ? "text-red-500" :"text-black"} w-10 h-10 mr-2 flex justify-center items-center mb-2`} onClick={()=>handleWishlist(item.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={inWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <button 
                        className="bg-white text-black w-10 h-10 mr-2 flex justify-center items-center mb-2"
                        onClick={redirectProductPage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                {item.sale && (
                    <div className="bg-black w-16 text-center pb-0.5">
                        <span className="text-white font-semibold text-xs tracking-widest">SALE</span>
                    </div>
                )}
                {item.new && (
                    <div className={`bg-white w-16 text-center pb-0.5 ${item.sale ? "mt-2" : ""}`}>
                        <span className="text-black font-semibold text-xs tracking-widest">NEW</span>
                    </div>
                )}
            </div>
            
            <h2 className="mb-2">
                <span className="opacity-100 group-hover:opacity-0 duration-300">{item.name}</span>
                <button className="absolute left-0.5 top-[408px] transform -translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-semibold text-red-600 rounded" onClick={()=>handleAddToCart(item.id, 1)}>
                    + Add to Cart
                </button>
            </h2>

            <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 -ml-0.5 ${
                            i < item.rating ? 'text-orange-400' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.784.57-1.839-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.09 10.101c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.516-4.674z" />
                    </svg>
                ))}
            </div>
            <p className="text-gray-700 text-lg font-semibold">$ {item.price}</p>
        </div>
    );
};

export default ProductItem;