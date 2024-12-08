import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { apiUrl } from '../../../../constant/constants';
import axios from "axios";

const Size = ({ setIsSizeOpen, isSizeOpen, onSizeSelect }) => {
    const [data, setData] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                apiUrl + "category",
                {
        
                }
            );
        
            if (response.status === 200){
                const filteredData = response.data.filter((item) => item.category_type === "Size" && item.category_status === "active" && item.trash === false);
                const transformedData = filteredData.map((item) => ({
                    category_id: item.category_id,
                    category_name: item.category_name,
                }));
        
                setData(transformedData);
            }
        } catch (error) {
            toast.error("Error Fetching Data", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSizeClick = (categoryId) => {
        const newSelectedSize = selectedSize === categoryId ? null : categoryId;
        setSelectedSize(newSelectedSize);
        onSizeSelect(newSelectedSize);
    };

    return (
        <div className="p-2 border-b mb-2">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
            >
                <h2 className="font-semibold uppercase mb-4">Size</h2>
                <div className="mb-4">
                    {isSizeOpen ? 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>                  
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>                
                    }
                </div>
            </div>
            <div
                className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                    isSizeOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="space-y-2 mb-3">
                    {data.map((category) => (
                        <button 
                            key={category.category_id}
                            className={`font-semibold px-6 py-1 mr-3 ${
                            selectedSize === category.category_id ? 'text-gray-200 bg-gray-800 border border-gray-800' : 'text-gray-800 border border-gray-200'
                            }`}
                            onClick={() => handleSizeClick(category.category_id)}
                        >
                            {category.category_name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Size;